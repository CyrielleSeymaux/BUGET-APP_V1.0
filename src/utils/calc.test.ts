import { describe, it, expect } from 'vitest';
import { totals } from './calc';
import type { Transaction } from '../types';

describe('totals', () => {
  const txs: Transaction[] = [
    { id: '1', type: 'income', date: '2025-01-01', amount: 100, category: 'A' },
    { id: '2', type: 'expense', date: '2025-01-02', amount: 40, category: 'B' }
  ];
  it('calculates sums correctly', () => {
    const res = totals(txs, 1000);
    expect(res.totalIncome).toBe(100);
    expect(res.totalExpenses).toBe(40);
    expect(res.endBalance).toBe(1060);
    expect(res.savedAmount).toBe(60);
    expect(typeof res.percentChange).toBe('number');
  });
});
