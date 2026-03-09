"use client";

import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

interface BudgetProps {
  isBudgetDialogOpen: boolean;
  setIsBudgetDialogOpen: (open: boolean) => void;
  budgetAmount: any;
  budgetUsed: any;
  totalExpense: any;
  budgetStatus: any;
  updateBudget: any;
}

export default function UpdateBudgetCard({
  setIsBudgetDialogOpen,
  isBudgetDialogOpen,
  budgetAmount,
  budgetUsed,
  totalExpense,
  budgetStatus,
  updateBudget,
}: BudgetProps) {
  // --- MOUNT GUARD ---
  // This prevents the build server from crashing on the Progress component
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure we are working with valid numbers
  const safeBudget = Number(budgetAmount) || 0;
  const safeUsed = Number(budgetUsed) || 0;
  const safeExpense = Number(totalExpense) || 0;

  // Don't render the problematic parts until we are safely in the browser
  if (!mounted) {
    return (
      <Card className="rounded-2xl border-0 shadow-sm h-[180px] animate-pulse bg-slate-50" />
    );
  }

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-slate-600">
          Monthly Budget
        </CardTitle>
        <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <BudgetForm currentBudget={safeBudget} onSubmit={updateBudget} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Budget</span>
          <span className="text-lg font-bold">
            $
            {safeBudget.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* This component crashes the build if value is NaN. It is now safe. */}
        <Progress value={Math.min(safeUsed, 100)} className="h-2" />

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">
            $
            {safeExpense.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}{" "}
            spent
          </span>
          <span
            className={`text-xs font-medium ${
              budgetStatus === "Over" ? "text-red-600" : "text-green-600"
            }`}
          >
            {budgetStatus || "Under"} Budget
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function BudgetForm({
  currentBudget,
  onSubmit,
}: {
  currentBudget: number;
  onSubmit: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(currentBudget.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    onSubmit(isNaN(val) ? 0 : val);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Update Monthly Budget</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label htmlFor="budget-amount">Budget Amount</Label>
          <Input
            id="budget-amount"
            type="number"
            step="0.01"
            placeholder="2000.00"
            className="rounded-xl"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full rounded-xl">
          Update Budget
        </Button>
      </div>
    </form>
  );
}
