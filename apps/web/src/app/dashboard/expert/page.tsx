"use client";
import React, { useState } from "react";

export default function ExpertPortalPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="p-8 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Case Submitted Successfully</h2>
        <p className="text-slate-500 text-center max-w-md">
          Your crop case has been sent to our agricultural experts. You will receive a notification when a specialist reviews your submission and provides treatment recommendations.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">Submit Another Case</button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Expert Consultation Portal</h1>
        <p className="text-slate-500 mt-1">Submit crop issues directly to certified agricultural scientists for professional advice.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="card">
            <div className="card-header border-b">
              <h3 className="card-title text-lg">Create New Case</h3>
            </div>
            <div className="card-content p-6 space-y-6">
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Farm/Field</label>
                  <select required className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all">
                    <option value="">-- Choose Field --</option>
                    <option>North Plot (Wheat)</option>
                    <option>East Plot (Tomato)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Crop Stage</label>
                  <select required className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all">
                    <option value="">-- Choose Stage --</option>
                    <option>Seedling</option>
                    <option>Vegetative</option>
                    <option>Flowering</option>
                    <option>Fruiting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Describe the Issue</label>
                <textarea 
                  required
                  rows={4} 
                  className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="E.g., I noticed yellowing on the lower leaves starting two days ago after heavy rain..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Upload Photos</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto"
                >
                  {isSubmitting ? "Submitting Case..." : "Submit Case to Experts"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="card-header border-b bg-slate-50 pb-4">
              <h3 className="card-title text-base">Your Active Cases</h3>
            </div>
            <div className="card-content p-0">
              <div className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-slate-800">Case #1042</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">UNDER REVIEW</span>
                </div>
                <p className="text-xs text-slate-500">Tomato Early Blight suspected</p>
                <p className="text-[10px] text-slate-400 mt-2">Submitted 2 hours ago</p>
              </div>
              <div className="p-4 hover:bg-slate-50 cursor-pointer opacity-70">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-slate-800">Case #0981</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">RESOLVED</span>
                </div>
                <p className="text-xs text-slate-500">Wheat rust treatment plan</p>
                <p className="text-[10px] text-slate-400 mt-2">Closed on Oct 12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Need immediate help?</h3>
            <p className="text-sm text-green-100 mb-4 leading-relaxed">Our AI Voice Assistant can provide instant preliminary guidance based on your field data.</p>
            <button className="bg-white text-green-700 w-full py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-green-50 transition-colors">
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
