'use client'
import React, { useEffect, useState } from 'react';
import BalanceCard from '../components/molecules/BalanceCard';
import QuickActions from '../components/molecules/QuickActions';
import Chart from '../components/organisms/Chart';
import TransactionTable, { Transaction } from '../components/organisms/TransactionTable';
import Skeleton from '../components/atoms/Skeleton';

const Dashboard = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = Number(localStorage.getItem('balance'));
    if (!isNaN(stored)) {
      setBalance(stored);
    } else {
      localStorage.setItem('balance', '100000');
      setBalance(100000);
    }
    const txs = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(txs);
  }, []);

  useEffect(() => {
    if (balance !== null) {
      localStorage.setItem('balance', balance.toString());
    }
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  if (balance === null) {
    // Show skeletons for the dashboard layout
    return (
      <main className="flex flex-col gap-6 md:gap-8 py-4 md:py-8">
        <div className="flex flex-col md:flex-row items-stretch justify-between flex-wrap gap-4 md:gap-8 mt-6">
          {/* BalanceCard Skeleton */}
          <Skeleton width={300} height={120} className="w-full md:w-[300px] h-[120px]" />
          {/* QuickActions Skeleton */}
          <Skeleton width={300} height={120} className="w-full md:w-[300px] h-[120px]" />
        </div>
        {/* Chart Skeleton */}
        <div className="bg-white p-2 md:p-4 rounded-xl border border-gray-100 w-full">
          <Skeleton width="100%" height={220} className="w-full h-[220px]" />
        </div>
        {/* TransactionTable Skeleton */}
        <div className="bg-white rounded-xl w-full overflow-x-auto">
          <div className="p-4">
            {/* Table header skeleton */}
            <div className="flex gap-4 mb-4">
              <Skeleton width={120} height={20} />
              <Skeleton width={80} height={20} />
              <Skeleton width={100} height={20} />
              <Skeleton width={120} height={20} />
              <Skeleton width={100} height={20} />
              <Skeleton width={80} height={20} />
            </div>
            {/* Table rows skeleton */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4 mb-2">
                <Skeleton width={120} height={16} />
                <Skeleton width={80} height={16} />
                <Skeleton width={100} height={16} />
                <Skeleton width={120} height={16} />
                <Skeleton width={100} height={16} />
                <Skeleton width={80} height={16} />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 md:gap-8 py-4 md:py-8">
      <div className="flex flex-col md:flex-row items-stretch justify-between flex-wrap gap-4 md:gap-8 mt-6">
        <BalanceCard balance={balance} />
        <QuickActions balance={balance} setBalance={setBalance} transactions={transactions} setTransactions={setTransactions} />
      </div>

      <div className="bg-white p-2 md:p-4 rounded-xl border border-gray-100 w-full">
        <Chart />
      </div>

      <div className="bg-white rounded-xl w-full overflow-x-auto">
        <TransactionTable records={4} showInvoiceId={false} showAction={false} transactions={transactions} />
      </div>
    </main>
  );
};

export default Dashboard;
