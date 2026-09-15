"use client";
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Farm Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h3 className="text-green-800 text-sm font-medium">Total Farms</h3>
            <p className="text-3xl font-bold text-green-900 mt-2">2</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-blue-800 text-sm font-medium">Active Crops</h3>
            <p className="text-3xl font-bold text-blue-900 mt-2">5</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <h3 className="text-amber-800 text-sm font-medium">Pending Alerts</h3>
            <p className="text-3xl font-bold text-amber-900 mt-2">1</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent AI Diagnoses</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded flex justify-between items-center border border-gray-100">
              <div>
                <p className="font-medium">Tomato Field - Leaves</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Early Blight (78%)</span>
            </div>
            <div className="p-3 bg-gray-50 rounded flex justify-between items-center border border-gray-100">
              <div>
                <p className="font-medium">Wheat Field 2</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Healthy (95%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
          <div className="text-5xl mb-4">📸</div>
          <h3 className="text-lg font-medium text-gray-900">New Diagnosis</h3>
          <p className="text-gray-500 mb-6 max-w-sm">Upload a photo of a crop leaf to instantly analyze it for diseases using AI.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}
