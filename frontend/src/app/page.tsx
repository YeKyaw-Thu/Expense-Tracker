import { ExpenseProvider } from "../context/ExpenseContext";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";

export default function HomePage() {
  return (
    <ExpenseProvider>
      <div className="max-w-lg mx-auto mt-10 space-y-6 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Expense Tracker</h1>
        <AddExpenseForm />
        <ExpenseList />
      </div>
    </ExpenseProvider>
  );
}
