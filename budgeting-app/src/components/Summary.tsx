import React from 'react';
import { useBudget } from '../hooks/useBudget';

const Summary: React.FC = () => {
    const { totalIncome, totalExpenses, potentialSavings } = useBudget();

    return (
        <div>
            <h2>Budget Summary</h2>
            <p>Total Income: ${totalIncome}</p>
            <p>Total Expenses: ${totalExpenses}</p>
            <p>Potential Savings: ${potentialSavings}</p>
        </div>
    );
};

export default Summary;