import React from 'react';
import { AppView } from './types.ts';
import { Icons } from './constants.tsx';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', Icon: Icons.Dashboard },
    { id: AppView.Q_BANK, label: 'Master Q-Bank', Icon: Icons.QBank },
    { id: AppView.CASE_SIMULATOR, label: 'Clinical Lab', Icon: Icons.Stethoscope },
    { id: AppView.AI_TUTOR, label: 'AI Mentor', Icon: Icons.Brain },
    { id: AppView.RESOURCE_HUB, label: 'Resource Hub', Icon: Icons.Hub },
    { id: AppView.GUIDELINE_LAB, label: 'Guideline Lab', Icon: Icons.Guidelines },
    { id: AppView.KNOWLEDGE_GRAPH, label: 'Knowledge Graph', Icon: Icons.Network },
    { id: AppView.STUDY_DECK, label: 'Study Decks', Icon: Icons.Book },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <div>
            <h1 className="font-bold text-slate-800 text-base leading-tight">MedMastery</h1>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Master Pro</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === id 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-900 p-4 rounded-xl text-white">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mastery Index</p>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-500 w-[78%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">78% COMPLIANCE</p>
          </div>
        </div>
      </aside>

      {/* Content Area with Mobile Nav Overlay */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 h-full overflow-hidden">
        <nav className="md:hidden flex overflow-x-auto p-2 bg-white border-b border-slate-100 scrollbar-hide">
           {navItems.map(({ id, label, Icon }) => (
             <button
               key={id}
               onClick={() => setView(id)}
               className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                 currentView === id ? 'bg-blue-600 text-white' : 'text-slate-500'
               }`}
             >
               <Icon />
               {label}
             </button>
           ))}
        </nav>
        <div className="flex-1 overflow-hidden h-full">
          {children}
        </div>
      </main>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Layout;