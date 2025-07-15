'use client'

import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Modal from '../molecules/Modal';
import { PaperAirplaneIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import { Transaction } from '../organisms/TransactionTable';

interface QuickActionsProps {
  balance: number | null;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const QuickActions: React.FC<QuickActionsProps> = ({ balance, setBalance, transactions, setTransactions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [category, setCategory] = useState('Grocery');
  const [recipientName, setRecipientName] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSendMoney = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    // Save transaction to localStorage
    const transaction = {
      id: Date.now(),
      name: recipientName,
      business: category,
      businessLogo: '',
      type: category,
      amount: -Number(amount),
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
      invoiceId: `INV${Date.now()}`,
      actionLabel: 'View',
      status: 'Completed' as const,
    };
    setTransactions([transaction, ...transactions]);

    if (balance !== null) {
      const newBalance = balance - Number(amount);
      setBalance(newBalance);
      localStorage.setItem('balance', newBalance.toString());
    }

    setIsConfirmOpen(false);
    setIsModalOpen(false);
    setCategory('Grocery');
    setRecipientName('');
    setRecipientNumber('');
    setAmount('');
  };

  return (
    <div>
      <div className="flex gap-4">
        <Button
          icon={<PaperAirplaneIcon className="w-5 h-5" />}
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Send Money
        </Button>
        <Button icon={<BanknotesIcon className="w-5 h-5" />} color="secondary">
          Request Money
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4" onSubmit={handleSendMoney}>
          <div className="rounded-lg">
            <Input
              label="Recipient Name"
              placeholder="Enter recipient name"
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              className="mb-2"
              required
            />
            <Input
              label="Recipient Number"
              placeholder="Enter recipient number"
              value={recipientNumber}
              onChange={e => setRecipientNumber(e.target.value)}
              className="mb-2"
              required
            />
            <Input
              label="Amount"
              placeholder="Enter amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              type="number"
              min="1"
              required
            />
          </div>
          <Select label="Categories" value={category} onChange={e => setCategory(e.target.value)}>
            <option>Grocery</option>
            <option>Utilities</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Education</option>
            <option>Entertainment</option>
            <option>Other</option>
          </Select>
          <Button type="submit" color="primary" className="w-full bg-lime-300 hover:bg-lime-400 text-gray-900 mt-2">Send Money</Button>
        </form>
      </Modal>
      {/* Confirmation Modal */}
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <div className="bg-white rounded-xl p-4 w-full max-w-md">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 text-base">Transfer Summary</h3>
          </div>
          <div className="mb-2">
            <div className="font-semibold text-gray-700 text-sm mb-1">Reciepient Name and Number</div>
            <div className="text-gray-400 text-sm leading-tight">{recipientName}</div>
            <div className="text-gray-400 text-sm leading-tight">{recipientNumber}</div>
          </div>
          <div className="my-4 text-gray-800 text-sm font-medium">Amount – ₵{amount}</div>
          <hr className="my-4" />
          <Button
            color="default"
            className="w-full bg-green-100 hover:bg-green-200 text-green-700"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default QuickActions;
