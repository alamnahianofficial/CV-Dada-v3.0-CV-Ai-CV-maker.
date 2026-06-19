"use client";
// ─── AI BUILD MODAL ───────────────────────────────────────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Sparkles } from "lucide-react";

interface Props {
  open: boolean;
  aiBrief: string;
  onChange: (v: string) => void;
  onClose: () => void;
  onGenerate: () => void;
  genStatus: string;
}

const STARTER_PROMPTS = [
  {
    label: "Marketing Manager",
    prompt: "My name is Sarah Connor. I am a Marketing Manager with 5 years of experience. I worked at GrowthCorp (2022-Present) leading digital campaigns, managing a $50k monthly budget, and growing social engagement by 150%. Previously at BrandAgency (2020-2022) as a Marketing Coordinator. Skills: SEO, Google Analytics, Content Strategy, Brand Management, Copywriting.",
  },
  {
    label: "Software Engineer",
    prompt: "My name is Fahim Ahmed. I recently graduated with a B.Sc. in Computer Science. I have academic project experience in React and Python, and completed an internship at SoftDev Ltd. building backend APIs. Skills: Java, Python, React, Next.js, MySQL, Git.",
  },
  {
    label: "Financial Analyst",
    prompt: "My name is David Vance. I am a Financial Analyst with 4 years of experience. Worked at Apex Capital (2022-Present) performing financial forecasting, preparing quarterly investor decks, and optimizing budget portfolios. Previously at Capital Trust (2020-2022). Skills: Excel Modeling, Financial Reporting, Valuation, Market Analysis, SQL.",
  },
  {
    label: "Customer Success",
    prompt: "My name is Maria Islam. I am a Customer Success Specialist with 3 years of experience. Worked at SaaSify (2023-Present) managing 50+ enterprise accounts, maintaining a 95% retention rate, and onboarding clients. Previously at CareCorp (2021-2023). Skills: CRM Tools, Conflict Resolution, Client Onboarding, Cross-functional Collaboration.",
  },
];

export default function AIModal({ open, aiBrief, onChange, onClose, onGenerate, genStatus }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="ai-modal-bg"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={(e) => { if ((e.target as HTMLElement).classList.contains("ai-modal-bg")) onClose(); }}
        >
          <motion.div className="ai-modal" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                <Wand2 size={20} color="#a5b4fc" />
              </div>
              <div>
                <h2 className="text-white font-black text-lg">AI CV Builder</h2>
                <p className="text-slate-500 text-xs">Describe yourself — AI writes your full CV</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm mb-3 leading-relaxed">
              Tell the AI your name, education, work history, skills, etc. It generates a complete professional CV instantly.
            </p>

            {genStatus === "Calling AI…" || genStatus === "Parsing…" ? (
              <div className="flex flex-col items-center justify-center py-10 relative overflow-hidden bg-slate-950/40 rounded-2xl border border-white/5 my-4 min-h-[260px]">
                {/* Glowing ambient dots */}
                <div className="absolute w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />
                
                {/* Sweeping scan light */}
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none"
                />
                
                {/* Rotating scanner ring */}
                <div className="relative mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-16 h-16 rounded-full border border-dashed border-cyan-500/40 flex items-center justify-center"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-cyan-400 animate-pulse" size={24} />
                  </div>
                </div>
                
                <h3 className="text-white font-extrabold text-sm uppercase tracking-widest mb-1.5">{genStatus}</h3>
                <p className="text-slate-500 text-[10px] uppercase tracking-wider animate-pulse">Generating ATS-Optimized CV structure...</p>
              </div>
            ) : (
              <>
                <textarea
                  className="di min-h-20 text-sm mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ minHeight: 180 }}
                  placeholder={"Example:\nMy name is Alex Rahman. I have a degree in Computer Science from BUET (2020–2024, CGPA 3.7). I worked as a junior developer at TechCorp Jan 2024 – Present building React dashboards. Skills: JavaScript, React, Node.js, Python, SQL."}
                  value={aiBrief}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={genStatus === "Calling AI…" || genStatus === "Parsing…"}
                />

                {/* Quick-Prompt Starter Chips */}
                <div className="mb-5">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Starter Prompts
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {STARTER_PROMPTS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => onChange(p.prompt)}
                        disabled={genStatus === "Calling AI…" || genStatus === "Parsing…"}
                        className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-300 font-semibold text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow-indigo-500/5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={genStatus === "Calling AI…" || genStatus === "Parsing…"}
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onGenerate}
                disabled={!aiBrief.trim() || genStatus === "Calling AI…" || genStatus === "Parsing…"}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {genStatus === "Calling AI…" || genStatus === "Parsing…" ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" style={{ width: 14, height: 14 }}>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{genStatus}</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={15} /> Generate My CV
                  </>
                )}
              </button>
            </div>

            {genStatus === "error" && (
              <p className="text-red-400 text-xs mt-3 text-center">Something went wrong. Try again.</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
