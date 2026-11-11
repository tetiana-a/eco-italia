const REGIONS = ['Sicílie','Toskánsko','Sardinie','Kalábrie','Piemont','Umbrie','Benátky','Ligurie'];

export default function About() {
  return (
    <div className="page" style={{ paddingTop:80 }}>

      {/* HERO */}
      <section style={{ padding:'60px 0 52px', borderBottom:'1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth:800, textAlign:'center' }}>
          <span className="chip" style={{ marginBottom:18 }}>O projektu · Eco Italia</span>
          <h1 style={{ fontSize:'clamp(38px,6vw,72px)', marginBottom:16, lineHeight:1 }}>
            Ukázkový<br/><em style={{ fontStyle:'italic', color:'var(--gold)' }}>e-shop</em>
          </h1>
          <div style={{ width:40, height:1, background:'linear-gradient(90deg,transparent,var(--gold),transparent)', margin:'0 auto 20px' }} />
          <p style={{ color:'var(--muted)', fontSize:15, fontWeight:300, lineHeight:1.85, maxWidth:580, margin:'0 auto' }}>
            Eco Italia je výukový a portfoliový projekt webové vývojářky Tetiany Kotolup (React, Node.js). Nejde o skutečný obchod: zboží nelze objednat ani koupit, nikdo zde nic neprodává a produkty, ceny a popisy jsou pouze ilustrativní.
          </p>
        </div>
      </section>

      {/* REGIONS */}
      <section className="section" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div className="sec-head">
            <h2 className="sec-title">8 regionů Itálie</h2>
            <p className="sec-sub">Regiony ukázkových produktů</p>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
            {REGIONS.map((r,i) => (
              <span key={r} style={{
                padding:'8px 20px', borderRadius:50,
                background:'var(--surface)', border:'1px solid var(--border)',
                fontSize:13, color:'var(--muted)',
                animation:`fadeUp .4s ${i*50}ms both`,
              }}>{r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section style={{ padding:'28px 0', borderTop:'1px solid var(--border)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <p style={{ fontSize:11, color:'var(--muted2)', fontWeight:300, letterSpacing:'0.02em' }}>
            Autorka projektu:{' '}
            <a href="https://tetianakotolup.com" target="_blank" rel="noopener noreferrer"
              style={{ color:'var(--gold)', fontWeight:500 }}>Tetiana Kotolup</a>
          </p>
        </div>
      </section>

    </div>
  );
}
