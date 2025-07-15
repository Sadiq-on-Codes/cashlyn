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
        <div className='p-6'>
            <TransactionTable showInvoiceId={true} showAction={true} transactions={transactions} />
        </div>
    )
}

export default Transactions;