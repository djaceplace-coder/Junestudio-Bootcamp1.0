import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, CheckCircle, Brain, Database, ArrowRight } from 'lucide-react';

export function Flashcard({ front, back }: { front: string; back: string }) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div 
      className="w-full max-w-sm mx-auto h-72 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div 
          className="absolute inset-0 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center p-8 border border-slate-100"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Brain className="w-8 h-8 text-[#0055FF] mb-4 opacity-70" />
          <h3 className="text-2xl font-extrabold text-slate-900 text-center uppercase tracking-wider">{front}</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-6">Tap to audit</p>
        </div>
        <div 
          className="absolute inset-0 bg-[#0055FF] rounded-3xl shadow-[0_10px_40px_rgba(0,85,255,0.2)] flex flex-col items-center justify-center p-8 border border-[#0055FF]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-4">The Reality</h3>
          <p className="text-lg font-medium text-white text-center leading-relaxed">{back}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function OrbitalPanel() {
  const orbits = [
    { label: "The Front Door", sub: "Attention", delay: 0 },
    { label: "The Hallway", sub: "Capture", delay: 1.5 },
    { label: "The Vault", sub: "Fulfillment", delay: 3 }
  ];

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
      <div className="absolute w-20 h-20 bg-white rounded-full shadow-[0_0_40px_rgba(0,85,255,0.15)] flex items-center justify-center z-10 border border-slate-50">
        <Database className="w-8 h-8 text-[#0055FF]" />
      </div>
      
      {orbits.map((orbit, i) => (
        <motion.div
           key={i}
           animate={{ rotate: 360 }}
           transition={{ duration: 20, ease: "linear", repeat: Infinity, delay: orbit.delay }}
           className="absolute w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full border border-slate-200/50 flex items-center justify-start"
        >
          <div className="bg-white px-4 py-2 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center transform -translate-x-1/2 -rotate-90">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{orbit.sub}</span>
             <span className="text-sm font-extrabold text-slate-800">{orbit.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function SmartphoneModel() {
  return (
    <div className="flex justify-center my-12">
      <motion.div 
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-[280px] h-[580px] bg-white rounded-[3rem] border-[8px] border-slate-900 shadow-2xl relative overflow-hidden flex flex-col"
      >
        <div className="w-[100px] h-[24px] bg-slate-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl z-20"></div>
        
        <div className="flex-1 bg-slate-50 p-6 flex flex-col pt-12 relative">
           <p className="text-xs font-bold uppercase tracking-widest text-[#0055FF] mb-2">Mobile Command Center</p>
           <h4 className="text-2xl font-bold text-slate-900 leading-tight mb-8">Execute in <br/> &lt; 3 seconds.</h4>
           
           <div className="space-y-3">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center px-4 gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                   <div className="w-3 h-3 rounded-full bg-[#0055FF]"></div>
                 </div>
                 <div className="flex-1">
                   <div className="h-2 w-full bg-slate-100 rounded-full mb-2"></div>
                   <div className="h-2 w-1/2 bg-slate-100 rounded-full"></div>
                 </div>
               </div>
             ))}
           </div>

           <div className="absolute bottom-6 left-6 right-6 h-12 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold tracking-widest uppercase">Launch Sequence</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

export function EntropySlider() {
  const [entropy, setEntropy] = useState(50);
  const isChaotic = entropy > 50;

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_10px_50px_rgba(0,0,0,0.03)] border border-slate-100 w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
           <h4 className="text-2xl font-bold text-slate-900">System State</h4>
           <p className="text-slate-500 font-medium text-sm mt-1">{isChaotic ? "Manual Flux" : "Cybernetic Loop"}</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${isChaotic ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#0055FF]'}`}>
           <CheckCircle className="w-6 h-6" />
        </div>
      </div>
      
      <div className="relative w-full h-2 bg-slate-100 rounded-full mb-8">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={entropy}
          onChange={(e) => setEntropy(Number(e.target.value))}
          className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <motion.div 
          className={`absolute left-0 top-0 bottom-0 rounded-full transition-colors duration-500 ${isChaotic ? 'bg-red-400' : 'bg-[#0055FF]'}`}
          style={{ width: `${entropy}%` }}
        />
        <motion.div 
          className="absolute top-1/2 -mt-3 w-6 h-6 bg-white rounded-full shadow-md border border-slate-200 pointer-events-none"
          style={{ left: `calc(${entropy}% - 12px)` }}
        />
      </div>

      <div className="flex justify-between text-xs font-bold tracking-widest text-slate-400 uppercase">
        <span>Clean (0%)</span>
        <span>Entropic (100%)</span>
      </div>
    </div>
  );
}

export function ConsequenceMatrix() {
  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-lg group">
      <div className="p-8 bg-slate-50 border-b border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Action</p>
        <h4 className="text-xl font-bold text-slate-900">Relying on Instagram Algorithm</h4>
      </div>
      
      <div className="relative overflow-hidden h-32 transition-all">
        <div className="absolute inset-0 p-8 flex flex-col justify-center bg-white group-hover:-translate-y-full transition-transform duration-500">
          <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">1st Order Result</p>
          <p className="text-lg font-bold text-slate-800">Views & Attention</p>
          <div className="mt-4 flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest gap-2">
            Hover for Truth <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        
        <div className="absolute inset-0 top-full p-8 flex flex-col justify-center bg-red-50 group-hover:-translate-y-full transition-transform duration-500">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">2nd Order Risk</p>
          <p className="text-lg font-bold text-slate-900 leading-tight">Total loss of sovereignty. Platform owns your clients.</p>
        </div>
      </div>
    </div>
  );
}

export function StackBuilder() {
  const [layers, setLayers] = useState<number[]>([]);
  
  const addLayer = (id: number) => {
    if (!layers.includes(id)) {
      setLayers(prev => [id, ...prev]);
    }
  };

  const icons = ["Email Capture", "Data Routing", "Conversion Vault"];

  return (
    <div className="flex flex-col gap-8 w-full max-w-sm mx-auto">
      <div className="flex justify-center gap-4">
        {icons.map((icon, i) => (
          <button 
            key={i}
            onClick={() => addLayer(i)}
            disabled={layers.includes(i)}
            className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-1 transition-transform"
          >
            <Database className="w-5 h-5 text-[#0055FF]" />
          </button>
        ))}
      </div>

      <div className="h-64 bg-slate-50 rounded-[2rem] border border-slate-200 p-8 flex flex-col justify-end gap-3 items-center">
        {layers.length === 0 && <p className="text-sm font-bold text-slate-400 tracking-widest uppercase pb-6">Construct Stack</p>}
        {layers.map((layerId, idx) => (
          <motion.div 
            key={layerId}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`h-12 w-full max-w-[200px] flex items-center justify-center rounded-xl font-bold text-sm tracking-widest uppercase text-white shadow-md
              ${idx === layers.length - 1 ? 'bg-slate-900 w-full max-w-[240px]' : 'bg-[#0055FF] w-full max-w-[200px]'}`}
            style={{ width: `${100 - (layers.length - 1 - idx) * 10}%` }}
          >
            {icons[layerId]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AlgorithmVisualizer() {
  const [isGoodData, setIsGoodData] = useState(true);

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] w-full overflow-hidden">
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setIsGoodData(true)}
          className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-colors ${isGoodData ? 'bg-[#0055FF] text-white' : 'bg-slate-100 text-slate-500'}`}
        >
          Structured Space
        </button>
        <button 
          onClick={() => setIsGoodData(false)}
          className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-colors ${!isGoodData ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'}`}
        >
          Chaotic Input
        </button>
      </div>

      <div className="h-40 relative flex items-center">
        <div className="w-full flex gap-2 overflow-hidden px-4">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              className={`h-16 w-4 rounded-full ${isGoodData ? 'bg-[#0055FF]/20' : 'bg-red-500/20'}`}
              animate={{ 
                height: isGoodData ? [64, 80, 64] : [randomHeight(), randomHeight(), randomHeight()],
                opacity: isGoodData ? 1 : 0.5
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const randomHeight = () => Math.floor(Math.random() * (100 - 20 + 1) + 20);

export function PromptCalculator() {
  const [level, setLevel] = useState(0); // 0 = vague, 1 = structured
  
  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-8">
       <button 
         onClick={() => setLevel(level === 0 ? 1 : 0)}
         className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-sm mb-8 hover:bg-slate-800 transition-colors"
       >
         Toggle Resolution
       </button>

       <div className="space-y-4">
         <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
           <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Input</p>
           <p className="text-slate-800 font-mono text-sm leading-relaxed">
             {level === 0 ? "Make a marketing email for my course." : "SYSTEM ROLL: Direct Response Architect. CONTEXT: Launching 'The Vault' tomorrow. OBJECTIVE: Write a 3-part urgency sequence..."}
           </p>
         </div>

         <div className="flex justify-center py-4 text-slate-300">
           <ArrowRight className="w-6 h-6 rotate-90" />
         </div>

         <motion.div 
           layout
           className={`p-6 rounded-xl border flex items-center justify-center min-h-[100px]
             ${level === 0 ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-blue-50 border-blue-200 shadow-[0_10px_30px_rgba(0,85,255,0.1)] text-[#0055FF]'}`}
         >
           <p className="font-bold text-center">
             {level === 0 ? "2D Result (Generic Output)" : "3D Masterpiece (Calculated Vector Space)"}
           </p>
         </motion.div>
       </div>
    </div>
  );
}

export function PeaceMeter() {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: 360 }}
        transition={{ scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
        className="relative w-64 h-64 rounded-full border-4 border-slate-100 flex items-center justify-center"
      >
        <div className="absolute inset-2 rounded-full border-2 border-slate-200 border-dashed" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0055FF] opacity-60" />
        
        <div className="bg-white w-40 h-40 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center p-4 text-center z-10 border border-slate-50">
          <span className="text-4xl font-extrabold text-slate-900 mb-1">98%</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Autonomy</span>
        </div>
      </motion.div>
    </div>
  );
}
