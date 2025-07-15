"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Apr 14', income: 5000, expenses: 5200 },
  { name: 'Apr 15', income: 7000, expenses: 6000 },
  { name: 'Apr 16', income: 6500, expenses: 7500 },
  { name: 'Apr 17', income: 5500, expenses: 8000 },
  { name: 'Apr 18', income: 4000, expenses: 5000 },
  { name: 'Apr 19', income: 4800, expenses: 4700 },
  { name: 'Apr 20', income: 5300, expenses: 4900 },
];

const Chart: React.FC<{ height?: number }> = ({ height = 300 }) => {
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
          <select style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 12px', fontSize: 14 }} defaultValue="last7">
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
          <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 2px 8px #0001', fontSize: 14 }} formatter={(value) => `$${value.toLocaleString()}`} />
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
