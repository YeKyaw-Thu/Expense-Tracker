"use client";

import "./global.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-100">
        <AuthProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login") return <>{children}</>;

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6 flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
