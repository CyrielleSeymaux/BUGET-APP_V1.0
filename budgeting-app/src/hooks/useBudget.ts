/**
 * Hook personnalisé useBudget
 * Gère la logique de l'application budgétaire
 * Permet l'ajout de revenus et dépenses avec calcul automatique des totaux
 */
import { useState } from 'react';

const useBudget = () => {
    // État pour stocker le revenu total
    const [income, setIncome] = useState<number>(0);
    // État pour stocker la liste des dépenses
    const [expenses, setExpenses] = useState<number[]>([]);

    /**
     * Ajoute un montant au revenu total
     * @param amount - Montant à ajouter au revenu
     */
    const addIncome = (amount: number) => {
        setIncome(prevIncome => prevIncome + amount);
    };

    /**
     * Ajoute une dépense à la liste des dépenses
     * @param amount - Montant de la dépense
     */
    const addExpense = (amount: number) => {
        setExpenses(prevExpenses => [...prevExpenses, amount]);
    };

    // Calcule le total des dépenses en additionnant tous les éléments du tableau
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);
    // Calcule les économies potentielles (revenu - dépenses)
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