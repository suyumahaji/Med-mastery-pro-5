import React from 'react';
import { GUIDELINE_DATA } from './constants.tsx';

const GuidelineLab: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50 custom-scrollbar">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Guideline Logic Lab 2026</h2>
        <p className="text-slate-500 mt-2 font-medium">Synthesizing USMLE Step 3 and National ERMP Protocols</p>
      </header>

      <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
        {GUIDELINE_DATA.map((c, idx) => (
          <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col lg:flex-row transform transition-all hover:scale-[1.01]">
            <div className="lg:w-1/4 bg-slate-50 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
               <div className="w-14 h-14 rounded-2xl medical-gradient text-white flex items-center justify-center mb-4 shadow-lg">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/></svg>
               </div>
               <h3 className="text-lg font-black text-slate-800 text-center leading-tight">{c.topic}</h3>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100">
              <div className="bg-white p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Global standard</p>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm font-medium italic">"{c.intl}"</p>
              </div>
              <div className="bg-white p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">National protocol</p>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm font-medium italic">"{c.local}"</p>
              </div>
            </div>

            <div className="lg:w-1/4 bg-slate-900 text-white p-8 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute -right-4 -bottom-4 opacity-5">
                 <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
               </div>
               <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-3 relative z-10">Clinical Verdict</p>
               <p className="text-sm font-black relative z-10 leading-snug">{c.rule}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 max-w-5xl mx-auto bg-blue-600 p-10 rounded-[3rem] text-white flex flex-col md:flex-row gap-8 items-center border border-blue-500 shadow-2xl shadow-blue-500/30">
         <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-white text-4xl shrink-0 backdrop-blur-sm border border-white/30">
           💡
         </div>
         <div>
            <h4 className="text-xl font-black mb-2">Strategy: The "Safe Priority" Logic</h4>
            <p className="text-blue-100 leading-relaxed text-sm font-medium">
              Examiners prioritize immediate life-saving interventions. Whether in high-resource or low-resource settings, the 'Next Best Step' for a toxic patient is universally stabilization. Use local guidelines primarily to refine etiological rankings.
            </p>
         </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default GuidelineLab;