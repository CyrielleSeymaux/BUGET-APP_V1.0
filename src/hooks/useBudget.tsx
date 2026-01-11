import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Transaction, Settings } from '../types';

const STORAGE_KEY = 'budget-app:v1';
const LEGACY_KEY = 'budget';
const BACKUP_PREFIX = 'budget-app:backup:';

type State = { transactions: Transaction[]; categories: string[]; settings: Settings };

const seed = (): State => ({
  settings: { startingBalance: 10000 },
  categories: ['Home', 'Paycheck', 'Rent', 'Entertainment', 'Business', 'Auto', 'Food', 'Utilities', 'Parents'],
  transactions: [
    { id: uuidv4(), type: 'income', date: '2025-01-12', amount: 2570, description: 'Paycheck', category: 'Paycheck' },
    { id: uuidv4(), type: 'income', date: '2025-01-12', amount: 1300, description: 'Rent Received', category: 'Rent' },
    { id: uuidv4(), type: 'expense', date: '2025-01-07', amount: 92, description: 'Internet', category: 'Home' },
    { id: uuidv4(), type: 'expense', date: '2025-01-15', amount: 1400, description: 'Mortgage', category: 'Home' },
    { id: uuidv4(), type: 'expense', date: '2025-01-10', amount: 190, description: 'HOA', category: 'Home' }
  ]
});

export const useBudget = () => {
  const [state, setState] = useState<State>(() => {
    try {
      // Prefer current storage key
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);

      // Fallback to legacy key (older simple hook)
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          // If legacy looks like the old simple budget shape, try to convert
          if (parsed && parsed.income !== undefined && Array.isArray(parsed.expenses)) {
            // Convert simple income/expenses to transactions if possible
            const transactions = parsed.expenses.map((amt: number, i: number) => ({ id: uuidv4(), type: 'expense', date: new Date().toISOString().slice(0,10), amount: amt, description: `Imported expense ${i+1}`, category: '' }));
            const converted: State = { settings: { startingBalance: parsed.income || 0 }, categories: ['Home','Paycheck'], transactions };
            // persist converted
            localStorage.setItem(STORAGE_KEY, JSON.stringify(converted));
            return converted;
          }
        } catch {}
      }

      // Fallback to latest backup if present
      const backups: Array<{k:string,t:number}> = [];
      for (let i=0;i<localStorage.length;i++){
        const k = localStorage.key(i)!;
        if (k.startsWith(BACKUP_PREFIX)){
          const ts = Number(k.slice(BACKUP_PREFIX.length)) || 0;
          backups.push({k,t:ts});
        }
      }
      if (backups.length){
        backups.sort((a,b)=>b.t-a.t);
        const rawBackup = localStorage.getItem(backups[0].k);
        if (rawBackup) return JSON.parse(rawBackup);
      }

      return seed();
    } catch {
      return seed();
    }
  });

  useEffect(() => {
    try {
      const payload = JSON.stringify(state);
      // Save main copy
      localStorage.setItem(STORAGE_KEY, payload);
      // Save a timestamped backup
      const key = BACKUP_PREFIX + Date.now();
      localStorage.setItem(key, payload);
      // Keep only the most recent 5 backups
      const backups: Array<{k:string,t:number}> = [];
      for (let i=0;i<localStorage.length;i++){
        const k = localStorage.key(i)!;
        if (k.startsWith(BACKUP_PREFIX)){
          const ts = Number(k.slice(BACKUP_PREFIX.length)) || 0;
          backups.push({k,t:ts});
        }
      }
      backups.sort((a,b)=>b.t-a.t);
      const keep = 5;
      for (let i = keep; i < backups.length; i++){
        try { localStorage.removeItem(backups[i].k); } catch {}
      }
    } catch {}
  }, [state]);

  // Ensure we synchronously persist state when the page is unloaded or hidden
  useEffect(() => {
    const persistNow = () => {
      try {
        const payload = JSON.stringify(state);
        localStorage.setItem(STORAGE_KEY, payload);
        const key = BACKUP_PREFIX + Date.now();
        localStorage.setItem(key, payload);
      } catch {}
    };

    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      persistNow();
      // Some browsers require returnValue to show prompt; we won't prompt.
      delete e.returnValue;
    };

    const visibilityHandler = () => {
      if (document.visibilityState === 'hidden') persistNow();
    };

    window.addEventListener('beforeunload', beforeUnloadHandler);
    document.addEventListener('visibilitychange', visibilityHandler);

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      document.removeEventListener('visibilitychange', visibilityHandler);
    };
  }, [state]);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id'>) => {
    setState(s => ({ ...s, transactions: [{ ...tx, id: uuidv4() }, ...s.transactions] }));
  }, []);

  const updateTransaction = useCallback((id: string, patch: Partial<Transaction>) => {
    setState(s => ({ ...s, transactions: s.transactions.map(t => (t.id === id ? { ...t, ...patch } : t)) }));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setState(s => ({ ...s, transactions: s.transactions.filter(t => t.id !== id) }));
  }, []);

  const addCategory = useCallback((name: string) => {
    setState(s => (s.categories.includes(name) ? s : { ...s, categories: [...s.categories, name] }));
  }, []);

  const renameCategory = useCallback((oldName: string, newName: string) => {
    setState(s => ({
      ...s,
      categories: s.categories.map(c => (c === oldName ? newName : c)),
      transactions: s.transactions.map(t => (t.category === oldName ? { ...t, category: newName } : t))
    }));
  }, []);

  const deleteCategory = useCallback((name: string) => {
    setState(s => ({
      ...s,
      categories: s.categories.filter(c => c !== name),
      transactions: s.transactions.map(t => (t.category === name ? { ...t, category: '' } : t))
    }));
  }, []);

  const setStartingBalance = useCallback((value: number) => {
    setState(s => ({ ...s, settings: { ...s.settings, startingBalance: value } }));
  }, []);

  return {
    transactions: state.transactions,
    categories: state.categories,
    settings: state.settings,
    actions: {
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addCategory,
      renameCategory,
      deleteCategory,
      setStartingBalance
    }
  };
};
