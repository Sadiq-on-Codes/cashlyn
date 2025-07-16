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
    <div className={`w-full bg-[var(--card)] rounded-xl p-4 md:p-6 ${isMobile ? 'h-80' : 'h-72 md:h-96'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="font-semibold text-lg md:text-xl text-gray-800">Working Capital</div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Income
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Expenses
          </div>
        </div>
      </div>
      
      <div className="flex-1 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={isMobile
              ? { top: 12, right: 8, left: 8, bottom: 56 }
              : { top: 24, right: 32, left: 32, bottom: 48 }
            }
          >
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: isMobile ? 10 : 12 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis
              tickFormatter={(value) => `${value / 1000}K`}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, Math.ceil(maxValue * 1.1)]}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
            <Tooltip 
              contentStyle={{ 
                borderRadius: 8, 
                border: '1px solid var(--border)',
                backgroundColor: 'var(--card)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                fontSize: isMobile ? 12 : 14,
                padding: '8px 12px'
              }} 
              formatter={(value) => `₵${value.toLocaleString()}`} 
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="none"
              dot={{ 
                r: isMobile ? 2 : 3, 
                fill: '#10b981', 
                stroke: 'var(--card)', 
                strokeWidth: 1.5 
              }}
              activeDot={{ 
                r: isMobile ? 3 : 4, 
                fill: '#10b981', 
                stroke: 'var(--card)', 
                strokeWidth: 1.5 
              }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2.5}
              fill="none"
              dot={{ 
                r: isMobile ? 2 : 3, 
                fill: '#ef4444', 
                stroke: 'var(--card)', 
                strokeWidth: 1.5 
              }}
              activeDot={{ 
                r: isMobile ? 3 : 4, 
                fill: '#ef4444', 
                stroke: 'var(--card)', 
                strokeWidth: 1.5 
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-end mt-2">
        <span className="text-sm text-gray-500">Last 7 days</span>
      </div>
    </div>
  );
};

export default Chart;
