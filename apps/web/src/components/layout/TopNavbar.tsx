"use client";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import VoiceAssistantModal from "../voice/VoiceAssistantModal";
import { usePathname } from "next/navigation";

export default function TopNavbar() {
  const { user, logout } = useAuth();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-[#0D5C35]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L8 6H4V10L12 18L20 10V6H16L12 2Z" />
            <path d="M12 22C17.5228 22 22 17.5228 22 12H2C2 17.5228 6.47715 22 12 22Z" fillOpacity="0.3" />
          </svg>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">AgriGuard AI</h1>
            <p className="text-[10px] text-slate-500 font-medium">Healthy Crops • Better Tomorrow</p>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="/" className={`${isActive('/') ? 'text-[#0D5C35] border-b-2 border-[#0D5C35]' : 'hover:text-[#0D5C35]'} pb-1`}>Home</Link>
          <Link href="/dashboard" className={`${pathname === '/dashboard' ? 'text-[#0D5C35] border-b-2 border-[#0D5C35]' : 'hover:text-[#0D5C35]'} pb-1`}>Dashboard</Link>
          <Link href="/dashboard/scan" className={`${isActive('/dashboard/scan') ? 'text-[#0D5C35] border-b-2 border-[#0D5C35]' : 'hover:text-[#0D5C35]'} pb-1`}>Scan</Link>
          <Link href="/dashboard/insights" className={`${isActive('/dashboard/insights') ? 'text-[#0D5C35] border-b-2 border-[#0D5C35]' : 'hover:text-[#0D5C35]'} pb-1`}>Insights</Link>
          <Link href="/dashboard/expert" className={`${isActive('/dashboard/expert') ? 'text-[#0D5C35] border-b-2 border-[#0D5C35]' : 'hover:text-[#0D5C35]'} pb-1`}>Expert Portal</Link>
          <Link href="/dashboard/admin" className={`${isActive('/dashboard/admin') ? 'text-[#0D5C35] border-b-2 border-[#0D5C35]' : 'hover:text-[#0D5C35]'} pb-1`}>Admin</Link>
        </div>

        <div className="flex items-center space-x-4">
          
          {/* Language Dropdown */}
          <div className="relative group cursor-pointer z-50">
            <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 text-sm font-medium hover:bg-slate-100 transition">
              <span className="mr-2">🌍</span> Language
              <svg className="w-4 h-4 ml-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-2 hidden group-hover:block transition-all z-50 opacity-0 group-hover:opacity-100">
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Language</div>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 flex items-center justify-between">
                English <span>🇬🇧</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 flex items-center justify-between">
                हिंदी (Hindi) <span>🇮🇳</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 flex items-center justify-between">
                తెలుగు (Telugu) <span>🇮🇳</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 flex items-center justify-between">
                தமிழ் (Tamil) <span>🇮🇳</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 flex items-center justify-between">
                മലയാളം (Malayalam) <span>🇮🇳</span>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 flex items-center justify-between">
                Español (Spanish) <span>🇪🇸</span>
              </button>
            </div>
          </div>

          <button 
            onClick={() => setIsVoiceOpen(true)}
            className="bg-[#0D5C35] text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center shadow-md shadow-green-900/20 hover:bg-[#0a4729] transition"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            Voice ON
          </button>
          
          {user ? (
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-full py-1 pr-4 pl-1 cursor-pointer hover:bg-slate-100 transition group relative">
              <div className="bg-[#0D5C35] text-white rounded-full w-7 h-7 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <span className="text-sm font-medium text-slate-700">{user.full_name || "User"}</span>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-slate-100 py-1 hidden group-hover:block">
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50">Sign Out</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-medium text-[#0D5C35] hover:underline">
              Log in
            </Link>
          )}
        </div>
      </nav>

      <VoiceAssistantModal 
        isOpen={isVoiceOpen} 
        onClose={() => setIsVoiceOpen(false)} 
      />
    </>
  );
}
