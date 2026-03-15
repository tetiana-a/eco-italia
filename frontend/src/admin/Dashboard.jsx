import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function AdminLayout() {
  const { logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg2)' }}>
      <aside style={{ width:210, flexShrink:0, background:'var(--bg)', borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column', padding:'24px 0' }}>
        <div style={{ padding:'0 20px 22px', borderBottom:'1px solid var(--border)', marginBottom:12, fontFamily:'Cormorant Garamond,serif', fontSize:18, letterSpacing:'0.1em' }}>
          ECO <span style={{ color:'var(--gold)' }}>·</span> ITALIA
          <small style={{ display:'block', fontSize:10, color:'var(--muted)', letterSpacing:'0.14em', textTransform:'uppercase', marginTop:3, fontFamily:'DM Sans,sans-serif' }}>Admin</small>
        </div>
        {[['/admin','Přehled'],['/admin/produkty','Produkty'],['/admin/objednavky','Objednávky'],['/','Web']].map(([to,l]) => (
          <Link key={to} to={to}
            style={{ padding:'11px 20px', fontSize:13, fontWeight:500, color: loc.pathname===to ? 'var(--gold)' : 'var(--muted)', borderLeft:`2px solid ${loc.pathname===to ? 'var(--gold)':'transparent'}`, background: loc.pathname===to ? 'rgba(200,169,106,0.05)':'transparent', transition:'all .2s', textDecoration:'none' }}>
            {l}
          </Link>
        ))}
        <button className="btn-ghost" onClick={()=>{ logout(); nav('/admin/login'); }} style={{ margin:'auto 16px 0', padding:'10px 12px', fontSize:12 }}>Odhlásit se</button>
      </aside>
      <main style={{ flex:1, padding:32, overflowY:'auto' }}><Outlet /></main>
    </div>
  );
}

export function AdminDashboard() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/orders`, { headers:{'Authorization':`Bearer ${token}`} }).then(r=>r.json()).then(d=>Array.isArray(d)&&setOrders(d)).catch(()=>{});
    fetch(`${API}/products`).then(r=>r.json()).then(d=>Array.isArray(d)&&setProducts(d)).catch(()=>{});
  }, [token]);

  const stats = [
    { l:'Objednávek', v: orders.length },
    { l:'Produktů', v: products.length },
    { l:'Celkový příjem', v: `${orders.reduce((s,o)=>s+(o.total||0),0).toLocaleString()} Kč`, gold:true },
  ];

  return (
    <div>
      <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:32, fontWeight:400, marginBottom:28 }}>Přehled</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:40 }}>
        {stats.map(s => (
          <div key={s.l} style={{ background:'var(--glass)', border:'1px solid var(--border)', borderRadius:10, padding:24 }}>
            <strong style={{ display:'block', fontFamily:'Cormorant Garamond,serif', fontSize:34, fontWeight:400, marginBottom:6, color: s.gold ? 'var(--gold)' : 'var(--text)' }}>{s.v}</strong>
            <span style={{ fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.l}</span>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontWeight:400, marginBottom:16 }}>Nedávné objednávky</h3>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
        <thead><tr>{['ID','Zákazník','Celkem','Status','Datum'].map(h=><th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:10, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', borderBottom:'1px solid var(--border)' }}>{h}</th>)}</tr></thead>
        <tbody>
          {orders.slice(0,10).map(o=>(
            <tr key={o.id}>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)', color:'var(--muted)', fontSize:11 }}>#{o.id}</td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)' }}>{o.customer?.name}<br/><small style={{ color:'var(--muted)', fontSize:11 }}>{o.customer?.email}</small></td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)', color:'var(--gold)' }}>{o.total?.toLocaleString()} Kč</td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)' }}>
                <span style={{ padding:'3px 10px', borderRadius:50, fontSize:10, fontWeight:600, textTransform:'uppercase', background:'rgba(200,169,106,0.12)', color:'var(--gold)' }}>{o.status}</span>
              </td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)', color:'var(--muted)', fontSize:12 }}>{new Date(o.createdAt).toLocaleDateString('cs-CZ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:'', nameCs:'', price:'', category:'oils', image:'', origin:'Italy', eco:5, desc:'', featured:false });

  const load = () => fetch(`${API}/products`).then(r=>r.json()).then(d=>Array.isArray(d)&&setProducts(d));
  useEffect(()=>{load();},[]);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const save = async () => {
    const body = { ...form, price:Number(form.price), eco:Number(form.eco) };
    if (editing && editing!=='new') await fetch(`${API}/products/${editing}`,{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify(body)});
    else await fetch(`${API}/products`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify(body)});
    setEditing(null); load();
  };
  const del = async (id) => { if(window.confirm('Smazat?')){ await fetch(`${API}/products/${id}`,{method:'DELETE',headers:{'Authorization':`Bearer ${token}`}}); load(); } };
  const edit = p => { setEditing(p.id); setForm({...p, price:String(p.price), eco:String(p.eco), image:p.image||''}); };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
        <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:32, fontWeight:400 }}>Produkty</h2>
        <button className="btn-gold" onClick={()=>{ setEditing('new'); setForm({name:'',nameCs:'',price:'',category:'oils',image:'',origin:'Italy',eco:5,desc:'',featured:false}); }}>+ Přidat</button>
      </div>

      {editing && (
        <div style={{ background:'var(--glass)', border:'1px solid var(--border)', borderRadius:12, padding:28, marginBottom:28 }}>
          <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontWeight:400, marginBottom:20 }}>{editing==='new'?'Nový produkt':'Upravit'}</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
            {[['nameCs','Název CS'],['name','Název EN'],['price','Cena (Kč)'],['origin','Původ']].map(([k,l])=>(
              <div key={k}>
                <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:5 }}>{l}</label>
                <input className="input" value={form[k]} onChange={e=>set(k,e.target.value)} type={k==='price'?'number':'text'} />
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:5 }}>Kategorie</label>
              <select className="input" value={form.category} onChange={e=>set('category',e.target.value)}>
                {['oils','cosmetics','food','home','wellness'].map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:5 }}>Eco Score (1-5)</label>
              <input className="input" type="number" min={1} max={5} value={form.eco} onChange={e=>set('eco',e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:5 }}>URL obrázku</label>
            <input className="input" value={form.image} onChange={e=>set('image',e.target.value)} />
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:5 }}>Popis</label>
            <textarea className="input" rows={2} value={form.desc} onChange={e=>set('desc',e.target.value)} />
          </div>
          <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--muted)', cursor:'pointer', marginBottom:20 }}>
            <input type="checkbox" checked={form.featured} onChange={e=>set('featured',e.target.checked)} /> Doporučený produkt
          </label>
          <div style={{ display:'flex', gap:10 }}>
            <button className="btn-gold" onClick={save}>Uložit</button>
            <button className="btn-ghost" onClick={()=>setEditing(null)}>Zrušit</button>
          </div>
        </div>
      )}

      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
        <thead><tr>{['Obr.','Název','Kat.','Cena','Akce'].map(h=><th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:10, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', borderBottom:'1px solid var(--border)' }}>{h}</th>)}</tr></thead>
        <tbody>
          {products.map(p=>(
            <tr key={p.id}>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)' }}><img src={p.image} alt="" style={{ width:44, height:44, objectFit:'cover', borderRadius:6 }} /></td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)' }}><strong>{p.nameCs}</strong><br/><small style={{ color:'var(--muted)', fontSize:11 }}>{p.name}</small></td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)', color:'var(--eco2)', fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em' }}>{p.category}</td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)', color:'var(--gold)' }}>{p.price} Kč</td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)' }}>
                <button className="btn-ghost" style={{ marginRight:8, padding:'6px 12px', fontSize:12 }} onClick={()=>edit(p)}>Upravit</button>
                <button className="btn-ghost" style={{ padding:'6px 12px', fontSize:12, color:'var(--red)' }} onClick={()=>del(p.id)}>Smazat</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const load = () => fetch(`${API}/orders`,{headers:{'Authorization':`Bearer ${token}`}}).then(r=>r.json()).then(d=>Array.isArray(d)&&setOrders(d)).catch(()=>{});
  useEffect(()=>{load();},[]);

  const changeStatus = async (id, status) => {
    await fetch(`${API}/orders/${id}/status`,{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({status})});
    load();
  };

  return (
    <div>
      <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:32, fontWeight:400, marginBottom:28 }}>Objednávky</h2>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
        <thead><tr>{['ID','Zákazník','Položky','Celkem','Status','Datum'].map(h=><th key={h} style={{ padding:'10px 12px', textAlign:'left', fontSize:10, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', borderBottom:'1px solid var(--border)' }}>{h}</th>)}</tr></thead>
        <tbody>
          {orders.map(o=>(
            <tr key={o.id}>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)', color:'var(--muted)', fontSize:11 }}>#{o.id}</td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)' }}>{o.customer?.name}<br/><small style={{ color:'var(--muted)', fontSize:11 }}>{o.customer?.email}</small></td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)', color:'var(--muted)', fontSize:12 }}>{o.items?.map((i,x)=><div key={x}>{i.name} ×{i.qty}</div>)}</td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)', color:'var(--gold)', fontWeight:600 }}>{o.total?.toLocaleString()} Kč</td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)' }}>
                <select value={o.status} onChange={e=>changeStatus(o.id,e.target.value)}
                  style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:6, padding:'6px 10px', color:'var(--text)', fontSize:12, cursor:'pointer' }}>
                  {['pending','shipped','delivered','cancelled'].map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td style={{ padding:12, borderBottom:'1px solid var(--border)', color:'var(--muted)', fontSize:12 }}>{new Date(o.createdAt).toLocaleDateString('cs-CZ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
