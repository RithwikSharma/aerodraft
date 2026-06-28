export default function Pitch() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', fontFamily: 'var(--font)' }}>

      {/* ── HERO ── */}
      <div style={{ textAlign: 'center', padding: '52px 20px 48px', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--cbg)', border: '1px solid var(--cb)', borderRadius: 20, padding: '4px 14px', marginBottom: 22 }}>
          <div className="pdot green" style={{ width: 6, height: 6 }}></div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--cyan)', letterSpacing: '.8px' }}>SEED STAGE · INDIA MRO · 2026</span>
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 18, color: 'var(--t1)' }}>
          MRO compliance documentation<br />
          <span style={{ color: 'var(--cyan)' }}>that writes itself.</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--t2)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 32px' }}>
          AeroDraft is the first AI-native platform for Indian MRO organisations — cutting Type Investigation Report drafting from 4 hours to under 2 minutes, in exact DGCA-ready format.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-p" style={{ padding: '10px 22px', fontSize: 13 }} onClick={() => scrollTo('problem')}>See the case →</button>
          <button className="btn" style={{ padding: '10px 22px', fontSize: 13 }} onClick={() => scrollTo('contact')}>Get in touch</button>
        </div>
      </div>

      {/* ── THE NUMBER ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--bdr)', border: '1px solid var(--bdr)', borderRadius: 'var(--r2)', overflow: 'hidden', margin: '32px 0' }}>
        {[
          ['4 hrs → 2 min', 'TIR drafting time', 'var(--cyan)'],
          ['₹0', 'Currently spent on MRO doc software in India', 'var(--amber)'],
          ['300+', 'DGCA Part-145 approved organisations in India', 'var(--green)'],
        ].map(([val, label, color]) => (
          <div key={label} style={{ background: 'var(--card)', padding: '28px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 30, fontWeight: 800, color, letterSpacing: -1, marginBottom: 6 }}>{val}</div>
            <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.5 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── PROBLEM ── */}
      <Section id="problem" label="The problem" title="Every TIR is written by hand. In Word." accent="var(--red)">
        <p style={prose}>Indian Part-145 MRO organisations — the shops that keep GA and commercial aircraft airworthy — are required by DGCA to file a Type Investigation Report for every modification, avionics upgrade, or repair investigation before DGCA approval.</p>
        <p style={prose}>Today, that means a licensed AME sits down with a blank Word template and spends 3–5 hours writing the same structured document, over and over, for every job. Sections 2.1 through 6, electrical load tables, mechanical load tables, LRU part numbers, STC references — all typed from scratch every time.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '20px 0' }}>
          {[
            ['3–5 hrs per TIR', 'AME time on paperwork instead of maintenance'],
            ['100% manual', 'No software automates Indian MRO compliance docs'],
            ['One error = rejection', 'DGCA rejects on format or missing section'],
            ['Backlog builds', 'Aircraft sit while docs are drafted'],
          ].map(([h, s]) => (
            <div key={h} style={{ padding: '14px 16px', background: 'var(--rbg)', border: '1px solid var(--rb)', borderRadius: 'var(--r)' }}>
              <div style={{ fontWeight: 700, color: 'var(--red)', marginBottom: 4, fontSize: 13 }}>{h}</div>
              <div style={{ fontSize: 12, color: 'var(--t2)' }}>{s}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SOLUTION ── */}
      <Section id="solution" label="The solution" title="AeroDraft — AI fills the form, the engineer signs it." accent="var(--cyan)">
        <p style={prose}>The engineer fills in what they know — aircraft reg, LRUs in and out, ATA chapter, STC reference. AeroDraft streams a complete, correctly structured TIR in under 2 minutes, in the exact format their organisation uses. Every section, every table, every classification — ready to review and sign.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, margin: '20px 0' }}>
          {[
            ['svg-bolt', 'Streaming generation', 'Sections appear live as the AI writes. No waiting.'],
            ['svg-edit', 'Fully editable output', 'Every field is editable inline before signing.'],
            ['svg-print', 'One-click PDF', 'Print directly to DGCA-ready PDF, no reformatting.'],
            ['svg-shield', 'Draft-only posture', 'Always marked DRAFT — engineer must review and sign.'],
            ['svg-book', 'Reg digest built in', 'DGCA, EASA, FAA ADs auto-ingested, affects-your-fleet filtered.'],
            ['svg-db', 'Client registry', 'Track all operators, aircraft, open ADs, report history.'],
          ].map(([icon, h, s]) => (
            <div key={h} style={{ padding: '14px 16px', background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 'var(--r)', boxShadow: 'var(--sh)' }}>
              <div style={{ fontWeight: 600, color: 'var(--t1)', marginBottom: 5, fontSize: 13 }}>{h}</div>
              <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.55 }}>{s}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── DEMO CALLOUT ── */}
      <div style={{ background: 'var(--cbg)', border: '1px solid var(--cb)', borderRadius: 'var(--r2)', padding: '24px 28px', margin: '0 0 32px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--cyan)', letterSpacing: '.8px', marginBottom: 6 }}>LIVE DEMO</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>See it generate a real TIR in under 2 minutes</div>
          <div style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6 }}>Garmin GNC 255A NAV/COMM upgrade on a Cessna 152, VT-ABC — Flying Aces Club, New Delhi. Exact SA Air Works format, streamed live.</div>
        </div>
        <button className="btn btn-p" style={{ padding: '10px 20px', flexShrink: 0 }} onClick={() => window.dispatchEvent(new CustomEvent('aerodraft:demo'))}>
          ▶ Run demo
        </button>
      </div>

      {/* ── MARKET ── */}
      <Section id="market" label="Market" title="A compliance burden nobody has automated." accent="var(--green)">
        <p style={prose}>India has over 300 DGCA Part-145 approved MRO organisations, from large MRO stations to small GA shops, each filing TIRs for every modification. The broader Asia-Pacific MRO market is USD 9.8B by 2031. Nobody has built vertical SaaS for Indian MRO compliance documentation.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '20px 0' }}>
          {[
            ['India first', '300+ Part-145 MROs, all writing TIRs by hand. Zero software penetration. Beachhead market.', 'var(--cyan)', 'var(--cbg)', 'var(--cb)'],
            ['EASA adjacent', 'EASA Part-145 shares near-identical report structure. Same product, wider geography.', 'var(--green)', 'var(--gbg)', 'var(--gb)'],
            ['CAR-21 wedge', 'AeroDraft speaks the exact CAR-21 language DGCA auditors look for. Competitors don\'t.', 'var(--amber)', 'var(--abg)', 'var(--ab)'],
            ['Sticky product', 'Once a shop\'s TIR format, client registry, and report history are in AeroDraft, switching cost is high.', 'var(--cyan)', 'var(--cbg)', 'var(--cb)'],
          ].map(([h, s, c, bg, border]) => (
            <div key={h} style={{ padding: '16px', background: bg, border: `1px solid ${border}`, borderRadius: 'var(--r)' }}>
              <div style={{ fontWeight: 700, color: c, marginBottom: 5, fontSize: 13 }}>{h}</div>
              <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.55 }}>{s}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── BUSINESS MODEL ── */}
      <Section id="model" label="Business model" title="Per-seat SaaS. Priced for Indian MROs." accent="var(--amber)">
        <p style={prose}>AeroDraft charges per licensed engineer seat, billed annually. Pricing is set below what a single wasted AME-hour costs — making the ROI conversation trivial for any shop manager.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '20px 0' }}>
          {[
            ['Starter', '₹4,999 / mo', '1–3 engineers\nCore TIR drafter\nClient registry\nRegulatory digest'],
            ['Professional', '₹12,999 / mo', '4–10 engineers\nEverything in Starter\nReport history export\nPriority support'],
            ['Enterprise', 'Custom', '10+ engineers\nOn-premise option\nCustom TIR templates\nDedicated onboarding'],
          ].map(([tier, price, features]) => (
            <div key={tier} style={{ padding: '20px', background: 'var(--card)', border: `1px solid ${tier === 'Professional' ? 'var(--cyan)' : 'var(--bdr)'}`, borderRadius: 'var(--r2)', boxShadow: tier === 'Professional' ? '0 0 0 1px var(--cb)' : 'var(--sh)' }}>
              {tier === 'Professional' && <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--cyan)', letterSpacing: '.8px', marginBottom: 10 }}>RECOMMENDED</div>}
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{tier}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--cyan)', letterSpacing: -0.5, marginBottom: 12 }}>{price}</div>
              <div style={{ fontSize: 11.5, color: 'var(--t2)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{features}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '14px 16px', background: 'var(--gbg)', border: '1px solid var(--gb)', borderRadius: 'var(--r)', fontSize: 12, color: 'var(--t2)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--green)' }}>Unit economics:</strong> A single AME at ₹800/hr spending 4 hrs on a TIR costs ₹3,200 in labour per report. At 10 reports/month that's ₹32,000/mo in AME time on paperwork — more than the Professional plan for the whole team.
        </div>
      </Section>

      {/* ── TRACTION ── */}
      <Section id="traction" label="Traction" title="First customer is live. Second is in demo." accent="var(--cyan)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '0 0 20px' }}>
          <div style={{ padding: '18px 20px', background: 'var(--cbg)', border: '1px solid var(--cb)', borderRadius: 'var(--r2)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--cyan)', letterSpacing: '.8px', marginBottom: 8 }}>PILOT CUSTOMER</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Scandinavian Avionics Air Works</div>
            <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.6 }}>DGCA Part-145 approved MRO, Gurgaon, Haryana. Handles GA and light commercial aircraft modifications. Piloting AeroDraft for TIR drafting across their current client base.</div>
          </div>
          <div style={{ padding: '18px 20px', background: 'var(--raised)', border: '1px solid var(--bdr)', borderRadius: 'var(--r2)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--t3)', letterSpacing: '.8px', marginBottom: 8 }}>PIPELINE</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>3 additional MRO shops</div>
            <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.6 }}>Warm intros through industry network. All expressed frustration with the current Word-doc process. Demos scheduled post-pilot validation.</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            ['Jun 2026', 'MVP shipped', 'Full TIR drafter, client registry, regulatory digest — production-ready'],
            ['Jul 2026', 'Pilot live at SAAW', 'First real TIRs generated and reviewed by licensed AMEs'],
            ['Q4 2026', 'Target: 5 paying shops', 'Convert pilot + pipeline to annual contracts'],
          ].map(([date, title, desc]) => (
            <div key={date} style={{ padding: '14px 16px', background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 'var(--r)', boxShadow: 'var(--sh)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--cyan)', letterSpacing: '.5px', marginBottom: 5 }}>{date}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 11.5, color: 'var(--t2)', lineHeight: 1.55 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── TEAM ── */}
      <Section id="team" label="Team" title="Built by someone who grew up in an MRO shop." accent="var(--cyan)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ padding: '20px', background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 'var(--r2)', boxShadow: 'var(--sh)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div className="cav" style={{ width: 42, height: 42, fontSize: 14, borderRadius: 9 }}>RS</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Rithwik Sharma</div>
                <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 2 }}>Founder · Engineering & Product</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.7 }}>
              Computer Engineering, Georgia Tech (Co-op program, graduating May 2027). Interned at Smurfit WestRock building AWS document intelligence pipelines; KPMG on voice AI/ASR systems. Grew up watching DGCA paperwork bottleneck an MRO shop firsthand — that's the product intuition no competitor can buy.
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              {['AWS · Bedrock', 'RAG pipelines', 'React · Vite', 'OpenAI streaming', 'MRO domain knowledge'].map(tag => (
                <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: 10, padding: '2px 8px', background: 'var(--raised)', border: '1px solid var(--bdr2)', borderRadius: 3, color: 'var(--t2)' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: '20px', background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 'var(--r2)', boxShadow: 'var(--sh)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div className="cav" style={{ width: 42, height: 42, fontSize: 14, borderRadius: 9, background: 'var(--abg)', borderColor: 'var(--ab)', color: 'var(--amber)' }}>SA</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Domain advisor</div>
                <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 2 }}>SA Air Works, Gurgaon · DGCA licensed AME</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.7 }}>
              Decades of hands-on experience with DGCA CAR-21 compliance, TIR filing, and Part-145 operations. Provides real-world validation of every TIR section and approval classification. Ensures every output meets what DGCA auditors actually expect.
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              {['DGCA CAR-21', 'Part-145 ops', 'TIR filing', 'AME licensed', 'EASA adjacent'].map(tag => (
                <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: 10, padding: '2px 8px', background: 'var(--raised)', border: '1px solid var(--bdr2)', borderRadius: 3, color: 'var(--t2)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── WHY NOW ── */}
      <Section id="why-now" label="Why now" title="Three things just became true at once." accent="var(--green)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[
            ['LLMs can write structured regulatory docs', 'GPT-4o-class models now reliably produce structured, section-keyed regulatory content accurate enough for AME review. This wasn\'t possible 18 months ago.'],
            ['India\'s GA fleet is growing', 'DGCA GA registrations up 23% since 2022. More aircraft = more modifications = more TIRs. The paperwork burden is accelerating.'],
            ['No incumbent is defending this ground', 'AMOS, Veryon, Ramco — the MRO incumbents — all target airline MRO, not Part-145 GA shops. The sub-10-aircraft segment is completely unserved by software.'],
          ].map(([h, s]) => (
            <div key={h} style={{ padding: '16px', background: 'var(--gbg)', border: '1px solid var(--gb)', borderRadius: 'var(--r)' }}>
              <div style={{ fontWeight: 600, color: 'var(--green)', marginBottom: 6, fontSize: 13, lineHeight: 1.4 }}>{h}</div>
              <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.6 }}>{s}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── ASK ── */}
      <Section id="ask" label="The ask" title="Looking for early believers." accent="var(--cyan)">
        <p style={prose}>AeroDraft is pre-seed, bootstrapped to a working MVP with a live pilot customer. Looking for two things:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0 20px' }}>
          <div style={{ padding: '20px', background: 'var(--cbg)', border: '1px solid var(--cb)', borderRadius: 'var(--r2)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--cyan)', letterSpacing: '.8px', marginBottom: 8 }}>INTRODUCTIONS</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>MRO shop owners and AME leads</div>
            <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.6 }}>If you know anyone running a Part-145 MRO operation in India who files TIRs — we want a 20-minute conversation. That's it.</div>
          </div>
          <div style={{ padding: '20px', background: 'var(--gbg)', border: '1px solid var(--gb)', borderRadius: 'var(--r2)' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', letterSpacing: '.8px', marginBottom: 8 }}>ADVISORY / ANGEL</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Aviation or B2B SaaS operators</div>
            <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.6 }}>Open to a small friends-and-family round. Primarily looking for operators who have been inside MRO organisations or scaled vertical SaaS in regulated industries.</div>
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <div id="contact" style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 'var(--r2)', padding: '32px 28px', textAlign: 'center', boxShadow: 'var(--sh)', marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--cyan)', letterSpacing: '.8px', marginBottom: 10 }}>GET IN TOUCH</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>rithwik.sharma18185@gmail.com</div>
        <div style={{ fontSize: 13, color: 'var(--t2)', marginBottom: 22, lineHeight: 1.6 }}>
          Georgia Tech · Computer Engineering · Class of 2027<br />
          Available for calls any time — just send a note.
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:rithwik.sharma18185@gmail.com" className="btn btn-p" style={{ padding: '9px 20px', textDecoration: 'none' }}>Send an email</a>
          <a href="https://github.com/RithwikSharma/aerodraft" target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '9px 20px', textDecoration: 'none' }}>View on GitHub →</a>
        </div>
      </div>

      <div style={{ textAlign: 'center', paddingBottom: 32, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--t3)', letterSpacing: '.5px' }}>
        AERODRAFT · SA AIR WORKS MRO PLATFORM · BUILT 2026
      </div>
    </div>
  )
}

const prose = { fontSize: 13.5, color: 'var(--t2)', lineHeight: 1.75, marginBottom: 16 }

function Section({ id, label, title, accent, children }) {
  return (
    <div id={id} style={{ marginBottom: 40, scrollMarginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 3, height: 22, background: accent, borderRadius: 2, flexShrink: 0 }}></div>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--t3)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -.4, color: 'var(--t1)', lineHeight: 1.2 }}>{title}</h2>
        </div>
      </div>
      {children}
    </div>
  )
}
