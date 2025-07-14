import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, set token from localStorage and check session
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    api.get("/auth/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    setUser(res.data.user || res.data); // support both {user, token} and just user
    localStorage.setItem("token", res.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
  };

  const logout = async () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    await api.post("/auth/logout").catch(() => {});
  };

  const updateProfile = (newUser) => setUser(newUser);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 