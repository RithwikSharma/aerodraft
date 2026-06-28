import { useState, useRef, useCallback } from 'react'
import { streamGenerate, getSection, parseBullets, parsePipeRows } from '../lib/generate'

const DEMO = {
  client:'Flying Aces Club', reg:'VT-ABC', sn:'15285162', actype:'Cessna 152',
  loc:'SA Air Works, Gurgaon',
  obj:'To study the feasibility of upgrade of the Cessna 152 Aircraft requested by Flying Aces Club for installing Garmin GNC 255A NAV/COMM radio for training purposes.',
  stc:'Garmin 190-01182-02 Rev F · STC SA2725SW', ata:'ATA 23 — Communications',
  instloc:'Instrument panel radio stack — same slot as removed ARC RT-385A unit',
  rtype:'upgrade', notes:'',
  removed:[{desc:'RT-385A VHF NAV/COMM',oem:'ARC Avionics',pn:'46660-1000',qty:'1',dims:'2.435"×2.350"',volt:'28',amps:'4.0',wt:'0.9'}],
  installed:[{desc:'Garmin GNC 255A NAV/COMM',oem:'Garmin International',pn:'011-02807-00',qty:'1',dims:'1.65"×6.25"×6.30"',volt:'28',amps:'0.28',wt:'0.82'}],
}

function LRUTable({ rows, setRows, label }) {
  const addRow = () => setRows([...rows, {desc:'',oem:'',pn:'',qty:'1',dims:'',volt:'28',amps:'0',wt:'0'}])
  const delRow = i => rows.length > 1 && setRows(rows.filter((_,j) => j !== i))
  const upd = (i, k, v) => setRows(rows.map((r,j) => j===i ? {...r,[k]:v} : r))
  const fields = ['desc','oem','pn','qty','dims','volt','amps','wt']
  const phs = ['Description','OEM','P/N','Qty','Dims','V','A','Wt']
  const ws = ['',60,60,55,35,65,40,40,40]

  return (
    <div className="fg">
      <label className="fl">{label}</label>
      <div className="lru-wrap">
        <table className="lru-tbl">
          <thead><tr><th>#</th>{phs.map(p=><th key={p}>{p}</th>)}<th></th></tr></thead>
          <tbody>
            {rows.map((r,i) => (
              <tr key={i}>
                <td style={{width:16,textAlign:'center',color:'var(--t3)',fontFamily:'var(--mono)',fontSize:9}}>{i+1}</td>
                {fields.map((f,fi) => <td key={f} style={ws[fi+1]?{width:ws[fi+1]}:{}}><input placeholder={phs[fi]} value={r[f]} onChange={e=>upd(i,f,e.target.value)} /></td>)}
                <td><button style={{background:'none',border:'none',color:'var(--t3)',cursor:'pointer',fontSize:14,padding:'0 2px'}} onClick={()=>delRow(i)}>×</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="add-row" onClick={addRow}>+ add row</span>
    </div>
  )
}

function renderReport({ raw, form, meta, settings, docId, today }) {
  const { client, reg, actype, sn, loc, removed, installed } = form
  const { dA, dW, totalRmA, totalAddA } = meta
  const { orgname='SA Air Works', addr1='Kalyani House, Plot No. 40, Sector 18', addr2='Gurgaon, Haryana', phone='Ph. 1234567890', website='www.saairworks.in', engineer='Rithwik Sharma' } = settings

  const g = k => getSection(raw, k)
  const buls = (text, fb='To be estimated during survey.') => {
    const pts = parseBullets(text, fb)
    return `<ul>${pts.map(p=>`<li contenteditable="true">${p}</li>`).join('')}</ul>`
  }
  const prows = text => parsePipeRows(text)

  const m212 = prows(g('2\\.1\\.2\\.ROWS')||g('2.1.2.ROWS'))
  const m23  = prows(g('2\\.3\\.ROWS')||g('2.3.ROWS'))
  const m24  = prows(g('2\\.4\\.ROWS')||g('2.4.ROWS'))

  const manRows = m212.length ? m212.filter(r=>r.length>=3).map((r,i)=>
    `<tr><td>${i+1}</td><td class="tal" contenteditable="true">${r[1]||''}</td><td class="tal" contenteditable="true">${r[2]||''}</td><td contenteditable="true">${r[3]||''}</td><td contenteditable="true">${r[4]||''}</td><td contenteditable="true">${r[5]||''}</td></tr>`).join('')
    : '<tr><td colspan="6" contenteditable="true" style="color:#999">Add manual details</td></tr>'

  const elRows = m23.length ? m23.map(r=>`<tr>${r.slice(0,6).map((c,i)=>`<td${i>0?' contenteditable="true"':''} class="${i===1?'tal':''}">${c}</td>`).join('')}</tr>`).join('')
    : [...removed.map(r=>`<tr><td>Removed</td><td class="tal">${r.desc}</td><td>${r.volt}</td><td>${r.amps}</td><td>${r.amps}</td><td>${r.qty}</td></tr>`),
       ...installed.map(r=>`<tr><td>Added</td><td class="tal">${r.desc}</td><td>${r.volt}</td><td>${r.amps}</td><td>${r.amps}</td><td>${r.qty}</td></tr>`)].join('')

  const wtRows = m24.length ? m24.map(r=>`<tr>${r.slice(0,5).map((c,i)=>`<td${i>0?' contenteditable="true"':''} class="${i===1?'tal':''}">${c}</td>`).join('')}</tr>`).join('')
    : [...removed.map(r=>`<tr><td>Removed</td><td class="tal">${r.desc}</td><td>${r.wt}</td><td>${r.wt}</td><td>${r.qty}</td></tr>`),
       ...installed.map(r=>`<tr><td>Added</td><td class="tal">${r.desc}</td><td>${r.wt}</td><td>${r.wt}</td><td>${r.qty}</td></tr>`)].join('')

  const rmTR = removed.map((r,i)=>`<tr><td>${i+1}</td><td class="tal" contenteditable="true">${r.desc}</td><td contenteditable="true">[Image]</td><td contenteditable="true">${r.dims}</td><td class="tal" contenteditable="true">${r.oem} ${r.pn}</td><td contenteditable="true">${r.qty}</td></tr>`).join('')
  const addTR = installed.map((r,i)=>`<tr><td>${i+1}</td><td class="tal" contenteditable="true">${r.desc}</td><td contenteditable="true">[Image]</td><td contenteditable="true">${r.dims}</td><td class="tal" contenteditable="true">${r.oem} ${r.pn}</td><td contenteditable="true">${r.qty}</td></tr>`).join('')

  const aDir = parseFloat(dA)<=0?'reduced':'increased'
  const wDir = parseFloat(dW)<=0?'reduced':'increased'

  return `<div class="saaw">
  <div class="saaw-hdr"><div class="saaw-org">${orgname}</div><div class="saaw-addr">${addr1}<br>${addr2}, ${phone} · <a href="http://${website}">${website}</a></div></div>
  <div style="text-align:center;margin-top:13px"><div class="saaw-dtitle">Type Investigation Report Draft 1</div><div class="saaw-did" contenteditable="true">Document ID: ${docId}</div></div>
  <hr class="saaw-sep">
  <div class="saaw-meta"><div>Aircraft Type: <strong contenteditable="true">${actype}</strong></div><div>Aircraft S/N: <strong contenteditable="true">${sn||'XXXX'}</strong></div><div>Operator/Owner: <strong contenteditable="true">${client}</strong></div><div>Inspection at: <strong contenteditable="true">${loc}</strong></div><div>Report by: <strong contenteditable="true">${engineer}</strong></div></div>
  <hr class="saaw-sep" style="margin:11px 0 13px">
  <div class="dstamp">⚠ DRAFT — Not for submission without licensed engineer review.</div>
  <h1>1. Objective</h1><p contenteditable="true">${g('OBJECTIVE')||'To study the feasibility of upgrade of the '+actype+' Aircraft requested by '+client+'.'}</p>
  <h1>2. Work</h1><h1>2.1 Availability of Documents</h1><p contenteditable="true">${g('2.1.INTRO')||'The availability of the following documents are verified for:'}</p>
  <h1>2.1.1 Availability of Supplementary Type Certificate</h1>${buls(g('2.1.1'),'STC details to be verified during survey.')}
  <h1>2.1.2 Availability of Installation Manual</h1>
  <table><thead><tr><th>No.</th><th>OEM</th><th>Title</th><th>Document Number</th><th>Date of Issue</th><th>Revision</th></tr></thead><tbody>${manRows}</tbody></table>
  <div class="tcap">Table 1: Installation Manual Details</div>
  <h1>2.1.3 Availability of Aircraft Wiring Diagrams</h1>${buls(g('2.1.3'),'Aircraft wiring diagrams to be obtained from customer.')}
  <h1>2.1.4 Availability of Maintenance Manual</h1>${buls(g('2.1.4'),'Maintenance manual to be obtained from OEM.')}
  <h1>2.1.5 Structural Repair Manual</h1>${buls(g('2.1.5'),'Structural Repair Manual available in hard copy.')}
  <h1>2.2 Aircraft Modifications</h1><p contenteditable="true">${g('2.2.INTRO')||'The proposed modifications to the aircraft are as follows:'}</p>
  <h1>2.2.1 Identified LRUs to be removed.</h1>
  <table><thead><tr><th>No.</th><th>Description</th><th>Image</th><th>Dimension</th><th>OEM &amp; P/N</th><th>Qty</th></tr></thead><tbody>${rmTR}</tbody></table>
  <div class="tcap">Table 2: LRUs to be removed.</div>
  <h1>2.2.2 Identified LRUs to be added.</h1>
  <table><thead><tr><th>No.</th><th>Description</th><th>Image</th><th>Dimension</th><th>OEM &amp; P/N</th><th>Qty</th></tr></thead><tbody>${addTR}</tbody></table>
  <div class="tcap">Table 3: LRUs to be added.</div>
  <h1>2.3 Estimated Change in Electrical Load</h1>
  <table><thead><tr><th>Type</th><th>Description</th><th>Voltage (Volts)</th><th>Current (Amps)</th><th>Total Current</th><th>Units</th></tr></thead><tbody>${elRows}</tbody></table>
  <div class="tcap">Table 4: Change in Electrical Load</div>
  <p class="conc" contenteditable="true">${g('2.3.CONCLUSION')||'Conclusion: Electrical Power '+aDir+' by '+Math.abs(parseFloat(dA)).toFixed(2)+' Amperes.'}</p>
  <h1>2.4 Estimated Change in Mechanical Load</h1>
  <table><thead><tr><th>Type</th><th>Description</th><th>Weight (Kg)</th><th>Total Weight (Kg)</th><th>Units</th></tr></thead><tbody>${wtRows}</tbody></table>
  <div class="tcap">Table 5: Change in Mechanical Load</div>
  <p class="conc" contenteditable="true">${g('2.4.CONCLUSION')||'Conclusion: Mechanical Load '+wDir+' by '+Math.abs(parseFloat(dW)).toFixed(2)+' Kg.'}</p>
  <h1>2.5 Identified Probable Location of Installation.</h1>
  <p style="font-style:italic;color:#666;font-size:10pt">[Attach Figure 1: ${actype} — annotate proposed installation location]</p>
  <p contenteditable="true">${g('2.5')||'Proposed location shown in Figure 1. No further structural modifications required.'}</p>
  <h1>3. Summary of the Problems Identified</h1>${buls(g('3'),'To be estimated during survey.')}
  <h1>4. Summary of Mechanical Changes</h1>${buls(g('4'),'To be estimated during survey.')}
  <h1>5. Summary of Electrical Changes</h1>${buls(g('5'),'To be estimated during survey.')}
  <h1>5.1 Wiring Diagrams</h1>${buls(g('5.1'),'Wiring diagram to be developed per installation manual.')}
  <h1>6. Summary of Approvals Required</h1>
  <p contenteditable="true">${g('6.APPROVAL')||'Approval Required by: DGCA.'}</p>
  <p contenteditable="true">${g('6.CLASS')||'Classification: The Change has been classified as non-Significant.'}</p>
  <p contenteditable="true">${g('6.REASON')||'Reason for classification: Only a simple part replacement with no design or structural changes.'}</p>
  <p style="margin-top:14px"><strong contenteditable="true">Type Investigation Drafted by: ${engineer}</strong></p>
  <div class="signoff"><div class="so-title">Type Investigation Reviewed and Approved by</div>
  <div class="so-row"><div class="so-f"><div class="so-lbl">Name (Print)</div><div class="so-line" contenteditable="true"></div></div><div class="so-f"><div class="so-lbl">Licence / AME No.</div><div class="so-line" contenteditable="true"></div></div><div class="so-f"><div class="so-lbl">Date</div><div class="so-line" contenteditable="true"></div></div></div>
  <div class="so-row"><div class="so-f"><div class="so-lbl">Signature</div><div class="so-line"></div></div><div class="so-f"><div class="so-lbl">Stamp</div><div class="so-line"></div></div></div>
  <div style="margin-top:8px;font-size:9pt;color:#aaa">Drafted by: ${engineer} · AeroDraft · ${orgname}</div></div>
  <div class="pagenum">2 | Page</div>
  <div class="rdis">This document is for internal review only. All contents must be verified by a licensed AME before submission to DGCA or any regulatory authority.</div></div>`
}

export default function Drafter({ settings, history, setHistory, toast, prefill }) {
  const blank = { client:'', reg:'', sn:'', actype:'', loc: settings.defloc||'SA Air Works, Gurgaon', obj:'', stc:'', ata:'', instloc:'', notes:'', rtype:'upgrade',
    removed:[{desc:'',oem:'',pn:'',qty:'1',dims:'',volt:'28',amps:'0',wt:'0'}],
    installed:[{desc:'',oem:'',pn:'',qty:'1',dims:'',volt:'28',amps:'0',wt:'0'}] }

  const [form, setForm] = useState(prefill ? { ...blank, ...prefill, removed:prefill._adRef?[{...blank.removed[0],desc:prefill._adRef}]:blank.removed } : blank)
  const [progress, setProgress] = useState(null)
  const [reportHtml, setReportHtml] = useState('')
  const [generating, setGenerating] = useState(false)
  const [saved, setSaved] = useState(false)
  const docId = useRef('SAAW-' + new Date().getFullYear() + '-' + Math.floor(Math.random()*900+100))

  const fv = key => ({ value: form[key]||'', onChange: e => setForm({...form,[key]:e.target.value}) })

  const loadDemo = () => setForm({ ...DEMO })

  const generate = async () => {
    if (!form.client || !form.reg || !form.actype) { toast('Fill in client, registration, and aircraft type', 'error'); return }
    setGenerating(true); setReportHtml(''); setSaved(false)
    const today = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'})
    await streamGenerate({
      formData: form,
      settings,
      onProgress: stage => setProgress(stage),
      onChunk: () => {},
      onDone: ({ raw, meta }) => {
        setGenerating(false); setProgress(null)
        const html = renderReport({ raw, form, meta, settings, docId: docId.current, today })
        setReportHtml(html)
        toast('Report generated', 'success')
      },
      onError: msg => { setGenerating(false); setProgress(null); toast('Error: ' + msg, 'error') }
    })
  }

  const save = () => {
    const rec = { id: docId.current, client: form.client||'Unknown', reg: form.reg||'—', actype: form.actype||'—',
      investigation: (form.obj||'Investigation').slice(0,80), engineer: settings.engineer||'Rithwik Sharma',
      date: new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}), status: 'draft', html: reportHtml }
    const existing = history.findIndex(r => r.id === docId.current)
    const next = existing >= 0 ? history.map((r,i) => i===existing ? rec : r) : [rec, ...history]
    setHistory(next); setSaved(true); toast(`Saved as ${docId.current}`, 'success')
  }

  const print = () => {
    const w = window.open('','_blank')
    w.document.write(`<!DOCTYPE html><html><head><title>SA Air Works — TIR</title><style>
      body{font-family:'Times New Roman',serif;font-size:12pt;line-height:1.8;color:#000;padding:28px 36px}
      .saaw-hdr{text-align:center;border-bottom:2.5px solid #1a56db;padding-bottom:11px}
      .saaw-org{font-size:17pt;font-weight:700}.saaw-addr{font-size:10pt;color:#444;margin-top:3px}
      .saaw-sep{border:none;border-top:1px solid #ccc;margin:9px 0}
      .saaw-dtitle{font-size:14pt;font-weight:700;display:block;text-align:center;margin:10px 0 4px}
      .saaw-did,.saaw-meta{text-align:center;font-size:11.5pt;color:#444;line-height:2}
      h1{font-size:12.5pt;font-weight:700;margin:17px 0 6px;padding:5px 9px;background:#e8f0fe;border-left:4px solid #1a56db}
      p{margin-bottom:7px;color:#111}ul{padding-left:22px}li{margin-bottom:4px}
      table{width:100%;border-collapse:collapse;font-size:11pt;margin:7px 0 3px}
      th{background:#1a56db;color:#fff;font-weight:700;padding:6px 9px;border:1px solid #1447c0;text-align:center}
      td{padding:5px 9px;border:1px solid #bbb;text-align:center}td.tal{text-align:left}
      .tcap{font-size:10pt;color:#555;text-align:center;margin:3px 0 10px;font-style:italic}
      .conc{font-weight:700;margin:5px 0 9px}.dstamp{display:inline-block;font-size:9pt;color:#b45309;background:#fffbeb;border:1px solid #fde68a;padding:3px 10px;margin-bottom:12px}
      .signoff{border:1px solid #ccc;border-radius:4px;padding:13px;background:#f8f8f8;margin-top:16px}
      .so-title{font-weight:700;margin-bottom:9px}.so-row{display:flex;gap:18px;margin-bottom:7px}
      .so-f{flex:1}.so-lbl{font-size:9pt;color:#666;text-transform:uppercase;margin-bottom:3px}.so-line{border-bottom:1px solid #bbb;min-height:25px}
      .rdis{font-size:9pt;color:#888;font-style:italic;border-top:1px solid #ddd;padding-top:8px;margin-top:12px;text-align:center}
      .pagenum{text-align:right;font-size:9pt;color:#aaa;border-top:1px solid #eee;padding-top:5px;margin-top:7px}
      [contenteditable]{outline:none}@media print{@page{margin:2cm}body{padding:0}}</style></head><body>${reportHtml}</body></html>`)
    w.document.close(); setTimeout(()=>w.print(),600)
  }

  return (
    <div>
      <div className="seh">
        <div><div className="set">Report drafter</div><div className="ses">AI GENERATES EXACT SA AIR WORKS TIR FORMAT · FULLY EDITABLE · PRINT TO PDF</div></div>
        <button className="btn btn-sm btn-demo" onClick={loadDemo}>▶ Load demo</button>
      </div>
      <div className="drafter-layout">
        {/* FORM */}
        <div className="form-panel">
          <div className="form-head">
            <div style={{fontFamily:'var(--mono)',fontSize:'10.5px',letterSpacing:'.6px',color:'var(--t2)'}}>INVESTIGATION PARAMETERS</div>
            <button className="btn btn-sm" onClick={() => setForm(blank)} style={{fontSize:10}}>Clear</button>
          </div>
          <div className="form-body">
            <div className="fg"><label className="fl">Report type</label><select className="fs" {...fv('rtype')}><option value="upgrade">Equipment upgrade / avionics replacement</option><option value="repair">Repair investigation</option><option value="ad">AD compliance report</option><option value="other">Other modification</option></select></div>
            <div className="fg"><label className="fl">Client / operator</label><input className="fi" placeholder="e.g. Flying Aces Club" {...fv('client')} /></div>
            <div className="r2">
              <div className="fg"><label className="fl">Registration</label><input className="fi" placeholder="VT-ABC" style={{fontFamily:'var(--mono)'}} {...fv('reg')} /></div>
              <div className="fg"><label className="fl">Serial no.</label><input className="fi" placeholder="15285162" style={{fontFamily:'var(--mono)'}} {...fv('sn')} /></div>
            </div>
            <div className="fg"><label className="fl">Aircraft type</label><input className="fi" placeholder="e.g. Cessna 152" {...fv('actype')} /></div>
            <div className="fg"><label className="fl">Inspection location</label><input className="fi" {...fv('loc')} /></div>
            <hr className="dv" />
            <div className="fg"><label className="fl">Objective</label><textarea className="ft" placeholder="To study the feasibility of upgrade of the [Aircraft] requested by [Client] for installing [Equipment]…" {...fv('obj')} /></div>
            <LRUTable label="LRUs to be removed" rows={form.removed} setRows={v => setForm({...form, removed:v})} />
            <LRUTable label="LRUs to be installed" rows={form.installed} setRows={v => setForm({...form, installed:v})} />
            <div className="fg"><label className="fl">STC / manual reference</label><input className="fi" placeholder="e.g. Garmin 190-01182-02 Rev F · STC SA2725SW" {...fv('stc')} /></div>
            <div className="fg"><label className="fl">ATA chapter</label><input className="fi" placeholder="e.g. ATA 23 — Communications" {...fv('ata')} /></div>
            <div className="fg"><label className="fl">Installation location</label><input className="fi" placeholder="e.g. Instrument panel radio stack" {...fv('instloc')} /></div>
            <div className="fg"><label className="fl">Additional notes</label><textarea className="ft" placeholder="Wiring, panel mods, approval basis…" style={{minHeight:48}} {...fv('notes')} /></div>

            <button className="btn btn-p" style={{width:'100%',justifyContent:'center',padding:12,fontFamily:'var(--mono)',fontSize:12,fontWeight:700,letterSpacing:'1px'}}
              onClick={generate} disabled={generating}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:14,height:14}}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              {generating ? 'GENERATING…' : 'GENERATE REPORT'}
            </button>
            <div style={{fontFamily:'var(--mono)',fontSize:'9px',color:'var(--t3)',textAlign:'center',letterSpacing:'.7px'}}>⌘+ENTER · DRAFT ONLY · ENGINEER MUST REVIEW AND SIGN</div>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="out-panel">
          <div className="out-head">
            <div style={{fontFamily:'var(--mono)',fontSize:'10.5px',letterSpacing:'.5px',color:'var(--t2)'}}>TYPE INVESTIGATION REPORT — DRAFT</div>
            {reportHtml && (
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                <button className="btn btn-sm btn-g" onClick={save}>{saved ? '✓ Saved' : 'Save'}</button>
                <button className="btn btn-sm" onClick={print}>Print / PDF</button>
              </div>
            )}
          </div>
          {progress && (
            <div className="genprog">
              <div className="gpbar"><div className="gpfill" style={{width:`${progress.p}%`}}></div></div>
              <div className="gplbl">{progress.l}</div>
            </div>
          )}
          <div className="out-body">
            {generating && !reportHtml && (
              <div style={{display:'flex',alignItems:'center',gap:10,padding:'28px 24px',color:'var(--t2)',fontSize:12,fontFamily:'var(--mono)',letterSpacing:'.5px'}}>
                <div className="dots"><span/><span/><span/></div>
                GENERATING…
              </div>
            )}
            {!generating && !reportHtml && (
              <div className="empty-st">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                <p>Fill in the investigation parameters and click Generate. Output matches the SA Air Works TIR template exactly.</p>
              </div>
            )}
            {reportHtml && <div dangerouslySetInnerHTML={{__html: reportHtml}} />}
          </div>
        </div>
      </div>
    </div>
  )
}
