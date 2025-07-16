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
    setCurrentPage(1);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton width={40} height={40} className="rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton width={120} height={16} />
                  <Skeleton width={80} height={12} />
                </div>
                <Skeleton width={60} height={16} />
                <Skeleton width={80} height={16} />
                <Skeleton width={100} height={16} />
                <Skeleton width={60} height={32} className="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {(showSearch || showFilters) && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-wrap gap-3 items-center">
            {showSearch && (
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{ minWidth: 240 }}
              />
            )}
            {showFilters &&
              Object.entries(filters).map(([key, options]) => (
                <Select
                  key={key}
                  value={activeFilters[key] || ''}
                  onChange={e => handleFilterChange(key, e.target.value)}
                  className="border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All {key.charAt(0).toUpperCase() + key.slice(1)}</option>
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              ))}
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {showName && <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>}
              {showType && <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>}
              {showAmount && <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>}
              {showDate && <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>}
              {showInvoiceId && <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice</th>}
              {showAction && <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedTransactions?.map((tx: Transaction) => (
              <tr
                key={tx.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {showName && (
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {tx.businessLogo && (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <Image src={tx.businessLogo} alt={tx.business} width={32} height={32} className="rounded-lg" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 truncate">{tx.name}</div>
                        <div className="text-sm text-gray-500 truncate">{tx.business}</div>
                      </div>
                    </div>
                  </td>
                )}
                {showType && (
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tx.type}
                    </span>
                  </td>
                )}
                {showAmount && (
                  <td className="py-4 px-6">
                    <span className={`font-semibold text-lg ${
                      tx.amount < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {tx.amount < 0 ? '-' : '+'}₵{Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </td>
                )}
                {showDate && (
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">{tx.date}</div>
                    <div className="text-xs text-gray-500">{tx.time}</div>
                  </td>
                )}
                {showInvoiceId && (
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600 font-mono">{tx.invoiceId}</span>
                  </td>
                )}
                {showAction && (
                  <td className="py-4 px-6">
                    <Button
                      color="primary"
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
                <td colSpan={6} className="py-12 text-center">
                  <div className="text-gray-500 text-sm">No transactions found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {pageSizeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && selectedTransaction && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Transaction Details">
          <div className="space-y-4">
            {selectedTransaction.businessLogo && (
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image src={selectedTransaction.businessLogo} alt={selectedTransaction.business} width={48} height={48} className="rounded-lg" />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium text-gray-600">Name:</span> {selectedTransaction.name}</div>
              <div><span className="font-medium text-gray-600">Business:</span> {selectedTransaction.business}</div>
              <div><span className="font-medium text-gray-600">Type:</span> {selectedTransaction.type}</div>
              <div><span className="font-medium text-gray-600">Amount:</span> 
                <span className={`ml-1 font-semibold ${selectedTransaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {selectedTransaction.amount < 0 ? '-' : '+'}₵{Math.abs(selectedTransaction.amount).toFixed(2)}
                </span>
              </div>
              <div><span className="font-medium text-gray-600">Date:</span> {selectedTransaction.date}</div>
              <div><span className="font-medium text-gray-600">Time:</span> {selectedTransaction.time}</div>
              <div className="col-span-2"><span className="font-medium text-gray-600">Invoice ID:</span> {selectedTransaction.invoiceId}</div>
              {selectedTransaction.status && (
                <div className="col-span-2">
                  <span className="font-medium text-gray-600">Status:</span> 
                  <span className={`ml-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    selectedTransaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    selectedTransaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedTransaction.status}
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-end pt-4">
              <Button color="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TransactionTable;
