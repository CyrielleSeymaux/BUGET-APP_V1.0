/**
 * Fonctions utilitaires pour les calculs budgétaires
 * Fournit des fonctions de calcul réutilisables dans toute l'application
 */

/**
 * Calcule le revenu total à partir d'un tableau de revenus
 * @param {number[]} incomeArray - Tableau des montants de revenus
 * @returns {number} - Le revenu total
 */
export const calculateTotalIncome = (incomeArray: number[]): number => {
    return incomeArray.reduce((total, income) => total + income, 0);
};

/**
 * Calcule le total des dépenses à partir d'un tableau de dépenses
 * @param {number[]} expenseArray - Tableau des montants de dépenses
 * @returns {number} - Le total des dépenses
 */
export const calculateTotalExpenses = (expenseArray: number[]): number => {
    return expenseArray.reduce((total, expense) => total + expense, 0);
};

/**
 * Calcule les économies potentielles
 * @param {number} totalIncome - Revenu total
 * @param {number} totalExpenses - Total des dépenses
 * @returns {number} - Les économies potentielles (revenu - dépenses)
 */
export const calculatePotentialSavings = (totalIncome: number, totalExpenses: number): number => {
    return totalIncome - totalExpenses;
};