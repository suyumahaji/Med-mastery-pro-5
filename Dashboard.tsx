import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Icons } from './constants.tsx';

const studyData = [
  { name: 'Mon', accuracy: 82 }, { name: 'Tue', accuracy: 88 },
  { name: 'Wed', accuracy: 85 }, { name: 'Thu', accuracy: 94 },
  { name: 'Fri', accuracy: 91 }, { name: 'Sat', accuracy: 89 },
  { name: 'Sun', accuracy: 95 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-6 overflow-y-auto h-full bg-slate-50 pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 medical-gradient rounded-2xl flex items-center justify-center text-white text-2xl font-black">M</div>
           <div>
             <h2 className="text-xl font-black text-slate-900 tracking-tight">Command Center</h2>
             <p className="text-blue-500 font-bold text-[10px] uppercase tracking-widest">Residency Logic Engaged</p>
           </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
           <div className="bg-white border p-3 rounded-2xl shadow-sm flex items-center gap-3 shrink-0">
             <div className="text-orange-600 text-lg">🔥</div>
             <div><p className="text-[8px] font-black text-slate-400 uppercase">Streak</p><p className="text-xs font-black text-slate-800">12 Days</p></div>
           </div>
           <div className="bg-white border p-3 rounded-2xl shadow-sm flex items-center gap-3 shrink-0">
             <div className="text-blue-600 text-lg">🎯</div>
             <div><p className="text-[8px] font-black text-slate-400 uppercase">Accuracy</p><p className="text-xs font-black text-slate-800">92%</p></div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg">
          <h3 className="text-base font-black text-slate-900 mb-4 uppercase tracking-wider">Readiness Trajectory</h3>
          <div className="overflow-x-auto no-scrollbar">
            {/* FIXED WIDTH PREVENTS ANDROID WEBVIEW CRASH */}
            <div style={{ width: '600px', height: '240px' }}>
              <AreaChart width={600} height={240} data={studyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={4} fill="url(#colorAcc)" />
              </AreaChart>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg">
          <h3 className="text-base font-black text-slate-900 mb-4 uppercase tracking-wider">Subject Convergence</h3>
          <div className="space-y-3">
            {[
              { l: 'Surgery Logic', p: 92, c: 'bg-blue-500' },
              { l: 'GynObs Pulse', p: 88, c: 'bg-emerald-500' },
              { l: 'Pediatric Path', p: 78, c: 'bg-purple-500' },
              { l: 'Ethics Audit', p: 98, c: 'bg-orange-500' }
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500"><span>{s.l}</span><span>{s.p}%</span></div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${s.c} rounded-full`} style={{ width: `${s.p}%` }}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default Dashboard;