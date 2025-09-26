"use client";  // <<< THIS IS REQUIRED

import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../../services/expenses";

interface Expense {
  _id: string;
  amount: number;
  category: string;
  description?: string;
  createdAt: string;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  // delete handler
  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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
                  💰 <strong>{expense.amount}</strong> | {expense.category}
                </p>
                {expense.description && (
                  <p className="text-sm text-gray-600">{expense.description}</p>
                )}
                <p className="text-xs text-gray-400">
                  {new Date(expense.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(expense._id)}
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
};

export default ExpenseList;
