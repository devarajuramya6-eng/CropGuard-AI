"use client";
import { useState, useRef } from "react";

export default function ScanPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setResult(null); // Reset previous result
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate API call to AI model
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        disease: "Early Blight",
        crop: "Tomato",
        confidence: 94.2,
        severity: "Moderate",
        medicines: [
          "Copper-based fungicides (e.g., Copper Hydroxide)",
          "Chlorothalonil broad-spectrum fungicide"
        ],
        actions: [
          "Prune lower leaves to improve air circulation",
          "Apply mulch to prevent soil from splashing onto leaves",
          "Water at the base of the plant, avoid wetting leaves"
        ]
      });
    }, 2500);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Crop Disease Scanner</h1>
          <p className="text-slate-500 mt-1">Upload a photo of a sick plant for instant AI diagnosis and treatment plans.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="card flex flex-col items-center p-6 border-2 border-dashed border-slate-300 bg-slate-50">
          {selectedImage ? (
            <div className="w-full relative rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center min-h-[300px]">
              <img src={selectedImage} alt="Crop" className="max-h-[400px] object-contain" />
            </div>
          ) : (
            <div className="w-full min-h-[300px] flex flex-col items-center justify-center text-slate-400 space-y-4 mb-4">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No image selected</p>
            </div>
          )}

          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          
          <div className="flex w-full space-x-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="btn-outline flex-1"
            >
              Choose Image
            </button>
            <button 
              onClick={handleAnalyze}
              disabled={!selectedImage || isAnalyzing}
              className="btn-primary flex-1 disabled:opacity-50 flex justify-center items-center"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : "Analyze Disease"}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="card h-full">
          <div className="card-header border-b">
            <h3 className="card-title text-lg">AI Diagnosis Results</h3>
          </div>
          <div className="card-content">
            {!result && !isAnalyzing && (
              <div className="h-full flex items-center justify-center text-slate-400 py-12">
                <p>Upload an image and click analyze to see results</p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12 space-y-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="animate-pulse">Running advanced computer vision models...</p>
              </div>
            )}
            
            {result && !isAnalyzing && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-red-700">{result.disease}</h4>
                      <p className="text-red-600/80 text-sm">Identified on {result.crop}</p>
                    </div>
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {result.confidence}% Confidence
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    Recommended Medicines
                  </h5>
                  <ul className="space-y-2">
                    {result.medicines.map((med: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-slate-600">{med}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                    Actionable Steps
                  </h5>
                  <ul className="space-y-2">
                    {result.actions.map((act: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">{i+1}.</span>
                        <span className="text-slate-600">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
