import { useState } from 'react'

export default function Settings({ settings, setSettings, toast }) {
  const [form, setForm] = useState(settings)
  const save = () => { setSettings(form); toast('Settings saved', 'success') }
  const f = key => ({ value: form[key] || '', onChange: e => setForm({...form, [key]: e.target.value}) })

  return (
    <div>
      <div className="seh">
        <div><div className="set">Settings</div><div className="ses">ORGANISATION · PREFERENCES</div></div>
        <button className="btn btn-p" onClick={save}>Save settings</button>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <h3>Organisation</h3>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[['orgname','Organisation name','SA Air Works'],['addr1','Address line 1','Kalyani House, Plot No. 40, Sector 18'],['addr2','Address line 2','Gurgaon, Haryana'],['phone','Phone','Ph. 1234567890'],['website','Website','www.saairworks.in'],['approval','Regulatory approval','DGCA Part-145 Approved']].map(([key,label,ph]) => (
              <div className="fg" key={key}><label className="fl">{label}</label><input className="fi" placeholder={ph} {...f(key)} /></div>
            ))}
          </div>
        </div>
        <div className="settings-card">
          <h3>Engineer</h3>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[['engineer','Default engineer name','Rithwik Sharma'],['licence','Licence / AME no.','AME-XXXX-YYYY'],['defloc','Default inspection location','SA Air Works, Gurgaon']].map(([key,label,ph]) => (
              <div className="fg" key={key}><label className="fl">{label}</label><input className="fi" placeholder={ph} {...f(key)} /></div>
            ))}
            <div className="fg">
              <label className="fl">AI model</label>
              <select className="fs" value={form.model||'gpt-4o-mini'} onChange={e => setForm({...form, model:e.target.value})}>
                <option value="gpt-4o-mini">gpt-4o-mini (fast · recommended)</option>
                <option value="gpt-4o">gpt-4o (most thorough)</option>
              </select>
            </div>
            <div style={{padding:'10px 12px',background:'var(--gbg)',border:'1px solid var(--gb)',borderRadius:'var(--r)',fontFamily:'var(--mono)',fontSize:'9.5px',color:'var(--green)',letterSpacing:'.4px',lineHeight:1.7}}>
              AI IS PRE-CONFIGURED — NO API KEY NEEDED. REPORTS GENERATE DIRECTLY.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
