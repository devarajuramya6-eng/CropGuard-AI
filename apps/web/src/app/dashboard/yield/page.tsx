"use client";
import React, { useState } from "react";

export default function YieldPredictionPage() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<null | { estimatedYield: number, confidence: number, factors: string[] }>(null);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      setPrediction({
        estimatedYield: 4.2, // tons per acre
        confidence: 87,
        factors: ["Optimal recent rainfall (+12%)", "Early Blight risk in region (-4%)", "Good soil pH levels (+5%)"]
      });
      setIsPredicting(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">AI Yield Predictor</h1>
        <p className="text-slate-500 mt-1">Estimate your upcoming harvest volume based on ML models trained on weather, soil, and historical data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handlePredict} className="card p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Farm & Field</label>
              <select required className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-green-500 outline-none">
                <option value="">-- Choose Field --</option>
                <option>North Plot (Wheat, 12 acres)</option>
                <option>East Plot (Tomato, 5 acres)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Soil Moisture (%)</label>
              <input type="number" required min="0" max="100" defaultValue="45" className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-green-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Fertilizer Application Date</label>
              <input type="date" required className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPredicting}
            className="w-full bg-[#0D5C35] hover:bg-[#0a4729] text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center"
          >
            {isPredicting ? (
              <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Analyzing Satellite & Field Data...</>
            ) : "Generate Yield Prediction"}
          </button>
        </form>

        <div className="card bg-slate-50 p-0 overflow-hidden flex flex-col justify-center border-dashed border-2 border-slate-200">
          {prediction ? (
            <div className="p-8 text-center animate-in zoom-in duration-300">
              <h3 className="text-lg font-medium text-slate-500 mb-2">Estimated Harvest Yield</h3>
              <div className="text-6xl font-black text-[#0D5C35] mb-2">{prediction.estimatedYield}</div>
              <p className="text-slate-600 font-medium mb-8">Tons per Acre</p>
              
              <div className="bg-white rounded-lg p-4 border border-slate-100 text-left shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-slate-700">Model Confidence</span>
                  <span className="text-sm font-bold text-green-600">{prediction.confidence}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${prediction.confidence}%` }}></div>
                </div>
                
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Factors</h4>
                <ul className="space-y-2">
                  {prediction.factors.map((factor, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start">
                      <span className="mr-2 text-green-500 font-bold">•</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              <p>Select a field and enter current metrics to generate an AI-powered yield prediction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
