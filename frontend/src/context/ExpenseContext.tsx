"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getExpenses, addExpense as apiAddExpense, deleteExpense as apiDeleteExpense, Expense } from "../services/expenses";

interface ExpenseContextType {
  expenses: Expense[];
  loading: boolean;
  addExpense: (expense: Omit<Expense, "_id" | "createdAt">) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, "_id" | "createdAt">) => {
    try {
      const data = await apiAddExpense(expense);
      setExpenses((prev) => [...prev, data]);
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await apiDeleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, loading, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpenses must be used within ExpenseProvider");
  return context;
};
