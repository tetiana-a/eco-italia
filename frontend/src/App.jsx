import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Login from './admin/Login';
import { AdminLayout, AdminDashboard, AdminProducts, AdminOrders } from './admin/Dashboard';

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

function Guard({ children }) {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin/login" />;
}

function Layout({ children }) {
  return (
    <>
      <BgScene />
      <Navbar />
      {children}
      <footer style={{ position:'relative', zIndex:1, borderTop:'1px solid var(--border)', padding:'32px 0', textAlign:'center' }}>
        <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:18, marginBottom:6, letterSpacing:'0.1em' }}>
          ECO <span style={{ color:'var(--gold)' }}>·</span> ITALIA
        </p>
        <p style={{ color:'var(--muted)', fontSize:12, fontWeight:300, marginBottom:6 }}>
          Přímé z Itálie do Česka · organické, certifikované · Od roku 2025
        </p>
        <p style={{ color:'var(--muted)', fontSize:12 }}>
          <a href="tel:+420732995210" style={{ transition:'color .2s' }} onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--muted)'}>+420 732 995 210</a>
          {' · '}
          <a href="mailto:eddigood2020@gmail.com" style={{ transition:'color .2s' }} onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--muted)'}>eddigood2020@gmail.com</a>
        </p>
        <p style={{ color:'var(--muted2)', fontSize:10, marginTop:12 }}>© 2025–2026 Eco Italia · Eduard Korolov · Brno-Řečkovice</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/katalog" element={<Layout><Catalog /></Layout>} />
            <Route path="/produkt/:id" element={<Layout><Product /></Layout>} />
            <Route path="/kosik" element={<Layout><Cart /></Layout>} />
            <Route path="/pokladna" element={<Layout><Checkout /></Layout>} />
            <Route path="/o-nas" element={<Layout><About /></Layout>} />
            <Route path="/admin/login" element={<><BgScene /><Login /></>} />
            <Route path="/admin" element={<Guard><AdminLayout /></Guard>}>
              <Route index element={<AdminDashboard />} />
              <Route path="produkty" element={<AdminProducts />} />
              <Route path="objednavky" element={<AdminOrders />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
