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
    <div className="w-full bg-white rounded-xl p-2 md:p-6 overflow-x-auto" style={{ height }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2 md:gap-0">
        <div>
          <div className="font-semibold text-lg md:text-xl mb-2">Working Capital</div>
          <div className="flex gap-4 md:gap-6 items-center">
            <span className="flex items-center gap-2 text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-lime-500 inline-block" /> Income
            </span>
            <span className="flex items-center gap-2 text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Expenses
            </span>
          </div>
        </div>
        <div>
          <select
            className="border border-gray-200 rounded px-3 py-1 text-sm md:text-base"
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
