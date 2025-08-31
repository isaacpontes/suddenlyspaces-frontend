"use client"

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandlordsLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const { token, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!token || !user) router.replace('/login');
  }, [loading, token, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {children}
    </>
  );
}
