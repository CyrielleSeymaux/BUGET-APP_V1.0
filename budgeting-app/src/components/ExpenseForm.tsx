/**
 * Composant ExpenseForm
 * Formulaire pour ajouter une nouvelle dépense
 * Permet à l'utilisateur de saisir la catégorie et le montant de la dépense
 */
import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
    // État pour stocker le nom de la dépense
    const [expense, setExpense] = useState('');
    // État pour stocker le montant de la dépense
    const [amount, setAmount] = useState('');

    /**
     * Gère la soumission du formulaire
     * Valide les données et appelle le callback onAddExpense
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (expense && amount) {
            onAddExpense({ expense, amount: parseFloat(amount) });
            // Réinitialise les champs du formulaire
            setExpense('');
            setAmount('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Champ pour la catégorie de dépense */}
            <div>
                <label htmlFor="expense">Expense:</label>
                <input
                    type="text"
                    id="expense"
                    value={expense}
                    onChange={(e) => setExpense(e.target.value)}
                />
            </div>
            {/* Champ pour le montant de la dépense */}
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