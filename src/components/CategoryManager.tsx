import React, { useState } from 'react';
import type { Transaction } from '../types';

export default function CategoryManager({
  categories, addCategory, renameCategory, deleteCategory, transactions
}: {
  categories: string[];
  addCategory: (name: string) => void;
  renameCategory: (oldName: string, newName: string) => void;
  deleteCategory: (name: string) => void;
  transactions: Transaction[];
}) {
  const [name, setName] = useState('');
  const [sel, setSel] = useState('');
  const [newName, setNewName] = useState('');

  return (
    <div>
      <h4>Categories</h4>
      <div className="form-row">
        <input className="input" placeholder="New category" value={name} onChange={e => setName(e.target.value)} />
        <button className="btn" onClick={() => { if (name.trim()) { addCategory(name.trim()); setName(''); } }}>Add</button>
      </div>
      <div style={{ marginTop: 8 }}>
        <select className="input" value={sel} onChange={e => setSel(e.target.value)}>
          <option value="">Select category</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <input className="input" placeholder="Rename to" value={newName} onChange={e => setNewName(e.target.value)} />
          <button className="btn" onClick={() => { if (sel && newName.trim()) { renameCategory(sel, newName.trim()); setSel(''); setNewName(''); } }}>Rename</button>
          <button className="btn ghost" onClick={() => { if (!sel) return; const used = transactions.some(t => t.category === sel); if (used && !confirm('Category used by transactions. Remove anyway?')) return; deleteCategory(sel); setSel(''); }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
