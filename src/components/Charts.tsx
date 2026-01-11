import React, { useMemo } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import type { Transaction } from '../types';
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Charts({ transactions, startingBalance }: { transactions: Transaction[]; startingBalance: number; }) {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const endBalance = startingBalance + totalIncome - totalExpenses;

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    transactions.filter(t => t.type === 'expense').forEach(t => map.set(t.category, (map.get(t.category) || 0) + t.amount));
    return { labels: Array.from(map.keys()), data: Array.from(map.values()) };
  }, [transactions]);

  const barData = {
    labels: ['Start', 'End'],
    datasets: [{ label: 'Balance', data: [startingBalance, endBalance], backgroundColor: ['#94a3b8', '#60a5fa'] }]
  };

  const pieData = {
    labels: byCategory.labels,
    datasets: [{ data: byCategory.data, backgroundColor: ['#f97316','#60a5fa','#34d399','#a78bfa','#f43f5e','#fb7185','#fde68a'] }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="charts-grid" style={{ gap: 12 }}>
        <div className="chart-wrap">
          <h4>Start vs End</h4>
            <div className="chart-canvas">
              <Bar data={barData} options={barOptions as any} />
            </div>
        </div>
        <div className="chart-wrap">
          <h4>Expenses by Category</h4>
          <div className="chart-canvas pie">
              <Pie data={pieData} options={pieOptions as any} />
          </div>
        </div>
      </div>
    </div>
  );
}
