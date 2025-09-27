"use client";

import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

export default function AddExpenseForm() {
  const { addExpense } = useExpenses();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    await addExpense({ title, amount: Number(amount), category });
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Expense
      </button>
    </form>
  );
}
