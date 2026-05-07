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

            <textarea
              className="di min-h-20 text-sm mb-4"
              style={{ minHeight: 180 }}
              placeholder={"Example:\nMy name is Alex Rahman. I have a degree in Computer Science from BUET (2020–2024, CGPA 3.7). I worked as a junior developer at TechCorp Jan 2024 – Present building React dashboards. Skills: JavaScript, React, Node.js, Python, SQL."}
              value={aiBrief}
              onChange={(e) => onChange(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 text-sm font-semibold hover:border-slate-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onGenerate}
                disabled={!aiBrief.trim()}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles size={15} /> Generate My CV
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
