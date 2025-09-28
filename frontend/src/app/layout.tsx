import "./global.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Expense Tracker",
  description: "Track your expenses efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
