const API_BASE = process.env.NEXT_PUBLIC_API_URL; 

// function getAuthHeader() {
//   const token = localStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// }

export async function registerUser(data: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getCurrentUser(token: string) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// Expenses
// export interface Expense {
//   _id?: string;
//   title: string;
//   amount: number;
//   category: string;
//   description?: string;
//   createdAt?: string;
// }

// export async function getExpenses() {
//   const token = localStorage.getItem("token");
//   const res = await fetch(`${API_BASE}/expenses`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });
//   return res.json();
// }

// export const getExpenses = async () => {
//   const token = localStorage.getItem("token");
//   const res = await fetch(`${API_BASE}/expenses`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });
//   if (!res.ok) {
//     throw new Error(`${res.status} ${res.statusText}`);
//   }
//   return res.json();
// };

// export async function addExpense(expense: Omit<Expense, "_id" | "createdAt">) {
//   const res = await fetch(`${API_BASE}/expenses`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...getAuthHeader(),
//     },
//     body: JSON.stringify(expense),
//   });
//   return res.json();
// }

// export async function deleteExpense(id: string) {
//   const res = await fetch(`${API_BASE}/expenses/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       ...getAuthHeader(),
//     },
//   });
//   return res.json();
// }
