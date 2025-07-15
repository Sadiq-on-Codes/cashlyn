import BalanceCard from '../components/molecules/BalanceCard';
import QuickActions from '../components/molecules/QuickActions';
import Chart from '../components/organisms/Chart';
import TransactionTable from '../components/organisms/TransactionTable';

const Dashboard = () => {
  return (
    <>
      <main className="flex flex-col gap-8 p-6 bg-white min-h-screen">
        <div className="flex items-center flex-wrap gap-8">
          <BalanceCard balance={5240.21} />
          <QuickActions />
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <h2 className="text-lg font-semibold mb-2">Income vs Expenses</h2>
          <Chart />
        </div>

        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <TransactionTable records={4} showInvoiceId={false} showAction={false} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
