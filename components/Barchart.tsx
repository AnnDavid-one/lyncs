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

interface BarChartProps {
  getChartData: () => any[];
}

export default function Barchart({ getChartData }: BarChartProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady)
    return <div className="h-[300px] bg-slate-50 animate-pulse rounded-2xl" />;
  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-income " />
              <span className="text-sm text-slate-600">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-expense" />
              <span className="text-sm text-slate-600">Expense</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="rounded-lg text-xs">
            1W
          </Button>
          <Button size="sm" variant="outline" className="rounded-lg text-xs">
            1M
          </Button>
          <Button size="sm" variant="outline" className="rounded-lg text-xs">
            6M
          </Button>
          <Button size="sm" variant="outline" className="rounded-lg text-xs">
            1Y
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={getChartData()}
            // Adjust barCategoryGap to reduce space between groups of bars
            barCategoryGap="10%"
            // {/* Adjust barGap to reduce space between the 'Deposit' and 'Withdraw' bars themselves */}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fill: "#b1780e", fontSize: 12 }} />
            <YAxis tick={{ fill: "#052d64", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="Income" fill="var(--income)" radius={[8, 8, 0, 0]} />
            <Bar
              dataKey="Expenses"
              fill="var(--expense)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
