/**
 * Composant Chart
 * Affiche un graphique en barres comparant les revenus et les dépenses
 * Utilise la bibliothèque recharts pour visualiser les données
 */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useBudget from '../hooks/useBudget';

const Chart: React.FC = () => {
    // Récupère les revenus et dépenses du hook useBudget
    const { income, expenses } = useBudget();

    // Configuration des données du graphique
    const data = [
        {
            name: 'Budget',
            Income: income,
            Expenses: expenses,
        },
    ];

    return (
        <div>
            <h2>Income vs Expenses</h2>
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" fill="#4CAF50" />
                <Bar dataKey="Expenses" fill="#FF6B6B" />
            </BarChart>
        </div>
    );
};

export default Chart;