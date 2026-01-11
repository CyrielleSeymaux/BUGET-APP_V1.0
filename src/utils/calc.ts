import type { Transaction } from '../types';

export const sumByType = (txs: Transaction[], type: 'income' | 'expense') =>
  txs.filter(t => t.type === type).reduce((s, t) => s + t.amount, 0);

export const totals = (txs: Transaction[], startingBalance: number) => {
  const totalIncome = sumByType(txs, 'income');
  const totalExpenses = sumByType(txs, 'expense');
  const endBalance = startingBalance + totalIncome - totalExpenses;
  const savedAmount = endBalance - startingBalance;
  const percentChange = Math.round((savedAmount / Math.max(1, startingBalance)) * 10000) / 100;
  return { totalIncome, totalExpenses, endBalance, savedAmount, percentChange };
};
