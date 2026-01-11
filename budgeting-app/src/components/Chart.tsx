import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useBudget } from '../hooks/useBudget';

const Chart: React.FC = () => {
    const { income, expenses } = useBudget();

    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Budget Overview',
                data: [income, expenses],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
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