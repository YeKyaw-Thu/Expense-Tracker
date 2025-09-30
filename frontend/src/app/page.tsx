"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/expense");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return <div>Loading...</div>;
}
