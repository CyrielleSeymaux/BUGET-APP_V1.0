import React, { createContext, useContext, useReducer } from 'react';

const BudgetContext = createContext();

const initialState = {
    income: 0,
    expenses: 0,
};

const budgetReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_INCOME':
            return { ...state, income: state.income + action.payload };
        case 'ADD_EXPENSE':
            return { ...state, expenses: state.expenses + action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export const BudgetProvider = ({ children }) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    return (
        <BudgetContext.Provider value={{ state, dispatch }}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    return useContext(BudgetContext);
};