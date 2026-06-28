import { useState } from 'react'
import Modal from '../components/Modal'

export default function Clients({ clients, setClients, history, setPage, toast, onDraftTIR }) {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name:'', city:'', type:'GA / training org', reg:'', actype:'', sn:'', email:'' })

  const filtered = clients.filter(c =>
    !search || c.name.toLowerCase().includes(search) || c.reg.toLowerCase().includes(search) || c.actype.toLowerCase().includes(search)
  )

  const addClient = () => {
    if (!form.name) { toast('Client name required', 'error'); return }
    const c = { ...form, id: 'c' + Date.now(), ads: [], status: 'active', lastReport: '—' }
    setClients([...clients, c])
    setShowAdd(false)
    setForm({ name:'', city:'', type:'GA / training org', reg:'', actype:'', sn:'', email:'' })
    toast(`"${c.name}" added`, 'success')
  }

  const ini = name => name.split(' ').map(w=>w[0]).slice(0,2).join('')

  if (selected) {
    const c = selected
    const reps = history.filter(r => r.client === c.name)
    return (
      <div>
        <div className="seh">
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <button className="btn btn-sm" onClick={() => setSelected(null)}>← Clients</button>
            <div><div className="set">{c.name}</div><div className="ses">{c.city} · {c.type}</div></div>
          </div>
          <button className="btn btn-sm btn-p" onClick={() => { onDraftTIR(c); setSelected(null) }}>Draft TIR</button>
        </div>

        <div className="panel" style={{display:'flex',alignItems:'center',gap:13,padding:16,marginBottom:16}}>
          <div className="cav" style={{width:46,height:46,fontSize:15,borderRadius:9}}>{ini(c.name)}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:17,fontWeight:700}}>{c.name}</div>
            <div style={{fontSize:12,color:'var(--t2)',marginTop:3}}>{c.city} · {c.type}</div>
            <div style={{fontSize:11,color:'var(--t3)',marginTop:2}}>{c.email}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:11,color:'var(--t3)'}}>Last report</div>
            <div style={{fontWeight:600,fontSize:13,marginTop:2}}>{c.lastReport}</div>
          </div>
        </div>

        <div className="two-col">
          <div className="panel">
            <div className="ph"><div className="pt">Aircraft on file</div></div>
            <div className="li">
              <div style={{flex:1}}>
                <div className="mono" style={{fontSize:13}}>{c.reg}</div>
                <div style={{fontSize:12,color:'var(--t2)',marginTop:2}}>{c.actype}</div>
                <div style={{fontSize:11,color:'var(--t3)',marginTop:2}}>S/N {c.sn || '—'}</div>
              </div>
              {c.ads.length === 0 ? <span className="bdg bdg-g">Compliant</span> : <span className="bdg bdg-a">{c.ads.length} open AD(s)</span>}
            </div>
          </div>
          <div className="panel">
            <div className="ph"><div className="pt">Open airworthiness directives</div></div>
            {c.ads.length === 0
              ? <div className="li" style={{color:'var(--t3)',justifyContent:'center',fontSize:12}}>No open ADs</div>
              : c.ads.map(a => <div className="li" key={a}><div className="lim"><div className="lit" style={{fontFamily:'var(--mono)',fontSize:11}}>{a}</div></div><span className="bdg bdg-r">Open</span></div>)
            }
          </div>
        </div>

        <div className="panel">
          <div className="ph"><div className="pt">Report history</div></div>
          <div className="dt" style={{border:'none',boxShadow:'none'}}>
            <table><thead><tr><th>Doc ID</th><th>Investigation</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {reps.length === 0
                ? <tr><td colSpan="4" style={{textAlign:'center',padding:16,color:'var(--t3)',fontSize:12}}>No reports yet</td></tr>
                : reps.map(r => <tr key={r.id}>
                    <td><span className="mono">{r.id}</span></td>
                    <td style={{color:'var(--t2)'}}>{r.investigation}</td>
                    <td style={{color:'var(--t3)',fontSize:'11.5px'}}>{r.date}</td>
                    <td><span className={`bdg ${r.status==='approved'?'bdg-g':r.status==='pending'?'bdg-a':'bdg-gr'}`}>{r.status==='approved'?'Approved':r.status==='pending'?'DGCA pending':'Draft'}</span></td>
                  </tr>)
              }
            </tbody></table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="seh">
        <div><div className="set">Clients</div><div className="ses">OPERATORS AND AIRCRAFT OWNERS UNDER SA AIR WORKS CARE</div></div>
        <button className="btn btn-p" onClick={() => setShowAdd(true)}>+ Add client</button>
      </div>

      <div style={{marginBottom:13}}>
        <input className="fi" placeholder="Search by name, registration, or aircraft type…" value={search} onChange={e => setSearch(e.target.value.toLowerCase())} style={{maxWidth:360}} />
      </div>

      <div className="dt">
        <table><thead><tr><th>Client / Operator</th><th>Aircraft</th><th>Open ADs</th><th>Last report</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td><div style={{display:'flex',alignItems:'center',gap:9}}>
                <div className="cav" style={{width:33,height:33,fontSize:11}}>{ini(c.name)}</div>
                <div><div style={{fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{c.city} · {c.type}</div></div>
              </div></td>
              <td><span className="mono">{c.reg}</span> <span style={{color:'var(--t2)'}}>{c.actype}</span></td>
              <td>{c.ads.length===0?<span className="bdg bdg-g">None</span>:c.ads.length>=2?<span className="bdg bdg-r">{c.ads.length} open</span>:<span className="bdg bdg-a">1 open</span>}</td>
              <td style={{color:'var(--t3)',fontSize:'11.5px'}}>{c.lastReport||'—'}</td>
              <td><span className={`bdg ${c.status==='active'?'bdg-g':c.status==='pending'?'bdg-a':'bdg-r'}`}>{c.status==='active'?'Active':c.status==='pending'?'Action needed':'Urgent'}</span></td>
              <td><div style={{display:'flex',gap:4}}>
                <button className="btn btn-sm" onClick={() => setSelected(c)}>View</button>
                <button className="btn btn-sm btn-p" onClick={() => onDraftTIR(c)}>Draft TIR</button>
              </div></td>
            </tr>
          ))}
        </tbody></table>
      </div>

      {showAdd && (
        <Modal title="Add client" onClose={() => setShowAdd(false)}
          footer={<><button className="btn" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn btn-p" onClick={addClient}>Add client</button></>}>
          <div className="fg"><label className="fl">Client / operator name</label><input className="fi" placeholder="e.g. Flying Aces Club" value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></div>
          <div className="r2">
            <div className="fg"><label className="fl">City</label><input className="fi" placeholder="New Delhi" value={form.city} onChange={e => setForm({...form, city:e.target.value})} /></div>
            <div className="fg"><label className="fl">Type</label><select className="fs" value={form.type} onChange={e => setForm({...form, type:e.target.value})}><option>GA / training org</option><option>Charter operator</option><option>Private owner</option><option>Survey / aerial work</option><option>Flight school</option></select></div>
          </div>
          <div className="r2">
            <div className="fg"><label className="fl">Registration</label><input className="fi" placeholder="VT-XXX" style={{fontFamily:'var(--mono)'}} value={form.reg} onChange={e => setForm({...form, reg:e.target.value})} /></div>
            <div className="fg"><label className="fl">Aircraft type</label><input className="fi" placeholder="Cessna 152" value={form.actype} onChange={e => setForm({...form, actype:e.target.value})} /></div>
          </div>
          <div className="r2">
            <div className="fg"><label className="fl">Serial number</label><input className="fi" placeholder="15285162" style={{fontFamily:'var(--mono)'}} value={form.sn} onChange={e => setForm({...form, sn:e.target.value})} /></div>
            <div className="fg"><label className="fl">Contact email</label><input className="fi" placeholder="ops@client.in" value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></div>
          </div>
        </Modal>
      )}
    </div>
  )
}
