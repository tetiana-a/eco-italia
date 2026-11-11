import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

function Layout({ children }) {
  return (
    <>
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
