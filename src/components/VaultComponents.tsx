import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Database, ArrowRight, CheckCircle, Smartphone, Play, Code, Layout, Layers, Box, Cpu } from 'lucide-react';

export function EducationalGridModule({ 
  moduleNum, 
  focus, 
  title, 
  content, 
  visualComponent 
}: { 
  moduleNum: number; 
  focus: string; 
  title: string; 
  content: string; 
  visualComponent?: React.ReactNode; 
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch py-12 border-b border-slate-100 w-full mb-12">
      <div className="lg:col-span-5 flex flex-col gap-6 pt-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-extrabold tracking-[0.2em] text-[#0055FF] uppercase">Module 0{moduleNum} • {focus}</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">{title}</h2>
        </div>
        <div className="bg-slate-50 p-6 lg:p-8 rounded-3xl border border-slate-100 neo-shadow-sm flex flex-col gap-4 mt-2 h-full">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">The Grounded Reality</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg flex-1">
            {content}
          </p>
        </div>
      </div>
      {visualComponent && (
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 lg:p-10 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 shadow-inner w-full min-h-[400px]">
          {visualComponent}
        </div>
      )}
    </section>
  );
}

// ----------------------------------------------------
// GRID/FLEXBOX DIAGRAMS (Zero Overlap, Mobile-First)
// ----------------------------------------------------

export function ArchitectureDiagram() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
         <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
           <Brain className="w-6 h-6" />
         </div>
         <div>
           <h4 className="font-bold text-slate-900 text-lg">Analog Mindset</h4>
           <p className="text-slate-500 text-sm">Prone to decision fatigue and friction.</p>
         </div>
      </div>
      
      <div className="flex justify-center text-slate-300 py-2">
         <ArrowRight className="w-6 h-6 rotate-90" />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-[0_10px_30px_rgba(0,85,255,0.1)] flex items-center gap-4 relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-1 p-8 h-full bg-[#0055FF] opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="w-12 h-12 rounded-full bg-[#0055FF] text-white flex items-center justify-center shrink-0">
           <Layers className="w-6 h-6" />
         </div>
         <div>
           <h4 className="font-bold text-[#0055FF] text-lg">Architectural Output</h4>
           <p className="text-slate-600 text-sm">Delegated reasoning & infinite scale.</p>
         </div>
      </div>
    </div>
  );
}

export function FlowchainDiagram() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 items-stretch justify-center h-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-3 min-w-[140px]"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Step 1</span>
        <h4 className="font-bold text-slate-900">Traffic</h4>
      </motion.div>

      <div className="flex items-center justify-center text-slate-300">
        <ArrowRight className="w-6 h-6 rotate-90 sm:rotate-0" />
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex-1 bg-[#0055FF] p-6 rounded-2xl border border-[#0055FF] shadow-lg flex flex-col gap-3 min-w-[140px]"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Step 2</span>
        <h4 className="font-bold text-white">Capture</h4>
      </motion.div>

      <div className="flex items-center justify-center text-slate-300">
        <ArrowRight className="w-6 h-6 rotate-90 sm:rotate-0" />
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-3 min-w-[140px]"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Step 3</span>
        <h4 className="font-bold text-slate-900">Delivery</h4>
      </motion.div>
    </div>
  );
}

export function ValueEngineDiagram() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between h-48">
        <Database className="w-8 h-8 text-slate-400 mb-4" />
        <div>
          <h4 className="font-bold text-slate-900 mb-1">Raw Input Data</h4>
          <p className="text-sm text-slate-500">Unstructured human request.</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border-2 border-[#0055FF] flex flex-col justify-between h-48 relative overflow-hidden shadow-[0_10px_40px_rgba(0,85,255,0.1)]">
        <motion.div 
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_#0055FF_1px,_transparent_1px)] bg-[size:20px_20px]" 
        />
        <Cpu className="w-8 h-8 text-[#0055FF] mb-4" />
        <div className="relative z-10">
          <h4 className="font-bold text-[#0055FF] mb-1">High-Value Synthesis</h4>
          <p className="text-sm text-slate-600">Immediate, structured output ready for monetization.</p>
        </div>
      </div>
    </div>
  );
}

export function NetworkNodeDiagram() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="bg-[#0055FF] p-4 rounded-xl text-center shadow-lg translate-y-2 z-10 mx-8">
        <h4 className="font-bold text-white tracking-widest uppercase text-sm">Core Idea</h4>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t-2 border-slate-200 pt-6 mt-[-1rem] px-4">
         <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
           <h4 className="font-bold text-slate-800">LinkedIn Post</h4>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
           <h4 className="font-bold text-slate-800">Twitter Thread</h4>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
           <h4 className="font-bold text-slate-800">Newsletter</h4>
         </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm">
           <h4 className="font-bold text-slate-800">Video Script</h4>
         </div>
      </div>
    </div>
  );
}

export function LoopDiagram() {
  return (
     <div className="flex flex-col items-center gap-6 w-full max-w-sm relative">
        <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-[3rem] pointer-events-none w-[calc(100%-4rem)] mx-auto top-8 bottom-8" />
        <div className="bg-white z-10 px-8 py-4 rounded-full border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-900 text-sm tracking-widest uppercase">Input Trigger</h4>
        </div>
        <div className="bg-slate-900 z-10 h-32 w-full rounded-2xl flex flex-col items-center justify-center text-white shadow-xl relative overflow-hidden">
          <motion.div 
             animate={{ x: [-200, 400] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 bottom-0 w-24 bg-white/10 -skew-x-12 blur-md"
          />
          <Code className="w-8 h-8 mb-2 text-blue-300" />
          <h4 className="font-bold">Cybernetic Routine</h4>
        </div>
        <div className="bg-white z-10 px-8 py-4 rounded-full border border-slate-200 shadow-sm flex items-center gap-2 text-[#0055FF]">
          <CheckCircle className="w-5 h-5" />
          <h4 className="font-bold uppercase tracking-widest text-sm">Action Completed</h4>
        </div>
     </div>
  );
}

export function ApiDiagram() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full items-center">
       <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center h-32 flex flex-col justify-center shadow-sm">
          <h4 className="font-bold text-slate-900">WhatsApp</h4>
       </div>
       <div className="flex flex-col items-center justify-center p-6 h-32 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -z-10 sm:hidden" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 -z-10 hidden sm:block" />
          <div className="bg-[#0055FF] text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-md whitespace-nowrap">
            The API Waiter
          </div>
       </div>
       <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center h-32 flex flex-col justify-center shadow-sm">
          <h4 className="font-bold text-slate-900">Google Sheets</h4>
       </div>
    </div>
  );
}

export function SmeAutomationDiagram() {
   return (
      <div className="flex flex-col gap-3 w-full max-w-sm">
         <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <span className="font-bold text-sm text-slate-600">1. Customer DM</span>
            <span className="w-3 h-3 bg-red-400 rounded-full" />
         </div>
         <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-slate-300 rotate-90" /></div>
         <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <span className="font-bold text-sm text-slate-600">2. Lead Capture</span>
            <span className="w-3 h-3 bg-orange-400 rounded-full" />
         </div>
         <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-slate-300 rotate-90" /></div>
         <div className="bg-[#0055FF] p-4 rounded-xl shadow-md flex justify-between items-center text-white">
            <span className="font-bold text-sm">3. Instant WhatsApp Follow-up</span>
            <CheckCircle className="w-4 h-4" />
         </div>
      </div>
   );
}

export function MultiNodeDiagram() {
   return (
      <div className="grid grid-cols-2 gap-4 w-full">
         <div className="col-span-2 bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
            <Database className="w-8 h-8 text-blue-400" />
            <div>
              <h4 className="font-bold">Google Sheets</h4>
              <p className="text-xs text-slate-400 tracking-widest uppercase mt-1">The Brain</p>
            </div>
         </div>
         <div className="bg-white border-2 border-[#0055FF] p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-blue-100 text-[#0055FF] p-2 rounded-full mb-3"><PenTool className="w-5 h-5"/></div>
            <h4 className="font-bold text-[#0055FF] mb-2">ChatGPT</h4>
            <p className="text-xs text-slate-500">Creative Engine</p>
         </div>
         <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="bg-slate-100 text-slate-600 p-2 rounded-full mb-3"><Cpu className="w-5 h-5"/></div>
            <h4 className="font-bold text-slate-900 mb-2">Claude</h4>
            <p className="text-xs text-slate-500">Analytic Engine</p>
         </div>
      </div>
   );
}

export function SystemFactoryDiagram() {
   return (
      <div className="w-full flex flex-col gap-6 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm max-w-sm">
         <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="font-bold text-slate-900">B2B Workflow Design</span>
            <span className="text-[#0055FF] font-bold">$2,000</span>
         </div>
         <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="font-bold text-slate-900">Support Automation</span>
            <span className="text-[#0055FF] font-bold">$1,500</span>
         </div>
         <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">Custom Training</span>
            <span className="text-[#0055FF] font-bold">$5,000+</span>
         </div>
         <button className="w-full mt-2 py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs">
            Packaging The Asset
         </button>
      </div>
   );
}

export function YoutubePipelineDiagram() {
   return (
      <div className="flex flex-col gap-2 w-full max-w-sm">
         <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
             <Compass className="w-5 h-5 text-slate-400" />
             <span className="font-bold text-sm text-slate-700">1. Niche Research</span>
         </div>
         <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 ml-2">
             <PenTool className="w-5 h-5 text-slate-400" />
             <span className="font-bold text-sm text-slate-700">2. Script Generation</span>
         </div>
         <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 ml-4">
             <Bot className="w-5 h-5 text-slate-400" />
             <span className="font-bold text-sm text-slate-700">3. AI Voiceovers</span>
         </div>
         <div className="bg-[#0055FF] shadow-[0_10px_30px_rgba(0,85,255,0.2)] p-4 rounded-xl flex items-center gap-3 ml-6 text-white transform hover:scale-[1.02] transition-transform">
             <Youtube className="w-5 h-5 text-red-400" />
             <span className="font-bold text-sm">4. Video Assembly</span>
         </div>
      </div>
   );
}

export function AppBuilderDiagram() {
   return (
      <div className="w-full bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm overflow-hidden relative">
         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10 -mr-10 -mt-10" />
         <div className="flex gap-4 mb-8">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center"><Workflow className="w-6 h-6 text-slate-500" /></div>
            <div className="w-12 h-12 bg-[#0055FF] bg-opacity-10 rounded-xl flex items-center justify-center"><Server className="w-6 h-6 text-[#0055FF]" /></div>
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center"><Zap className="w-6 h-6 text-slate-500" /></div>
         </div>
         <h4 className="text-xl font-bold text-slate-900 leading-tight mb-2">No-Code SaaS</h4>
         <p className="text-slate-500 text-sm">Visual nodes connecting backend logic, bypassing traditional monolithic compilation.</p>
         <div className="mt-6 flex justify-between items-end border-t border-slate-100 pt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Digital Asset</span>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Deploy</button>
         </div>
      </div>
   );
}

export function ResourcesVault() {
  const categories = [
    {
      title: "Foundational AI Models",
      color: "border-blue-200",
      bg: "bg-blue-50",
      text: "text-blue-900",
      items: [
        { name: "ChatGPT", desc: "Creative reasoning and text generation" },
        { name: "Claude", desc: "Heavy document analysis and coding logic" },
        { name: "Gemini", desc: "Google ecosystem integration" },
        { name: "Qwen & Mistral", desc: "High-efficiency open-source alternatives" },
        { name: "DeepSeek", desc: "Advanced logical structuring" }
      ]
    },
    {
      title: "The Automation Engine Room",
      color: "border-purple-200",
      bg: "bg-purple-50",
      text: "text-purple-900",
      items: [
        { name: "n8n", desc: "Advanced, node-based workflow automation" },
        { name: "Make", desc: "Visual, highly integrated automation builder" },
        { name: "Zapier", desc: "The standard trigger-action connector" },
        { name: "Activepieces", desc: "Open-source business automation" }
      ]
    },
    {
       title: "Databases & Architecture",
       color: "border-emerald-200",
       bg: "bg-emerald-50",
       text: "text-emerald-900",
       items: [
         { name: "Google Sheets", desc: "The universal, accessible starting point" },
         { name: "Supabase", desc: "PostgreSQL database for scalable apps" },
         { name: "Airtable", desc: "Relational databases disguised as spreadsheets" },
         { name: "Notion", desc: "Internal company wikis and system tracking" }
       ]
    },
    {
       title: "Agent Builders & Local AI",
       color: "border-orange-200",
       bg: "bg-orange-50",
       text: "text-orange-900",
       items: [
         { name: "Flowise", desc: "Drag-and-drop UI for building custom LLM apps" },
         { name: "Dify", desc: "LLM application development platform" },
         { name: "CrewAI", desc: "Orchestrating role-playing AI agents" },
         { name: "LM Studio", desc: "Running models locally and privately" }
       ]
    },
    {
       title: "Content & Research",
       color: "border-rose-200",
       bg: "bg-rose-50",
       text: "text-rose-900",
       items: [
         { name: "Perplexity", desc: "AI-powered, real-time search and citation" },
         { name: "NotebookLM", desc: "Creating personalized AI experts from custom docs" },
         { name: "ElevenLabs", desc: "Hyper-realistic AI voice generation" },
         { name: "CapCut & Descript", desc: "AI-assisted video editing and transcription" }
       ]
    }
  ];

  return (
    <div className="mt-24 mb-12" id="resources-vault">
       <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 border border-slate-800 shadow-2xl text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0055FF] bg-opacity-20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 relative z-10">
             <div>
                <p className="text-[#0055FF] font-extrabold tracking-[0.2em] uppercase text-sm mb-4">Official Asset</p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">The Resources Vault</h2>
                <p className="text-slate-400 text-lg">The categorized library. Your final deliverable.</p>
             </div>
             <button className="bg-[#0055FF] hover:bg-blue-600 transition-colors text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 shrink-0">
                <Download className="w-5 h-5" /> Download Full PDF
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
             {categories.map((cat, i) => (
                <div key={i} className={`bg-slate-800/50 backdrop-blur-sm border ${cat.color} border-opacity-20 rounded-3xl p-8 flex flex-col gap-6`}>
                   <div className={`${cat.bg} w-max px-4 py-2 rounded-full`}>
                      <span className={`text-xs font-bold uppercase tracking-widest ${cat.text}`}>{cat.title}</span>
                   </div>
                   <div className="flex flex-col gap-4">
                      {cat.items.map((item, j) => (
                         <div key={j} className="flex gap-4">
                            <FileText className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                            <div>
                               <h4 className="font-bold text-white text-sm">{item.name}</h4>
                               <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}

