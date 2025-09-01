"use client";

import LandlordAuthService from "@/services/landlords/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type Landlord = {
  id: string;
  name: string;
  email: string;
  role: 'landlord'
};

interface AuthContextType {
  user: Landlord | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Landlord | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("accessToken");

      if (savedToken) {
        try {
          const response = await LandlordAuthService.me(savedToken);
          setUser(response.landlord);
          setToken(savedToken);
          localStorage.setItem("user", JSON.stringify(response.landlord));
        } catch (err) {
          logout();
          router.push("/login");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { landlord, token } = await LandlordAuthService.login(email, password);

      setUser(landlord);
      setToken(token);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(landlord));
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
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
