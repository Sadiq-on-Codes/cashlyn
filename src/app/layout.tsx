import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/organisms/Sidebar";
import TopBar from "./components/organisms/TopBar";

export const metadata: Metadata = {
  title: "Cashlyn",
  description: "A fintech application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 font-sans">
        <div className="fixed left-0 top-0 h-screen z-30 w-76">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col ml-76">
          <div className="fixed left-76 top-0 right-0 z-20">
            <TopBar />
          </div>
          <main className="flex-1 mt-24">{children}</main>
        </div>
      </body>
    </html>
  );
}
