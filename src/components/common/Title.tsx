import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
      {children}
    </h1>
  )
}