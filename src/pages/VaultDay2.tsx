import { useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { EntropySlider, ConsequenceMatrix, StackBuilder } from "../components/VaultComponents";

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
        <p className="text-sm font-bold tracking-widest text-[#0055FF] uppercase">Module 02</p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          HELLO {firstName}, YOUR ARCHITECTURE AWAITS.
        </h1>
      </div>

      {/* CORE CONTENT: SYSTEMIC ENTROPY */}
      <section className="space-y-8">
        <div className="border-l-4 border-[#0055FF] pl-6 md:pl-8 py-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            Balance & Action: Cybernetic Regulation
          </h2>
          <p className="text-slate-500 font-medium mt-2">Magnetic UI Snapping</p>
        </div>
        
        <div className="py-8">
          <EntropySlider />
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Dive: Thermodynamics of Business</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg">
            "Hustle" is manual energy fighting entropy. It is fundamentally unsustainable. Cybernetics is the construction of a self-regulating loop that buys back your inner peace. Once organized, the system resists chaos automatically, leaving your cognitive power strictly for creation.
          </p>
        </div>
      </section>

      {/* CORE CONTENT: SECOND-ORDER THINKING */}
      <section className="space-y-8 pt-8">
        <div className="border-l-4 border-orange-500 pl-6 md:pl-8 py-2">
           <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
             Risks, Consequence & Collateral Effects
           </h2>
        </div>

        <div className="py-8 max-w-2xl mx-auto w-full">
          <ConsequenceMatrix />
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Dive: Technological Sovereignty</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg">
            You must move from "Rented Land" (social media algorithms) to "Owned Databases" (email lists, custom web apps). Every action must have a reaction that stores data for the founder. Relying entirely on external algorithms is a first-order trap leading to total loss of sovereignty.
          </p>
        </div>
      </section>

      {/* CORE CONTENT: THE SOVEREIGNTY STACK */}
      <section className="space-y-8 pt-8">
        <div className="border-l-4 border-slate-900 pl-6 md:pl-8 py-2">
           <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
             Foundational Frameworks: Ontological Design
           </h2>
        </div>

        <div className="py-8">
           <StackBuilder />
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Deep Dive: Information Foraging</h3>
          <p className="text-slate-700 leading-relaxed font-serif-optional text-lg">
            Your workflow must be ruthless. If a process takes too many clicks, the user (and you, the founder) will abandon it. We build for the hunt: maximizing the yield of information and execution while minimizing the energy expended. Your stack is your greatest asset.
          </p>
        </div>
      </section>

    </motion.div>
  );
}
