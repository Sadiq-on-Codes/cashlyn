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
  { label: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { label: "Logout", href: "#", icon: ArrowLeftOnRectangleIcon },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col justify-between w-76 bg-white px-6 font-sans border border-gray-100 h-screen overflow-hidden">
      <div>
        {/* Logo/Brand */}
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
        {/* Navigation */}
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
      </div>
      {/* Bottom Links */}
      <div className="flex flex-col gap-2 mb-2">
        {bottomLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
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
  );
};

export default Sidebar;
