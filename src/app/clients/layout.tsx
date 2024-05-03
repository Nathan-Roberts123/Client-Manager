"use client";
import Navbar from "@/components/ui/navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SessionProvider>
        <Navbar />
        <div className="p-8">{children}</div>
      </SessionProvider>
    </div>
  );
}
