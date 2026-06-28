import { OPENAI_KEY } from './config'

const STAGES = [
  { p: 8,  l: 'Connecting…' },
  { p: 18, l: 'Drafting objective…' },
  { p: 32, l: 'Building §2.1 document table…' },
  { p: 45, l: 'Generating maintenance notes…' },
  { p: 57, l: 'Calculating electrical load delta…' },
  { p: 68, l: 'Calculating mechanical load delta…' },
  { p: 79, l: 'Writing summary sections…' },
  { p: 89, l: 'Approvals classification…' },
  { p: 97, l: 'Finalising…' },
  { p: 100,l: 'Done ✓' },
]

export function buildPrompt({ client, reg, actype, sn, loc, obj, stc, ata, instloc, notes, rtype, removed, installed, engineer, orgname, today, dA, dW, totalRmA, totalAddA }) {
  const rmStr = removed.length ? removed.map((r,i) => `${i+1}. ${r.desc} | OEM: ${r.oem} | P/N: ${r.pn} | Qty: ${r.qty} | Dims: ${r.dims} | ${r.volt}V | ${r.amps}A | ${r.wt}kg`).join('\n') : 'None'
  const addStr = installed.length ? installed.map((r,i) => `${i+1}. ${r.desc} | OEM: ${r.oem} | P/N: ${r.pn} | Qty: ${r.qty} | Dims: ${r.dims} | ${r.volt}V | ${r.amps}A | ${r.wt}kg`).join('\n') : 'None'

  return `You are a senior aircraft maintenance engineer at ${orgname}. Write a formal Type Investigation Report. Output ONLY the section content below using exact SECTION: markers. No markdown, no asterisks, plain text only.

AIRCRAFT: ${client} | ${reg} | ${actype} | S/N: ${sn||'XXXX'} | ${loc} | ${today} | ${engineer}
Report type: ${rtype} | ATA: ${ata||'TBD'} | STC: ${stc||'TBD'}
Objective: ${obj}
REMOVED:\n${rmStr}
INSTALLED:\n${addStr}
Install location: ${instloc||'Same as removed'}
Notes: ${notes||'None'}
Electrical: removed ${totalRmA.toFixed(2)}A added ${totalAddA.toFixed(2)}A delta ${dA}A
Weight delta: ${dW}kg

SECTION:OBJECTIVE
SECTION:2.1.INTRO
SECTION:2.1.1
SECTION:2.1.2.ROWS
[Pipe-delimited: No|OEM|Title|DocumentNumber|DateOfIssue|Revision]
SECTION:2.1.3
SECTION:2.1.4
SECTION:2.1.5
SECTION:2.2.INTRO
SECTION:2.3.ROWS
[Pipe-delimited: Type|Description|Voltage|Current|TotalCurrent|Units]
SECTION:2.3.CONCLUSION
SECTION:2.4.ROWS
[Pipe-delimited: Type|Description|Weight|TotalWeight|Units]
SECTION:2.4.CONCLUSION
SECTION:2.5
SECTION:3
SECTION:4
SECTION:5
SECTION:5.1
SECTION:6.APPROVAL
SECTION:6.CLASS
SECTION:6.REASON`
}

export async function streamGenerate({ formData, settings, onProgress, onChunk, onDone, onError }) {
  const { removed, installed } = formData
  const totalRmA = removed.reduce((s,r) => s + (parseFloat(r.amps)||0), 0)
  const totalAddA = installed.reduce((s,r) => s + (parseFloat(r.amps)||0), 0)
  const totalRmW = removed.reduce((s,r) => s + (parseFloat(r.wt)||0), 0)
  const totalAddW = installed.reduce((s,r) => s + (parseFloat(r.wt)||0), 0)
  const dA = (totalAddA - totalRmA).toFixed(2)
  const dW = (totalAddW - totalRmW).toFixed(2)
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })

  // Progress ticker
  let idx = 0
  onProgress(STAGES[0])
  const ticker = setInterval(() => {
    idx = Math.min(idx + 1, STAGES.length - 1)
    onProgress(STAGES[idx])
    if (idx === STAGES.length - 1) clearInterval(ticker)
  }, 2400)

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify({
        model: settings.model || 'gpt-4o-mini',
        stream: true,
        max_tokens: 2200,
        messages: [
          { role: 'system', content: 'You are a formal aviation maintenance engineer. Write TIR sections exactly as instructed. Plain text only, no markdown.' },
          { role: 'user', content: buildPrompt({ ...formData, engineer: settings.engineer, orgname: settings.orgname, today, dA, dW, totalRmA, totalAddA }) }
        ]
      })
    })

    if (!resp.ok) {
      const e = await resp.json()
      throw new Error(e.error?.message || `API error ${resp.status}`)
    }

    const reader = resp.body.getReader()
    const dec = new TextDecoder()
    let full = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = dec.decode(value)
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ') || line === 'data: [DONE]') continue
        try {
          const d = JSON.parse(line.slice(6))
          const token = d.choices?.[0]?.delta?.content || ''
          full += token
          onChunk(token)
        } catch {}
      }
    }

    clearInterval(ticker)
    onDone({ raw: full, meta: { dA, dW, totalRmA, totalAddA, totalRmW, totalAddW } })
  } catch (e) {
    clearInterval(ticker)
    onError(e.message)
  }
}

export function getSection(text, key) {
  const re = new RegExp(`SECTION:${key}\\r?\\n([\\s\\S]*?)(?=SECTION:|$)`, 'i')
  const m = text.match(re)
  return m ? m[1].trim() : ''
}

export function parseBullets(text, fallback = 'To be estimated during survey.') {
  const pts = text.split('\n').filter(l => l.trim()).map(l => l.replace(/^[-•*]\s*/, '').trim()).filter(Boolean)
  return pts.length ? pts : [fallback]
}

export function parsePipeRows(text) {
  return text.split('\n').filter(l => l.includes('|')).map(l => l.split('|').map(c => c.trim()))
}
