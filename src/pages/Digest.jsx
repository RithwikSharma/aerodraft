import { useState } from 'react'
import { DIGEST_ITEMS } from '../lib/storage'

export default function Digest({ onDraftTIR, toast }) {
  const [items, setItems] = useState(DIGEST_ITEMS)
  const [filter, setFilter] = useState('all')

  const visible = items.filter(d => {
    if (filter === 'urg') return d.cls === 'urg'
    if (filter === 'act') return d.cls === 'act'
    if (filter === 'inf') return d.cls === 'inf'
    if (filter === 'unread') return !d.read
    return true
  })

  const markRead = id => { setItems(items.map(d => d.id === id ? { ...d, read: true } : d)); toast('Marked as read') }

  const clsMap = { urg: 'bdg-r', act: 'bdg-a', inf: 'bdg-b' }
  const clsLabel = { urg: 'Urgent', act: 'Action', inf: 'Info' }

  return (
    <div>
      <div className="seh">
        <div><div className="set">Regulatory digest</div><div className="ses">AUTO-INGESTED FROM DGCA · EASA · FAA — REFRESHED DAILY</div></div>
        <button className="btn btn-sm" onClick={() => toast('Feed refreshed — no new items', 'info')}>↺ Refresh</button>
      </div>

      <div className="fpill">
        {[['all','All (5)'],['urg','● Urgent (2)'],['act','● Action (1)'],['inf','● Info (2)'],['unread','Unread only']].map(([f,label]) => (
          <button key={f} className={`pill ${filter===f?'active':''}`} onClick={() => setFilter(f)}>{label}</button>
        ))}
      </div>

      {visible.map(d => (
        <div key={d.id} className={`dc ${d.cls}${d.read?' read':''}`}>
          <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:7}}>
            <div style={{flex:1}}>
              <div className="d-ref">{d.ref}</div>
              <div className="d-title">{d.title}</div>
              <div className="d-meta">{d.meta}</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:4,alignItems:'flex-end'}}>
              {d.cls === 'urg' && <div className="pdot red"></div>}
              <span className={`bdg ${clsMap[d.cls]}`}>{clsLabel[d.cls]}</span>
              {d.read && <span className="bdg bdg-gr" style={{fontSize:9}}>Read</span>}
            </div>
          </div>
          <div className="d-body">{d.body}</div>
          {d.affected.length > 0 && (
            <div style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'var(--t3)',marginBottom:10}}>
              <strong style={{color:'var(--amber)'}}>Affects:</strong>
              {d.affected.map(a => <span key={a} className="achip">{a}</span>)}
            </div>
          )}
          <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
            {d.client && (
              <button className="btn btn-sm btn-p" onClick={() => onDraftTIR({ name:d.client, reg:d.creg, actype:d.cactype, sn:d.csn, _adRef:d.ref, _adTitle:d.title })}>
                Draft compliance report →
              </button>
            )}
            <button className="btn btn-sm" onClick={() => markRead(d.id)}>Mark read</button>
          </div>
        </div>
      ))}
    </div>
  )
}
