export type TxType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TxType;
  date: string; // ISO
  amount: number; // positive
  description?: string;
  category: string;
}

export interface Settings {
  startingBalance: number;
}

export interface BudgetState {
  transactions: Transaction[];
  categories: string[];
}