import React, { createContext, useState } from "react";

export const AuthContext = createContext(); // 👈 Lo exportamos para usarlo directamente

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(() => {
    const emailGuardado = localStorage.getItem("email");
    return emailGuardado || null;
  });

  const login = (emailUsuario) => {
    setEmail(emailUsuario);
    localStorage.setItem("email", emailUsuario);
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
