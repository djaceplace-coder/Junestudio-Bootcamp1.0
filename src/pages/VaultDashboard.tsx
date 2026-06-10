import { Link, useOutletContext } from "react-router-dom";
import { Lock, ArrowRight } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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
    <div className="text-sm font-bold tracking-widest text-[#F97316] uppercase mt-1">
      UNLOCKS IN: {timeLeft.d}D {String(timeLeft.h).padStart(2,'0')}:{String(timeLeft.m).padStart(2,'0')}:{String(timeLeft.s).padStart(2,'0')}
    </div>
  );
}

export default function VaultDashboard() {
  const { user } = useOutletContext<{ user: any }>();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Solar system parallax effects
  const innerOrbitY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const outerOrbitY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const [now, setNow] = useState(new Date().getTime());

  useEffect(() => {
    const ticker = setInterval(() => setNow(new Date().getTime()), 1000);
    return () => clearInterval(ticker);
  }, []);

  const day1Unlock = new Date("2026-06-10T20:00:00+01:00").getTime();
  const day2Unlock = new Date("2026-06-11T20:00:00+01:00").getTime();
  const day3Unlock = new Date("2026-06-12T20:00:00+01:00").getTime();

  const days = [
    {
      id: 1,
      title: "Proceed to Day 1",
      path: "/vault/day-1",
      unlocked: user?.is_admin || now >= day1Unlock,
      target: day1Unlock
    },
    {
      id: 2,
      title: "Proceed to Day 2",
      path: "/vault/day-2",
      unlocked: user?.is_admin || now >= day2Unlock,
      target: day2Unlock
    },
    {
      id: 3,
      title: "Proceed to Day 3",
      path: "/vault/day-3",
      unlocked: user?.is_admin || now >= day3Unlock,
      target: day3Unlock
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto flex flex-col gap-32 py-20 pb-32">
      
      {/* Floating Solar System Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        {/* Subtle White Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, ease: "linear", repeat: Infinity }}
          className="absolute w-[800px] h-[800px] rounded-full border border-slate-200/40"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 200, ease: "linear", repeat: Infinity }}
          className="absolute w-[1200px] h-[1200px] rounded-full border border-slate-100/60"
        />
        
        {/* Glassmorphism Spheres */}
        <motion.div
           animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
           transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
           className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-white/40 shadow-[10px_10px_40px_rgba(0,0,0,0.03),-10px_-10px_40px_rgba(255,255,255,1)] backdrop-blur-3xl border border-white"
        />
        <motion.div
           animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
           transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, delay: 2 }}
           className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full bg-blue-50/30 shadow-[10px_10px_50px_rgba(0,85,255,0.05),-10px_-10px_50px_rgba(255,255,255,0.8)] backdrop-blur-3xl border border-white"
        />
        <motion.div
           animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
           transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 1 }}
           className="absolute top-[60%] left-[20%] w-16 h-16 rounded-full bg-orange-50/40 shadow-[0_4px_20px_rgba(249,115,22,0.1)] backdrop-blur-2xl border border-white"
        />
      </div>

      {/* HEADER SECTION (The Core) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center space-y-8 mt-12"
      >
        <div className="px-5 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-inner">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0055FF]">
            The Masterpiece
          </span>
        </div>
        
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="w-28 h-28 my-4 bg-white rounded-full shadow-[0_0_60px_rgba(0,85,255,0.15)] flex items-center justify-center p-6 border border-slate-50"
        >
          <img src="/Logo.png" alt="June Studio Logo" className="w-full h-full object-contain filter drop-shadow-md" onError={(e) => e.currentTarget.style.display = 'none'} />
        </motion.div>

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
          Historiography <br className="hidden md:block"/> & Genealogy
        </h1>
        <p className="text-lg lg:text-xl font-medium leading-relaxed text-slate-600 max-w-2xl mt-6 font-serif-optional">
          A narrative reconstruction of visual design. This is an algorithmic dive into the core properties of aesthetics, interaction, and meaning. We dissect the past to reconstruct the future of the digital experience.
        </p>
      </motion.div>

      {/* SECTION TWO (The Inner Orbit: Psychological Appraisals) */}
      <motion.div 
        style={{ y: innerOrbitY }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 glass-card bg-white/70 rounded-[2.5rem] p-10 lg:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white text-center max-w-3xl mx-auto w-full"
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 drop-shadow-sm">
          The Psychology of the System
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          Humans are biologically wired to resist the unknown, creating a 'Yoke of Reality' that limits operational scale. Digital rudiments—automation, algorithmic thinking, and UI/UX architecture—are not just tools; they are cognitive extensions. By mapping your workflows into universally understood digital models, you offload the friction of daily actions. This is how you scale your reach while fiercely protecting your inner peace.
        </p>
      </motion.div>

      {/* SECTION THREE (The Outer Orbit: Digital Rudiments) */}
      <motion.div
        style={{ y: outerOrbitY }}
        className="relative z-10 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              title: "Visual Hierarchy",
              desc: "Architecture in the light. Understanding how the human eye consumes data through spacing, contrast, and typography."
            },
            {
              title: "Systemic Automation",
              desc: "The removal of repetitive consequence. Connecting fragmented tools into a singular, breathing ecosystem."
            },
            {
              title: "Interaction & Meaning",
              desc: "Digital empathy. Designing not for the screen, but for the human operating the screen."
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
              className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] cursor-pointer group"
            >
              <div className="w-12 h-12 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:bg-blue-50 transition-colors">
                <div className="w-3 h-3 bg-[#0055FF] rounded-full" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* THE SEQUENCE & COUNTDOWN LOGIC (The Locked Days) */}
      <div className="relative z-10 flex flex-col gap-8 pt-20">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Your Sequence</h2>
          <div className="w-12 h-1 bg-[#0055FF] rounded-full mt-6 opacity-20" />
        </div>
        
        {days.map((day, idx) => (
          <motion.div 
            key={day.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
          >
            <Link 
              to={day.unlocked ? day.path : "#"}
              onClick={(e) => {
                 if (!day.unlocked) {
                   e.preventDefault();
                 }
              }}
              style={{
                opacity: day.unlocked ? 1 : 0.7,
                cursor: day.unlocked ? 'pointer' : 'not-allowed'
              }}
              className={`relative flex items-center justify-between p-8 lg:p-10 rounded-[2rem] transition-all duration-500 overflow-hidden group bg-white/90 backdrop-blur-xl border border-white shadow-[0_15px_50px_rgba(0,0,0,0.05)] ${
                day.unlocked 
                ? 'hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,85,255,0.1)]' 
                : 'grayscale-[20%]'
              }`}
            >
              <div className="flex flex-col gap-3 relative z-10">
                 <h3 className={`text-3xl font-bold tracking-tight ${day.unlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                   {day.title}
                 </h3>
                 {!day.unlocked && <CountdownComponent targetTime={day.target} />}
                 {day.unlocked && <p className="text-[#0055FF] font-bold text-sm tracking-widest uppercase mt-1">Available Now</p>}
              </div>
              
              <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full transition-colors duration-500">
                 {day.unlocked ? (
                   <div className="w-full h-full bg-blue-50 text-[#0055FF] flex items-center justify-center rounded-full group-hover:bg-[#0055FF] group-hover:text-white transition-colors duration-500 shadow-sm">
                     <ArrowRight className="w-8 h-8" />
                   </div>
                 ) : (
                   <div className="w-full h-full bg-slate-100 text-slate-400 flex items-center justify-center rounded-full shadow-inner border border-slate-200">
                     <Lock className="w-7 h-7" />
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
