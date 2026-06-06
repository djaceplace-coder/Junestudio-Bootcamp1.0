import { useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export default function VaultDay1() {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: any }>();

  useEffect(() => {
    // June 10, 2026 00:00:00 WAT
    const unlockTime = new Date("2026-06-10T00:00:00+01:00").getTime();
    if (!user?.is_admin && new Date().getTime() < unlockTime) {
      alert("Patience. Day 1 is compiling.");
      navigate("/vault", { replace: true });
    }
  }, [navigate, user]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-12 max-w-3xl mx-auto w-full py-12"
    >
      <Link to="/vault" className="text-sm font-bold text-slate-400 flex items-center gap-2 w-fit hover:text-blue-600 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Base
      </Link>
      
      <div className="space-y-6">
        <p className="text-sm font-bold tracking-widest text-blue-600 uppercase">Module 01</p>
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          The Immersive Foundation
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 font-medium leading-relaxed pb-6 border-b border-slate-200">
          We begin by stripping away the noise. The foundation of high-end design lies in the restraint of elements and the mastery of blank space.
        </p>
        
        <div className="aspect-video bg-slate-100/50 border border-slate-200 w-full flex items-center justify-center rounded-3xl overflow-hidden glass-card shadow-sm mt-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-slate-400 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
               Video Stream Initializing
            </span>
          </div>
        </div>

        <div className="py-12 space-y-8 text-slate-700 text-lg leading-loose font-serif-optional">
          <p>
            Welcome to the first sector. Observe the surroundings of this interface. Notice the complete absence of dark, overwhelming noise. High-end experiences respect the user's attention.
          </p>
          <p>
            You are here to learn the architecture of light. Start preparing your local environment.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
