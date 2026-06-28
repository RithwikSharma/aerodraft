import { useState } from 'react'
import Modal from '../components/Modal'

export default function History({ history, setHistory, toast }) {
  const [viewing, setViewing] = useState(null)

  const del = id => { setHistory(history.filter(r => r.id !== id)); toast('Report deleted') }
  const clear = () => { if (confirm('Clear all report history?')) { setHistory([]); toast('History cleared') } }

  const print = html => {
    const w = window.open('', '_blank')
    w.document.write(`<!DOCTYPE html><html><head><title>TIR</title><style>body{font-family:'Times New Roman',serif;font-size:12pt;padding:28px 36px;color:#000}[contenteditable]{outline:none}</style></head><body>${html}</body></html>`)
    w.document.close()
    setTimeout(() => w.print(), 600)
  }

  return (
    <div>
      <div className="seh">
        <div><div className="set">Report history</div><div className="ses">ALL DRAFTED AND SUBMITTED TYPE INVESTIGATION REPORTS</div></div>
        <button className="btn btn-sm" onClick={clear}>Clear all</button>
      </div>

      <div className="dt">
        <table><thead><tr><th>Document ID</th><th>Client</th><th>Aircraft</th><th>Investigation</th><th>Engineer</th><th>Date</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {history.length === 0
            ? <tr><td colSpan="8" style={{textAlign:'center',padding:20,color:'var(--t3)'}}>No reports yet. Generate your first TIR in Report drafter.</td></tr>
            : history.map(r => (
              <tr key={r.id}>
                <td><span className="mono">{r.id}</span></td>
                <td style={{color:'var(--t2)'}}>{r.client}</td>
                <td><span className="mono">{r.reg}</span></td>
                <td style={{color:'var(--t2)',maxWidth:150,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.investigation}</td>
                <td style={{color:'var(--t2)'}}>{r.engineer}</td>
                <td style={{color:'var(--t3)',fontSize:'11.5px'}}>{r.date}</td>
                <td><span className={`bdg ${r.status==='approved'?'bdg-g':r.status==='pending'?'bdg-a':'bdg-gr'}`}>{r.status==='approved'?'Approved':r.status==='pending'?'DGCA pending':'Draft'}</span></td>
                <td><div style={{display:'flex',gap:4}}>
                  <button className="btn btn-sm" onClick={() => setViewing(r)}>View</button>
                  <button className="btn btn-sm" style={{color:'var(--red)'}} onClick={() => del(r.id)}>Del</button>
                </div></td>
              </tr>
            ))
          }
        </tbody></table>
      </div>

      {viewing && (
        <Modal title={`${viewing.id} — ${viewing.investigation}`} wide onClose={() => setViewing(null)}
          footer={<><button className="btn" onClick={() => setViewing(null)}>Close</button><button className="btn btn-p" onClick={() => print(viewing.html)}>Print / PDF</button></>}>
          <div style={{padding:16,fontSize:12,color:'var(--t2)',lineHeight:1.6,maxHeight:'65vh',overflowY:'auto',background:'var(--raised)',borderRadius:'var(--r)',fontFamily:'var(--mono)'}}>
            {viewing.html ? <div dangerouslySetInnerHTML={{__html: viewing.html}} /> : <div style={{padding:20,textAlign:'center',color:'var(--t3)'}}>Report content not available for reports from previous sessions.</div>}
          </div>
        </Modal>
      )}
    </div>
  )
}
