/**
 * Définitions des types TypeScript pour l'application budgétaire
 * Interfaces et types utilisés dans toute l'application
 */

/**
 * Interface représentant un revenu
 */
export interface Income {
    id: string;           // Identifiant unique du revenu
    amount: number;       // Montant du revenu
    source: string;       // Source du revenu (salaire, prime, etc.)
    date: Date;          // Date du revenu
}

/**
 * Interface représentant une dépense
 */
export interface Expense {
    id: string;           // Identifiant unique de la dépense
    amount: number;       // Montant de la dépense
    category: string;     // Catégorie de la dépense (alimentation, transport, etc.)
    date: Date;          // Date de la dépense
}

/**
 * Interface représentant le résumé budgétaire
 */
export interface BudgetSummary {
    totalIncome: number;       // Revenu total
    totalExpenses: number;     // Total des dépenses
    potentialSavings: number;  // Économies potentielles (revenu - dépenses)
}