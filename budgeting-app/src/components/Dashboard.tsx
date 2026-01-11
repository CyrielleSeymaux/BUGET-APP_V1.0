import React from 'react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';
import Summary from './Summary';
import Chart from './Chart';
import { useBudget } from '../hooks/useBudget';

const Dashboard: React.FC = () => {
    const { totalIncome, totalExpenses, potentialSavings } = useBudget();

    return (
        <div>
            <h1>Budget Dashboard</h1>
            <IncomeForm />
            <ExpenseForm />
            <Summary 
                totalIncome={totalIncome} 
                totalExpenses={totalExpenses} 
                potentialSavings={potentialSavings} 
            />
            <Chart 
                income={totalIncome} 
                expenses={totalExpenses} 
            />
        </div>
    );
};

export default Dashboard;