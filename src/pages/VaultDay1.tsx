import { useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Flashcard, OrbitalPanel, SmartphoneModel } from "../components/VaultComponents";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-16 max-w-[90vw] md:max-w-4xl mx-auto w-full px-4 md:px-0 py-8 md:py-12 overflow-x-hidden"
    >
      <Link to="/vault" className="text-sm font-bold text-slate-400 flex items-center gap-2 w-fit hover:text-[#0055FF] transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Base
      </Link>
      
      <div className="space-y-4 text-center md:text-left">
        <p className="text-sm font-bold tracking-widest text-[#0055FF] uppercase">Module 01</p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          HELLO {firstName}, YOUR ARCHITECTURE AWAITS.
        </h1>
      </div>

      {/* CORE CONTENT: THE PSYCHOLOGICAL AUDIT */}
      <section className="space-y-8">
        <div className="border-l-4 border-[#0055FF] pl-6 md:pl-8 py-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            Defining You: The Friction Audit
          </h2>
          <p className="text-slate-500 font-medium mt-2">Untangling Wireframes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <Flashcard 
            front="Procrastination" 
            back="High Activation Energy. Your current system requires too many steps to start." 
          />
          <Flashcard 
            front="Fear of the New" 
            back="Cognitive Dissonance. You are trying to use an analog brain in an exponential world." 
          />
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Dive: The Neurology of Systems</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg">
            Decision Fatigue is the silent killer of compounding growth. A clear identity eliminates 60% of energy waste by removing unnecessary choices. When you construct a definitive mental architecture, you no longer decide what to do; you simply execute the predetermined protocol.
          </p>
        </div>
      </section>

      {/* CORE CONTENT: COGNITIVE MAPPING */}
      <section className="space-y-8 pt-8">
        <div className="border-l-4 border-orange-500 pl-6 md:pl-8 py-2">
           <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
             Understanding Visualization: The Semiotics of Space
           </h2>
        </div>

        <div className="py-8">
          <OrbitalPanel />
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Dive: Spatial Processing</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg">
            The digital world is a physical room. You must design for the human eye using spacing, contrast, and "paths of least resistance." The assembly line of Attention (Front Door), Capture (Hallway), and Fulfillment (Vault) dictates whether a user stays or abandons your ecosystem.
          </p>
        </div>
      </section>

      {/* CORE CONTENT: THE ACTIVATION BLUEPRINT */}
      <section className="space-y-8 pt-8">
        <div className="border-l-4 border-slate-900 pl-6 md:pl-8 py-2">
           <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
             Process of Actualization: The Physics of Execution
           </h2>
        </div>

        <SmartphoneModel />

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Dive: Activation Energy</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg">
            Actualization is about lowering the "caloric expenditure" of a task. Mobile-first isn't a design choice; it's a psychological hack to move from thought to execution in under 3 seconds. The architecture demands that your most frequent actions require the absolute minimum latency.
          </p>
        </div>
      </section>

    </motion.div>
  );
}
