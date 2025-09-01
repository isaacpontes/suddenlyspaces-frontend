import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = `
    rounded-md px-4 py-2 text-sm font-medium
    transition focus:outline-none cursor-pointer
    disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed
  `;
  const variants = {
    primary: "bg-gray-800 text-white hover:bg-gray-700",
    secondary: "border border-gray-300 text-gray-600 hover:bg-gray-100 bg-white",
    danger: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
