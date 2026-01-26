import React from 'react';
import { useBudget } from './hooks';
import { TipOfTheDay } from './components/TipOfTheDay';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import Charts from './components/Charts';
import CategoryManager from './components/CategoryManager';

/**
 * The main App component. It renders the entire budgeting app.
 * It uses the useBudget hook to get the current budget state and actions.
 * It renders the TransactionForm, TransactionList, CategoryManager, Summary, and Charts components.
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
  const budget = useBudget();
  // Debug: show returned shape from useBudget
  // eslint-disable-next-line no-console
  console.log('useBudget ->', budget);

  return (
    <div className="app">
      <div style={{ marginBottom: '30px' }}>
        <TipOfTheDay />
      </div>
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
          <TransactionForm
            /**
             * The categories to display in the TransactionForm.
             */
            categories={budget.categories}
            /**
             * The function to call when adding a new transaction.
             */
            onAdd={budget.actions.addTransaction}
          />
          <TransactionList
            /**
             * The transactions to display in the TransactionList.
             */
            transactions={budget.transactions}
            /**
             * The categories to display in the TransactionList.
             */
            categories={budget.categories}
            /**
             * The function to call when deleting a transaction.
             */
            onDelete={budget.actions.deleteTransaction}
            /**
             * The function to call when updating a transaction.
             */
            onUpdate={budget.actions.updateTransaction}
          />
        </div>
        <div className="card" style={{ marginTop: 12 }}>
          <CategoryManager
            /**
             * The categories to display in the CategoryManager.
             */
            categories={budget.categories}
            /**
             * The function to call when adding a new category.
             */
            addCategory={budget.actions.addCategory}
            /**
             * The function to call when renaming a category.
             */
            renameCategory={budget.actions.renameCategory}
            /**
             * The function to call when deleting a category.
             */
            deleteCategory={budget.actions.deleteCategory}
            /**
             * The transactions to display in the CategoryManager.
             */
            transactions={budget.transactions}
          />
        </div>
      </div>
      <div>
        <Summary
          /**
           * The transactions to display in the Summary.
           */
          transactions={budget.transactions}
          /**
           * The starting balance to display in the Summary.
           */
          startingBalance={budget.settings.startingBalance}
          /**
           * The function to call when setting the starting balance.
           */
          setStartingBalance={budget.actions.setStartingBalance}
        />
        <div style={{ height: 12 }} />
        <Charts
          /**
           * The transactions to display in the Charts.
           */
          transactions={budget.transactions}
          /**
           * The starting balance to display in the Charts.
           */
          startingBalance={budget.settings.startingBalance}
        />
      </div>
    </div>
  );
}
