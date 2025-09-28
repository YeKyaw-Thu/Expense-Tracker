"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser } from "../lib/api";

// --- 1. Define the shape of the context ---
export interface AuthContextType {
  user: any;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// --- 2. Create the context with default values ---
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// --- 3. AuthProvider to wrap the app ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  // Login: store token and fetch user data
  const login = (token: string) => {
    localStorage.setItem("token", token);
    loadUser(token);
  };

  // Logout: remove token and clear user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Fetch user data from backend
  const loadUser = async (token: string) => {
    try {
      const data = await getCurrentUser(token);
      setUser(data);
    } catch (err) {
      console.error("Failed to load user:", err);
      logout();
    }
  };

  // On mount, check if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) loadUser(token);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
