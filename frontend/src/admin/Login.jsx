import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const r = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password:pwd}) });
    const d = await r.json();
    if (d.token) { login(d.token); nav('/admin'); }
    else setErr('Nesprávné přihlašovací údaje');
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', position:'relative' }}>
      <div style={{ width:380, background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius:16, padding:44, textAlign:'center', position:'relative', zIndex:1 }}>
        <div className="gold-line" />
        <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:30, fontWeight:400, margin:'12px 0 6px' }}>ECO <span style={{ color:'var(--gold)' }}>·</span> ITALIA</h1>
        <p style={{ color:'var(--muted)', fontSize:13, marginBottom:32 }}>Admin přihlášení</p>
        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" placeholder="Heslo" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required />
          {err && <p style={{ color:'var(--red)', fontSize:13 }}>{err}</p>}
          <button className="btn-gold" type="submit">Přihlásit se</button>
        </form>
        <p style={{ fontSize:11, color:'var(--muted2)', marginTop:20 }}>admin@eco-italia.cz / admin123</p>
      </div>
    </div>
  );
}
