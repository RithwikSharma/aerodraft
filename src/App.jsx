import { useState, useEffect, useCallback } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import ToastContainer from './components/Toast'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Digest from './pages/Digest'
import Drafter from './pages/Drafter'
import History from './pages/History'
import Settings from './pages/Settings'
import Pitch from './pages/Pitch'
import { useToast } from './hooks/useToast'
import { useStore } from './hooks/useStore'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [draftPrefill, setDraftPrefill] = useState(null)
  const [draftKey, setDraftKey] = useState(0)
  const { toasts, toast } = useToast()
  const { clients, setClients, history, setHistory, settings, setSettings } = useStore()

  useEffect(() => {
    const handler = () => { goToDrafter(DEMO_DATA); }
    window.addEventListener('aerodraft:demo', handler)
    return () => window.removeEventListener('aerodraft:demo', handler)
  }, [])

  const goToDrafter = useCallback((prefill = null) => {
    setDraftPrefill(prefill)
    setDraftKey(k => k + 1)
    setPage('drafter')
  }, [])

  const handleDemo = () => goToDrafter(DEMO_DATA)

  const pages = {
    dashboard: <Dashboard clients={clients} history={history} setPage={setPage} />,
    clients:   <Clients clients={clients} setClients={setClients} history={history} setPage={setPage} toast={toast} onDraftTIR={goToDrafter} />,
    digest:    <Digest onDraftTIR={goToDrafter} toast={toast} />,
    drafter:   <Drafter key={draftKey} settings={settings} history={history} setHistory={setHistory} toast={toast} prefill={draftPrefill} />,
    history:   <History history={history} setHistory={setHistory} toast={toast} />,
    settings:  <Settings settings={settings} setSettings={setSettings} toast={toast} />,
    pitch:     <Pitch />,
  }

  const isPitch = page === 'pitch'

  return (
    <div className="app">
      {!isPitch && <Sidebar page={page} setPage={setPage} clients={clients} history={history} sidebarOpen={sidebarOpen} />}
      <div className="main">
        {!isPitch
          ? <Topbar page={page} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} onDemo={handleDemo} onPitch={() => setPage('pitch')} />
          : <PitchTopbar onBack={() => setPage('dashboard')} onDemo={handleDemo} />
        }
        <div className="content">
          {pages[page] || pages.dashboard}
        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  )
}

function PitchTopbar({ onBack, onDemo }) {
  return (
    <div className="topbar">
      <button className="btn btn-sm" onClick={onBack}>← Back to app</button>
      <div className="ttl" style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.5px',color:'var(--t3)'}}>AERODRAFT · BUSINESS PITCH</div>
      <div style={{display:'flex',gap:7}}>
        <button className="btn btn-sm btn-demo" onClick={onDemo}>▶ Demo mode</button>
        <button className="btn btn-sm btn-p" onClick={onBack}>Open app →</button>
      </div>
    </div>
  )
}

const DEMO_DATA = {
  client:'Flying Aces Club', reg:'VT-ABC', sn:'15285162', actype:'Cessna 152',
  loc:'SA Air Works, Gurgaon',
  obj:'To study the feasibility of upgrade of the Cessna 152 Aircraft requested by Flying Aces Club for installing Garmin GNC 255A NAV/COMM radio for training purposes.',
  stc:'Garmin 190-01182-02 Rev F · STC SA2725SW', ata:'ATA 23 — Communications',
  instloc:'Instrument panel radio stack — same slot as removed ARC RT-385A unit', rtype:'upgrade', notes:'',
  removed:[{desc:'RT-385A VHF NAV/COMM',oem:'ARC Avionics',pn:'46660-1000',qty:'1',dims:'2.435"×2.350"',volt:'28',amps:'4.0',wt:'0.9'}],
  installed:[{desc:'Garmin GNC 255A NAV/COMM',oem:'Garmin International',pn:'011-02807-00',qty:'1',dims:'1.65"×6.25"×6.30"',volt:'28',amps:'0.28',wt:'0.82'}],
}
