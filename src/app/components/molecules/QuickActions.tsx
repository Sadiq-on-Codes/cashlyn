'use client'

import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Modal from '../molecules/Modal';
import { PaperAirplaneIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import { Transaction } from '../organisms/TransactionTable';
import { categoryOptions } from "../constants/categoryOptions";

interface QuickActionsProps {
  balance: number | null;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const QuickActions: React.FC<QuickActionsProps> = ({ balance, setBalance, transactions, setTransactions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRequestConfirmOpen, setIsRequestConfirmOpen] = useState(false);
  const [category, setCategory] = useState('Grocery');
  const [recipientName, setRecipientName] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');
  const [amount, setAmount] = useState('');
  // For request money
  const [requestRecipientName, setRequestRecipientName] = useState('');
  const [requestRecipientNumber, setRequestRecipientNumber] = useState('');
  const [requestAmount, setRequestAmount] = useState('');
  const [requestCategory, setRequestCategory] = useState('Grocery');

  const handleSendMoney = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
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

  const handleRequestMoney = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequestConfirmOpen(true);
  };

  const handleRequestConfirm = () => {
    const transaction = {
      id: Date.now(),
      name: requestRecipientName,
      business: requestCategory,
      businessLogo: '',
      type: requestCategory,
      amount: Number(requestAmount),
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
      invoiceId: `REQ${Date.now()}`,
      actionLabel: 'View',
      status: 'Completed' as const,
    };
    setTransactions([transaction, ...transactions]);
    if (balance !== null) {
      const newBalance = balance + Number(requestAmount);
      setBalance(newBalance);
      localStorage.setItem('balance', newBalance.toString());
    }
    setIsRequestConfirmOpen(false);
    setIsRequestModalOpen(false);
    setRequestCategory('Grocery');
    setRequestRecipientName('');
    setRequestRecipientNumber('');
    setRequestAmount('');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-fit">
        <Button
          icon={<PaperAirplaneIcon className="w-5 h-5" />}
          color="primary"
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto"
        >
          Send Money
        </Button>
        <Button icon={<BanknotesIcon className="w-5 h-5" />} color="secondary" onClick={() => setIsRequestModalOpen(true)} className="w-full md:w-auto">
          Request Money
        </Button>
      </div>
      {/* Send Money Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Send Money">
        <form className="space-y-4" onSubmit={handleSendMoney}>
          <div className="rounded-lg">
            <Input
              label="Recipient Name"
              placeholder="Enter recipient name"
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              className="mb-4"
              required
            />
            <Input
              label="Recipient Number"
              placeholder="Enter recipient number"
              value={recipientNumber}
              onChange={e => setRecipientNumber(e.target.value)}
              className="mb-4"
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
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
          <Button type="submit" color="primary" className="w-full mt-7">Send Money</Button>
        </form>
      </Modal>
      {/* Send Money Confirmation Modal */}
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title="Send Money Confirmation">
        <div className="bg-white rounded-xl w-full max-w-md">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 text-base">Transfer Summary</h3>
          </div>
          <div className="mb-2">
            <div className="font-semibold text-gray-700 text-sm mb-1">Recipient Name and Number</div>
            <div className="text-gray-400 text-sm leading-tight">{recipientName}</div>
            <div className="text-gray-400 text-sm leading-tight">{recipientNumber}</div>
          </div>
          <div className="my-4 text-gray-800 text-sm font-medium">Amount – ₵{amount}</div>
          <hr className="my-4" />
          <Button
            color="primary"
            className="w-full bg-lime-300 hover:bg-lime-400 text-gray-900"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      {/* Request Money Modal */}
      <Modal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} title="Request Money">
        <form className="space-y-4 " onSubmit={handleRequestMoney}>
          <div className="rounded-lg">
            <Input
              label="Requester Name"
              placeholder="Enter requester name"
              value={requestRecipientName}
              onChange={e => setRequestRecipientName(e.target.value)}
              className="mb-4"
              required
            />
            <Input
              label="Requester Number"
              placeholder="Enter requester number"
              value={requestRecipientNumber}
              onChange={e => setRequestRecipientNumber(e.target.value)}
              className="mb-4"
              required
            />
            <Input
              label="Amount"
              placeholder="Enter amount"
              value={requestAmount}
              onChange={e => setRequestAmount(e.target.value)}
              type="number"
              min="1"
              required
            />
          </div>
          <Select label="Categories" value={requestCategory} onChange={e => setRequestCategory(e.target.value)}>
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
          <Button type="submit" color="primary" className="w-full mt-7">Request Money</Button>

        </form>
      </Modal>
      {/* Request Money Confirmation Modal */}
      <Modal isOpen={isRequestConfirmOpen} onClose={() => setIsRequestConfirmOpen(false)} title="Request Money Confirmation">
        <div className="bg-white rounded-xl p-2 md:p-4 w-full max-w-md">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 text-base">Request Summary</h3>
          </div>
          <div className="mb-2">
            <div className="font-semibold text-gray-700 text-sm mb-1">Requester Name and Number</div>
            <div className="text-gray-400 text-sm leading-tight">{requestRecipientName}</div>
            <div className="text-gray-400 text-sm leading-tight">{requestRecipientNumber}</div>
          </div>
          <div className="my-4 text-gray-800 text-sm font-medium">Amount – ₵{requestAmount}</div>
          <hr className="my-4" />
          <Button
            color="secondary"
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700"
            onClick={handleRequestConfirm}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default QuickActions;
