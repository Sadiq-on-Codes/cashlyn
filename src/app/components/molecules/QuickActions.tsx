'use client'

import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Modal from '../molecules/Modal';
import { PaperAirplaneIcon, BanknotesIcon } from "@heroicons/react/24/solid";

const QuickActions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        
        <form className="space-y-4">
          <div className="rounded-lg">
            <Input label="Recipient Number" value="0542402347" readOnly className="mb-2" />
            <Input label="Amount" value="5000" readOnly />
          </div>
          <Select label="Categories" value="Grocery">
            <option>Grocery</option>
          </Select>
          <Button color="primary" className="w-full bg-lime-300 hover:bg-lime-400 text-gray-900 mt-2">Send Money</Button>
        </form>
      </Modal>
    </div>
  );
};

export default QuickActions;
