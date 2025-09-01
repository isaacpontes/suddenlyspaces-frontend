"use client";

import PageContainer from "@/components/PageContainer";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"landlord" | "tenant">("tenant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(activeTab, email, password);
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <PageContainer>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 mt-16 mx-auto shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Welcome Back!
        </h1>

        <div className="mb-6 flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 text-sm font-medium cursor-pointer ${activeTab === "tenant"
              ? "border-b-2 border-gray-800 text-gray-900"
              : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => {
              setActiveTab("tenant")
              setEmail("")
              setPassword("")
            }}
          >
            Tenant
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium cursor-pointer ${activeTab === "landlord"
              ? "border-b-2 border-gray-800 text-gray-900"
              : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => {
              setActiveTab("landlord")
              setEmail("")
              setPassword("")
            }}
          >
            Landlord
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <div>
            <Label text="Email" htmlFor="email" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label text="Password" htmlFor="password" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          {activeTab === "landlord"
            ? "Are you a tenant? Switch above."
            : "Are you a landlord? Switch above."}
        </p>

        <p className="mt-4 text-center text-xs text-gray-500">
          Don't have an account yet? <Link href={'/auth/register'} className="text-blue-500 hover:text-blue-700">Sign Up Now</Link>
        </p>
      </div>
    </PageContainer>
  );
}
