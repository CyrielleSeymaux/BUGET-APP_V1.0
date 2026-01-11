import { useState } from 'react';

const useBudget = () => {
    const [income, setIncome] = useState<number>(0);
    const [expenses, setExpenses] = useState<number[]>([]);

    const addIncome = (amount: number) => {
        setIncome(prevIncome => prevIncome + amount);
    };

    const addExpense = (amount: number) => {
        setExpenses(prevExpenses => [...prevExpenses, amount]);
    };

    const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);
    const potentialSavings = income - totalExpenses;

    return {
        income,
        expenses,
        totalExpenses,
        potentialSavings,
        addIncome,
        addExpense,
    };
};

export default useBudget;