import Link from "next/link";
import Image from "next/image";
import TopNavbar from "../components/layout/TopNavbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-100">
      <TopNavbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-50 to-white overflow-hidden flex flex-col md:flex-row items-center justify-between px-12 py-20 min-h-[500px]">
        {/* Background Image Overlay (simulated farm) */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000')] bg-cover bg-center"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>

        <div className="max-w-2xl relative z-10 space-y-8">
          <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            AI-Powered Crop <br/><span className="text-[#0D5C35]">Disease Detector</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
            Identify crop diseases, get expert advice, and keep your crops healthy — all from your smartphone.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/scan" className="bg-[#0D5C35] hover:bg-[#0a4729] text-white px-8 py-3.5 rounded-lg font-medium text-lg flex items-center shadow-lg transition-all">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Scan a Plant
            </Link>
            <Link href="/dashboard/scan" className="bg-white border-2 border-[#0D5C35] text-[#0D5C35] hover:bg-green-50 px-8 py-3.5 rounded-lg font-medium text-lg flex items-center transition-all">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Upload Image
            </Link>
          </div>
        </div>

        {/* Right side Phone / Features */}
        <div className="relative z-10 hidden lg:flex items-center w-1/2 justify-end pr-10">
           {/* Phone mockup placeholder */}
           <div className="w-[280px] h-[550px] bg-black rounded-[40px] border-8 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col mr-12 transform -rotate-2 hover:rotate-0 transition duration-500">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=800')] bg-cover bg-center">
                {/* Scanner overlay */}
                <div className="absolute inset-10 border-2 border-green-400 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-green-400 -mt-1 -ml-1"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-green-400 -mt-1 -mr-1"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-green-400 -mb-1 -ml-1"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-green-400 -mb-1 -mr-1"></div>
                </div>
                <div className="absolute bottom-10 left-4 right-4 bg-black/60 backdrop-blur text-white p-3 rounded-lg text-sm">
                  <div className="font-bold text-lg">Early Blight</div>
                  <div className="text-white/80">(Tomato)</div>
                </div>
             </div>
           </div>

           {/* Floating feature pills */}
           <div className="space-y-4 absolute right-0 translate-x-4">
             <div className="bg-white/90 backdrop-blur shadow-xl rounded-full px-5 py-3 flex items-center space-x-3 transform translate-x-8">
               <div className="bg-green-100 p-2 rounded-full text-green-700">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               </div>
               <div>
                 <div className="font-bold text-slate-800 text-sm">Detect Diseases</div>
                 <div className="text-slate-500 text-xs">Accurate AI analysis</div>
               </div>
             </div>
             <div className="bg-white/90 backdrop-blur shadow-xl rounded-full px-5 py-3 flex items-center space-x-3">
               <div className="bg-yellow-100 p-2 rounded-full text-yellow-700">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
               </div>
               <div>
                 <div className="font-bold text-slate-800 text-sm">Get Recommendations</div>
                 <div className="text-slate-500 text-xs">Practical treatment steps</div>
               </div>
             </div>
             <div className="bg-white/90 backdrop-blur shadow-xl rounded-full px-5 py-3 flex items-center space-x-3 transform -translate-x-4">
               <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
               </div>
               <div>
                 <div className="font-bold text-slate-800 text-sm">Stay Informed</div>
                 <div className="text-slate-500 text-xs">Weather, risk & alerts</div>
               </div>
             </div>
             <div className="bg-white/90 backdrop-blur shadow-xl rounded-full px-5 py-3 flex items-center space-x-3 transform translate-x-6">
               <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
               </div>
               <div>
                 <div className="font-bold text-slate-800 text-sm">Multi-Language Support</div>
                 <div className="text-slate-500 text-xs">Use in your preferred language</div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-8 py-16 space-y-20">
        
        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>
          <p className="text-slate-500 mb-6">Choose an option to get started</p>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { title: "Scan Plant", desc: "Use your camera to detect diseases instantly", icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" },
              { title: "Upload Image", desc: "Select an image from your gallery", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" },
              { title: "Manage Farm", desc: "View your farms and fields", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Voice Assistant", desc: "Talk to your crop expert", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" },
              { title: "Change Language", desc: "Switch to your preferred language", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" }
            ].map((action, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-green-200 transition-all cursor-pointer flex flex-col justify-between group h-[180px]">
                <div>
                  <div className="w-10 h-10 bg-[#0D5C35] rounded-full flex items-center justify-center text-white mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} /></svg>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{action.desc}</p>
                </div>
                <div className="text-slate-300 group-hover:text-[#0D5C35] self-end mt-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Why Choose */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold text-slate-900">Why Choose AgriGuard AI?</h2>
            <p className="text-slate-500 mb-8">Smart technology for sustainable farming</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              {[
                { title: "High Accuracy", desc: "Advanced AI models for precise detection", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-green-600 bg-green-50" },
                { title: "Real-time Alerts", desc: "Get notified about risks and diseases early", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", color: "text-orange-500 bg-orange-50" },
                { title: "Expert Guidance", desc: "Personalized treatment recommendations", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "text-emerald-600 bg-emerald-50" },
                { title: "Multilingual", desc: "Supports multiple languages", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9", color: "text-blue-600 bg-blue-50" },
                { title: "Voice Control", desc: "Hands-free operation with voice commands", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z", color: "text-indigo-600 bg-indigo-50" },
                { title: "Farm Management", desc: "Track your fields, crops and history", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "text-teal-600 bg-teal-50" },
                { title: "Weather Integration", desc: "Know how weather affects your crops", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "text-sky-500 bg-sky-50" },
                { title: "Data Security", desc: "Your data is safe and private", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "text-emerald-700 bg-emerald-50" }
              ].map((feature, i) => (
                <div key={i} className="flex items-start">
                  <div className={`p-3 rounded-full mr-4 ${feature.color}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{feature.title}</h4>
                    <p className="text-slate-500 text-xs">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scan Detect Action Card */}
          <div className="lg:w-1/3 bg-green-50 rounded-2xl p-6 border border-green-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Scan. Detect. Take Action.</h3>
              <p className="text-slate-600 text-sm mb-6">Healthy crops start with the right diagnosis.</p>
              
              <div className="flex justify-between space-x-2">
                <div className="bg-white rounded-lg p-2 flex-1 shadow-sm border border-slate-100 text-center">
                  <div className="h-20 bg-[url('https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=200')] bg-cover bg-center rounded mb-2"></div>
                  <div className="font-bold text-xs text-slate-800">Early Blight</div>
                  <div className="text-[10px] text-slate-500">(Tomato)</div>
                </div>
                <div className="bg-white rounded-lg p-2 flex-1 shadow-sm border border-slate-100 text-center">
                  <div className="h-20 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=200')] bg-cover bg-center rounded mb-2"></div>
                  <div className="font-bold text-xs text-slate-800">Powdery Mildew</div>
                  <div className="text-[10px] text-slate-500">(Cucumber)</div>
                </div>
                <div className="bg-white rounded-lg p-2 flex-1 shadow-sm border border-slate-100 text-center">
                  <div className="h-20 bg-[url('https://images.unsplash.com/photo-1615456209581-229cd7bc2017?q=80&w=200')] bg-cover bg-center rounded mb-2"></div>
                  <div className="font-bold text-xs text-slate-800">Rust</div>
                  <div className="text-[10px] text-slate-500">(Wheat)</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 px-2 text-slate-400">
              <svg className="w-5 h-5 cursor-pointer hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-[#0D5C35]"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              </div>
              <svg className="w-5 h-5 cursor-pointer hover:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#093F24] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b border-green-800 pb-12 mb-8">
            <div className="mb-8 md:mb-0 max-w-sm">
              <h3 className="text-2xl font-bold mb-2 text-white">Trusted by Farmers, Everywhere</h3>
              <p className="text-green-100/70 text-sm leading-relaxed">
                Join thousands of farmers who are already using AgriGuard AI for healthier crops and better yields.
              </p>
            </div>
            
            <div className="flex space-x-12 text-center">
              <div>
                <div className="flex justify-center mb-2 text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                </div>
                <div className="text-3xl font-bold text-white mb-1">10,000+</div>
                <div className="text-xs font-medium text-green-200">Farmers</div>
              </div>
              <div>
                <div className="flex justify-center mb-2 text-green-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="text-3xl font-bold text-white mb-1">25+</div>
                <div className="text-xs font-medium text-green-200">Crop Types</div>
              </div>
              <div>
                <div className="flex justify-center mb-2 text-green-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div className="text-3xl font-bold text-white mb-1">95%+</div>
                <div className="text-xs font-medium text-green-200">Detection Accuracy</div>
              </div>
              <div>
                <div className="flex justify-center mb-2 text-green-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                </div>
                <div className="text-3xl font-bold text-white mb-1">12</div>
                <div className="text-xs font-medium text-green-200">Languages</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-green-100/50">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L8 6H4V10L12 18L20 10V6H16L12 2Z" />
              </svg>
              <div>
                <div className="font-bold text-white">AgriGuard AI</div>
                <div className="text-[10px]">Healthy Crops • Better Tomorrow</div>
              </div>
            </div>
            
            <div className="flex space-x-6">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition">Contact</Link>
              <Link href="#" className="hover:text-white transition">Help</Link>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* Simple icons placeholders */}
              <div className="w-5 h-5 bg-green-100/20 rounded-full"></div>
              <div className="w-5 h-5 bg-green-100/20 rounded-full"></div>
              <div className="w-5 h-5 bg-green-100/20 rounded-full"></div>
              <span className="ml-4">© 2026 AgriGuard AI. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
