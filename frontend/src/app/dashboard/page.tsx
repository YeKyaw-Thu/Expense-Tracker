"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login"); // redirect if not logged in
  }, [user]);

  if (!user) return null; // show nothing while redirecting

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard ({user.role})</h2>
      <p>Welcome back, {user.name}!</p>

      {user.role === "user" && <p>User Dashboard Content</p>}
      {user.role === "admin" && <p>Admin Dashboard Content</p>}
      {user.role === "superadmin" && <p>Superadmin Dashboard Content</p>}
    </div>
  );
}
