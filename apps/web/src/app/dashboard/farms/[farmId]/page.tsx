"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FarmDetailsPage({ params }: { params: { farmId: string } }) {
  const [fields, setFields] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Field Form State
  const [fieldName, setFieldName] = useState('');
  const [fieldArea, setFieldArea] = useState<number>(0);
  const [cropType, setCropType] = useState('Tomato');

  // Simulating fetch
  useEffect(() => {
    setTimeout(() => {
      setFields([
        { id: 1, name: "North Tomato Plot", area: 5.5, crop_type: "Tomato", status: "Healthy" },
        { id: 2, name: "East Wheat Block", area: 12.0, crop_type: "Wheat", status: "Attention Required" }
      ]);
      setLoading(false);
    }, 500);
  }, [params.farmId]);

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    const newField = { 
      id: Date.now(), 
      name: fieldName, 
      area: fieldArea, 
      crop_type: cropType,
      status: "Recently Planted" 
    };
    setFields([...fields, newField]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4">
        <Link href="/dashboard/farms" className="text-green-600 hover:underline text-sm">
          &larr; Back to All Farms
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Farm Fields</h1>
          <p className="text-gray-500">Manage planting zones and crop assignments.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow transition"
        >
          + Add New Field
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-32 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (Acres)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Crop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fields.map((field) => (
                <tr key={field.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{field.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{field.area}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{field.crop_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      field.status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {field.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900">Analyze Image</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inline Modal for adding fields */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Field to Farm</h2>
            <form onSubmit={handleCreateField} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Field Name</label>
                <input type="text" required className="w-full p-2 border rounded" value={fieldName} onChange={e => setFieldName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Area</label>
                  <input type="number" required min="0.1" step="0.1" className="w-full p-2 border rounded" value={fieldArea} onChange={e => setFieldArea(parseFloat(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Crop</label>
                  <select className="w-full p-2 border rounded bg-white" value={cropType} onChange={e => setCropType(e.target.value)}>
                    <option>Tomato</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Cotton</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add Field</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
