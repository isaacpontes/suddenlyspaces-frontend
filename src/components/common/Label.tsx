import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

export default function Label({ text, className, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={`mb-1 block text-sm font-medium text-gray-700 ${className}`}
    >
      {text}
    </label>
  );
}
