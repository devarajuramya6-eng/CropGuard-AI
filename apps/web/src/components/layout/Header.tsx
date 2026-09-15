"use client";
import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">Welcome back, Farmer</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-green-600 transition">
          🔔 <span className="sr-only">Notifications</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold">
          F
        </div>
      </div>
    </header>
  );
}
