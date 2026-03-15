import { createContext, useContext, useState } from 'react';
const Ctx = createContext();
export function AuthProvider({children}) {
  const [token, setToken] = useState(()=>localStorage.getItem('eco-token'));
  const login = t => { setToken(t); localStorage.setItem('eco-token',t); };
  const logout = () => { setToken(null); localStorage.removeItem('eco-token'); };
  return <Ctx.Provider value={{token,login,logout,isAdmin:!!token}}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
