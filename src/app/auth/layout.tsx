"use client"

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) router.replace(`/${user.role}s/dashboard`);
  }, [loading, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {children}
    </>
  );
}
