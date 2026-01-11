export const calculateTotalIncome = (incomeArray: number[]): number => {
    return incomeArray.reduce((total, income) => total + income, 0);
};

export const calculateTotalExpenses = (expenseArray: number[]): number => {
    return expenseArray.reduce((total, expense) => total + expense, 0);
};

export const calculatePotentialSavings = (totalIncome: number, totalExpenses: number): number => {
    return totalIncome - totalExpenses;
};