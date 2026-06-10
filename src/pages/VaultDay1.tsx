import React, { useEffect, useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft, ArrowDown, CheckCircle, Smartphone } from "lucide-react";
import { motion } from "motion/react";

const Day1FlipCard = ({ title, stuckPoint }: { title: string, stuckPoint: string }) => {
  const [flipped, setFlipped] = useState(false);
  return (
     <div 
      className="h-64 cursor-pointer group"
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div 
          className="absolute inset-0 bg-white rounded-3xl shadow-sm flex flex-col items-center justify-center p-8 border border-slate-200"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="text-2xl font-extrabold text-slate-900 text-center uppercase tracking-wider">{title}</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-6">Tap to reveal stuck point</p>
        </div>
        <div 
          className="absolute inset-0 bg-[#0055FF] rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 border-2 border-[#0055FF]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-4">Stuck Point</h3>
          <p className="text-lg font-medium text-white text-center leading-relaxed">{stuckPoint}</p>
        </div>
      </motion.div>
    </div>
  )
}

const HouseDiagram = () => (
  <div className="w-full mx-auto bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 relative overflow-hidden flex flex-col gap-6 items-center">
    <div className="hidden md:flex absolute left-0 top-1/2 -mt-3 text-[#0055FF] bg-blue-100 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest -rotate-90 origin-left shadow-sm">Attention In</div>
    <div className="hidden md:flex absolute right-0 top-1/2 -mt-3 text-emerald-600 bg-emerald-100 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest rotate-90 origin-right shadow-sm">Money Out</div>
    
    <div className="w-full max-w-sm bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center relative">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-100 text-[#0055FF] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Entry</div>
      <h4 className="font-bold text-slate-900 text-lg">1. THE FRONT DOOR</h4>
      <p className="text-sm text-slate-500 font-medium mt-1">Social Media (Is your sign clear?)</p>
    </div>
    
    <ArrowDown className="w-8 h-8 text-slate-300" />
    
    <div className="w-full max-w-sm bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center relative">
       <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Capture</div>
      <h4 className="font-bold text-slate-900 text-lg">2. THE HALLWAY</h4>
      <p className="text-sm text-slate-500 font-medium mt-1">Lead Capture (Is it easy to walk through?)</p>
    </div>
    
    <ArrowDown className="w-8 h-8 text-slate-300" />
    
    <div className="w-full max-w-sm bg-[#0055FF] text-white p-6 rounded-2xl border border-[#0055FF] shadow-[0_10px_30px_rgba(0,85,255,0.2)] text-center relative">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#0055FF] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Harvest</div>
      <h4 className="font-bold text-xl">3. THE CASHIER</h4>
      <p className="text-sm text-blue-200 font-medium mt-1">Payment (Is the person there to collect?)</p>
    </div>
  </div>
)

const Day1PhoneMockup = () => (
   <div className="flex justify-center my-6">
      <div className="w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative flex flex-col overflow-hidden">
          <div className="w-32 h-7 bg-slate-800 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-20"></div>
          
          <div className="absolute inset-0 bg-slate-900 z-0">
             <div className="absolute top-20 right-10 w-32 h-32 bg-[#0055FF] opacity-20 blur-3xl rounded-full"></div>
             <div className="absolute bottom-40 left-10 w-32 h-32 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
          </div>

          <div className="flex-1 bg-slate-50 pt-16 p-6 rounded-[2.5rem] mt-2 mb-2 mx-2 overflow-hidden flex flex-col justify-between relative z-10">
             <div>
                <div className="text-xs font-bold text-slate-400 mb-6 px-2 tracking-widest uppercase text-center border-b border-slate-200 pb-4">Command Center</div>
                <div className="space-y-4">
                   {['Global Database', 'Agent API', 'Payment Router'].map((a, i) => (
                     <div key={a} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-[#0055FF]"/>
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-sm text-slate-800">{a}</span>
                           <span className="text-[10px] text-slate-400 uppercase tracking-widest">Active</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.95 }}
               className="w-full bg-[#0055FF] shadow-[0_10px_30px_rgba(0,85,255,0.3)] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm relative overflow-hidden group"
             >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                Launch System
             </motion.button>
          </div>
      </div>
   </div>
)

const KnowledgeChecker = () => {
    const [answer, setAnswer] = useState("");
    const [submitted, setSubmitted] = useState(false);
    
    return (
       <div className="bg-white/70 backdrop-blur-md p-10 rounded-[2rem] border border-slate-200 shadow-sm col-span-1 lg:col-span-12">
          <div className="flex flex-col gap-2 mb-8">
             <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">Knowledge Checker</span>
             <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Interactive Target Selection</h2>
          </div>
          <p className="text-xl text-slate-700 mb-8 font-medium">If you could automate <span className="font-bold text-[#0055FF]">ONE thing today</span> to save 2 hours, what would it be?</p>
          
          {!submitted ? (
             <div className="flex flex-col gap-6">
               <textarea 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-6 border-2 border-slate-200 rounded-2xl focus:border-[#0055FF] focus:ring-4 focus:ring-blue-50 outline-none resize-none h-40 text-lg text-slate-900 transition-all font-medium"
                  placeholder="E.g., Answering the same WhatsApp question 50 times a day..."
               />
               <button 
                 onClick={() => { if(answer.trim()) setSubmitted(true); }}
                 className="bg-slate-900 text-white font-bold tracking-widest uppercase px-10 py-5 rounded-2xl self-end hover:bg-slate-800 transition-colors shadow-lg"
               >
                  Save to System
               </button>
             </div>
          ) : (
             <div className="bg-emerald-50 text-emerald-700 p-8 rounded-2xl flex items-center gap-6 font-bold border border-emerald-200 shadow-sm">
               <CheckCircle className="w-10 h-10 text-emerald-500 shrink-0" />
               <span className="text-lg">Audit logged in database. Automation target established for Day 2.</span>
             </div>
          )}
       </div>
    )
}

export default function VaultDay1() {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: any }>();

  useEffect(() => {
    const unlockTime = new Date("2026-06-10T20:00:00+01:00").getTime();
    if (!user?.is_admin && new Date().getTime() < unlockTime) {
      alert("Patience. Day 1 is compiling.");
      navigate("/vault", { replace: true });
    }
  }, [navigate, user]);

  const firstName = user?.full_name ? user.full_name.split(' ')[0].toUpperCase() : "INITIATE";

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <Link to="/vault" className="text-xs font-bold text-slate-400 flex items-center gap-2 hover:text-[#0055FF] transition-colors">
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">BACK</span>
        </Link>
        <h1 className="text-xs font-black tracking-widest text-slate-900 uppercase text-center mx-auto absolute left-1/2 -translate-x-1/2">
          HELLO {firstName}, YOUR UPGRADE BEGINS HERE.
        </h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* MODULE 1: FINDING YOUR STUCK POINTS */}
          <section className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 lg:col-span-12 flex flex-col gap-10">
             <div className="flex flex-col gap-3 max-w-4xl">
               <span className="text-[#0055FF] font-bold text-xs tracking-[0.2em] uppercase">Module 1: The Friction Audit</span>
               <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">What is slowing you down today?</h2>
               <p className="text-lg text-slate-600 font-medium leading-relaxed mt-2">
                 Most people fail not because they are lazy, but because their 'starting energy' is too high. 
                 If you need 10 steps to start a task, your brain will choose to sleep instead.
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Day1FlipCard title="THE BOSS." stuckPoint="Answering 200 repetitive WhatsApp questions daily." />
                <Day1FlipCard title="THE STUDENT." stuckPoint="Summarizing 50-page textbooks for exams." />
                <Day1FlipCard title="THE FREELANCER." stuckPoint="Spending 4 hours writing one job proposal." />
             </div>

             <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl mt-4 relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#0055FF] rounded-full blur-[80px] opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
               <h3 className="font-extrabold text-xl mb-3 text-white tracking-tight">Deep Dive: Brain Drain (Decision Fatigue)</h3>
               <p className="text-slate-300 leading-relaxed text-lg font-medium max-w-4xl">
                  When you don't have a system, you spend all your energy deciding WHAT to do. A system decides for you, so you can just DO.
               </p>
             </div>
          </section>

          {/* MODULE 2: SEEING THE INVISIBLE ROAD */}
          <section className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
             <div className="lg:col-span-5 flex flex-col gap-6">
               <div className="flex flex-col gap-3">
                 <span className="text-[#0055FF] font-bold text-xs tracking-[0.2em] uppercase">Module 2: Visualization</span>
                 <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">The Internet is just a series of rooms.</h2>
               </div>
               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 neo-shadow-sm">
                 <p className="text-lg text-slate-700 font-medium leading-relaxed">
                   Think of your business like a shop in a busy Lagos market. We must structure the physical rooms to guide customer attention.
                 </p>
               </div>
             </div>
             <div className="lg:col-span-7">
               <HouseDiagram />
             </div>
          </section>

          {/* MODULE 3: MAKING IT REAL ON YOUR PHONE */}
          <section className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 lg:col-span-12 grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-center">
             <div className="xl:col-span-7 order-2 xl:order-1">
               <Day1PhoneMockup />
             </div>
             <div className="xl:col-span-5 flex flex-col gap-6 order-1 xl:order-2">
               <div className="flex flex-col gap-3">
                 <span className="text-[#0055FF] font-bold text-xs tracking-[0.2em] uppercase">Module 3: Actualization</span>
                 <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Your phone is a Command Center, not a Toy.</h2>
               </div>
               <p className="text-lg text-slate-600 font-medium leading-relaxed">
                 You don't need a 1 Million Naira laptop to run a global business. You need the right 'Logic' on the phone already in your hand.
               </p>
               <div className="bg-[#0055FF]/5 border border-[#0055FF]/20 p-6 rounded-2xl relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0055FF]"></div>
                 <h4 className="font-bold text-[#0055FF] mb-2 uppercase tracking-widest text-xs">The Paradigm Shift</h4>
                 <p className="text-slate-800 font-medium leading-relaxed">
                   We move from 'Scrolling' (consuming) to 'Systemizing' (producing). Every app on your phone must have a job.
                 </p>
               </div>
             </div>
          </section>

          {/* THE NEW BLOOMER EDUCATIONAL BREAKDOWN */}
          <section className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-800 lg:col-span-12 flex flex-col gap-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-l from-[#0055FF]/10 to-transparent pointer-events-none -mt-40"></div>
             
             <div className="flex flex-col gap-3 relative z-10">
               <span className="text-slate-400 font-bold text-xs tracking-[0.2em] uppercase">The Knowledge Monetization Thread</span>
               <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">The "New Bloomer" Breakdown</h2>
               <p className="text-lg text-slate-300 font-medium max-w-3xl mt-2">Studyable, fact-checked methodologies for establishing absolute digital leverage.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-[#0055FF] bg-blue-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">01. The Phantom</span>
                     <h4 className="font-bold text-xl mb-3 text-white">The Reality of the "Phantom"</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        The digital world is often sold as "magic" to keep us as consumers. We redefine AI as a "Cognitive Lever." Just like a car helps your legs, AI helps your brain.
                     </p>
                     <p className="bg-slate-900/50 p-4 rounded-xl text-slate-300 text-sm italic">
                        <strong>Example:</strong> A teacher uses AI to turn a 1-hour lesson plan into a 5-minute task. That 55 minutes saved is "New Money".
                     </p>
                 </div>

                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">02. The First Product</span>
                     <h4 className="font-bold text-xl mb-3 text-white">Knowledge Monetization</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        What you already know is your first product. You do not need new skills, you need new packaging.
                     </p>
                     <ul className="text-slate-300 text-sm space-y-2 mt-4 font-medium">
                        <li>• <strong>Lawyer:</strong> "Legal Summaries for SMEs" PDF.</li>
                        <li>• <strong>Fashion Designer:</strong> Automated "Style Guide System."</li>
                        <li>• <strong>Student:</strong> Custom "Study Blueprints."</li>
                     </ul>
                 </div>

                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-purple-400 bg-purple-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">03. The Workflow</span>
                     <h4 className="font-bold text-xl mb-3 text-white">"1 Idea → 100 Leads"</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        Multiplying a single thought using interconnected architecture.
                     </p>
                     <ul className="text-slate-300 text-sm space-y-2 mt-4 font-medium">
                        <li>• <strong>The Seed:</strong> One WhatsApp Voice Note.</li>
                        <li>• <strong>The Growth:</strong> AI Transcription.</li>
                        <li>• <strong>The Branches:</strong> 5 X Posts, 3 LinkedIn Articles, 1 Script.</li>
                        <li>• <strong>The Harvest:</strong> Google Form lead capture.</li>
                     </ul>
                 </div>

                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-orange-400 bg-orange-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">04. The Ethical Pipeline</span>
                     <h4 className="font-bold text-xl mb-3 text-white">YouTube Automation</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        Faceless channels are not luck. They are tightly constructed pipelines driven by ethical, high-value content.
                     </p>
                     <ul className="text-slate-300 text-sm space-y-2 mt-4 font-medium">
                        <li>• <strong>Research:</strong> Finding search intent via Perplexity.</li>
                        <li>• <strong>Scripting:</strong> AI structuring narrative retention hooks.</li>
                        <li>• <strong>By Day 3:</strong> You will access ElevenLabs & CapCut logic.</li>
                     </ul>
                 </div>
             </div>
          </section>

          {/* KNOWLEDGE CHECKER */}
          <KnowledgeChecker />

          {/* ASSIGNMENT */}
          <section className="bg-white p-8 md:p-12 rounded-[2rem] border-2 border-[#0055FF] shadow-[0_10px_40px_rgba(0,85,255,0.15)] col-span-1 lg:col-span-12 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[#0055FF]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex flex-col gap-4 max-w-2xl text-center md:text-left">
                   <span className="text-[#0055FF] font-extrabold text-xs tracking-widest uppercase bg-blue-100 w-fit md:mx-0 mx-auto px-4 py-2 rounded-full">MISSION 01</span>
                   <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">OPEN THE X (TWITTER) GATE.</h3>
                   <p className="text-lg text-slate-600 font-medium leading-relaxed">
                     Tomorrow we leave WhatsApp for the higher grounds of X Spaces. Download the app and prepare your mind. 
                   </p>
                </div>
                <Link to="/vault" className="shrink-0 bg-[#0055FF] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
                   Acknowledge & Exit
                </Link>
             </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

