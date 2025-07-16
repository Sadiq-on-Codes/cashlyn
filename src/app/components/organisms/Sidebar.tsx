"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
        className={`fixed inset-0 bg-[var(--foreground)] opacity-25 z-30 transition-opacity md:hidden ${open ? "block" : "hidden"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`flex flex-col fixed left-0 top-0 h-full z-40 w-64 bg-[var(--sidebar-bg)]  font-sans border border-[var(--sidebar-border)] transition-transform duration-300 transform md:translate-x-0 md:block md:w-72`}
        style={{ minWidth: '16rem' }}
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <button
          className="md:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--muted)]"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg className="w-6 h-6 text-[var(--muted-foreground)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center justify-start gap-3 mx-2 mb-12 mt-2 border-b border-gray-200 py-3 px-6">
          <span>
            <div className="w-9 h-9 rounded-lg bg-[var(--sidebar-primary)] flex items-center justify-center">
              <span className="text-[var(--sidebar-primary-foreground)] text-2xl font-extrabold select-none">C</span>
            </div>
          </span>
          <span className="text-2xl font-bold text-[var(--sidebar-foreground)] tracking-wider select-none">
            Cashlyn
          </span>
        </div>
        <div className="flex flex-col flex-1 justify-between">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors group
                    ${
                      active
                        ? "bg-[var(--sidebar-active)] text-[var(--sidebar-text-active)] font-bold shadow-sm"
                        : "text-[var(--sidebar-text)] hover:bg-[var(--sidebar-accent)]"
                    }
                  `}
                  style={{ minHeight: 48 }}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      active
                        ? "text-[var(--sidebar-text-active)]"
                        : "text-[var(--sidebar-text)] group-hover:text-[var(--sidebar-text-active)]"
                    }`}
                  />
                  <span className="leading-none">{link.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-2 mb-4">
            {bottomLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-[var(--sidebar-text)] hover:bg-[var(--sidebar-accent)] transition-colors group"
                  style={{ minHeight: 44 }}
                >
                  <Icon className="w-6 h-6 text-[var(--sidebar-text)] group-hover:text-[var(--sidebar-text-active)]" />
                  <span className="leading-none">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
