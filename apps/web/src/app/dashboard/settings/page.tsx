"use client";
import { useAuth } from "../../../context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
      
      <div className="card max-w-2xl">
        <div className="card-header border-b">
          <h3 className="card-title text-lg text-slate-800">Profile Information</h3>
        </div>
        <div className="card-content mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" disabled value={user?.full_name || ""} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" disabled value={user?.email || ""} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input type="text" disabled value={user?.role || ""} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
          </div>
        </div>
      </div>
      
      <div className="card max-w-2xl">
        <div className="card-header border-b">
          <h3 className="card-title text-lg text-slate-800">Voice Assistant Preferences</h3>
        </div>
        <div className="card-content mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
            <select className="mt-1 w-full p-2 border border-gray-300 rounded-md">
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
