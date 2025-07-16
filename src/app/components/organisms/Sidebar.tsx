"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { label: "Transactions", href: "/transactions", icon: CreditCardIcon },
  { label: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

const bottomLinks = [
  { label: "Help", href: "/help", icon: QuestionMarkCircleIcon },
  { label: "Logout", href: "/logout", icon: ArrowLeftOnRectangleIcon },
];

const Sidebar: React.FC<{
  open?: boolean;
  onClose?: () => void;
}> = ({ open = false, onClose }) => {
  const pathname = usePathname();
  return (
    <>
      <div
        className={`fixed inset-0 bg-black opacity-25 z-30 transition-opacity md:hidden ${open ? "block" : "hidden"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed left-0 top-0 h-full z-40 w-64 bg-white px-6 font-sans border border-gray-100 overflow-y-auto transition-transform duration-300 transform md:translate-x-0 md:block ${open ? "translate-x-0" : "-translate-x-full"} md:w-72`}
        style={{ minWidth: '16rem' }}
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <button
          className="md:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center justify-start gap-3 mx-2 mb-12 mt-8">
          <span>
            <div className="w-9 h-9 rounded-lg bg-brand-black flex items-center justify-center">
              <span className="text-white bg-black px-2 rounded-lg text-2xl font-extrabold select-none">C</span>
            </div>
          </span>
          <span className="text-xl font-extrabold text-brand-black tracking-tight select-none">
            Cashlyn
          </span>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors group
                  ${
                    active
                      ? "bg-lime-300 text-brand-black font-bold shadow-sm"
                      : "text-gray-400 hover:bg-gray-50"
                  }
                `}
                style={{ minHeight: 48 }}
              >
                <Icon
                  className={`w-6 h-6 ${
                    active
                      ? "text-brand-black"
                      : "text-gray-400 group-hover:text-brand-black"
                  }`}
                />
                <span className="leading-none">{link.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="flex flex-col gap-2 mb-2 mt-8">
          {bottomLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href} // TODO: Replace '#' with actual route or handler
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-400 hover:bg-gray-50 transition-colors group"
                style={{ minHeight: 44 }}
              >
                <Icon className="w-6 h-6 text-gray-400 group-hover:text-brand-black" />
                <span className="leading-none">{link.label}</span>
              </a>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
