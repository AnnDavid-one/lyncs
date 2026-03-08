export type Transaction = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
  created_at: string;
  updated_at: string;
};

export type Budget = {
  id: string;
  amount: number;
  month: number;
  year: number;
  created_at: string;
  updated_at: string;
};
