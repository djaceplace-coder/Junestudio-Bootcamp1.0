import { useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { EducationalGridModule, LoopDiagram, ApiDiagram, SmeAutomationDiagram, SystemFactoryDiagram } from "../components/VaultComponents";

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col max-w-[90vw] md:max-w-6xl mx-auto w-full px-4 md:px-0 py-8 md:py-12 overflow-x-hidden min-h-screen"
    >
      <div className="mb-12">
        <Link to="/vault" className="text-sm font-bold text-slate-400 flex items-center gap-2 w-fit hover:text-[#0055FF] transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" /> Back to Base
        </Link>
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">Master Progression Syllabus • Day 2</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          WORK BETTER WITH AI
        </h1>
        <p className="text-xl text-slate-500 font-medium mt-4 max-w-2xl leading-relaxed">
          The Structural Foundation. <br/>"I can automate repetitive work and build cybernetic, self-regulating systems."
        </p>
      </div>

      <div className="flex flex-col">
        <EducationalGridModule 
          moduleNum={1}
          focus="Operational Ergonomics"
          title="Balance & Action"
          content="'Hustle' is manual energy fighting chaos. We build self-regulating loops. Spend two hours building an automation today to buy back hundreds of hours of peace tomorrow."
          visualComponent={<LoopDiagram />}
        />

        <EducationalGridModule 
          moduleNum={2}
          focus="Workflows"
          title="The API Mindset"
          content="Demystifying APIs. An API is just a digital waiter taking an order from WhatsApp and bringing it to the kitchen (Google Sheets). No coding required."
          visualComponent={<ApiDiagram />}
        />

        <EducationalGridModule 
          moduleNum={3}
          focus="SME Automation"
          title="Monetization Layer"
          content="This is the efficiency layer. How a local fashion brand routes an Instagram DM to a lead capture form, directly into a Google Sheet, triggering an automated WhatsApp follow-up."
          visualComponent={<SmeAutomationDiagram />}
        />

        <EducationalGridModule 
          moduleNum={4}
          focus="Business Systems"
          title="Industry Workflows"
          content="Real Estate (Lead -> Form -> Sheet -> Agent Alert). Agency Operations (Client Brief -> AI Analysis -> Task Assignment -> Reporting). All managed seamlessly from a mobile command center."
          visualComponent={<SystemFactoryDiagram />}
        />
      </div>

      <div className="mt-12 text-center pb-20">
         <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Execution Requirement</p>
         <h3 className="text-xl font-bold text-slate-900 mb-6">Build your first trigger and return to base.</h3>
         <Link to="/vault" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-slate-800 transition-colors">
            End Session
         </Link>
      </div>
    </motion.div>
  );
}
