import React from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = React.useState({ token: null, role: null });


  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setAuth({ token: token, role: decodedToken.role });
    }
  }, []);

  // Storage solo guarda cadenas de texto
  const setToken = async (token) => {
    const decodedToken = jwtDecode(token);
    localStorage.setItem("token", token);
    setAuth({ token: token, role: decodedToken.role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, role: null });
  };

  // Los componentes hijos heredan las siguientes funciones ->
  return (
    <AuthContext.Provider value={{ auth, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
