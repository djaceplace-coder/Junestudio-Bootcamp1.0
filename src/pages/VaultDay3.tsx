import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export default function VaultDay3() {
  const navigate = useNavigate();

  useEffect(() => {
    // June 12, 2026 00:00:00 WAT
    const unlockTime = new Date("2026-06-12T00:00:00+01:00").getTime();
    if (new Date().getTime() < unlockTime) {
      alert("Patience. Day 3 is compiling.");
      navigate("/vault", { replace: true });
    }
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-12 max-w-3xl mx-auto w-full py-12"
    >
      <Link to="/vault" className="text-sm font-bold text-slate-400 flex items-center gap-2 w-fit hover:text-green-600 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Base
      </Link>
      
      <div className="space-y-6">
        <p className="text-sm font-bold tracking-widest text-green-600 uppercase">Module 03</p>
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          The Unseen Architecture
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 font-medium leading-relaxed pb-6 border-b border-slate-200">
          The final piece is data integrity, state manipulation, and the seamless transition of intent from the client to the cloud.
        </p>
        
        <div className="aspect-video bg-slate-100/50 border border-slate-200 w-full flex items-center justify-center rounded-3xl overflow-hidden glass-card shadow-sm mt-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-slate-400 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               Video Stream Initializing
            </span>
          </div>
        </div>

        <div className="py-12 space-y-8 text-slate-700 text-lg leading-loose">
          <p>
            You have now mastered the visuals and the motion. Day 3 locks everything into place with robust, scalable data patterns. Your Reality Break is complete.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
