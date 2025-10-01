// frontend/src/services/expenses.ts
import API from "./api";

export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  description?: string;
  date?: string;
  createdAt?: string;  // <-- system-generated, don't edit
}

// Get all expenses
export const getExpenses = async () => {
  const response = await API.get("/expenses");
  return response.data;
};

export type AddExpensePayload = Omit<Expense, "_id">;

export const addExpense = async (expense: AddExpensePayload): Promise<Expense> => {
  const response = await API.post("/expenses", expense);
  return response.data;
};

export const updateExpense = async (id: string, expense: Omit<Expense, "_id" | "createdAt">) => {
  const response = await API.put(`/expenses/${id}`, expense);
  return response.data;
};

// Delete an expense
// export const deleteExpense = async (id: string) => {
//   const response = await API.delete(`/expenses/${id}`);
//   return response.data;
// };

export const deleteExpense = async (id: string): Promise<{ message: string }> => {
  const response = await API.delete(`/expenses/${id}`);
  return response.data;
};
