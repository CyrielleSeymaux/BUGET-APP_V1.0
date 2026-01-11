import React, { useMemo, useState } from 'react';
import type { Transaction } from '../types';
import { totals } from '../utils/calc';

export default function Summary({ transactions, startingBalance, setStartingBalance }: { transactions: Transaction[]; startingBalance: number; setStartingBalance: (v: number) => void; }) {
  const [editable, setEditable] = useState(false);
  const t = useMemo(() => totals(transactions, startingBalance), [transactions, startingBalance]);

  return (
    <div className="card">
      <div className="header">
        <h3>Summary</h3>
        <div className="small">Saved: <strong className={t.savedAmount >= 0 ? 'positive' : 'negative'}>${t.savedAmount.toFixed(2)}</strong></div>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label className="small">Starting Balance</label>
        {!editable ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontWeight: 700 }}>${startingBalance.toFixed(2)}</div>
            <button className="btn ghost" onClick={() => setEditable(true)}>Edit</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" type="number" defaultValue={startingBalance} id="start-balance" />
            <button className="btn" onClick={() => {
              const el = document.getElementById('start-balance') as HTMLInputElement;
              const v = parseFloat(el.value || '0') || 0;
              setStartingBalance(v);
              setEditable(false);
            }}>Save</button>
            <button className="btn ghost" onClick={() => setEditable(false)}>Cancel</button>
          </div>
        )}
      </div>

      <div className="summary-grid">
        <div className="card small">
          <div className="small">Total Income</div>
          <div style={{ fontWeight:700 }}>${t.totalIncome.toFixed(2)}</div>
        </div>
        <div className="card small">
          <div className="small">Total Expenses</div>
          <div style={{ fontWeight:700 }}>${t.totalExpenses.toFixed(2)}</div>
        </div>
        <div className="card small">
          <div className="small">End Balance</div>
          <div style={{ fontWeight:700 }}>${t.endBalance.toFixed(2)}</div>
        </div>
        <div className="card small">
          <div className="small">Percent Change</div>
          <div style={{ fontWeight:700 }} className={t.percentChange >= 0 ? 'positive' : 'negative'}>
            {t.percentChange >= 0 ? '+' : ''}{t.percentChange.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}