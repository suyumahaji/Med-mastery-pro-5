import React, { useState } from 'react';
import { FLASHCARD_DATA } from './constants.tsx';

const Flashcards: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = FLASHCARD_DATA[index];

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setIndex((index + 1) % FLASHCARD_DATA.length);
    }, 150);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      setIndex((index - 1 + FLASHCARD_DATA.length) % FLASHCARD_DATA.length);
    }, 150);
  };

  return (
    <div className="p-8 h-full flex flex-col items-center bg-slate-50 overflow-y-auto custom-scrollbar">
      <header className="w-full mb-12 text-center">
        <h2 className="text-3xl font-black text-slate-900">Study Decks</h2>
        <p className="text-slate-500 font-medium">Master high-yield scores, mnemonics, and anatomy</p>
      </header>

      <div className="w-full max-w-xl perspective-1000 h-[380px]">
        <div 
          onClick={() => setFlipped(!flipped)}
          className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-white rounded-[3rem] border-2 border-slate-100 shadow-2xl flex flex-col items-center justify-center p-12 backface-hidden">
            <span className="absolute top-8 left-8 text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-blue-100">
              {card.category}
            </span>
            <p className="text-2xl font-black text-slate-800 text-center leading-relaxed">
              {card.front}
            </p>
            <div className="absolute bottom-10 flex flex-col items-center gap-2">
               <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Tap to flip</p>
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-slate-900 rounded-[3rem] border-2 border-slate-800 shadow-2xl flex flex-col items-center justify-center p-12 backface-hidden rotate-y-180">
            <div className="absolute top-8 right-8 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">VERIFIED ANSWER</div>
            <p className="text-xl text-blue-100 font-bold text-center leading-relaxed whitespace-pre-wrap">
              {card.back}
            </p>
            <p className="absolute bottom-10 text-[10px] text-slate-600 font-bold uppercase tracking-widest">Tap to return</p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-center gap-10">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all text-slate-600 shadow-lg active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-slate-900 font-black text-lg tracking-widest">{index + 1}</span>
          <div className="w-12 h-1 bg-blue-500 rounded-full mt-1"></div>
          <span className="text-[10px] text-slate-400 font-black uppercase mt-1">OF {FLASHCARD_DATA.length}</span>
        </div>
        <button 
          onClick={handleNext}
          className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-all text-white shadow-lg active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6 6-6"/></svg>
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Flashcards;