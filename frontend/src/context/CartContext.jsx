import { createContext, useContext, useReducer, useEffect } from 'react';
const Ctx = createContext();
function reducer(state, action) {
  switch(action.type) {
    case 'ADD': { const e = state.find(i=>i.id===action.item.id); return e ? state.map(i=>i.id===action.item.id?{...i,qty:i.qty+1}:i) : [...state,{...action.item,qty:1}]; }
    case 'REMOVE': return state.filter(i=>i.id!==action.id);
    case 'UPDATE': return state.map(i=>i.id===action.id?{...i,qty:action.qty}:i);
    case 'CLEAR': return [];
    default: return state;
  }
}
export function CartProvider({children}) {
  const [cart, dispatch] = useReducer(reducer, [], () => { try { return JSON.parse(localStorage.getItem('eco-cart'))||[]; } catch { return []; } });
  useEffect(()=>{ localStorage.setItem('eco-cart', JSON.stringify(cart)); },[cart]);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);
  return <Ctx.Provider value={{cart,dispatch,total,count}}>{children}</Ctx.Provider>;
}
export const useCart = () => useContext(Ctx);
