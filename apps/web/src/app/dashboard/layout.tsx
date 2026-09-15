import React from 'react';
import TopNavbar from '@/components/layout/TopNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans selection:bg-green-100">
      <TopNavbar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
