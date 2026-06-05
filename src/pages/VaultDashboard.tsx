import { Link } from "react-router-dom";
import { Lock, Unlock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

function CountdownComponent({ targetTime }: { targetTime: number }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft(null); // Finished
      } else {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  if (!timeLeft) return null;
  
  return (
    <div className="text-xs font-bold tracking-widest text-orange-500 uppercase">
      UNLOCKS IN: {timeLeft.d}D {String(timeLeft.h).padStart(2,'0')}:{String(timeLeft.m).padStart(2,'0')}:{String(timeLeft.s).padStart(2,'0')}
    </div>
  );
}

export default function VaultDashboard() {
  const now = new Date().getTime();
  const day1Unlock = new Date("2026-06-10T00:00:00+01:00").getTime();
  const day2Unlock = new Date("2026-06-11T00:00:00+01:00").getTime();
  const day3Unlock = new Date("2026-06-12T00:00:00+01:00").getTime();

  const days = [
    {
      id: 1,
      title: "Proceed to Day 1",
      path: "/vault/day-1",
      unlocked: now >= day1Unlock,
      target: day1Unlock
    },
    {
      id: 2,
      title: "Proceed to Day 2",
      path: "/vault/day-2",
      unlocked: now >= day2Unlock,
      target: day2Unlock
    },
    {
      id: 3,
      title: "Proceed to Day 3",
      path: "/vault/day-3",
      unlocked: now >= day3Unlock,
      target: day3Unlock
    }
  ];

  return (
    <div className="flex flex-col gap-24 py-12 max-w-4xl mx-auto w-full">
      
      {/* Narrative Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-8 text-center flex flex-col items-center"
      >
        <span className="text-sm font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full shadow-inner">
          The Masterpiece
        </span>
        
        <motion.div
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="w-24 h-24 mb-4 mt-2"
        >
          <img src="/Logo.png" alt="June Studio Logo" className="w-full h-full object-contain filter drop-shadow-2xl" onError={(e) => e.currentTarget.style.display = 'none'} />
        </motion.div>

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
          Historiography<br/>& Genealogy
        </h1>
        <p className="text-slate-600 font-medium text-lg lg:text-xl leading-relaxed max-w-2xl mt-6">
          A narrative reconstruction of visual design. This is an algorithmic dive into the core properties of aesthetics, interaction, and meaning. We dissect the past to reconstruct the future of the digital experience. 
        </p>
      </motion.div>

      {/* Floating Glassmorphism Parallax Element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="w-full aspect-[21/9] bg-gradient-to-tr from-white to-blue-50/30 rounded-[3rem] relative overflow-hidden backdrop-blur-3xl flex items-center justify-center p-8 group neo-shadow border border-white"
      >
        <div className="absolute inset-0 bg-blue-400/5 mix-blend-multiply group-hover:bg-orange-400/5 transition-colors duration-1000"/>
        <p className="text-2xl lg:text-4xl font-bold tracking-tight text-center z-10 text-slate-800 opacity-60 group-hover:opacity-100 transition-opacity duration-1000 group-hover:scale-105 transform">
          "Architecture in the light."
        </p>
      </motion.div>

      {/* The Gatekeeper Buttons (Scroll Gating) */}
      <div className="flex flex-col gap-6 pt-16 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Your Sequence</h2>
        {days.map((day) => (
          <motion.div 
            key={day.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to={day.unlocked ? day.path : "#"}
              onClick={(e) => {
                 if (!day.unlocked) {
                   e.preventDefault();
                 }
              }}
              className={`relative flex items-center justify-between p-6 lg:p-8 rounded-3xl transition-all duration-500 overflow-hidden group ${
                day.unlocked 
                ? 'bg-white neo-shadow hover:-translate-y-1 cursor-pointer border border-white' 
                : 'bg-slate-50 border border-slate-200 cursor-not-allowed opacity-80'
              }`}
            >
              <div className="flex flex-col gap-2 relative z-10">
                 <h3 className={`text-2xl font-bold tracking-tight ${day.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                   {day.title}
                 </h3>
                 {!day.unlocked && <CountdownComponent targetTime={day.target} />}
                 {day.unlocked && <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Available Now</p>}
              </div>
              
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full transition-colors duration-300">
                 {day.unlocked ? (
                   <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                     <ArrowRight className="w-6 h-6" />
                   </div>
                 ) : (
                   <div className="w-full h-full bg-slate-200 text-slate-400 flex items-center justify-center rounded-full">
                     <Lock className="w-6 h-6" />
                   </div>
                 )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
