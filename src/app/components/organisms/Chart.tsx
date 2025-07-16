"use client";

import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';


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

const Chart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  // Detect if mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const stored: TransactionForChart[] = JSON.parse(localStorage.getItem('transactions') || '[]');
    const map = new Map<string, ChartData>();
    stored.forEach((tx) => {
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
    const sorted = Array.from(map.values()).sort((a, b) => {
      const da = new Date(a.name + ' 2022'); 
      const db = new Date(b.name + ' 2022');
      return da.getTime() - db.getTime();
    });
    setData(sorted);
  }, []);

  // Find the max value for dynamic Y-axis domain
  const maxValue = data.length > 0 ? Math.max(
    ...data.map(d => Math.max(d.income, d.expenses))
  ) : 10000;

  return (
    <div className={`w-full bg-[var(--card)] rounded-xl p-2 md:p-6 ${isMobile ? 'h-80' : 'h-72 md:h-96'} pb-8`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2 md:gap-0">
        <div>
          <div className="font-semibold text-lg md:text-xl mb-2">Working Capital</div>
          <div className="flex gap-4 md:gap-6 items-center">
            <span className="flex items-center gap-2 text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-[var(--lime)] inline-block" /> Income
            </span>
            <span className="flex items-center gap-2 text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block" /> Expenses
            </span>
          </div>
        </div>
        <div>
          <select style={{ border: '1px solid var(--border)', borderRadius: 6, padding: '4px 12px', fontSize: 14 }} defaultValue="last7" disabled>
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={isMobile
            ? { top: 12, right: 8, left: 8, bottom: 56 }
            : { top: 24, right: 32, left: 32, bottom: 48 }
          }
        >
          <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={(value) => `${value / 1000}K`}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, Math.ceil(maxValue * 1.1)]}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px #0001', fontSize: isMobile ? 12 : 14 }} formatter={(value) => `₵${value.toLocaleString()}`} />
          <Area
            type="monotone"
            dataKey="income"
            stroke={typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--lime').trim() : '#d6ff3f'}
            strokeWidth={3}
            fill="none"
            dot={{ r: isMobile ? 2 : 4, fill: typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--lime').trim() : '#d6ff3f', stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: isMobile ? 3 : 6, fill: typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--lime').trim() : '#d6ff3f', stroke: '#fff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke={typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() : '#eab308'}
            strokeWidth={3}
            fill="none"
            dot={{ r: isMobile ? 2 : 4, fill: typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() : '#eab308', stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: isMobile ? 3 : 6, fill: typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() : '#eab308', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
