import React from 'react';
import { useBudget } from './hooks';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import Charts from './components/Charts';
import CategoryManager from './components/CategoryManager';

export default function App() {
  const budget = useBudget();
  // Debug: show returned shape from useBudget
  // eslint-disable-next-line no-console
  console.log('useBudget ->', budget);
  return (
    <div className="app">
      <div>
        <div className="card">
          <div className="header">
            <h2>Transactions</h2>
            <div>
              <button className="btn ghost" onClick={() => {
                if (confirm('Are you sure? This will reset your data. A few backups are kept automatically.')){
                  localStorage.removeItem('budget-app:v1');
                  location.reload();
                }
              }}>Reset</button>
            </div>
          </div>
          <TransactionForm categories={budget.categories} onAdd={budget.actions.addTransaction} />
          <TransactionList
            transactions={budget.transactions}
            categories={budget.categories}
            onDelete={budget.actions.deleteTransaction}
            onUpdate={budget.actions.updateTransaction}
          />
        </div>
        <div className="card" style={{ marginTop: 12 }}>
          <CategoryManager
            categories={budget.categories}
            addCategory={budget.actions.addCategory}
            renameCategory={budget.actions.renameCategory}
            deleteCategory={budget.actions.deleteCategory}
            transactions={budget.transactions}
          />
        </div>
      </div>
      <div>
        <Summary
          transactions={budget.transactions}
          startingBalance={budget.settings.startingBalance}
          setStartingBalance={budget.actions.setStartingBalance}
        />
        <div style={{ height: 12 }} />
        <Charts transactions={budget.transactions} startingBalance={budget.settings.startingBalance} />
      </div>
    </div>
  );
}