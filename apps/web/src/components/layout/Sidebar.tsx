"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-50 border-r min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b flex items-center justify-center bg-[#2E7D32]">
        <h1 className="text-xl font-bold text-white tracking-tight">AgriGuard AI</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="block p-3 rounded-md hover:bg-slate-200 text-slate-700 font-medium transition-colors">
          Overview
        </Link>
        <Link href="/dashboard/farms" className="block p-3 rounded-md hover:bg-slate-200 text-slate-700 font-medium transition-colors">
          My Farms
        </Link>
        <Link href="/dashboard/tasks" className="block p-3 rounded-md hover:bg-slate-200 text-slate-700 font-medium transition-colors">
          Tasks
        </Link>
        <Link href="/dashboard/inventory" className="block p-3 rounded-md hover:bg-slate-200 text-slate-700 font-medium transition-colors">
          Inventory
        </Link>
        <Link href="/dashboard/settings" className="block p-3 rounded-md hover:bg-slate-200 text-slate-700 font-medium transition-colors">
          Settings
        </Link>
      </nav>
      
      <div className="p-4 border-t bg-slate-100">
        <button className="w-full btn-primary flex items-center justify-center mb-4 rounded-full py-3 shadow-lg hover:shadow-xl transition-all">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Voice Assistant
        </button>
        <button onClick={logout} className="w-full btn-outline">
          Logout
        </button>
      </div>
    </aside>
  );
}
