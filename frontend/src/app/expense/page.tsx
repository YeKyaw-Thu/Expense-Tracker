"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  getExpenses,
  addExpense as apiAddExpense,
  updateExpense as apiUpdateExpense,
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: categories[0],
    date: "",
  });

  // Fetch expenses on page load
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchExpenses = async () => {
      try {
        const data = await getExpenses(); // backend already sorted by date
        setExpenses(data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    };

    fetchExpenses();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return <div>Redirecting...</div>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: AddExpensePayload = {
        title: form.title,
        amount: parseFloat(form.amount),
        category: form.category,
        date: form.date,
      };

      if (editingId) {
        // Update existing expense
        await apiUpdateExpense(editingId, payload);
        const data = await getExpenses();
        setExpenses(data);
        setEditingId(null);
      } else {
        // Add new expense
        await apiAddExpense(payload);
        const data = await getExpenses();
        setExpenses(data);
      }

      // Reset form
      setForm({ title: "", amount: "", category: categories[0], date: "" });
    } catch (err) {
      console.error("Failed to save expense:", err);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm("Are you sure?")) return;

    try {
      await apiDeleteExpense(id);
      setExpenses(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingId(expense._id!);
    setForm({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date?.slice(0, 10) || "",
    });
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
        {/* Add / Edit Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">
            {editingId ? "Edit Expense" : "Add Expense"}
          </h2>
          <form
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            onSubmit={handleSubmit}
          >
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
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-1 md:col-span-4 md:justify-self-end"
            >
              {editingId ? "Update Expense" : "Add Expense"}
            </button>
          </form>
        </div>

        {/* Expense List */}
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
                  <td colSpan={5} className="text-center py-4">
                    No expenses yet
                  </td>
                </tr>
              ) : (
                expenses.map(exp => (
                  <tr
                    key={exp._id || `${exp.title}-${exp.amount}-${exp.date}-${Date.now()}`}
                  >
                    <td className="border px-4 py-2">{exp.date?.slice(0, 10)}</td>
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
