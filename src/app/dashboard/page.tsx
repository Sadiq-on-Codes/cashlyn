'use client'
import React, { useEffect, useState } from 'react';
import BalanceCard from '../components/molecules/BalanceCard';
import QuickActions from '../components/molecules/QuickActions';
import Chart from '../components/organisms/Chart';
import TransactionTable, { Transaction } from '../components/organisms/TransactionTable';

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

  if (balance === null) return null; // or a loading spinner

  return (
    <>
      <main className="flex flex-col gap-8 p-6 bg-white min-h-screen">
        <div className="flex items-center justify-between flex-wrap gap-8">
          <BalanceCard balance={balance} />
          <QuickActions balance={balance} setBalance={setBalance} transactions={transactions} setTransactions={setTransactions} />
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <Chart transactions={transactions} />
        </div>

        <div className="bg-white rounded-xl">
          <TransactionTable records={4} showInvoiceId={false} showAction={false} transactions={transactions} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
