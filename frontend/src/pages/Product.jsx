import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const CATS = { oils:'Oleje', cosmetics:'Kosmetika', food:'Potraviny', home:'Domácnost', wellness:'Wellness' };

export default function Product() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`${API}/products/${id}`).then(r=>r.json()).then(p => {
      setProduct(p);
      fetch(`${API}/products?category=${p.category}`).then(r=>r.json()).then(r=>setRelated(r.filter(x=>x.id!==id).slice(0,3)));
    });
    setQty(1); setAdded(false);
    window.scrollTo(0,0);
  }, [id]);

  if (!product) return <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{ width:36, height:36, border:'2px solid var(--border)', borderTopColor:'var(--gold)', borderRadius:'50%', animation:'spin .8s linear infinite' }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  const handleAdd = () => {
    for (let i=0;i<qty;i++) dispatch({ type:'ADD', item:product });
    setAdded(true); setTimeout(()=>setAdded(false), 2000);
  };

  return (
    <div className="page-wrap" style={{ paddingTop:100, paddingBottom:88 }}>
      <div className="container">
        <div style={{ display:'flex', gap:8, fontSize:12, color:'var(--muted)', marginBottom:36, alignItems:'center' }}>
          <Link to="/" style={{ transition:'color .2s' }} onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--muted)'}>Domů</Link>
          <span style={{ color:'var(--muted2)' }}>/</span>
          <Link to="/katalog" style={{ transition:'color .2s' }} onMouseEnter={e=>e.target.style.color='var(--gold)'} onMouseLeave={e=>e.target.style.color='var(--muted)'}>Katalog</Link>
          <span style={{ color:'var(--muted2)' }}>/</span>
          <span>{product.nameCs}</span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, marginBottom:80, alignItems:'start' }}>
          <div style={{ animation:'fadeUp .6s both' }}>
            <img src={product.image} alt={product.nameCs} style={{ width:'100%', aspectRatio:'1', objectFit:'cover', borderRadius:12 }} />
          </div>
          <div style={{ animation:'fadeUp .6s .15s both' }}>
            <span className="label" style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', background:'rgba(78,102,71,0.18)', border:'1px solid rgba(122,155,110,0.3)', borderRadius:100, marginBottom:18 }}>
              {product.origin} · {'★'.repeat(product.eco)}
            </span>
            <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,3.5vw,46px)', fontWeight:400, marginBottom:6 }}>{product.nameCs}</h1>
            <p style={{ fontSize:13, color:'var(--muted)', fontStyle:'italic', marginBottom:20 }}>{product.name}</p>
            <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:36, color:'var(--gold)', marginBottom:24 }}>{product.price} Kč</div>
            <p style={{ fontSize:15, color:'var(--muted)', lineHeight:1.8, fontWeight:300, marginBottom:24 }}>{product.desc}</p>
            <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:32 }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, background:'var(--glass)', border:'1px solid var(--border)', borderRadius:50, padding:'8px 16px' }}>
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ background:'none', color:'var(--gold)', fontSize:18, fontWeight:300 }}>−</button>
                <span style={{ fontSize:16, minWidth:20, textAlign:'center' }}>{qty}</span>
                <button onClick={()=>setQty(q=>q+1)} style={{ background:'none', color:'var(--gold)', fontSize:18, fontWeight:300 }}>+</button>
              </div>
              <button className={added ? 'btn-outline' : 'btn-gold'} onClick={handleAdd} style={{ flex:1 }}>
                {added ? 'Přidáno do košíku' : 'Přidat do košíku'}
              </button>
            </div>
            <div style={{ borderTop:'1px solid var(--border)', paddingTop:24, display:'flex', flexDirection:'column', gap:10 }}>
              {[['Původ', product.origin],['Kategorie', CATS[product.category]],['Eco Score', '★'.repeat(product.eco)]].map(([k,v]) => (
                <div key={k} style={{ fontSize:14, color:'var(--muted)' }}><strong style={{ color:'var(--text)', marginRight:8 }}>{k}:</strong>{v}</div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ borderTop:'1px solid var(--border)', paddingTop:60 }}>
            <div className="gold-line" />
            <h2 style={{ textAlign:'center', fontFamily:'Cormorant Garamond,serif', fontSize:36, fontWeight:400, marginBottom:36 }}>Mohlo by vás zajímat</h2>
            <div className="products-grid">
              {related.map((p,i) => <ProductCard key={p.id} product={p} delay={i*100} />)}
            </div>
          </div>
        )}
      </div>
      <style>{`@media(max-width:768px){.product-main-grid{grid-template-columns:1fr !important}}`}</style>
    </div>
  );
}
