import React, { useEffect, useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft, Database, Download, Power, Zap, Instagram, Twitter, MessageCircle, BarChart3, Users, Network, FileSpreadsheet, Bot, Workflow, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

const LeverageScale = () => {
  const [value, setValue] = useState(0);
  
  // Calculate time saved based on slider value (0 to 100 maps to 0 to 40 hours)
  const timeSaved = Math.round((value / 100) * 40);
  const color = value < 50 ? "bg-red-500" : "bg-[#0055FF]";

  return (
    <div className="w-full mx-auto bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col gap-6">
       <div className="flex justify-between items-center mb-4">
         <span className="font-bold text-red-500 text-sm">Manual Typing & Copy-Pasting</span>
         <span className="font-bold text-[#0055FF] text-sm text-right">Automated Workflows</span>
       </div>
       
       <input 
         type="range" 
         min="0" 
         max="100" 
         value={value} 
         onChange={(e) => setValue(Number(e.target.value))}
         className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
         style={{
            background: `linear-gradient(to right, ${value < 50 ? '#ef4444' : '#0055FF'} ${value}%, #e2e8f0 ${value}%)`
         }}
       />
       
       <div className="mt-8 text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Time Saved</p>
          <div className="text-5xl font-black text-slate-900 font-mono">
            {timeSaved} <span className="text-xl text-slate-400">hours/week</span>
          </div>
       </div>
    </div>
  )
}

const FunnelDiagram = () => (
  <div className="w-full bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 relative overflow-hidden flex flex-col items-center gap-8">
     <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-[80px] opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
     
     {/* Rented Land / Top of Funnel */}
     <div className="flex justify-center gap-6 w-full relative z-10">
        <div className="bg-white p-4 rounded-full shadow-sm border border-slate-200"><Instagram className="w-8 h-8 text-pink-600" /></div>
        <div className="bg-white p-4 rounded-full shadow-sm border border-slate-200"><Twitter className="w-8 h-8 text-blue-400" /></div>
        <div className="bg-white p-4 rounded-full shadow-sm border border-slate-200"><MessageCircle className="w-8 h-8 text-emerald-500" /></div>
     </div>
     
     {/* Funnel Shape */}
     <div className="relative w-64 h-32 flex flex-col items-center justify-center">
        <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M 0 0 L 200 0 L 130 100 L 70 100 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4"/>
          <path d="M 100 0 L 100 100" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
        </svg>
        <div className="absolute bg-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-slate-400 shadow-sm border border-slate-200">
           Traffic Conversion
        </div>
     </div>
     
     {/* Owned Database / Bottom of funnel */}
     <div className="bg-emerald-50 border-2 border-emerald-500 p-8 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.2)] flex flex-col items-center relative z-10 w-full max-w-sm">
        <FileSpreadsheet className="w-12 h-12 text-emerald-600 mb-4" />
        <h4 className="font-extrabold text-emerald-900 text-xl tracking-tight">Owned Database</h4>
        <p className="text-emerald-700 text-sm font-medium mt-1">Google Sheets / CRM (Secured Assets)</p>
     </div>
  </div>
)

const WaiterCard = ({ title, icon: Icon, workflow }: { title: string, icon: any, workflow: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
     <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-2">
        <Icon className="w-6 h-6 text-[#0055FF]" />
     </div>
     <h4 className="font-bold text-slate-900 text-lg uppercase tracking-tight">{title}</h4>
     <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
        {workflow}
     </p>
  </div>
)

const BlackoutTest = () => {
    const [isDark, setIsDark] = useState(false);
    
    return (
       <div className={`p-10 rounded-[2rem] border transition-all duration-700 col-span-1 lg:col-span-12 shadow-sm flex flex-col items-center text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white/70 backdrop-blur-md border-slate-200'}`}>
          <div className="flex flex-col gap-2 mb-8 items-center">
             <span className={`font-bold text-xs tracking-widest uppercase ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Knowledge Checker: The Blackout Test</span>
             <h2 className={`text-3xl font-extrabold tracking-tight transition-colors duration-700 ${isDark ? 'text-white' : 'text-slate-900'}`}>Are you prepared?</h2>
          </div>
          
          <button 
             onClick={() => setIsDark(!isDark)}
             className={`w-24 h-12 rounded-full relative transition-colors duration-300 ease-in-out mb-8 ${isDark ? 'bg-red-500' : 'bg-slate-300'}`}
          >
             <div className={`absolute top-1 left-1 w-10 h-10 rounded-full bg-white transition-transform duration-300 ease-in-out flex items-center justify-center ${isDark ? 'translate-x-12' : 'translate-x-0'}`}>
                <Power className={`w-5 h-5 ${isDark ? 'text-red-500' : 'text-slate-400'}`} />
             </div>
          </button>

          <div className={`transition-opacity duration-700 p-8 rounded-2xl max-w-2xl ${isDark ? 'opacity-100 bg-slate-800 border border-slate-700' : 'opacity-0'}`}>
             <p className="text-2xl text-white font-medium leading-relaxed">
               "If Instagram went dark permanently right now, how many of your clients could you email today?"
             </p>
             <p className="text-red-400 font-bold uppercase tracking-widest text-sm mt-6">
                Build your Ark before the rain.
             </p>
          </div>
       </div>
    )
}

export default function VaultDay2() {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: any }>();

  useEffect(() => {
    const unlockTime = new Date("2026-06-11T20:00:00+01:00").getTime();
    if (!user?.is_admin && new Date().getTime() < unlockTime) {
      alert("Patience. Day 2 is compiling.");
      navigate("/vault", { replace: true });
    }
  }, [navigate, user]);

  const firstName = user?.full_name ? user.full_name.split(' ')[0].toUpperCase() : "INITIATE";

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans pb-24 relative">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <Link to="/vault" className="text-xs font-bold text-slate-400 flex items-center gap-2 hover:text-[#0055FF] transition-colors">
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">BACK</span>
        </Link>
        <h1 className="text-xs font-black tracking-widest text-slate-900 uppercase text-center mx-auto absolute left-1/2 -translate-x-1/2">
          HELLO {firstName}, YOUR LEVERAGE BEGINS TODAY.
        </h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* MODULE 1: THE MYTH OF HUSTLE */}
          <section className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
             <div className="lg:col-span-5 flex flex-col gap-6">
               <div className="flex flex-col gap-3">
                 <span className="text-[#0055FF] font-bold text-xs tracking-[0.2em] uppercase">Module 1: Balance & Action</span>
                 <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Stop Hustling. Start Leveraging.</h2>
               </div>
               <p className="text-lg text-slate-600 font-medium leading-relaxed">
                 Manual energy does not scale. If you have to be awake to make money or deliver a service, you do not own a business; you own a high-stress job.
               </p>
             </div>
             <div className="lg:col-span-7">
               <LeverageScale />
             </div>
          </section>

          {/* MODULE 2: THE DIGITAL LANDLORD */}
          <section className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 lg:col-span-12 grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-center">
             <div className="xl:col-span-7 order-2 xl:order-1">
               <FunnelDiagram />
             </div>
             <div className="xl:col-span-5 flex flex-col gap-6 order-1 xl:order-2">
               <div className="flex flex-col gap-3">
                 <span className="text-[#0055FF] font-bold text-xs tracking-[0.2em] uppercase">Module 2: Sovereignty & Risk</span>
                 <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Stop Renting. Start Owning.</h2>
               </div>
               <p className="text-lg text-slate-600 font-medium leading-relaxed">
                 If your entire business is on Instagram or X, you are a digital squatter. If the algorithm changes or your account is banned, your business dies today. 
               </p>
               <div className="bg-[#0055FF]/5 border border-[#0055FF]/20 p-6 rounded-2xl relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0055FF]"></div>
                 <h4 className="font-bold text-[#0055FF] mb-2 uppercase tracking-widest text-xs">The Objective</h4>
                 <p className="text-slate-800 font-medium leading-relaxed">
                   You must move your audience from 'Rented Land' to 'Owned Databases.'
                 </p>
               </div>
             </div>
          </section>

          {/* MODULE 3: THE INVISIBLE WAITER */}
          <section className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 lg:col-span-12 flex flex-col gap-10">
             <div className="flex flex-col gap-3 max-w-4xl text-center mx-auto items-center">
               <span className="text-[#0055FF] font-bold text-xs tracking-[0.2em] uppercase">Module 3: APIs & Workflows</span>
               <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Connecting the Dots.</h2>
               <p className="text-lg text-slate-600 font-medium leading-relaxed mt-2 max-w-3xl">
                 You don't need to know how to code. Think of an API like a waiter in a restaurant. You sit at the table (WhatsApp), give your order to the waiter (API), and the waiter goes to the kitchen (Google Drive) to get your food. The waiter connects two separate rooms seamlessly.
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <WaiterCard title="THE STUDENT" icon={Lightbulb} workflow="Research Workflow: Automate extracting PDF insights into Notion." />
                <WaiterCard title="THE CEO" icon={Users} workflow="Delegation Workflow: WhatsApp message to Trello task with instant team email." />
                <WaiterCard title="THE SME" icon={Network} workflow="Client Onboarding: Payment triggers automated welcome packet via email." />
             </div>
          </section>

          {/* THE EDUCATIONAL BREAKDOWN (Day 2 Scenarios) */}
          <section className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-800 lg:col-span-12 flex flex-col gap-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-l from-[#0055FF]/10 to-transparent pointer-events-none -mt-40"></div>
             
             <div className="flex flex-col gap-3 relative z-10">
               <span className="text-slate-400 font-bold text-xs tracking-[0.2em] uppercase">The Real-World Scenarios</span>
               <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">The "Full Blunt" Execution</h2>
               <p className="text-lg text-slate-300 font-medium max-w-3xl mt-2">Listen to the audio. See yourself in the architecture.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-[#0055FF] bg-blue-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">01. Leverage vs. Labor</span>
                     <h4 className="font-bold text-xl mb-3 text-white">The Myth of "Hustle"</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        Hustle is manual energy fighting chaos. Leverage is building a tool once and letting it work a thousand times.
                     </p>
                     <div className="bg-slate-900/50 p-4 rounded-xl text-slate-300 text-sm flex flex-col gap-2">
                        <p><strong>CEO Scenario:</strong> Typing tasks manually on WhatsApp.</p>
                        <p><strong className="text-emerald-400">The System:</strong> A Google Form automatically creates a task in a Sheet and emails the staff member. You bought back 3 hours.</p>
                     </div>
                 </div>

                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">02. Rented Land Trap</span>
                     <h4 className="font-bold text-xl mb-3 text-white">Digital Sovereignty</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        Likes are vanity. Emails in a spreadsheet are true assets. When Facebook goes down, you must have an alternative route to your customers.
                     </p>
                     <p className="bg-slate-900/50 p-4 rounded-xl text-slate-300 text-sm mt-4">
                        <strong>The Fix:</strong> Every tweet or status must point to a capture form. Become the landlord of your own database.
                     </p>
                 </div>

                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-purple-400 bg-purple-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">03. APIs & Automations</span>
                     <h4 className="font-bold text-xl mb-3 text-white">The Invisible Waiter</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        You do not need to be a software engineer to build systems. An API is just a waiter carrying data from App A to App B.
                     </p>
                     <p className="bg-slate-900/50 p-4 rounded-xl text-slate-300 text-sm mt-4">
                        <strong>Case Study (This Bootcamp):</strong> You paid, the system verified, collected your data, and issued access securely. That is pure architecture.
                     </p>
                 </div>

                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-orange-400 bg-orange-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">04. Knowledge Leverage</span>
                     <h4 className="font-bold text-xl mb-3 text-white">The Student Workflow</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        AI is not for cheating; it is for rapid synthesis.
                     </p>
                     <p className="bg-slate-900/50 p-4 rounded-xl text-slate-300 text-sm mt-4">
                        <strong>The System:</strong> Feed ten 50-page PDFs into Claude. Prompt it to extract arguments. It does 4 days of research in 30 seconds.
                     </p>
                 </div>
             </div>
          </section>

          {/* KNOWLEDGE CHECKER (BLACKOUT TEST) */}
          <BlackoutTest />

        </div>
      </motion.div>

      {/* FLOATING STATUS INDICATOR */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0055FF] text-white p-4 flex items-center justify-center gap-4 z-50 shadow-[0_-10px_30px_rgba(0,85,255,0.2)]">
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
        <span className="font-bold text-sm tracking-widest uppercase text-center flex items-center gap-2">
          LIVE AUDIO: X SPACE ACTIVE. <span className="opacity-70 hidden md:inline ml-2">Mute your mics. Follow the visuals.</span>
        </span>
      </div>
    </div>
  );
}

