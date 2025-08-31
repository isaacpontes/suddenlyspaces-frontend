import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none cursor-pointer";
  const variants = {
    primary: "bg-gray-800 text-white hover:bg-gray-700",
    secondary:
      "border border-gray-300 text-gray-600 hover:bg-gray-100 bg-white",
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
