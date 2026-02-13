import React from 'react';
import { RESOURCE_LINKS } from './constants.tsx';

const ResourceHub: React.FC = () => {
  return (
    <div className="p-8 h-full bg-slate-50 overflow-y-auto custom-scrollbar">
      <header className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Clinical Resource Matrix</h2>
        <p className="text-slate-500 mt-2 font-medium leading-relaxed">Verified decision support and literature tools for advanced medical residency training.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-10">
        {RESOURCE_LINKS.map((link, idx) => (
          <a 
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
                {link.name.charAt(0)}
              </div>
              <span className="text-slate-300 group-hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 22 3 22 10"/><line x1="10" y1="14" x2="22" y2="2"/></svg>
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors leading-tight">{link.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8">{link.description}</p>
            <div className="flex items-center gap-3 text-xs font-black text-blue-600 uppercase tracking-[0.2em]">
              <span>Initialize Tool</span>
              <div className="w-8 h-px bg-blue-200 group-hover:w-12 transition-all"></div>
            </div>
          </a>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row gap-10 items-center border border-slate-800 shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 w-24 h-24 bg-blue-500/20 rounded-3xl flex items-center justify-center text-4xl border border-blue-500/30 backdrop-blur-sm">
          🛡️
        </div>
        <div className="relative z-10">
          <h4 className="text-2xl font-black mb-4 italic text-blue-400">Clinical Mastery Hub</h4>
          <p className="text-slate-400 leading-relaxed text-lg font-medium">
            This matrix centralizes the primary 'Sources of Truth' used by international examiners. By aligning with these frameworks, you maintain the standard of care required for Step 3 and beyond.
          </p>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ResourceHub;