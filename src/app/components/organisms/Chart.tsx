"use client";

import React, { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Helper to format date as 'Apr 14'
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface ChartData {
  name: string;
  income: number;
  expenses: number;
}

interface TransactionForChart {
  date: string;
  amount: number;
}

interface ChartProps {
  transactions: TransactionForChart[];
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ transactions, height = 300 }) => {
  const [filter, setFilter] = useState<'last7' | 'last30'>('last7');

  // Filter transactions by date
  const filteredTxs = useMemo(() => {
    const now = new Date();
    const days = filter === 'last7' ? 7 : 30;
    return transactions.filter(tx => {
      const txDate = new Date(tx.date);
      const diff = (now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= days;
    });
  }, [transactions, filter]);

  // Aggregate by date
  const data = useMemo(() => {
    const map = new Map<string, ChartData>();
    filteredTxs.forEach((tx) => {
      const key = formatDate(tx.date);
      if (!map.has(key)) {
        map.set(key, { name: key, income: 0, expenses: 0 });
      }
      if (tx.amount >= 0) {
        map.get(key)!.income += tx.amount;
      } else {
        map.get(key)!.expenses += Math.abs(tx.amount);
      }
    });
    // Sort by date (ascending)
    return Array.from(map.values()).sort((a, b) => {
      const da = new Date(a.name + ' 2022');
      const db = new Date(b.name + ' 2022');
      return da.getTime() - db.getTime();
    });
  }, [filteredTxs]);

  return (
    <div style={{ width: '100%', height, background: '#fff', borderRadius: '12px', padding: '24px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Working Capital</div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} /> Income
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308', display: 'inline-block' }} /> Expenses
            </span>
          </div>
        </div>
        <div>
          <select
            style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 12px', fontSize: 14 }}
            value={filter}
            onChange={e => setFilter(e.target.value as 'last7' | 'last30')}
          >
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(value) => `${value / 1000}K`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 10000]} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px #0001', fontSize: 14 }} formatter={(value) => `₵${value.toLocaleString()}`} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={3}
            fill="none"
            dot={{ r: 4, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#eab308"
            strokeWidth={3}
            fill="none"
            dot={{ r: 4, fill: '#eab308', stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#eab308', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
