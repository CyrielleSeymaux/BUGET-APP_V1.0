/**
 * Composant Dashboard
 * Page principale de l'application qui regroupe tous les composants
 * Affiche : formulaires d'entrée, résumé budgétaire et graphique
 */
import React, { useState } from 'react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import Summary from './Summary';
import Chart from './Chart';
import { TipOfTheDay } from './TipOfTheDay';
import useBudget from '../hooks/useBudget';

const Dashboard: React.FC = () => {
    // États locaux pour gérer les revenus et dépenses
    const [income, setIncome] = useState<number>(0);
    const [expenses, setExpenses] = useState<number[]>([]);
    
    // Récupère les données budgétaires du hook useBudget
    const { income: hookIncome, expenses: hookExpenses, totalExpenses, potentialSavings } = useBudget();
    
    // Utilise les valeurs du hook ou les états locaux
    const totalIncome = hookIncome || income;
    const finalTotalExpenses = totalExpenses || 0;

    const handleAddIncome = (amount: number) => {
        setIncome(prev => prev + amount);
    };

    const handleAddExpense = (expenseData: any) => {
        setExpenses(prev => [...prev, expenseData.amount]);
    };

    return (
        <div>
            <h1>Budget Dashboard</h1>
            {/* Conseil financier du jour */}
            <TipOfTheDay />
            {/* Formulaire pour ajouter des revenus */}
            <IncomeForm onIncomeSubmit={handleAddIncome} />
            {/* Formulaire pour ajouter des dépenses */}
            <ExpenseForm onAddExpense={handleAddExpense} />
            {/* Résumé affichant le total des revenus, dépenses et économies potentielles */}
            <Summary />
            {/* Graphique comparant les revenus et les dépenses */}
            <Chart />
        </div>
    );
};

export default Dashboard;