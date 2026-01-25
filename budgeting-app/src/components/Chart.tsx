/**
 * Composant Chart
 * Affiche un graphique en barres comparant les revenus et les dépenses
 * Utilise la bibliothèque react-chartjs-2 pour visualiser les données
 */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import useBudget from '../hooks/useBudget';

const Chart: React.FC = () => {
    // Récupère les revenus et dépenses du hook useBudget
    const { income, expenses } = useBudget();

    // Configuration des données du graphique
    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Budget Overview',
                data: [income, expenses],
                // Couleurs de remplissage et de bordure des barres
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Options de configuration du graphique
    const options = {
        scales: {
            y: {
                beginAtZero: true, // Les axes Y commencent à 0
            },
        },
    };

    return (
        <div>
            <h2>Income vs Expenses</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Chart;