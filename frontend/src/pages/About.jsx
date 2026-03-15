import { useState } from 'react';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const VALUES = [
  { title:'100% Bio certifikace', desc:'Každý produkt nese certifikát ekologického zemědělství EU. Žádné pesticidy, žádná GMO.' },
  { title:'Přímí výrobci', desc:'Nakupujeme pouze od malých rodinných farem a řemeslníků z italských regionů.' },
  { title:'Transparentní ceny', desc:'Férovéodměňování výrobců, žádné skryté poplatky. Víte přesně, za co platíte.' },
  { title:'Udržitelné balení', desc:'Minimální obal, recyklovatelné materiály, kompostovatelné výplně do zásilek.' },
];

const REGIONS = ['Sicílie','Toskánsko','Sardinie','Kalábrie','Piemont','Umbrie','Benátky','Ligurie'];

export default function About() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submitConsult = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API}/consult`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form)
      });
      setSent(true);
    } catch {}
    setLoading(false);
  };

  return (
    <div className="page" style={{ paddingTop:80 }}>

      {/* HERO */}
      <section style={{ padding:'60px 0 52px', borderBottom:'1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth:800, textAlign:'center' }}>
          <span className="chip" style={{ marginBottom:18 }}>O nás · Eco Italia</span>
          <h1 style={{ fontSize:'clamp(38px,6vw,72px)', marginBottom:16, lineHeight:1 }}>
            Z italské půdy<br/><em style={{ fontStyle:'italic', color:'var(--gold)' }}>přímo k vám</em>
          </h1>
          <div style={{ width:40, height:1, background:'linear-gradient(90deg,transparent,var(--gold),transparent)', margin:'0 auto 20px' }} />
          <p style={{ color:'var(--muted)', fontSize:15, fontWeight:300, lineHeight:1.85, maxWidth:580, margin:'0 auto' }}>
            Eco Italia vzniklo v roce 2025 s jediným cílem — přinést do českých domácností to nejlepší z italské ekologické produkce. Bez zbytečných mezičlánků, bez kompromisů v kvalitě.
          </p>
        </div>
      </section>

      {/* DIRECTOR */}
      <section className="section">
        <div className="container">
          <div className="director-grid">
          <div style={{ animation:'fadeIn .7s .1s both' }}>
            <div style={{
              width:280, height:320,
              background:'linear-gradient(135deg, var(--bg3), rgba(61,84,53,0.2))',
              borderRadius:12, border:'1px solid var(--border)',
              display:'flex', alignItems:'center', justifyContent:'center',
              flexDirection:'column', gap:8,
            }}>
              <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:56, color:'var(--gold)', fontWeight:300 }}>EK</div>
              <div style={{ fontSize:10, color:'var(--muted)', letterSpacing:'0.14em', textTransform:'uppercase' }}>Ředitel</div>
            </div>
          </div>
          <div style={{ animation:'fadeUp .7s .2s both' }}>
            <span className="chip" style={{ marginBottom:14 }}>Zakladatel</span>
            <h2 style={{ fontSize:'clamp(30px,4vw,52px)', marginBottom:6 }}>Eduard Korolov</h2>
            <p style={{ color:'var(--gold)', fontSize:14, fontWeight:500, letterSpacing:'0.06em', marginBottom:20, textTransform:'uppercase' }}>Ředitel & Konzultant</p>
            <p style={{ color:'var(--muted)', fontSize:14, fontWeight:300, lineHeight:1.85, marginBottom:16, maxWidth:520 }}>
              Eduard Korolov je zakladatelem a ředitelem Eco Italia. Od roku 2025 buduje přímé vztahy s italskými bio výrobci a přivádí jejich produkty na český trh. Osobně každý produkt testuje a certifikuje.
            </p>
            <p style={{ color:'var(--muted)', fontSize:14, fontWeight:300, lineHeight:1.85, marginBottom:28, maxWidth:520 }}>
              Mluví česky, rusky a italsky. Sídlí v Brně a rád se setká s každým zákazníkem osobně na konzultaci.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                ['Telefon', '+420 732 995 210', 'tel:+420732995210'],
                ['Email', 'eddigood2020@gmail.com', 'mailto:eddigood2020@gmail.com'],
                ['Adresa', 'T. Novákové 178/29, 621 00 Brno-Řečkovice', null],
              ].map(([l,v,href]) => (
                <div key={l} style={{ display:'flex', gap:12, alignItems:'center', fontSize:14 }}>
                  <span style={{ color:'var(--muted2)', fontSize:10, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', minWidth:56 }}>{l}</span>
                  {href ? (
                    <a href={href} style={{ color:'var(--gold)', fontWeight:500, transition:'opacity .2s' }}
                      onMouseEnter={e=>e.target.style.opacity='.7'} onMouseLeave={e=>e.target.style.opacity='1'}>{v}</a>
                  ) : (
                    <span style={{ color:'var(--text)', fontWeight:400 }}>{v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          </div>{/* end director-grid */}
        </div>
      </section>
      <section className="section" style={{ borderTop:'1px solid var(--border)', paddingTop:64 }}>
        <div className="container" style={{ maxWidth:760 }}>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <div style={{ width:40, height:1, background:'linear-gradient(90deg,transparent,var(--gold),transparent)', margin:'0 auto 14px' }} />
            <h2 className="sec-title">Náš příběh</h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {[
              'Eco Italia vzniklo v roce 2025 v Brně jako odpověď na stále rostoucí zájem o ekologické produkty z Itálie. Eduard Korolov — zakladatel a ředitel — strávil měsíce cestováním po italských regionech a navazováním vztahů s místními výrobci.',
              'Každý dodavatel byl osobně navštíven, každá farma prověřena. Výsledkem je kolekce 16 produktů z 8 italských regionů — od sicilského olivového oleje přes toskánskou levanduli až po piemontský lískooříškový krém.',
              'Naším cílem není jen prodej. Chceme vzdělávat, poradit a pomoci každému zákazníkovi najít produkty, které skutečně odpovídají jeho potřebám a hodnotám. Proto nabízíme osobní konzultace — zdarma, bez závazků.',
            ].map((p,i) => (
              <p key={i} style={{ color:'var(--muted)', fontSize:15, fontWeight:300, lineHeight:1.9 }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div className="sec-head">
            <h2 className="sec-title">Naše hodnoty</h2>
            <p className="sec-sub">Co nás odlišuje od ostatních</p>
          </div>
          <div className="four-col">
            {VALUES.map((v,i) => (
              <div key={i} style={{
                padding:'24px 20px', background:'var(--surface)', border:'1px solid var(--border)',
                borderRadius:10, animation:`fadeUp .5s ${i*80}ms both`,
                transition:'border-color .3s',
              }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(196,169,107,0.25)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                <div style={{ width:32, height:1, background:'linear-gradient(90deg,var(--gold),transparent)', marginBottom:14 }} />
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:18, marginBottom:10, fontWeight:400 }}>{v.title}</h3>
                <p style={{ color:'var(--muted)', fontSize:12, fontWeight:300, lineHeight:1.75 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="section" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div className="sec-head">
            <h2 className="sec-title">8 regionů Itálie</h2>
            <p className="sec-sub">Odkud naše produkty pocházejí</p>
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

      {/* CONSULTATION FORM */}
      <section className="section" id="konzultace" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div className="two-col" style={{ alignItems:'start' }}>
          <div>
            <span className="chip" style={{ marginBottom:18 }}>Bezplatná konzultace</span>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,46px)', marginBottom:16, lineHeight:1.1 }}>
              Poradíme vám<br/><em style={{ fontStyle:'italic', color:'var(--gold)' }}>osobně</em>
            </h2>
            <p style={{ color:'var(--muted)', fontSize:14, fontWeight:300, lineHeight:1.85, marginBottom:20 }}>
              Nejste si jistí, který produkt je pro vás nejlepší? Eduard Korolov vám rád osobně poradí — telefonicky, emailem nebo na osobní schůzce v Brně.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[
                ['Telefonická konzultace','Po–Pá 9:00–17:00, odpovídáme do 2 hodin'],
                ['Osobní schůzka','Brno-Řečkovice, po dohodě'],
                ['Email konzultace','Odpověď do 24 hodin'],
              ].map(([t,d]) => (
                <div key={t} style={{ padding:'14px 18px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:8, display:'flex', flexDirection:'column', gap:4 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{t}</span>
                  <span style={{ fontSize:12, color:'var(--muted)', fontWeight:300 }}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:28, padding:'20px', background:'rgba(61,84,53,0.12)', border:'1px solid rgba(122,155,110,0.2)', borderRadius:10 }}>
              <p style={{ fontSize:12, color:'var(--eco2)', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>Přímý kontakt</p>
              <a href="tel:+420732995210" style={{ display:'block', fontFamily:'Cormorant Garamond,serif', fontSize:22, color:'var(--gold)', marginBottom:4 }}>+420 732 995 210</a>
              <a href="mailto:eddigood2020@gmail.com" style={{ fontSize:13, color:'var(--muted)' }}>eddigood2020@gmail.com</a>
            </div>
          </div>

          <div>
            {sent ? (
              <div style={{ padding:'48px 32px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, textAlign:'center' }}>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:48, color:'var(--gold)', marginBottom:16 }}>✓</div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:26, marginBottom:10 }}>Odesláno!</h3>
                <p style={{ color:'var(--muted)', fontSize:14, fontWeight:300 }}>Ozveme se do 24 hodin. Těšíme se na vás!</p>
              </div>
            ) : (
              <form onSubmit={submitConsult} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'32px' }}>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontWeight:400, marginBottom:22 }}>Napište nám</h3>
                {[['name','Jméno a příjmení','text',true],['email','Email','email',true],['phone','Telefon','tel',false]].map(([k,l,t,req]) => (
                  <div key={k} style={{ marginBottom:14 }}>
                    <label style={{ display:'block', fontSize:10, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>{l}{req?' *':''}</label>
                    <input className="input" type={t} value={form[k]} onChange={e=>set(k,e.target.value)} required={req} />
                  </div>
                ))}
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:'block', fontSize:10, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Váš dotaz</label>
                  <textarea className="input" rows={4} value={form.message} onChange={e=>set('message',e.target.value)} placeholder="Na co vám mám poradit?" style={{ resize:'none' }} />
                </div>
                <button className="btn-gold" type="submit" disabled={loading} style={{ width:'100%' }}>
                  {loading ? 'Odesílám...' : 'Odeslat konzultaci'}
                </button>
                <p style={{ fontSize:11, color:'var(--muted2)', textAlign:'center', marginTop:12 }}>Odpovídáme do 24 hodin · Zcela zdarma</p>
              </form>
            )}
          </div>
          </div>{/* end two-col */}
        </div>
      </section>

    </div>
  );
}
