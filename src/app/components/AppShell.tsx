'use client';
import React, { useState } from "react";
import Sidebar from "./organisms/Sidebar";
import TopBar from "./organisms/TopBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:ml-76 flex flex-col min-h-screen">
        <div className="fixed md:left-72 left-0 top-0 right-0 z-20">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
        </div>
        <main className="flex-1 mt-16 px-4">{children}</main>
      </div>
    </>
  );
} 