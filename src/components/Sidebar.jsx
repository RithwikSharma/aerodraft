export default function Sidebar({ page, setPage, clients, history, sidebarOpen }) {
  const orgName = 'SA Air Works'
  const urgentDigest = 3

  const NavItem = ({ id, label, badge, badgeCls, icon }) => (
    <button className={`ni ${page === id ? 'active' : ''}`} onClick={() => setPage(id)}>
      {icon}
      {label}
      {badge != null && <span className={`nb ${badgeCls}`}>{badge}</span>}
    </button>
  )

  return (
    <nav className={`sb ${sidebarOpen ? '' : 'collapsed'}`}>
      <div className="logo">
        <div className="logo-row">
          <svg viewBox="0 0 28 28" fill="none" style={{width:28,height:28,flexShrink:0}}>
            <circle cx="14" cy="14" r="13" stroke="#0077CC" strokeWidth="1.4" opacity=".5"/>
            <circle cx="14" cy="14" r="8" stroke="#0077CC" strokeWidth=".7" opacity=".3"/>
            <path d="M14 4L16 9H12L14 4Z" fill="#0077CC"/>
            <circle cx="14" cy="14" r="2" fill="#0077CC"/>
            <line x1="14" y1="12" x2="14" y2="5.5" stroke="#0077CC" strokeWidth="1.4"/>
            <line x1="14" y1="1" x2="14" y2="3" stroke="#0077CC" strokeWidth="1" opacity=".4"/>
            <line x1="14" y1="25" x2="14" y2="27" stroke="#0077CC" strokeWidth=".8" opacity=".3"/>
            <line x1="1" y1="14" x2="3" y2="14" stroke="#0077CC" strokeWidth=".8" opacity=".3"/>
            <line x1="25" y1="14" x2="27" y2="14" stroke="#0077CC" strokeWidth=".8" opacity=".3"/>
          </svg>
          <span className="logo-name">AeroDraft</span>
        </div>
        <div className="logo-sub">SA Air Works · MRO</div>
      </div>

      <div className="nav">
        <div className="nsec">
          <div className="nlbl">Overview</div>
          <NavItem id="dashboard" label="Dashboard" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>} />
        </div>
        <div className="nsec">
          <div className="nlbl">Operations</div>
          <NavItem id="clients" label="Clients" badge={clients.length} badgeCls="nb-b" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>} />
          <NavItem id="digest" label="Reg digest" badge={urgentDigest} badgeCls="nb-r" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>} />
        </div>
        <div className="nsec">
          <div className="nlbl">Reports</div>
          <NavItem id="drafter" label="Report drafter" badge="AI" badgeCls="nb-a" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>} />
          <NavItem id="history" label="History" badge={history.length} badgeCls="nb-g" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} />
        </div>
        <div className="nsec">
          <div className="nlbl">System</div>
          <NavItem id="settings" label="Settings" icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>} />
        </div>
      </div>

      {/* Heading indicator — signature aviation element */}
      <div className="hsi">
        <svg viewBox="0 0 70 70" fill="none" style={{width:70,height:70}}>
          <circle cx="35" cy="35" r="33" stroke="#0077CC" strokeWidth=".9"/>
          <circle cx="35" cy="35" r="26" stroke="#0077CC" strokeWidth=".5" opacity=".6"/>
          <circle cx="35" cy="35" r="18" stroke="#0077CC" strokeWidth=".5" opacity=".4"/>
          <circle cx="35" cy="35" r="3" fill="#0077CC"/>
          <path d="M35 8 L37.5 15 L35 13 L32.5 15 Z" fill="#0077CC"/>
          <path d="M35 62 L32.5 55 L35 57 L37.5 55 Z" stroke="#0077CC" strokeWidth=".8" fill="none" opacity=".5"/>
          <line x1="35" y1="2" x2="35" y2="6" stroke="#0077CC" strokeWidth="1.2"/>
          <line x1="35" y1="64" x2="35" y2="68" stroke="#0077CC" strokeWidth=".8" opacity=".5"/>
          <line x1="2" y1="35" x2="6" y2="35" stroke="#0077CC" strokeWidth=".8" opacity=".5"/>
          <line x1="64" y1="35" x2="68" y2="35" stroke="#0077CC" strokeWidth=".8" opacity=".5"/>
          {[30,60,120,150,210,240,300,330].map(deg => (
            <line key={deg} x1="35" y1="2" x2="35" y2="5" stroke="#0077CC" strokeWidth=".5" opacity=".4" transform={`rotate(${deg} 35 35)`}/>
          ))}
          <text x="32.5" y="13.5" fill="#0077CC" fontSize="5.5" fontFamily="monospace" fontWeight="700">N</text>
          <text x="32.5" y="62" fill="#0077CC" fontSize="5.5" fontFamily="monospace" opacity=".5">S</text>
          <text x="5" y="37" fill="#0077CC" fontSize="5.5" fontFamily="monospace" opacity=".5">W</text>
          <text x="61" y="37" fill="#0077CC" fontSize="5.5" fontFamily="monospace" opacity=".5">E</text>
        </svg>
      </div>

      <div className="sbfoot">
        <div className="org-pill" onClick={() => setPage('settings')}>
          <div className="org-av">{orgName.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:'var(--t1)'}}>{orgName}</div>
            <div style={{fontFamily:'var(--mono)',fontSize:'9px',color:'var(--t3)',letterSpacing:'.3px',marginTop:2}}>GURGAON · DGCA APPROVED</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
