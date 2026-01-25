/**
 * Store global pour la gestion de l'état budgétaire
 * Utilise React Context et useReducer pour une gestion d'état centralisée
 */
import React, { createContext, useContext, useReducer } from 'react';

// Création du contexte budgétaire global
const BudgetContext = createContext();

// État initial du budget
const initialState = {
    income: 0,       // Revenu total
    expenses: 0,     // Dépenses totales
};

/**
 * Réducteur pour gérer les actions budgétaires
 * @param {Object} state - État actuel
 * @param {Object} action - Action à effectuer
 * @returns {Object} - Nouvel état
 */
const budgetReducer = (state, action) => {
    switch (action.type) {
        // Ajoute un revenu au montant total des revenus
        case 'ADD_INCOME':
            return { ...state, income: state.income + action.payload };
        // Ajoute une dépense au montant total des dépenses
        case 'ADD_EXPENSE':
            return { ...state, expenses: state.expenses + action.payload };
        // Réinitialise le budget à son état initial
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

/**
 * Provider pour encapsuler les composants avec le contexte budgétaire
 * @param {Object} props - Props contenant les enfants
 * @returns {JSX} - Contexte fourni aux enfants
 */
export const BudgetProvider = ({ children }) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    return (
        <BudgetContext.Provider value={{ state, dispatch }}>
            {children}
        </BudgetContext.Provider>
    );
};

/**
 * Hook personnalisé pour accéder au contexte budgétaire
 * @returns {Object} - État et dispatcher du budget
 */
export const useBudget = () => {
    return useContext(BudgetContext);
};