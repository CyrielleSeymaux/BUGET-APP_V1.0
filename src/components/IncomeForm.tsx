import React, { useState } from 'react';
import { useBudget } from '../hooks';

const IncomeForm: React.FC = () => {
    const budget = useBudget() as any;
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount > 0) {
            budget.actions.addTransaction({ type: 'income', date: new Date().toISOString().slice(0,10), amount, description, category: 'Paycheck' });
            setAmount(0);
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Income Form</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter your income"
            />
            <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
            <button type="submit">Add Income</button>
        </form>
    );
};

export default IncomeForm;