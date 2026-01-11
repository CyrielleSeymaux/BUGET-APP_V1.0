import React, { useState } from 'react';
import type { TxType } from '../types';
import type { Transaction } from '../types';

export default function TransactionForm({ categories, onAdd }: { categories: string[]; onAdd: (t: Omit<Transaction,'id'>) => void }) {
  const [type, setType] = useState<TxType>('expense');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(categories[0] || '');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseFloat(amount);
    if (!a || a <= 0) return alert('Enter amount > 0');
    if (!category) return alert('Select category');
    onAdd({ type, date, amount: a, description, category });
    setAmount(''); setDescription(''); setCategory(categories[0] || '');
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <div className="form-row">
        <select value={type} onChange={e => setType(e.target.value as TxType)} className="input">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input className="input" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">-- category --</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="form-row">
        <input className="input" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{flex:1}} />
        <button className="btn" type="submit">Add</button>
      </div>
    </form>
  );
}
