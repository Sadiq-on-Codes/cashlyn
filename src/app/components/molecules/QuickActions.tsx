import React from 'react';
import Button from '../atoms/Button';
import { PaperAirplaneIcon, BanknotesIcon } from "@heroicons/react/24/solid";

const QuickActions: React.FC = () => {
  return (
    <div className="flex gap-4">
      <Button icon={<PaperAirplaneIcon className="w-5 h-5" />} color="primary">Send Money</Button>
      <Button icon={<BanknotesIcon className="w-5 h-5" />} color="secondary">Request Money</Button>
    </div>
  );
};

export default QuickActions;
