"use client";
import React from "react";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";
// import { usePathname } from 'next/navigation';

const TopBar: React.FC<{ onMenuClick?: () => void }> = ({ onMenuClick }) => {
  // const pageHeading = usePathname().slice(1);
  return (
    <header className="flex items-center justify-between py-2 px-6 bg-[var(--card)] border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-full hover:bg-[var(--muted)] mr-2"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <svg className="w-7 h-7 text-[var(--muted-foreground)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        {/* <h1 className="hidden md:block text-2xl font-bold text-[var(--foreground)]">{pageHeading.toUpperCase()}</h1> */}
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-[var(--muted)] transition-colors">
          <MagnifyingGlassIcon className="w-6 h-6 text-[var(--muted-foreground)]" />
        </button>
        <button className="relative p-2 rounded-full hover:bg-[var(--muted)] transition-colors">
          <BellIcon className="w-6 h-6 text-[var(--muted-foreground)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--lime)] rounded-full border-2 border-[var(--card)]"></span>
        </button>
        <div className="flex items-center gap-2 bg-[var(--muted)] rounded-full px-3 py-2 border border-[var(--muted)]">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--lime)] text-[var(--foreground)] font-bold text-lg">
            A
          </div>
          <span className="font-medium text-[var(--muted-foreground)] text-sm">Abubakar Sadick</span>
          <ChevronDownIcon className="w-4 h-4 text-[var(--muted-foreground)]" />
        </div>
      </div>
    </header>
  );
};

export default TopBar; 