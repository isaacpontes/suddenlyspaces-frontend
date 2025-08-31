import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { }

export default function Select({ children, className = "", ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={
        `w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm 
        focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700
        ${className}`
      }
    >
      {children}
    </select>
  );
}
