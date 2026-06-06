import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function VaultLayout() {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/vault/session");
        const data = await res.json();
        if (res.ok && data.valid) {
          setAuthorized(true);
          setUserProfile(data.user);
        } else {
          navigate("/initiation");
        }
      } catch (err) {
        navigate("/initiation");
      }
    };
    checkSession();
  }, [location.pathname, navigate]);

  if (!authorized || !userProfile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative overflow-hidden">
      <div className="fixed top-[10%] left-[-20%] w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50/50 rounded-full blur-[120px] pointer-events-none" />
      
      <header className="px-6 lg:px-12 py-5 border-b border-slate-100 flex justify-between items-center relative z-20 bg-white/50 backdrop-blur-md">
        <div className="font-bold tracking-tight text-lg text-slate-800 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 shadow-inner flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full" />
          </div>
          June Vault
        </div>
        <button 
          onClick={async () => {
             await fetch("/api/logout", { method: "POST" });
             navigate("/");
          }}
          className="text-xs font-semibold text-slate-400 hover:text-slate-800 transition-colors bg-white hover:bg-slate-50 py-2 px-4 rounded-full border border-slate-200"
        >
          Disconnect
        </button>
      </header>
      <main className="p-6 lg:p-12 max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        <Outlet context={{ user: userProfile }} />
      </main>
    </div>
  );
}
