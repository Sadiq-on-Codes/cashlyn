'use client'

import React, { useEffect, useState } from 'react';
import TransactionTable, { Transaction } from '../components/organisms/TransactionTable';

const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
        setTransactions(storedTransactions);
    }, []);

    return (
        <div className='p-4 md:p-6'>
            <div className="overflow-x-auto bg-white rounded-xl">
                <TransactionTable showInvoiceId={true} showAction={true} transactions={transactions} />
            </div>
        </div>
    )
}

export default Transactions;