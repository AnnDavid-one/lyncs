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

interface ClearDialogProps {
  clearAllData: () => void;
  isClearDialogOpen: boolean;
  setIsClearDialogOpen: (open: boolean) => void;
}

export default function ClearDialog({
  clearAllData,
  isClearDialogOpen,
  setIsClearDialogOpen,
}: ClearDialogProps) {
  return (
    <Dialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" /> {/* Add this icon */}
          Clear Data
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl max-w-sm">
        <DialogHeader>
          <DialogTitle>Reset Application?</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-sm text-slate-500">
          This will permanently delete all your transactions and reset your
          budget. This action cannot be undone.
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => setIsClearDialogOpen(false)}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={clearAllData}
            className="rounded-xl bg-red-600 hover:bg-red-700"
          >
            Yes, Clear All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
