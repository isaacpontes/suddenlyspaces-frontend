"use client";

import LandlordAuthService from "@/services/landlords/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import TenantAuthService from "@/services/tenants/auth";

type User = {
  id: string;
  name: string;
  email: string;
  role: "tenant" | "landlord"
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (as: "tenant" | "landlord", email: string, password: string) => Promise<void>;
  register: (as: "tenant" | "landlord", data: { name: string, email: string, password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("accessToken");
      const savedUser: User | null = JSON.parse(localStorage.getItem("user") ?? "null");
      if (!savedToken || !savedUser) return setLoading(false);

      try {
        let response
        if (savedUser.role === "landlord") {
          response = await LandlordAuthService.me(savedToken);
          setUser(response.landlord);
          setToken(savedToken);
          localStorage.setItem("user", JSON.stringify(response.landlord));
        } else {
          response = await TenantAuthService.me(savedToken);
          setUser(response.tenant);
          setToken(savedToken);
          localStorage.setItem("user", JSON.stringify(response.tenant));
        }
      } catch (err) {
        logout();
        router.push("/auth/login");
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (as: "tenant" | "landlord", email: string, password: string) => {
    setLoading(true);
    try {
      let user = null;
      let token = null;
      if (as === "landlord") {
        const response = await LandlordAuthService.login(email, password);
        user = response.landlord;
        token = response.token;
      } else {
        const response = await TenantAuthService.login(email, password);
        user = response.tenant;
        token = response.token;
      }

      setUser(user);
      setToken(token);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push(`/${as}s/dashboard`);
    } finally {
      setLoading(false);
    }
  };

  const register = async (as: "tenant" | "landlord", data: { name: string, email: string, password: string }) => {
    setLoading(true);
    try {
      let user = null;
      let token = null;
      if (as === "landlord") {
        const response = await LandlordAuthService.register(data);
        user = response.landlord;
        token = response.token;
      } else {
        const response = await TenantAuthService.register(data);
        user = response.tenant;
        token = response.token;
      }

      setUser(user);
      setToken(token);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
