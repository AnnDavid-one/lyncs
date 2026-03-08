import { Transaction, Budget } from "@/lib/dataType";
import { getDay } from "date-fns";
import { useState, useEffect } from "react";

// 1. Add this helper check at the top of useFinance.ts
const isBrowser = typeof window !== "undefined";

const useFinance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Only run if we are in the browser
  // 1. UPDATED: Pure Local Storage Logic with your specific Dummy structure
  useEffect(() => {
    if (!isBrowser) return;
    const savedTransactions = localStorage.getItem("transactions");
    const savedBudget = localStorage.getItem("budget");
    // This flag checks if the user intentionally cleared the data
    const isCleared = localStorage.getItem("isDataCleared") === "true";
    const now = new Date().toISOString();

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else if (!isCleared) {
      // ONLY seed dummy data if it hasn't been intentionally cleared
      const dummy: Transaction[] = [
        {
          id: "1",
          amount: 1200,
          category: "Salary",
          description: "Initial Balance",
          date: now,
          type: "income",
          created_at: now,
          updated_at: now,
        },
      ];
      setTransactions(dummy);
      localStorage.setItem("transactions", JSON.stringify(dummy));
    }

    if (savedBudget) {
      setBudget(JSON.parse(savedBudget));
    } else if (!isCleared) {
      const defaultBudget = {
        amount: 2000,
        month: currentMonth,
        year: currentYear,
        created_at: now,
        updated_at: now,
      };
      setBudget(defaultBudget as Budget);
      localStorage.setItem("budget", JSON.stringify(defaultBudget));
    }
    setLoading(false);
  }, [currentMonth, currentYear]);

  // 2. UPDATED: Add Transaction locally with timestamps
  const addTransaction = (formData: any) => {
    localStorage.removeItem("isDataCleared"); // Reset the flag
    const now = new Date().toISOString();
    const newTransaction: Transaction = {
      ...formData,
      id: crypto.randomUUID(),
      created_at: now,
      updated_at: now,
    };
    const updatedTransactions = [newTransaction, ...transactions];

    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setIsAddDialogOpen(false);
  };

  // 3. UPDATED: Update Budget locally with timestamps
  const updateBudget = (amount: number) => {
    const now = new Date().toISOString();
    const updatedBudget = {
      ...budget,
      amount,
      month: currentMonth,
      year: currentYear,
      updated_at: now,
    };
    setBudget(updatedBudget as Budget);
    localStorage.setItem("budget", JSON.stringify(updatedBudget));
    setIsBudgetDialogOpen(false);
  };

  // --- LOGIC CALCULATIONS (Unchanged) ---
  const currentMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return (
      date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear
    );
  });

  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;
  const budgetAmount = budget?.amount || 2000;
  const budgetUsed = (totalExpense / budgetAmount) * 100;
  const budgetStatus = totalExpense > budgetAmount ? "Over" : "Under";

  const getChartData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const data = days.map((day, index) => {
      const dayTransactions = currentMonthTransactions.filter((t) => {
        const date = new Date(t.date);
        return getDay(date) === index;
      });

      const income = dayTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expenses = dayTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return { day, Income: income, Expenses: expenses };
    });

    return data;
  };

  const clearAllData = () => {
    localStorage.removeItem("transactions");
    localStorage.removeItem("budget");
    // Set the flag so the dummy data doesn't come back on reload
    localStorage.setItem("isDataCleared", "true");

    setIsClearDialogOpen(false);
    window.location.reload(); // Resets to your dummy "Salary" state
  };
  return {
    transactions,
    budget,
    isAddDialogOpen,
    addTransaction,
    setIsAddDialogOpen,
    isClearDialogOpen,
    budgetAmount,
    updateBudget,
    setIsClearDialogOpen,
    isBudgetDialogOpen,
    totalBalance,
    budgetStatus,
    totalExpense,
    budgetUsed,
    setIsBudgetDialogOpen,
    totalIncome,
    clearAllData,
    getChartData,
  };
};

export default useFinance;
