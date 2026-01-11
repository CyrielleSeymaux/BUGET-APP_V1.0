import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (expense && amount) {
            onAddExpense({ expense, amount: parseFloat(amount) });
            setExpense('');
            setAmount('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="expense">Expense:</label>
                <input
                    type="text"
                    id="expense"
                    value={expense}
                    onChange={(e) => setExpense(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;