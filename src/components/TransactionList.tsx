import React, { useState } from 'react';
import type { Transaction } from '../types';

export default function TransactionList({
  transactions,
  categories,
  onDelete,
  onUpdate
}: {
  transactions: Transaction[];
  categories: string[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Transaction>) => void;
}) {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');

  const list = transactions
    .filter(t => (filter === 'all' ? true : t.type === filter))
    .filter(t => (cat ? t.category === cat : true))
    .filter(t => (q ? (t.description || '').toLowerCase().includes(q.toLowerCase()) : true))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <div className="form-row">
        <select className="input" value={filter} onChange={e => setFilter(e.target.value as any)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select className="input" value={cat} onChange={e => setCat(e.target.value)}>
          <option value="">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="input" placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="list">
        {list.map(t => (
          <div className="tx" key={t.id}>
            <div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ minWidth: 92 }}>{t.date}</div>
                <div className="meta">{t.category}</div>
                <div className="meta">{t.description}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div className={`amount ${t.type === 'income' ? 'positive' : 'negative'}`}>
                {(t.type === 'income' ? '+' : '-')}${t.amount.toFixed(2)}
              </div>
              <button className="btn ghost" onClick={() => {
                const newDesc = prompt('Edit description', t.description || '') ?? t.description;
                onUpdate(t.id, { description: newDesc });
              }}>Edit</button>
              <button className="btn ghost" onClick={() => {
                if (confirm('Delete transaction?')) onDelete(t.id);
              }}>Delete</button>
            </div>
          </div>
        ))}
        {list.length === 0 && <div style={{ padding: 12 }} className="small">No transactions</div>}
      </div>
    </div>
  );
}
