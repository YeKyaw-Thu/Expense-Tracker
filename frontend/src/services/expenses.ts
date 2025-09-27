import API from "./api";

export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  description?: string;
  createdAt?: string;
}

// Get all expenses
export const getExpenses = async () => {
  const response = await API.get("/expenses");
  return response.data;
};

// Add a new expense
export const addExpense = async (expense: Omit<Expense, "_id" | "createdAt">) => {
  const response = await API.post("/expenses", expense);
  return response.data;
};

// Delete an expense
export const deleteExpense = async (id: string) => {
  const response = await API.delete(`/expenses/${id}`);
  return response.data;
};
