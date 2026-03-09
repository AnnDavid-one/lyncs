"use client";

import { useEffect, useState } from "react";
import { type Transaction, type Budget } from "@/lib/dataType";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  MoreVertical,
  Filter,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, getDay } from "date-fns";
import useFinance from "@/hooks/useFinance";

import dynamic from "next/dynamic";

// 2. DYNAMICALLY IMPORT THE "PROBLEM" COMPONENTS
// This tells Next.js: "Skip these entirely during the build command"
const UpdateBudgetCard = dynamic(
  () => import("@/components/UpdateBudgetCard"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[180px] bg-slate-50 animate-pulse rounded-2xl" />
    ),
  },
);

const Barchart = dynamic(() => import("@/components/Barchart"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-slate-50 animate-pulse rounded-2xl" />
  ),
});

const ClearDialog = dynamic(() => import("@/components/ClearDialog"), {
  ssr: false,
});
const AddDialog = dynamic(() => import("@/components/AddDialog"), {
  ssr: false,
});

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  const {
    transactions,
    budget,
    isAddDialogOpen,
    addTransaction,
    setIsAddDialogOpen,
    isClearDialogOpen,
    budgetAmount,
    updateBudget,
    setIsClearDialogOpen,
    getChartData,
    isBudgetDialogOpen,
    totalBalance,
    budgetStatus,
    totalExpense,
    budgetUsed,
    setIsBudgetDialogOpen,
    totalIncome,
    clearAllData,
  } = useFinance();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. If not mounted, return a loading shell or null
  // This stops the build server from executing the logic below
  if (!mounted) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-slate-400">Loading Dashboard...</div>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-3xl font-bold">
                $
                {totalBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <p className="text-xs text-slate-500">
                Your balance has grown by{" "}
                <span className="text-green-600 font-medium">+18%</span> this
                month
              </p>
              <div className="flex gap-2 pt-2">
                <ClearDialog
                  clearAllData={clearAllData}
                  isClearDialogOpen={isClearDialogOpen}
                  setIsClearDialogOpen={setIsClearDialogOpen}
                />
                <AddDialog
                  isAddDialogOpen={isAddDialogOpen}
                  setIsAddDialogOpen={setIsAddDialogOpen}
                  addTransaction={addTransaction}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-600">
              Monthly Income & Expense
            </CardTitle>
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Income</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  $
                  {totalIncome.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  +6.2%
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Expense</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  $
                  {totalExpense.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                  +4.5%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* update budget card */}
        <UpdateBudgetCard
          budgetAmount={budgetAmount}
          budgetUsed={budgetUsed}
          totalExpense={totalExpense}
          budgetStatus={budgetStatus}
          updateBudget={updateBudget}
          isBudgetDialogOpen={isBudgetDialogOpen}
          setIsBudgetDialogOpen={setIsBudgetDialogOpen}
        />
      </div>
      {/* Barchart component */}
      <Barchart getChartData={getChartData} />

      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionTable transactions={transactions.slice(0, 10)} />
        </CardContent>
      </Card>
    </div>
  );
}

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No transactions yet. Add your first transaction to get started!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
              Transaction
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
              Category
            </th>
            <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 uppercase">
              Date
            </th>
            <th className="text-right py-3 px-4 text-xs font-medium text-slate-600 uppercase">
              Amount
            </th>
            <th className="text-center py-3 px-4 text-xs font-medium text-slate-600 uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-slate-100 hover:bg-slate-50"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {transaction.description || transaction.category}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-slate-600">
                {transaction.category}
              </td>
              <td className="py-4 px-4 text-sm text-slate-600">
                {format(new Date(transaction.date), "MM/dd/yyyy")}
              </td>
              <td
                className={`py-4 px-4 text-right text-sm font-medium ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {Number(transaction.amount).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </td>
              <td className="py-4 px-4 text-center">
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {transaction.type === "income" ? "Received" : "Sent"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
