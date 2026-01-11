import { useState, useEffect } from 'react';

interface LegacyBudget {
    income: number;
    expenses: number[];
}

// Legacy hook kept for reference; not exported under the `useBudget` name.
export const useBudget_legacy = () => {
    const [budget, setBudget] = useState<LegacyBudget>({ income: 0, expenses: [] });

    const addIncome = (amount: number) => {
        setBudget((prevBudget) => ({ ...prevBudget, income: prevBudget.income + amount }));
    };

    const addExpense = (amount: number) => {
        setBudget((prevBudget) => ({ ...prevBudget, expenses: [...prevBudget.expenses, amount] }));
    };

    const calculateSavings = () => {
        const totalExpenses = budget.expenses.reduce((acc, expense) => acc + expense, 0);
        return budget.income - totalExpenses;
    };

    useEffect(() => {
        const storedBudget = localStorage.getItem('budget');
        if (storedBudget) {
            setBudget(JSON.parse(storedBudget));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget));
    }, [budget]);

    return {
        budget,
        addIncome,
        addExpense,
        calculateSavings,
    };
};
