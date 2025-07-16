'use client'
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Skeleton from '../atoms/Skeleton';
import Button from '../atoms/Button';
import Modal from '../molecules/Modal';

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
  showSearch?: boolean;
  showPagination?: boolean;
  showFilters?: boolean;
  filters?: { [key: string]: string[] }; 
  pageSizeOptions?: number[];
  transactions: Transaction[];
  loading?: boolean;
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
  showSearch = false,
  showPagination = false,
  showFilters = false,
  filters = {},
  pageSizeOptions = [5, 8, 10, 20],
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(records);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const txKeySet: Record<string, true> = {
    id: true,
    name: true,
    business: true,
    businessLogo: true,
    type: true,
    amount: true,
    date: true,
    time: true,
    invoiceId: true,
    actionLabel: true,
    status: true,
  };

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((tx: Transaction) =>
        tx.name.toLowerCase().includes(term) ||
        tx.business.toLowerCase().includes(term) ||
        tx.type.toLowerCase().includes(term) ||
        tx.invoiceId.toLowerCase().includes(term)
      );
    }
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && (key in txKeySet)) {
        filtered = filtered.filter((tx: Transaction) => tx[key as keyof Transaction]?.toString() === value);
      }
    });
    return filtered;
  }, [transactions, searchTerm, activeFilters]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, currentPage, pageSize]);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    // Render skeleton table
    return (
      <div className="overflow-x-auto">
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
    );
  }

  return (
    <div className="overflow-x-auto " >
      {(showSearch || showFilters) && (
        <div className="flex flex-wrap gap-4 items-center p-4">
          {showSearch && (
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300"
              style={{ minWidth: 200 }}
            />
          )}
          {showFilters &&
            Object.entries(filters).map(([key, options]) => (
              <Select
                key={key}
                value={activeFilters[key] || ''}
                onChange={e => handleFilterChange(key, e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300"
              >
                <option value="">All {key.charAt(0).toUpperCase() + key.slice(1)}</option>
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            ))}
        </div>
      )}
      <table className="w-full text-sm text-left border-separate border-spacing-y-2 min-w-[700px]">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-gray-500 border-b border-blue-100 bg-white">
            {showName && <th className="px-3 md:px-6 py-2 md:py-4 font-bold">NAME/BUSINESS</th>}
            {showType && <th className="px-3 md:px-6 py-2 md:py-4 font-bold">TYPE</th>}
            {showAmount && <th className="px-3 md:px-6 py-2 md:py-4 font-bold">AMOUNT</th>}
            {showDate && <th className="px-3 md:px-6 py-2 md:py-4 font-bold">DATE</th>}
            {showInvoiceId && <th className="px-3 md:px-6 py-2 md:py-4 font-bold">INVOICE ID</th>}
            {showAction && <th className="px-3 md:px-6 py-2 md:py-4 font-bold">ACTION</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions?.map((tx: Transaction, idx: number) => (
            <tr
              key={tx.id}
              className={`transition-all duration-150 ${
                idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-lime-50 border-b border-blue-50 last:border-b-0`}
            >
              {showName && (
                <td className="px-3 md:px-6 py-2 md:py-4 flex items-center gap-4 min-w-[180px] md:min-w-[220px]">
                  {tx.businessLogo && (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                      <Image src={tx.businessLogo} alt={tx.business} width={36} height={36} className="rounded-lg" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 text-base leading-tight truncate max-w-[120px] md:max-w-[160px]">{tx.name}</div>
                    {/* <div className="text-xs text-gray-400 leading-tight truncate max-w-[100px] md:max-w-[140px]">{tx.business}</div> */}
                  </div>
                </td>
              )}
              {showType && <td className="px-3 md:px-6 py-2 md:py-4 text-gray-500 min-w-[90px] md:min-w-[120px] truncate">{tx.type}</td>}
              {showAmount && (
                <td className="px-3 md:px-6 py-2 md:py-4 min-w-[90px] md:min-w-[120px]">
                  {tx.amount < 0 ? (
                    <span className="text-red-500 font-bold text-base"> ₵{Math.abs(tx.amount).toFixed(2)}</span>
                  ) : (
                    <span className="text-green-600 font-bold text-base">₵{tx.amount.toFixed(2)}</span>
                  )}
                </td>
              )}
              {showDate && (
                <td className="px-3 md:px-6 py-2 md:py-4 min-w-[120px] md:min-w-[160px]">
                  <div className="font-medium text-gray-900 text-xs truncate">{tx.date}</div>
                  <div className="text-xs text-gray-400 truncate">at {tx.time}</div>
                </td>
              )}
              {showInvoiceId && <td className="px-3 md:px-6 py-2 md:py-4 text-gray-500 min-w-[90px] md:min-w-[120px] truncate">{tx.invoiceId}</td>}
              {showAction && (
                <td className="px-3 md:px-6 py-2 md:py-4">
                  <Button
                    color="primary"
                    className="w-full md:w-auto"
                    onClick={() => {
                      setSelectedTransaction(tx);
                      setIsModalOpen(true);
                    }}
                  >
                    {tx.actionLabel || 'View'}
                  </Button>
                </td>
              )}
            </tr>
          ))}
          {paginatedTransactions.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-400">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {showPagination && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Rows per page:</span>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-lime-300"
            >
              {pageSizeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-xs text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {isModalOpen && selectedTransaction && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Transaction Details">
          <div className="flex flex-col gap-2">
            {selectedTransaction.businessLogo && (
              <div className="flex justify-center mb-2">
                <Image src={selectedTransaction.businessLogo} alt={selectedTransaction.business} width={48} height={48} className="rounded-lg" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div><span className="font-semibold">Name:</span> {selectedTransaction.name}</div>
              <div><span className="font-semibold">Business:</span> {selectedTransaction.business}</div>
              <div><span className="font-semibold">Type:</span> {selectedTransaction.type}</div>
              <div><span className="font-semibold">Amount:</span> {selectedTransaction.amount < 0 ? `-₵${Math.abs(selectedTransaction.amount).toFixed(2)}` : `₵${selectedTransaction.amount.toFixed(2)}`}</div>
              <div><span className="font-semibold">Date:</span> {selectedTransaction.date}</div>
              <div><span className="font-semibold">Time:</span> {selectedTransaction.time}</div>
              <div><span className="font-semibold">Invoice ID:</span> {selectedTransaction.invoiceId}</div>
              {selectedTransaction.status && <div><span className="font-semibold">Status:</span> {selectedTransaction.status}</div>}
            </div>
            <Button color="secondary" className="mt-4" onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TransactionTable;
