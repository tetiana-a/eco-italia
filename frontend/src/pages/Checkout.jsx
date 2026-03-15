import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Checkout() {
  const { cart, total, dispatch } = useCart();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', city:'', zip:'' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await fetch(`${API}/orders`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ items: cart.map(i=>({id:i.id,name:i.nameCs,price:i.price,qty:i.qty})), customer:form, total })
      });
      dispatch({ type:'CLEAR' });
      setDone(true);
    } catch(e) { alert('Chyba. Zkuste to znovu.'); }
    setLoading(false);
  };

  if (done) return (
    <div className="page-wrap" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:24 }}>
      <div style={{ fontSize:52, marginBottom:20 }}>✓</div>
      <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:40, fontWeight:400, marginBottom:12 }}>Objednávka přijata!</h2>
      <p style={{ color:'var(--muted)', marginBottom:32, maxWidth:400 }}>Děkujeme za vaši objednávku. Brzy se vám ozveme na {form.email}.</p>
      <button className="btn-gold" onClick={()=>nav('/')}>Zpět na hlavní stránku</button>
    </div>
  );

  return (
    <div className="page-wrap" style={{ paddingTop:100, paddingBottom:88 }}>
      <div className="container">
        <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:44, fontWeight:400, marginBottom:44 }}>Pokladna</h1>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:48, alignItems:'start' }}>
          <form onSubmit={submit}>
            <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:24, fontWeight:400, marginBottom:20 }}>Kontaktní údaje</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
              {[['name','Jméno a příjmení','text'],['email','Email','email']].map(([k,l,t]) => (
                <div key={k}>
                  <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>{l} *</label>
                  <input className="input" type={t} value={form[k]} onChange={e=>set(k,e.target.value)} required />
                </div>
              ))}
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Telefon</label>
              <input className="input" value={form.phone} onChange={e=>set('phone',e.target.value)} />
            </div>
            <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:24, fontWeight:400, marginBottom:20 }}>Doručovací adresa</h3>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>Ulice *</label>
              <input className="input" value={form.address} onChange={e=>set('address',e.target.value)} required />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {[['city','Město'],['zip','PSČ']].map(([k,l]) => (
                <div key={k}>
                  <label style={{ display:'block', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>{l} *</label>
                  <input className="input" value={form[k]} onChange={e=>set(k,e.target.value)} required />
                </div>
              ))}
            </div>
            <button className="btn-gold" type="submit" disabled={loading} style={{ width:'100%', marginTop:28 }}>
              {loading ? 'Zpracovávám...' : 'Odeslat objednávku'}
            </button>
          </form>

          <div style={{ background:'var(--glass)', border:'1px solid var(--border)', borderRadius:14, padding:28, position:'sticky', top:100 }}>
            <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontWeight:400, marginBottom:20 }}>Vaše objednávka</h3>
            {cart.map(i => (
              <div key={i.id} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--muted)', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                <span>{i.nameCs} ×{i.qty}</span>
                <span style={{ color:'var(--text)' }}>{(i.price*i.qty).toLocaleString()} Kč</span>
              </div>
            ))}
            <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Cormorant Garamond,serif', fontSize:20, padding:'16px 0 0', color:'var(--gold)' }}>
              <strong>Celkem</strong><strong>{total.toLocaleString()} Kč</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
