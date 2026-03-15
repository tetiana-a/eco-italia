import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CATS = [
  { id:'oils', label:'Oleje' },
  { id:'cosmetics', label:'Kosmetika' },
  { id:'food', label:'Potraviny' },
  { id:'home', label:'Domácnost' },
  { id:'wellness', label:'Wellness' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`${API}/products?featured=true`)
      .then(r => r.json())
      .then(setFeatured)
      .catch(() => {});
  }, []);

  return (
    <div className="page">

      {/* ── HERO: compact, editorial ── */}
      <section style={{ minHeight:'90vh', display:'flex', flexDirection:'column', justifyContent:'center', paddingTop:80, paddingBottom:48 }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>

            {/* Left: text */}
            <div style={{ animation:'fadeUp .8s .1s both' }}>
              <span className="chip" style={{ marginBottom:22 }}>Přímé z Itálie</span>

              <h1 style={{ fontSize:'clamp(44px,6.5vw,80px)', lineHeight:0.95, letterSpacing:'-0.03em', marginBottom:20 }}>
                Authentic<br/>
                <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Italian</em><br/>
                <span style={{ fontWeight:300 }}>Eco Living</span>
              </h1>

              <div style={{ width:40, height:1, background:'linear-gradient(90deg,var(--gold),transparent)', marginBottom:20 }} />

              <p style={{ fontSize:14, color:'var(--muted)', fontWeight:300, maxWidth:380, lineHeight:1.85, marginBottom:32 }}>
                Prémiové ekologické produkty z nejlepších italských regionů. Certifikované, udržitelné, doručené přímo k vám.
              </p>

              <div style={{ display:'flex', gap:10, marginBottom:48 }}>
                <Link to="/katalog" className="btn-gold">Prozkoumat katalog</Link>
                <Link to="/o-nas" className="btn-outline">O nás</Link>
              </div>

              {/* Stats row */}
              <div style={{ display:'flex', gap:0, borderTop:'1px solid var(--border)', paddingTop:24 }}>
                {[['8', 'regionů Itálie'],['100%','bio certifikace'],['48h','doručení do ČR']].map(([v,l],i) => (
                  <div key={l} style={{ flex:1, paddingRight:i<2?24:0, borderRight:i<2?'1px solid var(--border)':'none', paddingLeft:i>0?24:0 }}>
                    <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:26, color:'var(--gold)', lineHeight:1 }}>{v}</div>
                    <div style={{ fontSize:10, color:'var(--muted)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:5 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: editorial image collage */}
            <div style={{ position:'relative', height:480, animation:'fadeIn .9s .3s both' }}>
              <img
                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=85"
                alt="Italian olive oil"
                style={{ position:'absolute', top:0, right:0, width:'68%', height:'72%', objectFit:'cover', borderRadius:10 }}
              />
              <img
                src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80"
                alt="Italian honey"
                style={{ position:'absolute', bottom:0, left:0, width:'48%', height:'46%', objectFit:'cover', borderRadius:10, border:'3px solid var(--bg)' }}
              />
              {/* Floating label */}
              <div style={{
                position:'absolute', bottom:40, right:-10,
                background:'rgba(8,8,15,0.85)', backdropFilter:'blur(12px)',
                border:'1px solid var(--border)', borderRadius:8, padding:'10px 16px',
                animation:'fadeUp .7s .7s both', opacity:0,
              }}>
                <div style={{ fontSize:9, color:'var(--eco2)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:2 }}>Ekologická certifikace</div>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:15 }}>EU Organic ✓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY STRIP ── */}
      <section style={{ paddingBottom:56, position:'relative', zIndex:1 }}>
        <div className="container">
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {CATS.map((c,i) => (
              <Link key={c.id} to={`/katalog?category=${c.id}`}
                style={{
                  padding:'8px 20px', borderRadius:50,
                  background:'var(--surface)', border:'1px solid var(--border)',
                  fontSize:12, fontWeight:500, color:'var(--muted)',
                  letterSpacing:'0.06em',
                  transition:'all .25s',
                  animation:`fadeUp .5s ${i*60}ms both`,
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(196,169,107,0.4)';e.currentTarget.style.color='var(--gold)';e.currentTarget.style.background='rgba(196,169,107,0.06)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--muted)';e.currentTarget.style.background='var(--surface)'}}>
                {c.label}
              </Link>
            ))}
            <Link to="/katalog"
              style={{ padding:'8px 20px', borderRadius:50, background:'transparent', border:'1px dashed var(--muted2)', fontSize:12, color:'var(--muted2)', letterSpacing:'0.06em', transition:'all .25s' }}
              onMouseEnter={e=>{e.currentTarget.style.color='var(--muted)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='var(--muted2)'}}>
              Zobrazit vše →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS: 4-column small cards ── */}
      {featured.length > 0 && (
        <section className="section" style={{ paddingTop:0 }}>
          <div className="container">
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:28 }}>
              <div>
                <div style={{ width:32, height:1, background:'linear-gradient(90deg,var(--gold),transparent)', marginBottom:10 }} />
                <h2 className="sec-title">Doporučené</h2>
              </div>
              <Link to="/katalog" className="btn-outline" style={{ fontSize:11 }}>Zobrazit vše</Link>
            </div>
            <div className="products-grid">
              {featured.map((p,i) => <ProductCard key={p.id} product={p} delay={i*80} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── MANIFESTO: minimal, text-heavy ── */}
      <section className="section" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="container" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>
          <div style={{ animation:'fadeUp .7s .1s both' }}>
            <span className="chip" style={{ marginBottom:18 }}>Naše filozofie</span>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,46px)', marginBottom:18, lineHeight:1.1 }}>
              Příroda a <em style={{ fontStyle:'italic', color:'var(--gold)' }}>luxus</em><br/>v harmonii
            </h2>
            <p style={{ color:'var(--muted)', fontSize:14, fontWeight:300, lineHeight:1.85, marginBottom:14 }}>
              Každý produkt pochází přímo od malých italských výrobců, kteří respektují přírodu a tradici. Vybíráme pouze to nejlepší — s certifikátem ekologického zemědělství EU.
            </p>
            <p style={{ color:'var(--muted)', fontSize:14, fontWeight:300, lineHeight:1.85, marginBottom:28 }}>
              Věříme, že prémiová kvalita a udržitelnost nejsou v rozporu — jsou nerozlučné.
            </p>
            <Link to="/o-nas" className="btn-outline">Číst více</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, animation:'fadeIn .8s .3s both' }}>
            {[
              ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80','Toskánský olej'],
              ['https://images.unsplash.com/photo-1571069411715-0dd10f9f47ab?w=400&q=80','Lanýžová sůl'],
              ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80','Tělový peeling'],
              ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80','Bergamot'],
            ].map(([src,alt],i) => (
              <img key={i} src={src} alt={alt}
                style={{ width:'100%', aspectRatio:'1', objectFit:'cover', borderRadius:8,
                  transform: i===1||i===2 ? 'translateY(10px)' : 'translateY(0)',
                  transition:'transform .3s' }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
