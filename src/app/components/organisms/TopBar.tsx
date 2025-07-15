"use client";
import React from "react";
import Image from "next/image";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";
import { usePathname } from 'next/navigation';

const TopBar: React.FC<{ onMenuClick?: () => void }> = ({ onMenuClick }) => {
  const pageHeading = usePathname().slice(1);
  return (
    <header className="flex items-center justify-between py-8 px-6 bg-white">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 mr-2"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">{pageHeading.toUpperCase()}</h1>
      </div>
      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* App Switcher Button */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
        </button>
        {/* Notification icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <BellIcon className="w-6 h-6 text-gray-400" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-lime-400 rounded-full border-2 border-white"></span>
        </button>
        {/* User avatar and name */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 border border-gray-100">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
            priority
          />
          <span className="font-medium text-gray-700 text-sm">Abubakar Sadick</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default TopBar; 