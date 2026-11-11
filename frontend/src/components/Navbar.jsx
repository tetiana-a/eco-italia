import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function DemoBanner({ spacer = false }) {
  return (
    <div role="note" aria-hidden={spacer || undefined} style={{ background:'var(--gold)', color:'#04040A', padding:'9px 16px', textAlign:'center', fontSize:13, fontWeight:600, lineHeight:1.45, visibility: spacer ? 'hidden' : 'visible' }}>
      UKÁZKOVÝ PROJEKT — nejedná se o skutečný e-shop. Web vznikl jako výukový a portfoliový projekt Tetiany Kotolup. Zboží nelze objednat ani koupit; produkty a ceny jsou pouze ilustrativní.
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => setOpen(false), [loc]);

  const links = [['/', 'Domů'],['/katalog','Katalog'],['/o-nas','O nás']];

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      background: scrolled ? 'rgba(4,4,10,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition:'all 0.4s',
    }}>
      <DemoBanner />
      <div className="container" style={{ display:'flex', alignItems:'center', gap:8, padding: scrolled ? '11px 0' : '18px 0', transition:'padding 0.4s' }}>
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
