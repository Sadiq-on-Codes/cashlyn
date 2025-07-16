// components/BalanceCard.tsx
import React, { useState } from "react";
import { WalletIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type Props = {
  balance: number;
};

const BalanceCard: React.FC<Props> = ({ balance }) => {
  const [showBalance, setShowBalance] = useState(true);
  return (
    <div className="flex items-center gap-3 bg-[#4E5257] py-4 md:py-6 pl-3 md:pl-4 pr-4 md:pr-10 shadow w-full md:w-fit rounded-lg min-w-0">
      <div className="bg-gray-600 p-3 md:p-4 rounded-full">
        <WalletIcon className="w-6 h-6 text-lime-300" />
      </div>
      <div className="min-w-0 flex items-center gap-2">
        <div>
          <p className="text-sm text-[#929EAE] truncate">Total Balance</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 md:mt-4 truncate">
            {showBalance ? `₵${balance.toFixed(2)}` : "****"}
          </h2>
        </div>
        <button
          type="button"
          className="ml-2 mt-2 p-1 rounded hover:bg-gray-700 focus:outline-none"
          onClick={() => setShowBalance((prev) => !prev)}
          aria-label={showBalance ? "Hide balance" : "Show balance"}
        >
          {showBalance ? (
            <EyeSlashIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <EyeIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
