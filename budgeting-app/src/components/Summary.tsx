/**
 * Composant Summary
 * Affiche un résumé des données budgétaires principales
 * Montre : revenus totaux, dépenses totales et économies potentielles
 */
import React from 'react';
import { useBudget } from '../hooks/useBudget';

const Summary: React.FC = () => {
    // Récupère les données budgétaires du hook useBudget
    const { totalIncome, totalExpenses, potentialSavings } = useBudget();

    return (
        <div>
            <h2>Budget Summary</h2>
            {/* Affichage du revenu total */}
            <p>Total Income: ${totalIncome}</p>
            {/* Affichage des dépenses totales */}
            <p>Total Expenses: ${totalExpenses}</p>
            {/* Affichage des économies potentielles (revenu - dépenses) */}
            <p>Potential Savings: ${potentialSavings}</p>
        </div>
    );
};

export default Summary;