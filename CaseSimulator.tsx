import React, { useState } from 'react';
import { generateMedicalCase } from './geminiService.ts';
import { MedicalCase } from './types.ts';

const CaseSimulator: React.FC = () => {
  const [currentCase, setCurrentCase] = useState<MedicalCase | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Presentation' | 'Examination' | 'Diagnostics'>('Presentation');

  const startNewCase = async () => {
    setIsLoading(true);
    try {
      const newCase = await generateMedicalCase();
      setCurrentCase(newCase);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentCase) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-blue-500/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21l7-7Z"/></svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Clinical Simulator</h2>
        <p className="text-slate-500 max-w-sm mb-10 text-sm font-medium">Test clinical reasoning with high-fidelity, AI-generated clinical vignettes.</p>
        <button onClick={startNewCase} disabled={isLoading} className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">
          {isLoading ? 'Synthesizing...' : 'Initialize Simulation'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <header className="bg-white border-b border-slate-100 p-5 flex justify-between items-center sticky top-0 z-20">
        <div>
          <h2 className="text-base font-black text-slate-800 leading-tight">{currentCase.title}</h2>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{currentCase.patientDemographics}</p>
        </div>
        <button onClick={startNewCase} className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-lg uppercase tracking-widest active:scale-95 transition-all">Next Case</button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-slate-50/50">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="flex border-b border-slate-100">
            {(['Presentation', 'Examination', 'Diagnostics'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>{tab}</button>
            ))}
          </div>
          <div className="p-6 md:p-8 space-y-6">
             {activeTab === 'Presentation' && (
               <div className="animate-in fade-in slide-in-from-left-4">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Chief Complaint</p>
                 <p className="text-xl font-bold text-slate-900 mb-6 italic leading-relaxed">"{currentCase.chiefComplaint}"</p>
                 <p className="text-sm text-slate-600 leading-relaxed font-medium">{currentCase.history}</p>
               </div>
             )}
             {activeTab === 'Examination' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                   {Object.entries(currentCase.vitals).map(([k, v]) => (
                     <div key={k} className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                       <p className="text-[8px] font-black text-slate-400 uppercase mb-1">{k}</p>
                       <p className="text-sm font-black text-slate-800">{v}</p>
                     </div>
                   ))}
                 </div>
                 <p className="text-sm text-slate-600 leading-relaxed font-medium">{currentCase.physicalExam}</p>
               </div>
             )}
             {activeTab === 'Diagnostics' && (
               <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs font-bold italic animate-in zoom-in-95">
                 {currentCase.initialLabs || "Awaiting bedside diagnostic authorization..."}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseSimulator;