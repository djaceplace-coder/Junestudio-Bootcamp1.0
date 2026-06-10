import { useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { EducationalGridModule, MultiNodeDiagram, SystemFactoryDiagram, YoutubePipelineDiagram, AppBuilderDiagram, ResourcesVault } from "../components/VaultComponents";

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
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">Master Progression Syllabus • Day 3</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          EARN MORE WITH AI
        </h1>
        <p className="text-xl text-slate-500 font-medium mt-4 max-w-2xl leading-relaxed">
          The Digital Arsenal. <br/>"I can use interconnected tools to create undeniable opportunities and income."
        </p>
      </div>

      <div className="flex flex-col">
        <EducationalGridModule 
          moduleNum={1}
          focus="Tool Interconnectivity"
          title="The Arsenal"
          content="The Golden Triangle: Using Google Sheets as the database, ChatGPT as the creative engine, and Claude as the analytical engine to build a complete business infrastructure."
          visualComponent={<MultiNodeDiagram />}
        />

        <EducationalGridModule 
          moduleNum={2}
          focus="B2B Services"
          title="AI Freelancer & Agency"
          content="Monetizing the setup itself. Selling Prompt Engineering, workflow design, CRM setup, and customer support automation to traditional businesses that are lagging behind."
          visualComponent={<SystemFactoryDiagram />}
        />

        <EducationalGridModule 
          moduleNum={3}
          focus="Ethical Content Systems"
          title="YouTube Automation"
          content="A full breakdown of the pipeline: Niche Research -> Competitor Analysis -> Script Generation -> Voiceovers -> Video Assembly. Taught strictly through the lens of ethical fact-checking and original human value, not spam."
          visualComponent={<YoutubePipelineDiagram />}
        />

        <EducationalGridModule 
          moduleNum={4}
          focus="Digital Assets"
          title="AI Products"
          content="Building and selling standalone tools without code. Creating resume builders, proposal generators, or study planners using n8n, Flowise, and Supabase."
          visualComponent={<AppBuilderDiagram />}
        />
      </div>

      <ResourcesVault />

      <div className="mt-12 text-center pb-20">
         <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Execution Requirement</p>
         <h3 className="text-xl font-bold text-slate-900 mb-6">You have the blueprint. The rest is execution.</h3>
         <Link to="/vault" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-slate-800 transition-colors">
            Exit Vault
         </Link>
      </div>
    </motion.div>
  );
}
