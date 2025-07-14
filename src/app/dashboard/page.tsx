// pages/dashboard.tsx
import Head from 'next/head';
import BalanceCard from '../components/molecules/BalanceCard';
import QuickActions from '../components/molecules/QuickActions';
import Chart from '../components/organisms/Chart';
import TransactionTable from '../components/organisms/TransactionTable';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Cashlyn | Dashboard</title>
      </Head>

      <main className="flex flex-col gap-4 p-6 bg-gray-50 min-h-screen">
        {/* <h1 className="text-2xl font-bold mb-4">Dashboard</h1> */}

        {/* Top: Balance + Actions */}
        <div className="flex items-center flex-wrap gap-8">
          <BalanceCard balance={5240.21} />
          <QuickActions />
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Income vs Expenses</h2>
          <Chart />
        </div>

        {/* Transactions */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <TransactionTable records={4} showInvoiceId={false} showAction={false} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
