"use client";
import React, { useState } from "react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Administration</h1>
          <p className="text-slate-500 mt-1">Manage users, farms, and AI models across the AgriGuard system.</p>
        </div>
        <div className="flex space-x-2">
          <button className="btn-outline bg-white">Export Report</button>
          <button className="btn-primary bg-slate-900 hover:bg-slate-800 text-white shadow-none">System Settings</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">12,450</p>
          </div>
        </div>
        <div className="card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Farms</p>
            <p className="text-2xl font-bold text-slate-900">8,230</p>
          </div>
        </div>
        <div className="card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Open Cases</p>
            <p className="text-2xl font-bold text-slate-900">142</p>
          </div>
        </div>
        <div className="card p-6 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">AI Accuracy</p>
            <p className="text-2xl font-bold text-slate-900">96.8%</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 flex px-2 bg-slate-50">
          <button 
            onClick={() => setActiveTab("users")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "users" ? "border-green-600 text-green-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            User Management
          </button>
          <button 
            onClick={() => setActiveTab("models")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "models" ? "border-green-600 text-green-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            AI Model Status
          </button>
        </div>
        
        <div className="p-0">
          {activeTab === "users" && (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">Ravi Kumar</td>
                  <td className="px-6 py-4">Farmer</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">ACTIVE</span></td>
                  <td className="px-6 py-4">Sep 10, 2026</td>
                  <td className="px-6 py-4 text-right"><button className="text-blue-600 hover:underline">Edit</button></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">Dr. Sharma</td>
                  <td className="px-6 py-4">Expert Scientist</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">ACTIVE</span></td>
                  <td className="px-6 py-4">Aug 22, 2026</td>
                  <td className="px-6 py-4 text-right"><button className="text-blue-600 hover:underline">Edit</button></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">Amit Singh</td>
                  <td className="px-6 py-4">Farmer</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold">OFFLINE</span></td>
                  <td className="px-6 py-4">Sep 14, 2026</td>
                  <td className="px-6 py-4 text-right"><button className="text-blue-600 hover:underline">Edit</button></td>
                </tr>
              </tbody>
            </table>
          )}
          
          {activeTab === "models" && (
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center p-4 border border-slate-200 rounded-lg">
                <div>
                  <h4 className="font-bold text-slate-900">Disease Detection Model v2.4</h4>
                  <p className="text-sm text-slate-500 mt-1">Primary inference engine for leaf classification</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600 mb-1">Online (96.8% Acc)</div>
                  <button className="text-xs border border-slate-300 rounded px-2 py-1 hover:bg-slate-50">View Logs</button>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border border-slate-200 rounded-lg">
                <div>
                  <h4 className="font-bold text-slate-900">Yield Prediction Engine v1.1</h4>
                  <p className="text-sm text-slate-500 mt-1">Estimates crop yield based on weather and soil data</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-amber-600 mb-1">Training (72% complete)</div>
                  <button className="text-xs border border-slate-300 rounded px-2 py-1 hover:bg-slate-50">View Progress</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
