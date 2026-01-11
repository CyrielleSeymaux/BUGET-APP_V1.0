export interface Budget {
    income: number;
    expenses: Expense[];
    totalExpenses: number;
    potentialSavings: number;
}

export interface Expense {
    id: string;
    description: string;
    amount: number;
}

// Re-export shared app types from src/types.ts so imports like
// `import type { Transaction } from '../types'` work across the app.
export * from '../types';