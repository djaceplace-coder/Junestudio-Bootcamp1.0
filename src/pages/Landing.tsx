import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function Landing() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    social_handle: "",
  });

  const targetDate = new Date("2026-06-09T23:59:00+01:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setIsLocked(true);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
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
  }, [targetDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // CRITICAL DATA RULE: Format to ALL CAPS
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to register.");
      }

      localStorage.setItem("bootcamp_user_id", data.user.id);
      navigate("/secure-checkout");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center">
      {/* Soft Glow Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-100/50 rounded-full blur-[100px] pointer-events-none" />

      <header className="flex justify-between items-center p-6 lg:px-12 w-full max-w-7xl relative z-10">
        <div className="font-bold tracking-tight text-xl text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-100 shadow-inner flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
          </div>
          June Studio
        </div>
        <Link 
          to="/initiation" 
          className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-300 py-2 px-4 rounded-full bg-white/50 backdrop-blur-md border border-white shadow-sm"
        >
          Registered? Enter Code
        </Link>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 w-full max-w-7xl gap-16 lg:gap-24 relative z-10 mt-8 mb-16">
        
        {/* Left Column: Hero & 3D Logo */}
        <div className="flex-1 flex flex-col gap-10 max-w-2xl w-full">
          {/* Creative Logo Integration */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotateZ: [0, 2, -2, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 md:w-48 md:h-48 rounded-3xl glass-card flex items-center justify-center neo-shadow relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-transparent rounded-3xl mix-blend-overlay" />
            <img src="/Logo.png" alt="June Studio Logo" className="w-[80%] max-h-[80%] object-contain drop-shadow-xl" onError={(e) => e.currentTarget.style.display = 'none'} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Scale Reach.<br />
              <span className="text-blue-600">Keep Peace.</span>
            </h1>
            <p className="text-xl text-slate-600 font-medium max-w-lg leading-relaxed">
              Join the 3-Day Reality Break. A meticulously curated bootcamp designed for clarity, scale, and high-impact design execution.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex gap-4 md:gap-6 mt-4 w-full"
          >
            {timeLeft ? (
              <>
                <TimeBox value={timeLeft.d} label="Days" />
                <span className="text-2xl text-slate-300 font-light mt-2">:</span>
                <TimeBox value={timeLeft.h} label="Hours" />
                <span className="text-2xl text-slate-300 font-light mt-2">:</span>
                <TimeBox value={timeLeft.m} label="Minutes" />
                <span className="text-2xl text-slate-300 font-light mt-2">:</span>
                <TimeBox value={timeLeft.s} label="Seconds" />
              </>
            ) : (
               <div className="h-16 flex items-center text-blue-600 font-bold tracking-tight text-xl bg-white/60 px-6 rounded-2xl shadow-sm border border-white">
                 Countdown Concluded. Check Access.
               </div>
            )}
          </motion.div>
        </div>

        {/* Right Column: Capture Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md glass-card rounded-3xl p-8 lg:p-10"
        >
          {isLocked ? (
            <div className="text-center py-12 flex flex-col gap-6 items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2 neo-input">
                <div className="w-3 h-3 bg-blue-600 animate-pulse rounded-full" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Registration Closed</h3>
                <p className="text-slate-500 text-sm font-medium">The Reality Break has begun.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="mb-2">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Secure Your Spot</h2>
                <p className="text-slate-500 text-sm mt-1">Provide your details to initiate access.</p>
              </div>

              <div className="flex flex-col gap-4">
                <InputBox label="Full Name" name="full_name" type="text" value={formData.full_name} onChange={handleChange} required />
                <InputBox label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputBox label="Phone Number" name="phone_number" type="tel" value={formData.phone_number} onChange={handleChange} required />
                <InputBox label="Social Handle (Optional)" name="social_handle" type="text" value={formData.social_handle} onChange={handleChange} />
              </div>

              {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl">{error}</div>}

              <button 
                type="submit" 
                disabled={loading}
                className="mt-4 w-full neo-button text-white font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Reserve Spot (₦5,000)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
}

function InputBox({ label, name, type, value, onChange, required = false }: any) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <motion.label 
        initial={false}
        animate={{ 
          y: active ? -26 : 14, 
          scale: active ? 0.85 : 1,
          color: active ? '#0055ff' : '#64748b'
        }}
        transition={{ type: "tween", duration: 0.2 }}
        className="absolute left-4 origin-left font-medium pointer-events-none z-10 bg-transparent px-1"
        style={{ background: active ? 'white' : 'transparent', borderRadius: '4px' }}
      >
        {label}
      </motion.label>
      <input 
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full neo-input rounded-xl px-4 py-3 text-slate-800 font-semibold focus:outline-none placeholder-transparent"
        placeholder={label}
      />
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-start min-w-[4rem]">
      <div className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-800">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs font-semibold text-blue-600 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}
