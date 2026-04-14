import React, { createContext, useEffect, useState, ReactNode } from "react";
import { API_URL, fetchWithAuth } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, extraData?: { role?: string, schoolName?: string }) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: (idToken: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from local token
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchWithAuth("/auth/me");
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user auth state", err);
        localStorage.removeItem("auth_token");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const signUp = async (email: string, password: string, extraData?: { role?: string, schoolName?: string }) => {
    try {
      const resp = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ...extraData }),
      });
      
      let data;
      try {
        data = await resp.json();
      } catch (err) {
        throw new Error("Server connection error. Please try again later.");
      }

      if (!resp.ok) {
        throw new Error(data.message || "Registration failed");
      }
      localStorage.setItem("auth_token", data.token);
      setUser(data.user);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const resp = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      let data;
      try {
        data = await resp.json();
      } catch (err) {
        throw new Error("Server connection error. Please try again later.");
      }

      if (!resp.ok) {
        throw new Error(data.message || "Login failed");
      }
      localStorage.setItem("auth_token", data.token);
      setUser(data.user);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signInWithGoogle = async (idToken: string) => {
    try {
      const resp = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Google Login failed");
      
      localStorage.setItem("auth_token", data.token);
      setUser(data.user);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

