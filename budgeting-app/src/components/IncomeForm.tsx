import React, { useState } from 'react';

const IncomeForm: React.FC<{ onIncomeSubmit: (income: number) => void }> = ({ onIncomeSubmit }) => {
    const [income, setIncome] = useState<number | ''>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (income !== '') {
            onIncomeSubmit(Number(income));
            setIncome('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="income">Enter your income:</label>
                <input
                    type="number"
                    id="income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Income</button>
        </form>
    );
};

export default IncomeForm;