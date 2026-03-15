import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, dispatch, total } = useCart();
  const nav = useNavigate();

  if (cart.length === 0) return (
    <div className="page-wrap" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:24 }}>
      <div className="gold-line" />
      <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:40, fontWeight:400, margin:'12px 0 10px' }}>Košík je prázdný</h2>
      <p style={{ color:'var(--muted)', marginBottom:32 }}>Prozkoumejte naši kolekci italských eko produktů</p>
      <Link to="/katalog" className="btn-gold">Přejít do katalogu</Link>
    </div>
  );

  return (
    <div className="page-wrap" style={{ paddingTop:100, paddingBottom:88 }}>
      <div className="container">
        <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:44, fontWeight:400, marginBottom:44 }}>Košík</h1>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:40, alignItems:'start' }}>
          <div>
            {cart.map(item => (
              <div key={item.id} style={{ display:'flex', alignItems:'center', gap:18, padding:'18px 0', borderBottom:'1px solid var(--border)' }}>
                <img src={item.image} alt={item.nameCs} style={{ width:76, height:76, objectFit:'cover', borderRadius:8, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:17, fontWeight:400, marginBottom:3 }}>{item.nameCs}</h3>
                  <p style={{ fontSize:12, color:'var(--muted)' }}>{item.origin}</p>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:12, background:'var(--glass)', border:'1px solid var(--border)', borderRadius:50, padding:'6px 14px' }}>
                  <button onClick={()=>dispatch({type:'UPDATE',id:item.id,qty:Math.max(1,item.qty-1)})} style={{ background:'none', color:'var(--gold)', fontSize:16 }}>−</button>
                  <span style={{ fontSize:14, minWidth:18, textAlign:'center' }}>{item.qty}</span>
                  <button onClick={()=>dispatch({type:'UPDATE',id:item.id,qty:item.qty+1})} style={{ background:'none', color:'var(--gold)', fontSize:16 }}>+</button>
                </div>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:18, color:'var(--gold)', minWidth:90, textAlign:'right' }}>{(item.price*item.qty).toLocaleString()} Kč</div>
                <button onClick={()=>dispatch({type:'REMOVE',id:item.id})} style={{ background:'none', color:'var(--muted2)', fontSize:14, padding:'4px 8px', transition:'color .2s' }}
                  onMouseEnter={e=>e.target.style.color='var(--red)'} onMouseLeave={e=>e.target.style.color='var(--muted2)'}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ background:'var(--glass)', border:'1px solid var(--border)', borderRadius:14, padding:28, position:'sticky', top:100 }}>
            <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontWeight:400, marginBottom:24 }}>Shrnutí</h3>
            {[['Mezisoučet', `${total.toLocaleString()} Kč`],['Doprava', 'Zdarma']].map(([l,v]) => (
              <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'var(--muted)', padding:'10px 0', borderBottom:'1px solid var(--border)' }}><span>{l}</span><span>{v}</span></div>
            ))}
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:18, fontFamily:'Cormorant Garamond,serif', padding:'16px 0 0', color:'var(--gold)' }}>
              <strong>Celkem</strong><strong>{total.toLocaleString()} Kč</strong>
            </div>
            <button className="btn-gold" style={{ width:'100%', marginTop:22 }} onClick={() => nav('/pokladna')}>Přejít k pokladně</button>
            <Link to="/katalog" className="btn-ghost" style={{ width:'100%', marginTop:10, display:'flex', justifyContent:'center' }}>Pokračovat v nákupu</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
