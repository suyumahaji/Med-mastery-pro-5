import React, { useState } from 'react';
import { VIGNETTE_DATA } from './constants.tsx';
import { StudyMode } from './types.ts';

const QBank: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showRationale, setShowRationale] = useState(false);
  const [optionsRevealed, setOptionsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState<StudyMode>('Practice');
  const [isOptionLocked, setIsOptionLocked] = useState(false);

  const currentQ = VIGNETTE_DATA[currentIndex];

  const handleOptionSelect = (idx: number) => {
    if (isOptionLocked || !optionsRevealed) return;
    setSelectedOption(idx);
    if (mode === 'Practice') {
      setShowRationale(true);
      setIsOptionLocked(true);
    }
    if (idx === currentQ.answerIndex) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowRationale(false);
    setOptionsRevealed(false);
    setIsOptionLocked(false);
    setCurrentIndex((currentIndex + 1) % VIGNETTE_DATA.length);
  };

  return (
    <div className="p-4 md:p-8 h-full flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-[2rem] border border-slate-200 gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center text-white text-lg font-bold">Q</div>
          <div>
            <h2 className="text-base md:text-lg font-black text-slate-800 leading-tight">Master Q-Bank</h2>
            <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">OnCourse AI Active</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex border border-slate-200">
            {(['Practice', 'Test'] as StudyMode[]).map(m => (
              <button key={m} onClick={() => setMode(m)} className={`px-4 py-1.5 text-[10px] font-bold rounded-md ${mode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>{m}</button>
            ))}
          </div>
          <div className="bg-blue-50 px-4 py-1.5 rounded-lg font-black text-blue-600 text-[10px] border border-blue-100">SCORE: {score}</div>
        </div>
      </header>

      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 flex flex-col min-h-[500px] shadow-lg overflow-hidden">
        <div className="p-4 bg-slate-900 flex items-center justify-between border-b border-slate-800">
          <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest">{currentQ.category}</span>
          <span className="text-slate-500 text-[9px] font-mono">ID: {currentQ.id}</span>
        </div>
        
        <div className="p-6 md:p-10 flex-1 space-y-8 overflow-y-auto">
          <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl">
            <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-1">Phase 1: Socratic Probe</p>
            <p className="text-xs font-bold text-indigo-900 italic">"{currentQ.socraticProbe}"</p>
          </div>
          <p className="text-lg font-bold text-slate-800 leading-relaxed">{currentQ.prompt}</p>
          
          {optionsRevealed ? (
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    showRationale ? (idx === currentQ.answerIndex ? 'bg-emerald-50 border-emerald-500' : (selectedOption === idx ? 'bg-red-50 border-red-500' : 'bg-white opacity-50')) : (selectedOption === idx ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-100')
                  }`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${showRationale && idx === currentQ.answerIndex ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>{String.fromCharCode(65+idx)}</span>
                  <span className="text-sm font-bold">{option}</span>
                </button>
              ))}
            </div>
          ) : (
            <button onClick={() => setOptionsRevealed(true)} className="w-full py-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-black hover:bg-slate-50 transition-colors uppercase tracking-[0.2em]">Initialize Logic Matrix</button>
          )}
        </div>
        
        <div className="p-6 border-t border-slate-100 flex justify-end bg-slate-50/50">
          <button onClick={nextQuestion} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Next Clinical Case</button>
        </div>
      </div>
      
      {showRationale && (
        <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-5">
           <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-md">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Phase 2: Management Logic</h4>
             <p className="text-xs text-slate-700 leading-relaxed font-bold">{currentQ.residencyDirectorLogic}</p>
           </div>
           <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl border border-slate-800">
             <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Phase 4: Revision Pearl</h4>
             <div className="text-xs text-slate-400 leading-relaxed font-medium whitespace-pre-wrap">{currentQ.revisionPearl}</div>
           </div>
        </div>
      )}
    </div>
  );
};

export default QBank;