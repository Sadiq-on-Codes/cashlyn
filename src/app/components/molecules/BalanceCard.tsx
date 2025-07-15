// components/BalanceCard.tsx
import React from "react";
import { WalletIcon } from "@heroicons/react/24/solid";

type Props = {
  balance: number;
};

const BalanceCard: React.FC<Props> = ({ balance }) => {
  return (
    <div className="flex items-center gap-3 bg-[#4E5257] py-4 md:py-6 pl-3 md:pl-4 pr-4 md:pr-10 shadow w-full md:w-fit rounded-lg min-w-0">
      <div className="bg-gray-600 p-3 md:p-4 rounded-full">
        <WalletIcon className="w-6 h-6 text-lime-300" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-[#929EAE] truncate">Total Balance</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 md:mt-4 truncate">₵{balance.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default BalanceCard;
