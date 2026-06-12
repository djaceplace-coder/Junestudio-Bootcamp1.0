import React, { useEffect, useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft, Brain, Cpu, Database, Share2, Target, TrendingUp, HandCoins, MonitorPlay, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ResourcesVault } from "../components/VaultComponents";

const StackComparisonGrid = () => (
  <div className="w-full bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr>
            <th className="p-4 border-b-2 border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest w-1/3">Layer</th>
            <th className="p-4 border-b-2 border-slate-200 text-xs font-bold text-emerald-600 uppercase tracking-widest w-1/3">Free (Bootstrap)</th>
            <th className="p-4 border-b-2 border-slate-200 text-xs font-bold text-[#0055FF] uppercase tracking-widest w-1/3">Paid (Scale)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 hover:bg-slate-100/50 transition-colors">
            <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
              <Brain className="w-5 h-5 text-slate-400" /> The Brain
            </td>
            <td className="p-4 font-medium text-slate-700">ChatGPT / Claude Sonnet</td>
            <td className="p-4 font-medium text-[#0055FF] bg-blue-50/50 rounded-lg m-2 block w-max">ChatGPT Plus / Claude Opus</td>
          </tr>
          <tr className="border-b border-slate-100 hover:bg-slate-100/50 transition-colors">
            <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
              <Zap className="w-5 h-5 text-slate-400" /> The Waiter
            </td>
            <td className="p-4 font-medium text-slate-700">Zapier Free Tier / n8n Local</td>
            <td className="p-4 font-medium text-[#0055FF] bg-blue-50/50 rounded-lg m-2 block w-max">Make.com / Activepieces</td>
          </tr>
          <tr className="hover:bg-slate-100/50 transition-colors">
            <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
              <Database className="w-5 h-5 text-slate-400" /> The Database
            </td>
            <td className="p-4 font-medium text-slate-700">Google Sheets</td>
            <td className="p-4 font-medium text-[#0055FF] bg-blue-50/50 rounded-lg m-2 block w-max">Airtable / Supabase</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const ThreePillars = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
      <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
        <Share2 className="w-6 h-6 text-purple-600" />
      </div>
      <h4 className="font-bold text-slate-900 text-lg">1. Organic Math</h4>
      <p className="text-slate-600 font-medium text-sm leading-relaxed">
        Watch time + Shares = Algorithmic Push. If you keep them on the app, you win.
      </p>
    </div>
    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 opacity-80">
      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
        <TrendingUp className="w-6 h-6 text-red-500" />
      </div>
      <h4 className="font-bold text-slate-900 text-lg">2. The "Boost" Trap</h4>
      <p className="text-slate-600 font-medium text-sm leading-relaxed">
        Clicking 'Boost Post' wastes money on vanity likes. A tax on those without data.
      </p>
    </div>
    <div className="bg-[#0055FF] text-white p-8 rounded-2xl border border-[#0055FF] shadow-[0_10px_30px_rgba(0,85,255,0.2)] flex flex-col gap-4">
      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
        <Target className="w-6 h-6 text-white" />
      </div>
      <h4 className="font-bold text-lg">3. The Sniper Ad</h4>
      <p className="text-blue-100 font-medium text-sm leading-relaxed">
        Using Meta Ads Manager & Pixels for custom targeting to buy actual customers.
      </p>
    </div>
  </div>
);

const RoadmapGraphic = () => (
  <div className="w-full bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 relative overflow-hidden flex flex-col gap-8">
     <div className="hidden md:block absolute left-[4.5rem] top-12 bottom-12 w-1 bg-slate-200 rounded-full z-0"></div>
     
     <div className="w-full flex flex-col gap-8 relative z-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-6 items-start hover:border-[#0055FF] transition-colors group relative">
           <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 border border-emerald-100">
             <HandCoins className="w-6 h-6 text-emerald-600" />
           </div>
           <div className="pt-1">
              <h4 className="font-bold text-slate-900 text-lg group-hover:text-[#0055FF] transition-colors">Path 1: The AI Agency</h4>
              <p className="text-slate-500 font-medium text-sm mt-2">Selling setups and automations to local SMEs. (e.g., auto-reply WhatsApp to Google Sheets)</p>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-6 items-start hover:border-[#0055FF] transition-colors group ml-0 md:ml-12 relative">
           <div className="hidden md:block absolute -left-12 top-6 w-12 h-1 bg-slate-200 rounded-full -z-10"></div>
           <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0 border border-blue-100 z-10">
             <MonitorPlay className="w-6 h-6 text-[#0055FF]" />
           </div>
           <div className="pt-1">
              <h4 className="font-bold text-slate-900 text-lg group-hover:text-[#0055FF] transition-colors">Path 2: Digital Products</h4>
              <p className="text-slate-500 font-medium text-sm mt-2">Packaging workflows into templates and selling them online (Selar, Stripe).</p>
           </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-md flex gap-6 items-start ml-0 md:ml-24 group relative">
           <div className="hidden md:block absolute -left-24 top-6 w-24 h-1 bg-slate-200 rounded-full -z-10"></div>
           <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0 z-10">
             <Cpu className="w-6 h-6 text-purple-400" />
           </div>
           <div className="pt-1">
              <h4 className="font-bold text-white text-lg">Path 3: The Scaled Founder</h4>
              <p className="text-slate-400 font-medium text-sm mt-2">Using these systems to 10x your own existing business without hiring more staff.</p>
           </div>
        </div>
     </div>
  </div>
);

const PeaceMetricSlider = () => {
  const [value, setValue] = useState(50);
  
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="bg-white/70 backdrop-blur-md p-10 rounded-[2rem] shadow-sm border border-slate-200 col-span-1 lg:col-span-12 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
        <span className="text-[#0055FF] font-bold text-xs tracking-widest uppercase">The Peace Metric</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Return on Investment is not just Naira. It is time.</h2>
        <p className="text-lg text-slate-600 font-medium leading-relaxed">
           If a system makes you rich but costs you your sanity, it is broken. Choose your peace.
        </p>
      </div>

      <div className="shrink-0 flex flex-col items-center gap-6 bg-slate-50 p-8 rounded-3xl border border-slate-100">
        <div className="relative w-40 h-40 flex items-center justify-center">
           <svg className="w-full h-full -rotate-90" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r={radius} className="stroke-slate-200" strokeWidth="12" fill="none" />
              <circle 
                cx="75" cy="75" r={radius} 
                className="stroke-[#0055FF] transition-all duration-300 ease-out" 
                strokeWidth="12" fill="none" 
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-2">
              <span className="text-3xl font-black text-slate-900">{value}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Peace</span>
           </div>
        </div>
        <input 
          type="range" 
          min="0" max="100" 
          value={value} 
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0055FF]"
        />
      </div>
    </div>
  )
}

export default function VaultDay3() {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: any }>();

  useEffect(() => {
    const unlockTime = new Date("2026-06-12T20:00:00+01:00").getTime();
    if (!user?.is_admin && new Date().getTime() < unlockTime) {
      alert("Patience. Day 3 is compiling.");
      navigate("/vault", { replace: true });
    }
  }, [navigate, user]);

  const firstName = user?.full_name ? user.full_name.split(' ')[0].toUpperCase() : "INITIATE";

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans pb-32 relative">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <Link to="/vault" className="text-xs font-bold text-slate-400 flex items-center gap-2 hover:text-[#0055FF] transition-colors">
          <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">BACK</span>
        </Link>
        <h1 className="text-xs font-black tracking-widest text-slate-900 uppercase text-center mx-auto absolute left-1/2 -translate-x-1/2 w-max">
          HELLO {firstName}, YOUR ACTUALIZATION BEGINS NOW.
        </h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* MODULE 1: THE ARSENAL */}
          <section className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 lg:col-span-12 flex flex-col gap-8">
             <div className="flex flex-col gap-3 max-w-4xl">
               <span className="text-[#0055FF] font-bold text-xs tracking-[0.2em] uppercase">Module 1: The Arsenal</span>
               <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Building the Machine: Free vs. Paid</h2>
               <p className="text-lg text-slate-600 font-medium leading-relaxed mt-2">
                 AI is not just for making pretty pictures or writing tweets. It is a data analyst, a customer support agent, and a logistics manager. You must choose the right tools for your current financial reality.
               </p>
             </div>
             <StackComparisonGrid />
          </section>

          {/* MODULE 2: DECODING ALGORITHMS & META ADS */}
          <section className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 lg:col-span-12 flex flex-col gap-10">
             <div className="flex flex-col gap-3 max-w-4xl mx-auto items-center text-center">
               <span className="text-[#0055FF] font-bold text-xs tracking-[0.2em] uppercase">Module 2: Decoding Algorithms</span>
               <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Math, Not Magic.</h2>
               <p className="text-lg text-slate-600 font-medium leading-relaxed mt-2 max-w-2xl">
                 Algorithms do not hate you; they reward retention. If you keep people on their app, they push your content. Meta Ads are not a slot machine; they are a data-matching engine.
               </p>
             </div>
             <ThreePillars />
          </section>

          {/* MODULE 3: THE MONETIZATION MAPS */}
          <section className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 lg:col-span-12 flex flex-col gap-8">
             <div className="flex flex-col gap-3 max-w-4xl">
               <span className="text-[#0055FF] font-bold text-xs tracking-[0.2em] uppercase">Module 3: The Monetization Maps</span>
               <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Extracting the Value.</h2>
             </div>
             <RoadmapGraphic />
          </section>

          {/* THE EDUCATIONAL BREAKDOWN (Day 3 Content) */}
          <section className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-800 lg:col-span-12 flex flex-col gap-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-l from-[#0055FF]/20 to-transparent pointer-events-none -mt-40"></div>
             
             <div className="flex flex-col gap-3 relative z-10">
               <span className="text-slate-400 font-bold text-xs tracking-[0.2em] uppercase">The Final Masterclass</span>
               <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">The Educational Breakdown</h2>
               <p className="text-lg text-slate-300 font-medium max-w-3xl mt-2">Deep into operations, algorithms, and money calculation.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 {/* Item 1 */}
                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-[#0055FF] bg-blue-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">01. Logic Engine</span>
                     <h4 className="font-bold text-xl mb-3 text-white">Beyond Content: Operations & Logic</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        Beginners think AI is a glorified typewriter. Architects know it is a logic engine. You can use Claude to categorize 50 page PDFs of expenses to see where you are losing money.
                     </p>
                     <p className="bg-slate-900/50 p-4 rounded-xl text-slate-300 text-sm italic">
                        <strong>Application:</strong> Feed Flowise your FAQ document and connect it to WhatsApp. The AI answers flawlessly at 2am while you sleep.
                     </p>
                 </div>
                 
                 {/* Item 2 */}
                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">02. Stack Scaling</span>
                     <h4 className="font-bold text-xl mb-3 text-white">The Tool Stack: Free vs. Paid Leverage</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        You can build a 7-figure business using 100% free tools if you understand the architecture. Never pay for a tool until the free tool breaks.
                     </p>
                     <ul className="text-slate-300 text-sm space-y-2 mt-4 font-medium">
                        <li>• <strong>Bootstrap:</strong> Forms → Sheets → Zapier Free → Gmail.</li>
                        <li>• <strong>Scale:</strong> Webflow → Supabase → Make.com → WhatsApp Cloud.</li>
                     </ul>
                 </div>

                 {/* Item 3 */}
                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-purple-400 bg-purple-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">03. The Math</span>
                     <h4 className="font-bold text-xl mb-3 text-white">Algorithms: The Retention Math</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        Stop praying to the algorithm. Learn its language. The algorithm cares if your video keeps the user from closing the app. Period.
                     </p>
                     <p className="bg-slate-900/50 p-4 rounded-xl text-slate-300 text-sm italic">
                        <strong>Metric:</strong> Retention Rate and Shares. If your video makes someone pause for 3 seconds, it shows to 10 more. If it gets shared, 100 more.
                     </p>
                 </div>

                 {/* Item 4 */}
                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                     <span className="text-orange-400 bg-orange-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">04. Sniper Ads</span>
                     <h4 className="font-bold text-xl mb-3 text-white">Meta Ads: Sniper vs Shotgun</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4">
                        Pressing "Boost Post" on Instagram is a tax on business owners who don't understand data. It gives you vanity likes with no sales.
                     </p>
                     <p className="bg-slate-900/50 p-4 rounded-xl text-slate-300 text-sm mt-4">
                        <strong>The Sniper:</strong> Use Meta Ads Manager + Pixel. Track your buyers, tell Meta to find 1,000 strangers with the <em>exact</em> same behavioral data. That is buying data.
                     </p>
                 </div>
                 
                 {/* Item 5 */}
                 <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:bg-slate-800 transition-colors md:col-span-2">
                     <span className="text-yellow-400 bg-yellow-900/30 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase mb-4 inline-block">05. The Goal</span>
                     <h4 className="font-bold text-xl mb-3 text-white">The Monetization & True ROI</h4>
                     <p className="text-slate-400 font-medium text-sm leading-relaxed mb-4 max-w-3xl">
                        Path 1: Walk into local businesses and build lead capture workflows for N150K. <br/>
                        Path 2: Sell template workflows online. <br/>
                        <strong>The Ultimate ROI:</strong> Scaling reach while keeping your peace. Overworking is a failure of architecture.
                     </p>
                 </div>
             </div>
          </section>

          {/* KNOWLEDGE CHECKER (PEACE METRIC) */}
          <PeaceMetricSlider />

        </div>

        {/* RESOURCES VAULT */}
        <div className="mt-8">
           <ResourcesVault />
        </div>
      </motion.div>


      {/* FLOATING STATUS INDICATOR */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-emerald-400 p-4 flex items-center justify-center gap-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
        <span className="font-bold text-sm tracking-widest uppercase text-center">
          THE VAULT IS NOW FULLY UNLOCKED. AWAIT THE FINAL MASTER RESOURCES PDF.
        </span>
      </div>
    </div>
  );
}

