import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, KeyRound } from "lucide-react";
import { motion } from "motion/react";

export default function Initiation() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/initiation/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.toUpperCase() }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Token invalid or payment awaiting verification.");
      }
      
      navigate("/vault");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-50/50 rounded-full blur-[150px] pointer-events-none" />
      
      <header className="absolute top-6 left-6 lg:top-12 lg:left-12">
        <Link to="/" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2">
          &larr; Back to Base
        </Link>
      </header>

      <motion.form 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl flex flex-col items-center gap-10 text-center relative z-10 glass-card p-12 lg:p-20 rounded-[3rem] neo-shadow"
      >
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2 shadow-inner">
          <KeyRound className="w-8 h-8" />
        </div>

        <div className="flex flex-col gap-8 max-w-md w-full mx-auto group relative">
           <input 
             type="text"
             value={token}
             onChange={(e) => setToken(e.target.value.toUpperCase())}
             maxLength={10}
             className="w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-slate-100 focus:border-blue-100 text-center px-6 py-4 text-lg md:text-xl md:p-6 font-bold tracking-[0.25em] text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300 placeholder:tracking-normal placeholder:font-medium"
             placeholder="ENTER CODE"
           />
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 font-bold bg-red-50 px-6 py-3 rounded-full text-sm">
            {error}
          </motion.div>
        )}

        <button 
          type="submit" 
          disabled={loading || !token.trim()}
          className="w-full md:w-auto px-12 py-5 neo-button rounded-full text-white font-bold tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" /> Verifying
            </>
          ) : (
            "Unlock Vault"
          )}
        </button>
      </motion.form>
    </div>
  );
}
