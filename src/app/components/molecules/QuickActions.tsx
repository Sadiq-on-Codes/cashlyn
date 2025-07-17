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
    <div className="border border-gray-200 rounded-lg p-4 md:p-4 bg-white">
      <div className="mb-2 md:mb-4">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
      </div>
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
        <div className="w-full max-w-md  ">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
              <PaperAirplaneIcon className="w-5 h-5 text-green-500 rotate-45" />
            </span>
            <h3 className="font-bold text-gray-900 text-lg">Transfer Summary</h3>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-gray-500 text-xs mb-1">Recipient Name and Number</div>
            <div className="text-gray-800 text-sm leading-tight font-medium">{recipientName}</div>
            <div className="text-gray-500 text-sm leading-tight">{recipientNumber}</div>
          </div>
          <div className="flex items-center justify-between my-4">
            <span className="text-gray-500 text-xs">Amount</span>
            <span className="text-green-600 text-base font-bold tracking-wide">₵{amount}</span>
          </div>
          <hr className="my-4 border-gray-200" />
          <Button
            color="primary"
            className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-2 rounded-lg transition-colors duration-150"
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
        <div className=" w-full max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
              <BanknotesIcon className="w-5 h-5 text-blue-500" />
            </span>
            <h3 className="font-bold text-gray-900 text-lg">Request Summary</h3>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-gray-500 text-xs mb-1">Requester Name and Number</div>
            <div className="text-gray-800 text-sm leading-tight font-medium">{requestRecipientName}</div>
            <div className="text-gray-500 text-sm leading-tight">{requestRecipientNumber}</div>
          </div>
          <div className="flex items-center justify-between my-4">
            <span className="text-gray-500 text-xs">Amount</span>
            <span className="text-blue-600 text-base font-bold tracking-wide">₵{requestAmount}</span>
          </div>
          <hr className="my-4 border-gray-200" />
          <Button
            color="secondary"
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 rounded-lg transition-colors duration-150"
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
