import React, { useState } from 'react';
import { useBudget } from '../hooks';

const ExpenseForm: React.FC = () => {
    const budget = useBudget() as any;
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount > 0) {
            budget.actions.addTransaction({ type: 'expense', date: new Date().toISOString().slice(0,10), amount, description, category });
            setAmount(0);
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Expense</h2>
            <div>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Category:
                    <input value={category} onChange={e=>setCategory(e.target.value)} />
                </label>
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;