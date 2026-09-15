"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from /api/v1/statistics/dashboard
    // For now, we mock the UI display
    setTimeout(() => {
      setStats({
        total_farms: 2,
        total_fields: 5,
        total_area_acres: 120.5,
        disease_rates: {
          healthy_percentage: 80,
          at_risk_percentage: 20
        },
        recent_alerts: 1
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
        <p className="text-slate-500 mt-2">Here is what's happening on your farms today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card hover:shadow-md transition-shadow">
          <div className="card-header pb-2">
            <h3 className="text-sm font-medium text-slate-500">Total Farms</h3>
          </div>
          <div className="card-content">
            <div className="text-3xl font-bold text-slate-800">{stats.total_farms}</div>
          </div>
        </div>
        
        <div className="card hover:shadow-md transition-shadow">
          <div className="card-header pb-2">
            <h3 className="text-sm font-medium text-slate-500">Total Fields</h3>
          </div>
          <div className="card-content">
            <div className="text-3xl font-bold text-slate-800">{stats.total_fields}</div>
          </div>
        </div>
        
        <div className="card hover:shadow-md transition-shadow">
          <div className="card-header pb-2">
            <h3 className="text-sm font-medium text-slate-500">Total Area</h3>
          </div>
          <div className="card-content">
            <div className="text-3xl font-bold text-slate-800">{stats.total_area_acres} <span className="text-lg font-normal text-slate-500">acres</span></div>
          </div>
        </div>
        
        <div className="card border-red-200 bg-red-50 hover:shadow-md transition-shadow">
          <div className="card-header pb-2">
            <h3 className="text-sm font-medium text-red-600">Active Alerts</h3>
          </div>
          <div className="card-content">
            <div className="text-3xl font-bold text-red-700">{stats.recent_alerts}</div>
            <p className="text-xs text-red-500 mt-1">Requires immediate attention</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="card h-96 flex flex-col justify-between">
          <div className="card-header">
            <h3 className="card-title text-lg text-slate-800">Crop Health Overview</h3>
          </div>
          <div className="card-content flex-1 flex items-center justify-center">
            {/* Mock Chart Area */}
            <div className="w-full max-w-sm">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-green-700">Healthy ({stats.disease_rates.healthy_percentage}%)</span>
                <span className="text-sm font-medium text-red-700">At Risk ({stats.disease_rates.at_risk_percentage}%)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden flex">
                <div className="bg-green-500 h-4" style={{ width: `${stats.disease_rates.healthy_percentage}%` }}></div>
                <div className="bg-red-500 h-4" style={{ width: `${stats.disease_rates.at_risk_percentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card h-96">
          <div className="card-header">
            <h3 className="card-title text-lg text-slate-800">Upcoming Tasks</h3>
          </div>
          <div className="card-content">
            <ul className="space-y-4">
              <li className="flex items-center p-3 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary mr-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Spray Fungicide on Tomato Plot A</p>
                  <p className="text-xs text-red-500">Due Today</p>
                </div>
              </li>
              <li className="flex items-center p-3 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary mr-4" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">Irrigate Wheat Field North</p>
                  <p className="text-xs text-slate-500">Tomorrow</p>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <button className="btn-outline w-full text-xs">View All Tasks</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
