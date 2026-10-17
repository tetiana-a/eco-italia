import { createContext, useContext, useState } from 'react';
const Ctx = createContext();
export function AuthProvider({children}) {
  const [token, setToken] = useState(()=>localStorage.getItem('eco-token'));
  const login = t => { setToken(t); localStorage.setItem('eco-token',t); };
  const logout = () => { setToken(null); localStorage.removeItem('eco-token'); };
  // Admin requests: attach the session token; an expired session sends the admin back to login.
  const authFetch = async (url, opts = {}) => {
    const r = await fetch(url, { ...opts, headers: { ...(opts.headers || {}), Authorization: `Bearer ${token}` } });
    if (r.status === 401) logout();
    return r;
  };
  return <Ctx.Provider value={{token,login,logout,authFetch,isAdmin:!!token}}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
