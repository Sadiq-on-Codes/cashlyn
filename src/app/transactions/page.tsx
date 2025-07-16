'use client'

import React, { useEffect, useState, useMemo } from 'react';
import TransactionTable, { Transaction } from '../components/organisms/TransactionTable';

const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        setTransactions(storedTransactions);
    }, []);

    // Compute unique categories for the 'type' filter
    const filterOptions = useMemo(() => {
        const types = Array.from(new Set(transactions.map(tx => tx.type))).filter(Boolean);
        return { type: types };
    }, [transactions]);

    return (
        <div className='p-4 md:p-6'>
            <div className="overflow-x-auto bg-white rounded-xl">
                <TransactionTable showInvoiceId={true} showAction={true} transactions={transactions} showSearch={true}
      showFilters={true}
      showPagination={true}
      filters={filterOptions}
      pageSizeOptions={[5, 8, 10, 20]} />
            </div>
        </div>
    )
}

export default Transactions;