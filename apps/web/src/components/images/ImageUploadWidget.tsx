"use client";
import React, { useState, useRef } from 'react';

export default function ImageUploadWidget({ fieldId }: { fieldId?: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    
    // Simulate API upload for now
    setTimeout(() => {
      setStatus('success');
    }, 1500);

    /* Real implementation mapping to our new endpoint:
    const formData = new FormData();
    formData.append('file', file);
    if (fieldId) formData.append('field_id', fieldId.toString());

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('/api/v1/images', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (response.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
    */
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-md w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-4">AI Disease Diagnosis</h3>
      
      {!preview ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-4xl mb-3">📸</div>
          <p className="text-gray-600 font-medium">Click to select an image</p>
          <p className="text-sm text-gray-400 mt-1">JPEG, PNG, WebP up to 10MB</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden h-48 border border-gray-200 bg-gray-100">
            <img src={preview} alt="Crop leaf preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => { setFile(null); setPreview(null); }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>

          {status === 'idle' && (
            <button onClick={handleUpload} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
              Upload for AI Analysis
            </button>
          )}

          {status === 'uploading' && (
            <button disabled className="w-full bg-gray-400 text-white font-bold py-3 rounded-lg cursor-not-allowed flex justify-center items-center">
              <span className="animate-spin mr-2">⏳</span> Uploading...
            </button>
          )}

          {status === 'success' && (
            <div className="p-4 bg-green-50 text-green-800 rounded-lg text-center border border-green-200 font-medium">
              ✅ Image uploaded successfully!<br/>
              <span className="text-sm font-normal">Awaiting Image Quality Check...</span>
            </div>
          )}
        </div>
      )}
      
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        accept="image/jpeg, image/png, image/webp" 
        onChange={handleFileChange} 
      />
    </div>
  );
}
