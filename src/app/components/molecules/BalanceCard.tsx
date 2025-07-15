// components/BalanceCard.tsx
import React from "react";
import { WalletIcon } from "@heroicons/react/24/solid";

type Props = {
  balance: number;
};

const BalanceCard: React.FC<Props> = ({ balance }) => {
  return (
    <div className="flex items-center gap-3 bg-[#4E5257] py-6 pl-4 pr-10 shadow w-fit rounded-lg">
      <div className="bg-gray-600 p-4 rounded-full">
        <WalletIcon className="w-6 h-6 text-lime-300" />
      </div>
      <div>
        <p className="text-sm text-[#929EAE]">Total Balance</p>
        <h2 className="text-3xl font-bold text-white mt-4">₵{balance.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default BalanceCard;
