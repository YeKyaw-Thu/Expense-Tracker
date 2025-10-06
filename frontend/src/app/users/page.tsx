"use client";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Users() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "superadmin")) router.push("/login");
  }, [user]);

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <p>List of users will appear here (admin only).</p>
    </div>
  );
}
