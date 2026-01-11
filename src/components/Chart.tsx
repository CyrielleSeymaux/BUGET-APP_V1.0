import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useBudget } from '../hooks';

const Chart: React.FC = () => {
    const { transactions } = useBudget() as any;

    const totalIncome = transactions.filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + t.amount, 0);
    const totalExpenses = transactions.filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + t.amount, 0);

    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Budget Overview',
                data: [totalIncome, totalExpenses],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = { scales: { y: { beginAtZero: true } } } as any;

    return (
        <div>
            <h2>Budget Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Chart;