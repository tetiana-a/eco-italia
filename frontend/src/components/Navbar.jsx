import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => setOpen(false), [loc]);

  const links = [['/', 'Domů'],['/katalog','Katalog'],['/o-nas','O nás'],['/o-nas#konzultace','Konzultace']];

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      padding: scrolled ? '11px 0' : '18px 0',
      background: scrolled ? 'rgba(4,4,10,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition:'all 0.4s',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', gap:8 }}>
        <Link to="/" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:19, letterSpacing:'0.12em', display:'flex', alignItems:'center', gap:5, flexShrink:0 }}>
          <span style={{ color:'var(--eco2)' }}>ECO</span>
          <span style={{ color:'var(--gold)', margin:'0 1px' }}>·</span>
          <span>ITALIA</span>
        </Link>

        <div style={{ display:'flex', gap:2, marginLeft:'auto', alignItems:'center' }} className="nav-desk">
          {links.map(([to,l]) => (
            <Link key={to} to={to}
              style={{ padding:'7px 14px', borderRadius:6, fontSize:12, fontWeight:500, color: loc.pathname===to.split('#')[0] ? 'var(--gold)' : 'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase', transition:'all .2s', background: loc.pathname===to.split('#')[0] ? 'rgba(196,169,107,0.07)' : 'transparent' }}>
              {l}
            </Link>
          ))}
        </div>

        <Link to="/kosik" style={{ position:'relative', color:'var(--muted)', display:'flex', marginLeft:12, transition:'color .2s' }}
          onMouseEnter={e=>e.currentTarget.style.color='var(--gold)'} onMouseLeave={e=>e.currentTarget.style.color='var(--muted)'}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {count > 0 && <span style={{ position:'absolute', top:-8, right:-8, width:16, height:16, background:'var(--gold)', borderRadius:'50%', fontSize:9, fontWeight:700, color:'#04040A', display:'flex', alignItems:'center', justifyContent:'center' }}>{count}</span>}
        </Link>

        <button onClick={()=>setOpen(!open)} className="burger-nav" style={{ display:'none', flexDirection:'column', gap:4, background:'none', border:'none', padding:4, marginLeft:8 }}>
          <span style={{ width:20, height:1.5, background:'var(--muted)', display:'block' }}/>
          <span style={{ width:20, height:1.5, background:'var(--muted)', display:'block' }}/>
          <span style={{ width:20, height:1.5, background:'var(--muted)', display:'block' }}/>
        </button>
      </div>

      {open && (
        <div style={{ background:'rgba(4,4,10,0.97)', backdropFilter:'blur(20px)', borderTop:'1px solid var(--border)', padding:'12px 28px 20px', display:'flex', flexDirection:'column', gap:2 }}>
          {links.map(([to,l]) => (
            <Link key={to} to={to} style={{ padding:'11px 14px', fontSize:14, color:'var(--muted)', borderRadius:6 }}>{l}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:700px){
          .nav-desk{display:none !important}
          .burger-nav{display:flex !important}
        }
      `}</style>
    </nav>
  );
}
