export default function Dashboard({ clients, history, setPage }) {
  const urgent = clients.filter(c => c.ads.length > 0).length
  const approved = history.filter(r => r.status === 'approved').length

  const StatCard = ({ label, value, color, sub }) => (
    <div className="stat-card" style={{'--ac': `var(--${color})`}}>
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{color:`var(--${color})`}}>{value}</div>
      <div className="stat-sub" dangerouslySetInnerHTML={{__html: sub}} />
    </div>
  )

  return (
    <div>
      <div className="seh">
        <div>
          <div className="set">Good morning, Rithwik 👋</div>
          <div className="ses">SA AIR WORKS · {new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).toUpperCase()}</div>
        </div>
        <button className="btn btn-sm" onClick={() => setPage('digest')}>View reg digest →</button>
      </div>

      <div className="stat-grid">
        <StatCard label="Active clients" value={clients.length} color="cyan" sub="<b>+1</b> this month" />
        <StatCard label="Open ADs" value={3} color="amber" sub="2 require action &lt;30d" />
        <StatCard label="Reports drafted" value={history.length} color="green" sub="<b>+3</b> this month" />
        <StatCard label="DGCA pending" value={2} color="amber" sub="Avg. 18 day turnaround" />
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="ph"><div className="pt">Recent activity</div><button className="btn btn-sm btn-ghost" onClick={() => setPage('history')}>View all →</button></div>
          {[
            { type:'g', text:'TIR drafted — VT-ABC, Cessna 152', sub:'GNC 255A upgrade · 3h ago' },
            { type:'b', text:'Client added — Skyview Aviation', sub:'2 aircraft registered · yesterday' },
            { type:'r', text:'DGCA AD 2026-08-11 — urgent action', sub:'Affects VT-ABC, VT-LUX · 2d ago' },
            { type:'g', text:'Report approved — VT-LUX GTX 335', sub:'DGCA approved · 3d ago' },
            { type:'b', text:'Reg feed refreshed — 3 new items', sub:'DGCA, EASA sources · 4d ago' },
          ].map((item, i) => (
            <div className="tl" key={i}>
              <div className={`tld tld-${item.type}`}></div>
              <div><div className="tlt">{item.text}</div><div className="tls">{item.sub}</div></div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="ph">
            <div className="pt">Action required</div>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <div className="pdot red"></div>
              <span className="bdg bdg-r">2 urgent</span>
            </div>
          </div>
          {[
            { ref:'DGCA AD 2026-08-11', sub:'Fuel vent · VT-ABC, VT-LUX', days:'12d', cls:'r', pct:22 },
            { ref:'EASA AD 2026-0031', sub:'Gear actuator · VT-LUX', days:'26d', cls:'a', pct:50 },
            { ref:'FAA AD 2026-15-04', sub:'Fuel selector · VT-SKY', days:'35d', cls:'a', pct:67 },
          ].map((ad, i) => (
            <div className="li" key={i}>
              <div className="lim">
                <div className="lit" style={{fontFamily:'var(--mono)',fontSize:11}}>{ad.ref}</div>
                <div className="lis">{ad.sub}</div>
                <div className="pb"><div className="pf" style={{width:`${ad.pct}%`,background:`var(--${ad.cls==='r'?'red':'amber'})`}}></div></div>
              </div>
              <span className={`bdg bdg-${ad.cls}`}>{ad.days}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="ph"><div className="pt">Fleet compliance</div></div>
          <div className="li">
            <div style={{width:32,height:32,borderRadius:6,background:'var(--gbg)',border:'1px solid var(--gb)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="lim"><div className="lit">Fully compliant</div><div className="lis">Flying Aces · Aero India · Himalayan Ventures</div></div>
            <span style={{fontSize:22,fontWeight:800,color:'var(--green)',fontFamily:'var(--mono)'}}>3</span>
          </div>
          <div className="li">
            <div style={{width:32,height:32,borderRadius:6,background:'var(--abg)',border:'1px solid var(--ab)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
            </div>
            <div className="lim"><div className="lit">Action pending</div><div className="lis">Skyview Aviation · Blue Jay Aero</div></div>
            <span style={{fontSize:22,fontWeight:800,color:'var(--amber)',fontFamily:'var(--mono)'}}>2</span>
          </div>
        </div>

        <div className="panel">
          <div className="ph"><div className="pt">Reports this month</div></div>
          <div style={{padding:'13px 15px',display:'flex',flexDirection:'column',gap:10}}>
            {[['DGCA / CAR-21',7,70],['AD compliance',3,30],['Repair investigations',1,10]].map(([label,n,pct]) => (
              <div key={label}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:11.5,marginBottom:4}}>
                  <span style={{color:'var(--t2)'}}>{label}</span>
                  <span style={{fontFamily:'var(--mono)',fontWeight:700,color:'var(--cyan)'}}>{String(n).padStart(2,'0')}</span>
                </div>
                <div className="pb"><div className="pf" style={{width:`${pct}%`,background:'var(--cyan)'}}></div></div>
              </div>
            ))}
            <div style={{marginTop:4,paddingTop:9,borderTop:'1px solid var(--bdr)',display:'flex',justifyContent:'space-between',fontSize:11}}>
              <span style={{fontFamily:'var(--mono)',fontSize:'9.5px',color:'var(--t3)',letterSpacing:'.5px'}}>AVG GENERATION TIME</span>
              <span style={{fontFamily:'var(--mono)',fontWeight:700,color:'var(--green)'}}>~22s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
