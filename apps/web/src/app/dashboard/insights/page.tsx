"use client";
import React, { useState, useEffect } from "react";

export default function InsightsPage() {
  const [location, setLocation] = useState("Punjab, India");
  const [isLocating, setIsLocating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const statesAndDistricts = [
    "Punjab, India",
    "Haryana, India",
    "Maharashtra, India",
    "Uttar Pradesh, India",
    "Madhya Pradesh, India"
  ];

  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, reverse geocode lat/lng to a place name
          // const { latitude, longitude } = position.coords;
          setTimeout(() => {
            setLocation("Current Location (GPS)");
            setIsLocating(false);
            setShowDropdown(false);
          }, 800);
        },
        (error) => {
          alert("Unable to retrieve your location");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Market & Weather Insights</h1>
          <p className="text-slate-500 mt-1">Real-time data to help you make informed farming decisions.</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-white border border-slate-200 shadow-sm rounded-lg px-4 py-2 flex items-center text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2 text-[#0D5C35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {location}
            <svg className="w-4 h-4 ml-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50">
              <div className="px-3 pb-2 mb-2 border-b border-slate-100">
                <button 
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="w-full text-left px-3 py-2 text-sm text-[#0D5C35] font-semibold bg-green-50 rounded flex items-center hover:bg-green-100 transition-colors"
                >
                  <svg className={`w-4 h-4 mr-2 ${isLocating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {isLocating ? "Locating..." : "Use Live Location"}
                </button>
              </div>
              <div className="px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Region</div>
              {statesAndDistricts.map((loc, idx) => (
                <button 
                  key={idx}
                  onClick={() => { setLocation(loc); setShowDropdown(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weather Forecast */}
        <div className="card lg:col-span-2">
          <div className="card-header border-b">
            <h3 className="card-title text-lg flex items-center">
              <svg className="w-5 h-5 mr-2 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              7-Day Weather Forecast
            </h3>
          </div>
          <div className="card-content p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { day: "Today", temp: "32°C", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z", color: "text-amber-500", desc: "Sunny" },
                { day: "Tue", temp: "33°C", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z", color: "text-amber-500", desc: "Clear" },
                { day: "Wed", temp: "30°C", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "text-slate-400", desc: "Cloudy" },
                { day: "Thu", temp: "28°C", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15", color: "text-sky-500", desc: "Rain" },
                { day: "Fri", temp: "27°C", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15", color: "text-sky-600", desc: "Heavy Rain" },
                { day: "Sat", temp: "29°C", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "text-slate-400", desc: "Partly Cloudy" },
                { day: "Sun", temp: "31°C", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z", color: "text-amber-500", desc: "Sunny" }
              ].map((w, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-colors">
                  <span className="text-sm font-semibold text-slate-700 mb-2">{w.day}</span>
                  <svg className={`w-8 h-8 mb-2 ${w.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={w.icon} /></svg>
                  <span className="text-lg font-bold text-slate-900">{w.temp}</span>
                  <span className="text-[10px] text-slate-500 mt-1">{w.desc}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div>
                <h4 className="text-sm font-bold text-yellow-800">Agricultural Weather Alert</h4>
                <p className="text-sm text-yellow-700 mt-1">Heavy rainfall expected on Thursday. Consider delaying pesticide spraying and ensure field drainage channels are clear.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Market Prices */}
        <div className="card">
          <div className="card-header border-b">
            <h3 className="card-title text-lg flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Live Market Prices
            </h3>
          </div>
          <div className="card-content p-0">
            <ul className="divide-y divide-gray-100">
              {[
                { crop: "Wheat", price: "₹2,125 / qtl", trend: "up", change: "+1.2%" },
                { crop: "Rice (Paddy)", price: "₹2,040 / qtl", trend: "up", change: "+0.8%" },
                { crop: "Tomato", price: "₹1,800 / qtl", trend: "down", change: "-4.5%" },
                { crop: "Onion", price: "₹2,200 / qtl", trend: "up", change: "+2.1%" },
                { crop: "Potato", price: "₹1,100 / qtl", trend: "flat", change: "0.0%" }
              ].map((market, i) => (
                <li key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mr-3">
                      {market.crop[0]}
                    </div>
                    <span className="font-semibold text-slate-800">{market.crop}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{market.price}</div>
                    <div className={`text-xs font-medium flex items-center justify-end mt-0.5 ${
                      market.trend === 'up' ? 'text-green-600' : market.trend === 'down' ? 'text-red-500' : 'text-slate-400'
                    }`}>
                      {market.trend === 'up' && <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>}
                      {market.trend === 'down' && <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>}
                      {market.trend === 'flat' && <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>}
                      {market.change}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500 rounded-b-lg">
              Last updated: 10 minutes ago via APMC APIS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
