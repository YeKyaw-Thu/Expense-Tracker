// import AddExpenseForm from "./components/AddExpenseForm";
// import ExpenseList from "./components/ExpenseList";

// export default function Home() {
//   return (
//     <div className="max-w-lg mx-auto mt-10 space-y-6">
//       <AddExpenseForm />
//       <ExpenseList />
//     </div>
//   );
// }

import AddExpenseForm from "./components/AddExpenseForm";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <AddExpenseForm />
    </div>
  );
}

