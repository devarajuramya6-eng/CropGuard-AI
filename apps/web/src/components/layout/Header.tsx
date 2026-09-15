"use client";

import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm sticky top-0 z-10">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        {/* Mock Notification Bell */}
        <button className="p-2 rounded-full hover:bg-slate-100 relative transition-colors">
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold cursor-pointer hover:bg-[#1B5E20] transition-colors">
          {user?.email?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}
