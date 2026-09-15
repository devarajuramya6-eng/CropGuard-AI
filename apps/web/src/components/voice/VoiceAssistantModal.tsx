"use client";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function VoiceAssistantModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hello! I am your AgriGuard Voice Assistant. How can I help with your farm today?" }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleSimulateVoice = () => {
    setIsListening(true);
    
    // Simulate user speaking
    setTimeout(() => {
      let userText = "What is the status of my tomato field?";
      if (language === "hi-IN") userText = "मेरे टमाटर के खेत की स्थिति क्या है?";
      if (language === "te-IN") userText = "నా టమోటా పొలం పరిస్థితి ఏమిటి?";
      if (language === "ta-IN") userText = "என் தக்காளி வயலின் நிலை என்ன?";
      if (language === "ml-IN") userText = "എന്റെ തക്കാളി പാടത്തിന്റെ അവസ്ഥ എന്താണ്?";
      if (language === "es-ES") userText = "¿Cuál es el estado de mi campo de tomates?";
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userText }]);
      setIsListening(false);
      
      // Simulate AI response
      setTimeout(() => {
        let aiText = "Your tomato field is currently at risk for Early Blight due to recent humidity. I recommend applying fungicide.";
        if (language === "hi-IN") aiText = "हाल की नमी के कारण आपके टमाटर के खेत में अर्ली ब्लाइट का खतरा है। मैं फफूंदनाशक लगाने की सलाह देता हूँ।";
        if (language === "te-IN") aiText = "ఇటీవలి తేమ కారణంగా మీ టమోటా పొలం ప్రస్తుతం ఎర్లీ బ్లైట్ ప్రమాదంలో ఉంది. నేను శిలీంద్ర సంహారిణిని అప్లై చేయమని సిఫార్సు చేస్తున్నాను.";
        if (language === "ta-IN") aiText = "சமீபத்திய ஈரப்பதம் காரணமாக உங்கள் தக்காளி வயலில் ஏர்லி பிளைட் ஏற்படும் அபாயம் உள்ளது. பூஞ்சைக் கொல்லியைப் பயன்படுத்துமாறு பரிந்துரைக்கிறேன்.";
        if (language === "ml-IN") aiText = "അടുത്തിടെയുണ്ടായ ഈർപ്പം കാരണം നിങ്ങളുടെ തക്കാളി പാടത്ത് ഏർലി ബ്ലൈറ്റ് വരാൻ സാധ്യതയുണ്ട്. കുമിൾനാശിനി പ്രയോഗിക്കാൻ ഞാൻ ശുപാർശ ചെയ്യുന്നു.";
        if (language === "es-ES") aiText = "Su campo de tomates está actualmente en riesgo de Tizón Temprano debido a la humedad reciente. Recomiendo aplicar fungicida.";
        
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: aiText }]);
      }, 1500);
      
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#2E7D32] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h2 className="font-semibold text-lg">AgriGuard AI Expert</h2>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm focus:outline-none"
            >
              <option value="en-US" className="text-black">English</option>
              <option value="hi-IN" className="text-black">हिंदी (Hindi)</option>
              <option value="te-IN" className="text-black">తెలుగు (Telugu)</option>
              <option value="ta-IN" className="text-black">தமிழ் (Tamil)</option>
              <option value="ml-IN" className="text-black">മലയാളം (Malayalam)</option>
              <option value="es-ES" className="text-black">Español</option>
            </select>
            <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#2E7D32] text-white rounded-br-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Control Area */}
        <div className="p-6 bg-white border-t border-slate-100 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-500 mb-4 h-5">
            {isListening ? "Listening to your voice..." : "Tap the microphone to speak"}
          </p>
          <button 
            onClick={handleSimulateVoice}
            disabled={isListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-[#2E7D32] text-white hover:bg-[#1B5E20]'
            }`}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
