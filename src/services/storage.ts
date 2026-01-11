import { Budget } from '../types/index';

const STORAGE_KEY = 'budgetData';

export const saveBudgetData = (data: Budget) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getBudgetData = (): Budget | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearBudgetData = () => {
    localStorage.removeItem(STORAGE_KEY);
};