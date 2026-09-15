"use client";
import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-green-800 text-white flex flex-col h-full shadow-xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold">AgriGuard AI</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <Link href="/dashboard" className="block px-4 py-3 rounded hover:bg-green-700 transition">
          Dashboard
        </Link>
        <Link href="/dashboard/farms" className="block px-4 py-3 rounded hover:bg-green-700 transition">
          My Farms
        </Link>
        <Link href="/dashboard/fields" className="block px-4 py-3 rounded hover:bg-green-700 transition">
          Fields
        </Link>
        <Link href="/dashboard/crops" className="block px-4 py-3 rounded hover:bg-green-700 transition">
          Crops
        </Link>
        <Link href="/dashboard/diagnosis" className="block px-4 py-3 rounded hover:bg-green-700 transition text-green-200 font-semibold">
          AI Diagnosis
        </Link>
        <Link href="/dashboard/history" className="block px-4 py-3 rounded hover:bg-green-700 transition">
          Health History
        </Link>
        <Link href="/dashboard/weather" className="block px-4 py-3 rounded hover:bg-green-700 transition">
          Weather
        </Link>
        <Link href="/dashboard/alerts" className="block px-4 py-3 rounded hover:bg-green-700 transition">
          Alerts
        </Link>
        <Link href="/dashboard/experts" className="block px-4 py-3 rounded hover:bg-green-700 transition">
          Experts
        </Link>
      </nav>

      <div className="p-4 mt-auto">
        <button className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-400 text-white py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 font-bold">
          <span className="text-xl">🎤</span>
          <span>Ask AgriGuard</span>
        </button>
      </div>
    </aside>
  );
}
