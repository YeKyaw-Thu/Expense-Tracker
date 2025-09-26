import API from "./api";

export interface Expense {
  id?: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

// Get all expenses
export const getExpenses = async (): Promise<Expense[]> => {
  const response = await API.get("/expenses");
  return response.data;
};

// Add a new expense
export const addExpense = async (expense: Expense) => {
  const response = await API.post("/expenses", expense);
  return response.data;
};

// Update an expense
export const updateExpense = (id: string, data: {
  amount?: number;
  category?: string;
  description?: string;
}) => API.put(`/expenses/${id}`, data);

// Delete an expense
export const deleteExpense = (id: string) => API.delete(`/expenses/${id}`);
