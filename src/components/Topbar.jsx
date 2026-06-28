export default function Topbar({ page, setSidebarOpen, sidebarOpen, onDemo }) {
  const titles = { dashboard:'Dashboard', clients:'Clients', digest:'Regulatory digest', drafter:'Report drafter', history:'Report history', settings:'Settings', 'client-detail':'Client detail' }
  return (
    <div className="topbar">
      <button className="btn-icon" onClick={() => setSidebarOpen(o => !o)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <div className="ttl">{titles[page] || page}</div>
      <div style={{display:'flex',gap:7,alignItems:'center'}}>
        <div className="feed-live">
          <div className="pdot green"></div>
          FEED LIVE
        </div>
        <button className="btn btn-sm btn-demo" onClick={onDemo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:12,height:12}}><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Demo mode
        </button>
        <button className="btn btn-sm btn-p" onClick={() => location.reload()}>
          + New report
        </button>
      </div>
    </div>
  )
}
