/**
 * Composant IncomeForm
 * Formulaire pour ajouter un nouveau revenu
 * Permet à l'utilisateur de saisir le montant du revenu
 */
import React, { useState } from 'react';

const IncomeForm: React.FC<{ onIncomeSubmit: (income: number) => void }> = ({ onIncomeSubmit }) => {
    // État pour stocker le montant du revenu
    const [income, setIncome] = useState<number | ''>('');

    /**
     * Gère la soumission du formulaire
     * Valide les données et appelle le callback onIncomeSubmit
     */
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (income !== '') {
            onIncomeSubmit(Number(income));
            // Réinitialise le champ du formulaire
            setIncome('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="income">Enter your income:</label>
                {/* Champ numérique pour saisir le montant du revenu */}
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