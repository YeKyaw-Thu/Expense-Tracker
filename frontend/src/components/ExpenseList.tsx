"use client";

import React from "react";
import { useExpenses } from "../context/ExpenseContext";

export default function ExpenseList() {
  const { expenses, loading, deleteExpense } = useExpenses();

  if (loading) return <p>Loading expenses...</p>;

  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-3">Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <p>
                  💰 <strong>{expense.amount}</strong> | {expense.category} | {expense.title}
                </p>
              </div>
              <button
                onClick={() => deleteExpense(expense._id!)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
