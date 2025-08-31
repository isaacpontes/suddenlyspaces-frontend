import { FC, ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode,
  className?: string
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main
      className={`min-h-[calc(100vh-3rem)] px-0 md:px-12 lg:px-24 xl:px-48 ${className}`}
    >
      {children}
    </main>
  );
}