import { useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { AlgorithmVisualizer, PromptCalculator, PeaceMeter } from "../components/VaultComponents";

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
        <p className="text-sm font-bold tracking-widest text-[#0055FF] uppercase">Module 03</p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          HELLO {firstName}, YOUR ARCHITECTURE AWAITS.
        </h1>
      </div>

      {/* CORE CONTENT: ALGORITHMIC MATH */}
      <section className="space-y-8">
        <div className="border-l-4 border-[#0055FF] pl-6 md:pl-8 py-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            Tools, Stacks & Algorithms: Deterministic Logic
          </h2>
          <p className="text-slate-500 font-medium mt-2">Data Streams & Particle Glow</p>
        </div>
        
        <div className="py-8">
          <AlgorithmVisualizer />
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Dive: Mathematical Favor</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg">
            Algorithms are not judges; they are retention models. When your stack is clean, structured, and consistent, the math forces the platform to favor you. Chaotic data inputs yield stochastic and unreliable algorithmic outputs.
          </p>
        </div>
      </section>

      {/* CORE CONTENT: VECTOR SPACE MASTERY */}
      <section className="space-y-8 pt-8">
        <div className="border-l-4 border-orange-500 pl-6 md:pl-8 py-2">
           <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
             Automation & Machine Learning: Talking in Coordinates
           </h2>
        </div>

        <div className="py-8 max-w-2xl mx-auto w-full">
          <PromptCalculator />
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Dive: Vector Space & LLMs</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg">
            AI is a lever. Prompting is not chatting; it is calculating coordinates in a multi-dimensional database. Providing context, roles, and strict formatting guarantees a 3D masterpiece outcome instead of a generic 2D summary. This is how you multiply your output by 10x.
          </p>
        </div>
      </section>

      {/* CORE CONTENT: BEHAVIORAL ROI */}
      <section className="space-y-8 pt-8">
        <div className="border-l-4 border-slate-900 pl-6 md:pl-8 py-2">
           <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
             Personal Management & The Ultimate ROI
           </h2>
        </div>

        <div className="py-8">
           <PeaceMeter />
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Dive: Hyperbolic Discounting</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg">
            This is the final cure. Hyperbolic discounting is the human tendency to choose an immediate tiny reward (The Manual Reply) over a delayed massive reward (The Built System). Overcoming this requires a "Reality Break." You now choose the peace of the system.
          </p>
        </div>
      </section>

    </motion.div>
  );
}
