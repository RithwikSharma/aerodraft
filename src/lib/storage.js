const KEY = 'aerodraft_v1'

export function loadState() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}

export function saveState(patch) {
  const s = loadState()
  localStorage.setItem(KEY, JSON.stringify({ ...s, ...patch }))
}

export const DEFAULT_CLIENTS = [
  { id: 'c1', name: 'Flying Aces Club', city: 'New Delhi', type: 'GA / training org', reg: 'VT-ABC', actype: 'Cessna 152', sn: '15285162', email: 'ops@flyingaces.in', ads: [], status: 'active', lastReport: '23 Jun 2026' },
  { id: 'c2', name: 'Skyview Aviation Pvt. Ltd.', city: 'Gurugram', type: 'Charter operator', reg: 'VT-SKY', actype: 'Piper PA-28-161', sn: '2816163', email: 'ops@skyview.in', ads: ['DGCA AD 2026-08-11', 'FAA AD 2026-15-04'], status: 'pending', lastReport: '10 Jun 2026' },
  { id: 'c3', name: 'Blue Jay Aero Services', city: 'Chandigarh', type: 'Survey / aerial work', reg: 'VT-LUX', actype: 'Cessna 172S', sn: '17280943', email: 'maint@bluejay.in', ads: ['DGCA AD 2026-08-11', 'EASA AD 2026-0031'], status: 'pending', lastReport: '18 Jun 2026' },
  { id: 'c4', name: 'Aero India Flight School', city: 'Jaipur', type: 'Flight school', reg: 'VT-AIF', actype: 'Tecnam P2002', sn: 'P2002-044', email: 'chief@aeroindia.in', ads: [], status: 'active', lastReport: '25 Jun 2026' },
  { id: 'c5', name: 'Himalayan Ventures', city: 'Dehradun', type: 'Private owner', reg: 'VT-HVT', actype: 'Beechcraft Bonanza V35B', sn: 'D-9922', email: 'owner@himalayan.co.in', ads: [], status: 'active', lastReport: '20 Jun 2026' },
]

export const DEFAULT_HISTORY = [
  { id: 'SAAW-2026-011', client: 'Flying Aces Club', reg: 'VT-ABC', actype: 'Cessna 152', investigation: 'GNC 255A NAV/COMM upgrade', engineer: 'Rithwik Sharma', date: '23 Jun 2026', status: 'pending', html: '' },
  { id: 'SAAW-2026-010', client: 'Blue Jay Aero Services', reg: 'VT-LUX', actype: 'Cessna 172S', investigation: 'GTX 335 transponder replacement', engineer: 'Rithwik Sharma', date: '18 Jun 2026', status: 'approved', html: '' },
  { id: 'SAAW-2026-009', client: 'Skyview Aviation Pvt. Ltd.', reg: 'VT-SKY', actype: 'Piper PA-28-161', investigation: 'ACK E-04 ELT replacement', engineer: 'Rithwik Sharma', date: '10 Jun 2026', status: 'approved', html: '' },
  { id: 'SAAW-2026-008', client: 'Aero India Flight School', reg: 'VT-AIF', actype: 'Tecnam P2002', investigation: 'Garmin G5 EFIS installation', engineer: 'Rithwik Sharma', date: '5 Jun 2026', status: 'approved', html: '' },
]

export const DIGEST_ITEMS = [
  { id: 'd1', cls: 'urg', ref: 'DGCA AD 2026-08-11', title: 'Fuel vent obstruction inspection — Cessna 152 and 172 series', meta: '14 Jun 2026 · DGCA India · 12 days remaining', body: 'Mandates one-time inspection of fuel tank vent lines for obstruction or kinking following fuel starvation events. All Cessna 152/172 models. No parts required unless defect found.', affected: ['VT-ABC', 'VT-LUX'], client: 'Flying Aces Club', creg: 'VT-ABC', cactype: 'Cessna 152', csn: '15285162', read: false },
  { id: 'd2', cls: 'urg', ref: 'EASA AD 2026-0031', title: 'Landing gear actuator fatigue inspection — Cessna 172RG series', meta: '2 Jun 2026 · EASA (adopted DGCA) · 26 days remaining', body: 'Inspect main gear actuator rod end bearings for fatigue cracks. Replacement mandatory if found. AMM ref: 32-30-00.', affected: ['VT-LUX'], client: 'Blue Jay Aero Services', creg: 'VT-LUX', cactype: 'Cessna 172S', csn: '17280943', read: false },
  { id: 'd3', cls: 'act', ref: 'FAA AD 2026-15-04', title: 'Fuel selector valve detent — Cessna 172S and Piper PA-28', meta: '10 Jun 2026 · FAA · 35 days remaining', body: 'Inspect fuel selector valve detent mechanism following inadvertent shutoff reports. AMM ref: 28-21-00.', affected: ['VT-SKY'], client: 'Skyview Aviation Pvt. Ltd.', creg: 'VT-SKY', cactype: 'Piper PA-28-161', csn: '2816163', read: false },
  { id: 'd4', cls: 'inf', ref: 'DGCA CAR-21 Amdt 2026-3', title: 'Avionics modification classification — non-significant thresholds revised', meta: '1 Jun 2026 · DGCA · Effective 1 Aug 2026', body: 'Standard GPS/comm replacements with STC coverage now explicitly non-significant under CAR-21. Update procedures by 1 Aug 2026.', affected: [], client: '', read: false },
  { id: 'd5', cls: 'inf', ref: 'EASA NPA 2026-04', title: 'Proposed Amendment — Part-21 avionics classification', meta: '5 Jun 2026 · EASA · Comment period 60 days', body: 'Proposes clarifying minor/major boundary for EFIS and ADS-B upgrades. Comment period open until 5 Aug 2026.', affected: [], client: '', read: false },
]

export function getClients() { return loadState().clients || DEFAULT_CLIENTS }
export function getHistory() { return loadState().history || DEFAULT_HISTORY }
export function getSettings() {
  return Object.assign({
    orgname: 'SA Air Works', addr1: 'Kalyani House, Plot No. 40, Sector 18',
    addr2: 'Gurgaon, Haryana', phone: 'Ph. 1234567890', website: 'www.saairworks.in',
    approval: 'DGCA Part-145 Approved', engineer: 'Rithwik Sharma', licence: '',
    model: 'gpt-4o-mini', defloc: 'SA Air Works, Gurgaon',
  }, loadState().settings || {})
}
