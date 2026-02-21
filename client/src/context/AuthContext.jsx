import { createContext, useState, useEffect } from "react";
import api from "../services/api";

// Create the context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Read existing auth data from localStorage on startup
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Keep localStorage synced whenever auth changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // LOGIN
  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  // SIGNUP
  const signup = async (data) => {
    const res = await api.post("/auth/signup", data);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  // LOGOUT
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
