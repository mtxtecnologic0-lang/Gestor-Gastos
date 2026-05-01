import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/ui/Navbar';
import { ExpenseModal } from '../components/expenses/ExpenseModal';

export const metadata: Metadata = {
  title: 'Gastos Personales',
  description: 'Gestiona tus gastos personales de forma simple',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen antialiased font-sans">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <ExpenseModal />
      </body>
    </html>
  );
}