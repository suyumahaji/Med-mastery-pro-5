
import React, { useState, useRef, useEffect } from 'react';
import { createMedicalChat, analyzeMedicalImage } from './geminiService.ts';
import { ChatMessage } from './types.ts';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I am your Clinical AI Tutor. Describe a patient or upload a finding for a high-yield logic audit.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatRef.current = createMedicalChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (imageBase64?: string) => {
    const textToSend = input.trim();
    if (!textToSend && !imageBase64) return;
    
    const userMsg: ChatMessage = { 
      role: 'user', 
      text: textToSend || "Analyzing clinical image...", 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    
    try {
      let responseText = "";
      if (imageBase64) {
        responseText = await analyzeMedicalImage(imageBase64, textToSend);
      } else {
        const result = await chatRef.current.sendMessage({ message: textToSend });
        responseText = result.text || "No response generated.";
      }
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'model', text: `Clinical Engine Error: ${err.message}`, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        handleSend(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <header className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 medical-gradient text-white rounded-xl flex items-center justify-center font-black">AI</div>
          <div>
            <h2 className="font-black text-slate-800 text-sm">Clinical AI Mentor</h2>
            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Neural Link Active</p>
          </div>
        </div>
        <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </button>
        <input type="file" ref={fileInputRef} onChange={onImageUpload} accept="image/*" className="hidden" />
      </header>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm ${msg.role === 'user' ? 'bg-slate-900 text-white shadow-xl' : 'bg-white text-slate-800 border border-slate-100'}`}>
              <p className="leading-relaxed font-medium whitespace-pre-wrap">{msg.text}</p>
              <p className="text-[9px] mt-2 opacity-40 text-right">{msg.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center gap-3 ml-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-2">Processing...</span>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-white shadow-lg pb-safe">
        <div className="flex gap-2">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
            placeholder="Ask about clinical steps..." 
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
          />
          <button 
            onClick={() => handleSend()} 
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 rounded-xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
