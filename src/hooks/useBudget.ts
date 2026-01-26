import { useEffect, useReducer, useCallback, useMemo } from 'react';
import { BudgetState, Transaction, Settings } from '../types';

/**
 * Default state for the budget app.
 */
const DEFAULT_STATE: BudgetState & { settings: Settings } = {
  transactions: [],
  categories: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'],
  settings: {
    startingBalance: 0,
  },
};

/**
 * Actions for the budget reducer.
 */
type Action =
  | { type: 'RESTORE'; payload: BudgetState & { settings: Settings } }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'REMOVE_TRANSACTION'; payload: string }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'ADD_CATEGORY'; payload: string }
  | { type: 'REMOVE_CATEGORY'; payload: string }
  | { type: 'RENAME_CATEGORY'; payload: { oldName: string; newName: string } }
  | { type: 'SET_STARTING_BALANCE'; payload: number };

/**
 * Reducer function for managing budget state.
 */
function budgetReducer(
  state: BudgetState & { settings: Settings },
  action: Action
): BudgetState & { settings: Settings } {
  switch (action.type) {
    case 'RESTORE':
      return action.payload;
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'REMOVE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'ADD_CATEGORY':
      if (state.categories.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((c) => c !== action.payload),
        transactions: state.transactions.filter((t) => t.category !== action.payload),
      };
    case 'RENAME_CATEGORY':
      return {
        ...state,
        categories: state.categories.map((c) =>
          c === action.payload.oldName ? action.payload.newName : c
        ),
        transactions: state.transactions.map((t) =>
          t.category === action.payload.oldName
            ? { ...t, category: action.payload.newName }
            : t
        ),
      };
    case 'SET_STARTING_BALANCE':
      return {
        ...state,
        settings: {
          ...state.settings,
          startingBalance: action.payload,
        },
      };
    default:
      return state;
  }
}

/**
 * Custom hook for managing budget state.
 */
export default function useBudget() {
  const [state, dispatch] = useReducer(budgetReducer, DEFAULT_STATE, (initial) => {
    try {
      const stored = localStorage.getItem('budget-app:v1');
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('budget-app:v1', JSON.stringify(state));
  }, [state]);

  // Memoized action creators
  const actions = useMemo(
    () => ({
      addTransaction: (transaction: Omit<Transaction, 'id'>) => {
        dispatch({
          type: 'ADD_TRANSACTION',
          payload: { ...transaction, id: crypto.randomUUID() },
        });
      },
      deleteTransaction: (id: string) => {
        dispatch({ type: 'REMOVE_TRANSACTION', payload: id });
      },
      updateTransaction: (transaction: Transaction) => {
        dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
      },
      addCategory: (category: string) => {
        dispatch({ type: 'ADD_CATEGORY', payload: category });
      },
      renameCategory: (oldName: string, newName: string) => {
        dispatch({ type: 'RENAME_CATEGORY', payload: { oldName, newName } });
      },
      deleteCategory: (category: string) => {
        dispatch({ type: 'REMOVE_CATEGORY', payload: category });
      },
      setStartingBalance: (balance: number) => {
        dispatch({ type: 'SET_STARTING_BALANCE', payload: balance });
      },
    }),
    []
  );

  // Calculate totals
  const totals = useMemo(() => {
    const income = state.transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = state.transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      savings: income - expenses,
    };
  }, [state.transactions]);

  return {
    transactions: state.transactions,
    categories: state.categories,
    settings: state.settings,
    actions,
    ...totals,
  };
}