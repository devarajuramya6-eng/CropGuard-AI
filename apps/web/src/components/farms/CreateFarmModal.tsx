"use client";
import React, { useState } from 'react';

interface FarmCreateData {
  name: string;
  area: number;
  location: string;
  soil_type: string;
}

export default function CreateFarmModal({ 
  isOpen, 
  onClose,
  onSubmit 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onSubmit: (data: FarmCreateData) => void;
}) {
  const [formData, setFormData] = useState<FarmCreateData>({
    name: '',
    area: 0,
    location: '',
    soil_type: 'Loamy',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Add New Farm</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
            <input 
              type="text" 
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Sunny Valley"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (Acres)</label>
              <input 
                type="number" 
                min="0.1" step="0.1"
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                value={formData.area}
                onChange={e => setFormData({...formData, area: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500 bg-white"
                value={formData.soil_type}
                onChange={e => setFormData({...formData, soil_type: e.target.value})}
              >
                <option>Loamy</option>
                <option>Clay</option>
                <option>Sandy</option>
                <option>Silt</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              placeholder="e.g. Northern Region"
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700">Save Farm</button>
          </div>
        </form>
      </div>
    </div>
  );
}
