import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const CATS = [['','Vše'],['oils','Oleje'],['cosmetics','Kosmetika'],['food','Potraviny'],['home','Domácnost'],['wellness','Wellness']];
const SORTS = [['','Nejnovější'],['price_asc','Cena ↑'],['price_desc','Cena ↓']];

export default function Catalog() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState(params.get('category')||'');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const q = new URLSearchParams();
    if (cat) q.set('category', cat);
    if (sort) q.set('sort', sort);
    if (search) q.set('search', search);
    fetch(`${API}/products?${q}`).then(r=>r.json()).then(d=>{setProducts(d);setLoading(false);}).catch(()=>setLoading(false));
  }, [cat, sort, search]);

  return (
    <div className="page-wrap" style={{ paddingTop:80 }}>
      <div style={{ padding:'52px 0 40px', textAlign:'center', borderBottom:'1px solid var(--border)' }}>
        <span className="label" style={{ display:'inline-block', marginBottom:14 }}>Kolekce 2026</span>
        <h1 className="sec-title">Katalog produktů</h1>
        <p className="sec-sub">Přímé z italských regionů — organické, certifikované</p>
      </div>

      <div className="container" style={{ padding:'36px 24px 88px' }}>
        {/* Filters */}
        <div className="catalog-filters" style={{ marginBottom:36, paddingBottom:24, borderBottom:'1px solid var(--border)' }}>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {CATS.map(([id,label]) => (
              <button key={id} onClick={() => setCat(id)}
                style={{ padding:'7px 18px', borderRadius:50, fontSize:12, fontWeight:500, border:`1px solid ${cat===id ? 'rgba(200,169,106,0.5)' : 'var(--border)'}`, background: cat===id ? 'rgba(200,169,106,0.1)' : 'var(--glass)', color: cat===id ? 'var(--gold)' : 'var(--muted)', transition:'all .2s', letterSpacing:'0.04em' }}>
                {label}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <input className="input" placeholder="Hledat..." value={search} onChange={e=>setSearch(e.target.value)} style={{ width:200 }} />
            <select className="input" value={sort} onChange={e=>setSort(e.target.value)} style={{ width:160 }}>
              {SORTS.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {[...Array(6)].map((_,i) => <div key={i} style={{ aspectRatio:'3/4', borderRadius:12, background:'linear-gradient(90deg,var(--bg2) 25%,var(--bg3) 50%,var(--bg2) 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite' }} />)}
          </div>
        ) : (
          <>
            <p style={{ fontSize:12, color:'var(--muted)', marginBottom:24, letterSpacing:'0.06em', textTransform:'uppercase' }}>{products.length} produktů</p>
            <div className="products-grid">
              {products.map((p,i) => <ProductCard key={p.id} product={p} delay={i*60} />)}
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  );
}
