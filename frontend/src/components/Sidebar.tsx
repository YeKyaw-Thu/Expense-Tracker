import Link from "next/link";

export default function Sidebar() {
  // Example: role can come from AuthContext later
  const role = "admin"; // "user" | "admin" | "superadmin"

  return (
    <aside className="w-64 bg-white shadow flex flex-col">
      <div className="p-6 font-bold text-lg border-b">Menu</div>
      <nav className="flex-1 p-4 flex flex-col gap-2">
        <Link href="/dashboard" className="hover:bg-gray-100 p-2 rounded">Dashboard</Link>
        <Link href="/expenses" className="hover:bg-gray-100 p-2 rounded">Expenses</Link>
        {(role === "admin" || role === "superadmin") && (
          <Link href="/users" className="hover:bg-gray-100 p-2 rounded">Users</Link>
        )}
      </nav>
    </aside>
  );
}
