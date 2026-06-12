import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ArrowLeft, Download, Brain, Zap, Database, MonitorPlay, Users, Workflow, Paintbrush, Share2, CheckCircle } from "lucide-react";

const ToolkitCategory = ({ title, icon: Icon, tools }: { title: string, icon: any, tools: { name: string, model: string, desc: string }[] }) => (
  <div className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6">
    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
       <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-[#0055FF]" />
       </div>
       <h3 className="font-extrabold text-slate-900 text-xl tracking-tight">{title}</h3>
    </div>
    <div className="flex flex-col gap-6 pt-2">
       {tools.map((t, idx) => (
         <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
               <h4 className="font-bold text-slate-900 text-lg">{t.name}</h4>
               <span className="shrink-0 bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{t.model}</span>
            </div>
            <p className="text-slate-600 font-medium text-sm leading-relaxed">{t.desc}</p>
         </div>
       ))}
    </div>
  </div>
);

const BlueprintCard = ({ title, content }: { title: string, content: string }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
     <h4 className="font-bold text-slate-900 text-lg mb-3 pb-3 border-b border-slate-100 group-hover:border-[#0055FF] transition-colors">{title}</h4>
     <p className="text-slate-600 font-medium text-sm leading-relaxed">{content}</p>
  </div>
);

const PillarCard = ({ title, icon: Icon, desc }: { title: string, icon: any, desc: string }) => (
  <div className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl border border-slate-800 shadow-xl flex flex-col gap-4 relative overflow-hidden group">
     <div className="absolute top-0 right-0 w-32 h-32 bg-[#0055FF]/20 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-[#0055FF]/40 transition-colors"></div>
     <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-2 shrink-0">
        <Icon className="w-6 h-6 text-white" />
     </div>
     <h4 className="font-extrabold text-xl tracking-tight z-10">{title}</h4>
     <p className="text-slate-400 font-medium text-sm leading-relaxed z-10">{desc}</p>
  </div>
);

export default function VaultResources() {
  const { user } = useOutletContext<{ user: any }>();
  const [saved, setSaved] = useState(false);
  
  const firstName = user?.full_name ? user.full_name.split(' ')[0].toUpperCase() : "INITIATE";

  const handleSave = () => {
     setSaved(true);
     setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans pb-32">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <Link to="/vault" className="text-xs font-bold text-slate-400 flex items-center gap-2 hover:text-[#0055FF] transition-colors">
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">BACK</span>
        </Link>
        <h1 className="text-xs font-black tracking-widest text-[#0055FF] uppercase text-center mx-auto absolute left-1/2 -translate-x-1/2 w-max">
          HELLO {firstName}, YOUR ARSENAL.
        </h1>
        <button 
          onClick={handleSave}
          className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors px-4 py-2 rounded-lg
            ${saved ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-900 hover:bg-blue-50 hover:text-[#0055FF]'}
          `}
        >
           {saved ? <CheckCircle className="w-4 h-4" /> : <Download className="w-4 h-4" />}
           <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save'}</span>
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20 flex flex-col gap-16 md:gap-24">
         
         {/* SECTION 1: THE 3-DAY BLUEPRINT */}
         <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
               <span className="text-[#0055FF] font-bold text-xs tracking-widest uppercase">Section 1</span>
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">The 3-Day Blueprint (Quick Reference)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <BlueprintCard 
                 title="Day 1: The Mind" 
                 content="Define your friction. Visualize the Front Door -> Hallway -> Vault. Execute via the Mobile Command Center."
               />
               <BlueprintCard 
                 title="Day 2: The Structure" 
                 content="Stop renting land; own your database. Hustle is chaos; cybernetics is peace. Use APIs as your invisible waiters."
               />
               <BlueprintCard 
                 title="Day 3: The Execution" 
                 content="Use the free/paid tool stack. Understand retention math. Run sniper Meta ads with pixels, not shotgun boosted posts."
               />
            </div>
         </section>

         {/* SECTION 2: THE DIGITAL TOOLKIT */}
         <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
               <span className="text-[#0055FF] font-bold text-xs tracking-widest uppercase">Section 2</span>
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">The Digital Toolkit (The Arsenal)</h2>
            </div>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
               <div className="break-inside-avoid">
                  <ToolkitCategory 
                    title="THE BRAINS" 
                    icon={Brain}
                    tools={[
                       { name: "ChatGPT (OpenAI)", model: "Freemium", desc: "The creative engine. Best for copywriting, brainstorming, and structuring workflows." },
                       { name: "Claude (Anthropic)", model: "Freemium", desc: "The analytical heavy-weight. Unmatched for reading 50-page PDFs, analyzing complex data, and writing human-sounding text." },
                       { name: "Gemini (Google)", model: "Freemium", desc: "The integrated assistant. Best for live web searches and working directly within Google Docs/Workspace." },
                       { name: "Perplexity", model: "Freemium", desc: "The research engine. AI that searches the live internet and cites its sources. Perfect for YouTube niche research and market data." }
                    ]}
                  />
               </div>
               
               <div className="break-inside-avoid">
                  <ToolkitCategory 
                    title="THE WAITERS" 
                    icon={Zap}
                    tools={[
                       { name: "n8n", model: "Free / Paid", desc: "The ultimate powerhouse. Node-based automation that you can run to connect complex workflows." },
                       { name: "Make.com", model: "Freemium", desc: "Highly visual, drag-and-drop automation. Incredible for beginners building their first automated WhatsApp-to-Sheet loops." },
                       { name: "Zapier", model: "Freemium", desc: "The industry standard. Connects over 5,000 apps instantly. Highly reliable but gets expensive at scale." },
                       { name: "Activepieces", model: "Free / Paid", desc: "A fantastic, budget-friendly open-source alternative to Zapier for small business owners." }
                    ]}
                  />
               </div>

               <div className="break-inside-avoid">
                  <ToolkitCategory 
                    title="THE DATABASES" 
                    icon={Database}
                    tools={[
                       { name: "Google Sheets", model: "Free", desc: "The universal starting point. Clean, free, and integrates with literally every automation tool on earth." },
                       { name: "Airtable", model: "Freemium", desc: "A database that looks like a spreadsheet but acts like a custom software app. Great for client CRMs." },
                       { name: "Supabase", model: "Free / Paid", desc: "The enterprise-grade backend. What June Studio uses to securely manage your passwords, receipts, and access codes." }
                    ]}
                  />
               </div>
               
               <div className="break-inside-avoid">
                  <ToolkitCategory 
                    title="VISION & VOICE" 
                    icon={Paintbrush}
                    tools={[
                       { name: "Google AI Studio / Flux", model: "Free / Dev", desc: "For generating high-fidelity, commercial-grade visual assets and testing prompt architecture." },
                       { name: "ElevenLabs", model: "Freemium", desc: "The absolute best hyper-realistic voice generator. Essential for faceless YouTube channels or automated voice systems." },
                       { name: "CapCut", model: "Freemium", desc: "The undisputed king of mobile and desktop video editing. Packed with auto-captions and AI tools." },
                       { name: "Canva", model: "Freemium", desc: "The daily driver for quick social media assets, carousels, and presentation decks." }
                    ]}
                  />
               </div>

               <div className="break-inside-avoid">
                  <ToolkitCategory 
                    title="THE HALLWAY" 
                    icon={Share2}
                    tools={[
                       { name: "Tally / Google Forms", model: "Free", desc: "For capturing lead data quickly and cleanly without friction." },
                       { name: "Calendly", model: "Freemium", desc: "For automating bookings and consultations. Stops the back-and-forth 'what time works for you' DMs." },
                       { name: "Korapay / Paystack", model: "Fee Based", desc: "The local financial architecture. Seamless payment links that can trigger your automated delivery systems." }
                    ]}
                  />
               </div>

               <div className="break-inside-avoid">
                  <ToolkitCategory 
                    title="ADVANCED ARCH" 
                    icon={Workflow}
                    tools={[
                       { name: "Flowise", model: "Free / OS", desc: "Drag-and-drop tool to build your own custom AI chatbots (e.g., feeding an AI your business manual and putting it on your website)." },
                       { name: "LM Studio", model: "Free", desc: "Allows you to download and run AI models completely offline on your own machine. Ultimate privacy." },
                       { name: "Apify", model: "Freemium", desc: "The data extraction engine. Perfect for scraping leads and market research from across the web to feed into your n8n pipelines." }
                    ]}
                  />
               </div>
            </div>
         </section>

         {/* SECTION 3: THE MONETIZATION PATHS */}
         <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
               <span className="text-[#0055FF] font-bold text-xs tracking-widest uppercase">Section 3</span>
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">The Monetization Paths</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <PillarCard 
                 title="Pillar 1: AI Agency"
                 icon={Users}
                 desc="Selling B2B workflow setups to traditional businesses. E.g., Automating their lead capture and customer support so they can make money while they sleep."
               />
               <PillarCard 
                 title="Pillar 2: Digital Products"
                 icon={MonitorPlay}
                 desc="Packaging these skills into usable tools. Study blueprints, legal summaries, automated project trackers, and selling them continuously."
               />
               <PillarCard 
                 title="Pillar 3: The Scaled Founder"
                 icon={Workflow}
                 desc="Using n8n and AI to 10x your own existing business without hiring more staff. You become the orchestrator of logic."
               />
            </div>
         </section>

      </div>
      
      {/* FLOATING STATUS INDICATOR */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0055FF] text-white p-4 flex items-center justify-center gap-4 z-50 shadow-[0_-10px_30px_rgba(0,85,255,0.2)]">
        <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_10px_rgba(103,232,249,0.8)]"></div>
        <span className="font-bold text-sm tracking-widest uppercase text-center">
          SYSTEM COMPILED. PROTECT YOUR PEACE.
        </span>
      </div>
    </div>
  );
}
