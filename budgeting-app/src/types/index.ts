export interface Income {
    id: string;
    amount: number;
    source: string;
    date: Date;
}

export interface Expense {
    id: string;
    amount: number;
    category: string;
    date: Date;
}

export interface BudgetSummary {
    totalIncome: number;
    totalExpenses: number;
    potentialSavings: number;
}