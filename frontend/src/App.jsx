import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar, { DemoBanner } from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import About from './pages/About';

function BgScene() {
  return (
    <div className="bg-scene" aria-hidden="true">
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <div className="bg-grain" />
      <div className="bg-vignette" />
      <div className="bg-particles">
        <div className="particle p1"/><div className="particle p2"/><div className="particle p3"/>
        <div className="particle p4"/><div className="particle p5"/><div className="particle p6"/>
      </div>
    </div>
  );
}

function useReveal() {
  const loc = useLocation();
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    const tag = () => document.querySelectorAll('.section .container > *, .pcard, .sec-head, footer > *').forEach((el, i) => {
      if (el.dataset.rv) return;
      el.dataset.rv = 1; el.classList.add('reveal'); el.style.setProperty('--d', `${(i % 4) * 70}ms`); io.observe(el);
    });
    tag();
    const mo = new MutationObserver(tag); // products arrive after fetch
    mo.observe(document.body, { childList: true, subtree: true });
    window.scrollTo(0, 0);
    return () => { io.disconnect(); mo.disconnect(); };
  }, [loc.pathname]);
}

function Layout({ children }) {
  useReveal();
  return (
    <>
      <div className="scroll-bar" aria-hidden="true" />
      <BgScene />
      <Navbar />
      {/* same banner in page flow, invisible: pushes content below the fixed banner at any text wrap */}
      <DemoBanner spacer />
      {children}
      <footer style={{ position:'relative', zIndex:1, borderTop:'1px solid var(--border)', padding:'32px 0', textAlign:'center' }}>
        <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:18, marginBottom:6, letterSpacing:'0.1em' }}>
          ECO <span style={{ color:'var(--gold)' }}>·</span> ITALIA
        </p>
        <p style={{ color:'var(--muted)', fontSize:12, fontWeight:300, marginBottom:6 }}>
          Ukázkový projekt pro účely portfolia. Web neslouží k prodeji zboží ani služeb.
        </p>
        <p style={{ color:'var(--muted2)', fontSize:11, marginTop:12 }}>
          Autorka: Tetiana Kotolup · <a href="https://tetianakotolup.com" target="_blank" rel="noopener noreferrer" style={{ color:'var(--gold)' }}>tetianakotolup.com</a>
        </p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/katalog" element={<Layout><Catalog /></Layout>} />
        <Route path="/produkt/:id" element={<Layout><Product /></Layout>} />
        <Route path="/o-nas" element={<Layout><About /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
