"use client"

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

function HeaderLink(props: { href: string, text: string }) {
  return (
    <Link className="grid place-content-center h-full px-4 hover:bg-gray-100" href={props.href}>
      {props.text}
    </Link>
  )
}

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <header className="bg-white flex items-center justify-between h-12 px-4 md:px-12 lg:px-24 xl:px-48 shadow">
      <div>
        <Link href={'/'} className="font-bold">SuddenlySpaces</Link>
      </div>

      <nav className="flex gap-2 h-full items-center">
        {user ? (
          <>
            <div className="text-gray-500">Olá, {user.name}</div>
            <HeaderLink href="/landlords/dashboard" text="Landlord Dashboard" />
            <button
              className="text-red-500 hover:text-red-700 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <HeaderLink href="/login" text="Sign in" />
            <HeaderLink href="/register" text="Sign up" />
          </>
        )}
      </nav>
    </header >
  )
}