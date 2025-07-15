'use client'
import React from 'react';
import Image from 'next/image';

export type Transaction = {
  id: number;
  name: string;
  business: string;
  businessLogo?: string;
  type: string;
  amount: number;
  date: string;
  time: string;
  invoiceId: string;
  actionLabel?: string;
  status?: 'Completed' | 'Pending' | 'Failed';
};

type Props = {
  records?: number;
  showName?: boolean;
  showType?: boolean;
  showAmount?: boolean;
  showDate?: boolean;
  showInvoiceId?: boolean;
  showAction?: boolean;
  transactions: Transaction[];
};

const TransactionTable: React.FC<Props> = ({
  records = 8,
  showName = true,
  showType = true,
  showAmount = true,
  showDate = true,
  showInvoiceId = true,
  showAction = true,
  transactions,
}) => {
  const items = transactions?.slice(0, records);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-gray-500 border-b border-blue-100 bg-white">
            {showName && <th className="px-6 py-4 font-bold">NAME/BUSINESS</th>}
            {showType && <th className="px-6 py-4 font-bold">TYPE</th>}
            {showAmount && <th className="px-6 py-4 font-bold">AMOUNT</th>}
            {showDate && <th className="px-6 py-4 font-bold">DATE</th>}
            {showInvoiceId && <th className="px-6 py-4 font-bold">INVOICE ID</th>}
            {showAction && <th className="px-6 py-4 font-bold">ACTION</th>}
          </tr>
        </thead>
        <tbody>
          {items?.map((tx, idx) => (
            <tr
              key={tx.id}
              className={`transition-all duration-150 ${
                idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-lime-50 border-b border-blue-50 last:border-b-0`}
            >
              {showName && (
                <td className="px-6 py-4 flex items-center gap-4 min-w-[220px]">
                  {tx.businessLogo && (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                      <Image src={tx.businessLogo} alt={tx.business} width={36} height={36} className="rounded-lg" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900 text-base leading-tight">{tx.name}</div>
                    <div className="text-xs text-gray-400 leading-tight">{tx.business}</div>
                  </div>
                </td>
              )}
              {showType && <td className="px-6 py-4 text-gray-500 min-w-[120px]">{tx.type}</td>}
              {showAmount && (
                <td className="px-6 py-4 min-w-[120px]">
                  {tx.amount < 0 ? (
                    <span className="text-red-500 font-bold text-base"> ₵{Math.abs(tx.amount).toFixed(2)}</span>
                  ) : (
                    <span className="text-green-600 font-bold text-base">₵{tx.amount.toFixed(2)}</span>
                  )}
                </td>
              )}
              {showDate && (
                <td className="px-6 py-4 min-w-[160px]">
                  <div className="font-medium text-gray-900 text-xs">{tx.date}</div>
                  <div className="text-xs text-gray-400">at {tx.time}</div>
                </td>
              )}
              {showInvoiceId && <td className="px-6 py-4 text-gray-500 min-w-[120px]">{tx.invoiceId}</td>}
              {showAction && (
                <td className="px-6 py-4">
                  <button className="bg-lime-400 hover:bg-lime-500 text-white font-bold py-2 px-7 rounded-lg text-xs shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-lime-300">
                    {tx.actionLabel || 'View'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
