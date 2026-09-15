"use client";
import React, { useState, useEffect } from 'react';
import CreateFarmModal from '@/components/farms/CreateFarmModal';
import { fetchApi } from '@/lib/api';

export default function FarmsPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Simulating data fetch for now until backend is running locally
  useEffect(() => {
    // In a real environment:
    // fetchApi('/farms').then(setFarms).catch(e => setError(e.message));
    setTimeout(() => {
      setFarms([
        { id: 1, name: "Green Valley Farm", area: 50.5, location: "North District", soil_type: "Loamy" },
        { id: 2, name: "Riverside Plot", area: 12.0, location: "East Bank", soil_type: "Clay" }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleCreateFarm = async (data: any) => {
    // In a real environment: 
    // const newFarm = await fetchApi('/farms', { method: 'POST', body: JSON.stringify(data) });
    const newFarm = { id: Date.now(), ...data };
    setFarms([...farms, newFarm]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Farms</h1>
          <p className="text-gray-500">Manage your farm properties and details.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow transition"
        >
          + Add New Farm
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-20 bg-gray-200 rounded w-full"></div>
            <div className="h-20 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <div key={farm.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="h-32 bg-green-100 flex items-center justify-center text-4xl">
                🌾
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{farm.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><span className="font-semibold">Area:</span> {farm.area} Acres</p>
                  <p><span className="font-semibold">Location:</span> {farm.location}</p>
                  <p><span className="font-semibold">Soil:</span> {farm.soil_type}</p>
                </div>
                <button className="w-full text-green-600 font-medium py-2 border border-green-200 rounded hover:bg-green-50 transition">
                  Manage Fields &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateFarmModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateFarm} 
      />
    </div>
  );
}
