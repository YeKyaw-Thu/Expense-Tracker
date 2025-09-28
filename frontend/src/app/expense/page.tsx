"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ExpensesPage() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [expenses, setExpenses] = useState<any[]>([]); // will fetch from backend later

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <div>Redirecting...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <div>
          <span className="mr-4">Hello, {user?.name || "User"}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6 max-w-3xl mx-auto">
        {/* Add Expense Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-bold mb-4">Add Expense</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Description"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Expense
            </button>
          </form>
        </div>

        {/* Expense List Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Your Expenses</h2>
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No expenses yet
                  </td>
                </tr>
              ) : (
                expenses.map((exp, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{exp.date}</td>
                    <td className="border px-4 py-2">{exp.description}</td>
                    <td className="border px-4 py-2">${exp.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
