import { InputHTMLAttributes } from "react";

export default function Input({ className = "", type = "text", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 ${className}`}
      {...props}
      type={type}
    />
  );
}
