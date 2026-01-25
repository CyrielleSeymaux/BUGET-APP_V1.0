/**
 * Composant Dashboard
 * Page principale de l'application qui regroupe tous les composants
 * Affiche : formulaires d'entrée, résumé budgétaire et graphique
 */
import React from 'react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import Summary from './Summary';
import Chart from './Chart';
import { useBudget } from '../hooks/useBudget';

const Dashboard: React.FC = () => {
    // Récupère les données budgétaires du hook useBudget
    const { totalIncome, totalExpenses, potentialSavings } = useBudget();

    return (
        <div>
            <h1>Budget Dashboard</h1>
            {/* Formulaire pour ajouter des revenus */}
            <IncomeForm />
            {/* Formulaire pour ajouter des dépenses */}
            <ExpenseForm />
            {/* Résumé affichant le total des revenus, dépenses et économies potentielles */}
            <Summary 
                totalIncome={totalIncome} 
                totalExpenses={totalExpenses} 
                potentialSavings={potentialSavings} 
            />
            {/* Graphique comparant les revenus et les dépenses */}
            <Chart 
                income={totalIncome} 
                expenses={totalExpenses} 
            />
        </div>
    );
};

export default Dashboard;