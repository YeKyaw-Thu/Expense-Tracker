"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  getExpenses,
  addExpense as apiAddExpense,
  deleteExpense as apiDeleteExpense,
  Expense,
  AddExpensePayload,
} from "@/services/expenses";

const categories = [
  "Meals",
  "Snacks",
  "Healthcare",
  "Bills",
  "Transportation",
  "Accessories",
  "Donation",
  "Other",
];

export default function ExpensesPage() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: categories[0],
    date: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    };

    fetchExpenses();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <div>Redirecting...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: AddExpensePayload = {
        title: form.title,
        amount: parseFloat(form.amount),
        category: form.category,
        createdAt: form.date,
      };

      const savedExpense = await apiAddExpense(payload);

      const expenseWithId: Expense = {
        _id: savedExpense._id || Date.now().toString(),
        title: form.title,
        amount: parseFloat(form.amount),
        category: form.category,
        createdAt: form.date,
      };

      setExpenses((prev) => [...prev, expenseWithId]);
      setForm({ title: "", amount: "", category: categories[0], date: "" });
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!confirm("Are you sure?")) return;

    try {
      await apiDeleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id)); // remove from UI
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const handleEdit = (expense: Expense) => {
    console.log("Edit", expense);
  };

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
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Add Expense Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Add Expense</h2>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleAdd}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="col-span-2 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-1 md:col-span-4 md:justify-self-end"
            >
              Add Expense
            </button>
          </form>
        </div>

        {/* Expense List Table */}
        <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
          <h2 className="text-lg font-bold mb-4">Your Expenses</h2>
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Category</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">No expenses yet</td>
                </tr>
              ) : (
                expenses.map((exp) => (
                  <tr key={exp._id || `${exp.title}-${exp.amount}-${exp.createdAt}-${Date.now()}`}>
                    <td className="border px-4 py-2">{exp.createdAt?.slice(0, 10)}</td>
                    <td className="border px-4 py-2">{exp.title}</td>
                    <td className="border px-4 py-2">{exp.category}</td>
                    <td className="border px-4 py-2">${exp.amount}</td>
                    <td className="border px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
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
