"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Eraser, ArrowRight, FileText, CheckCircle, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans overflow-x-hidden relative">
      {/* Cinematic Spotlight Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] left-1/3 w-[600px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-1/4 w-[700px] h-[600px] bg-purple-500/5 blur-[200px] rounded-full pointer-events-none" />

      {/* Floating Translucent Navigation Bar */}
      <nav className="sticky top-0 z-[100] bg-[#030712]/75 backdrop-blur-md border-b border-white/5 no-print">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg relative group overflow-hidden"
              style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)" }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              D
            </div>
            <span
              className="text-xl font-black tracking-tighter text-white uppercase bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent"
              style={{ fontFamily: "Montserrat,sans-serif" }}
            >
              CV Dada
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-400">
            <a href="#mockup" className="hover:text-white transition-colors">How it works</a>
            <a href="#features" className="hover:text-white transition-colors">Privacy first</a>
            <a href="#features" className="hover:text-white transition-colors">ATS Safety</a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/builder"
              className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-slate-100 active:scale-98 transition-all shadow-md shadow-white/5"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Center-Aligned Hero Section */}
      <header className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-cyan-400 text-[10px] uppercase tracking-widest font-black mb-8 bg-cyan-950/30 border border-cyan-800/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
          <Sparkles size={12} className="animate-pulse" /> The Ultimate ATS-Safe CV Engine
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8"
        >
          The Resume Engine.
          <br />
          <span className="bg-linear-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Refined to perfection.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-inter"
        >
          Build high-fidelity, ATS-optimized professional resumes in minutes. 
          No accounts, no tracking, no database storage. Operates 100% locally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/builder"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_8px_30px_rgba(6,182,212,0.35)] overflow-hidden w-full sm:w-auto"
            style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            Build My Resume Now
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </Link>
          <a
            href="#mockup"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/5 bg-slate-950/40 hover:bg-slate-900/40 backdrop-blur-md transition-all text-slate-300 text-lg font-semibold w-full sm:w-auto"
          >
            See How it Works
          </a>
        </motion.div>
      </header>

      {/* Simulated Live Editor Mockup Section */}
      <section id="mockup" className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="absolute -inset-1.5 bg-linear-to-r from-cyan-500 to-indigo-500 rounded-3xl blur opacity-20" />
        <div className="relative bg-[#020617]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-lg">
          {/* OS Window Chrome Controls */}
          <div className="bg-slate-950 border-b border-white/5 px-4 py-3.5 flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4 font-montserrat">
              CV Dada Workspace Simulated Live Preview
            </div>
          </div>

          {/* Desktop Inner Grid */}
          <div className="grid md:grid-cols-5 h-[400px]">
            {/* Mock Editor Sidebar */}
            <div className="md:col-span-2 border-r border-white/5 p-6 flex flex-col justify-center space-y-5 bg-[#030712]/50">
              <div className="space-y-1">
                <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">Section 1</span>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">Personal Info</h4>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                  <div className="w-full bg-[#020617] border border-white/5 px-3 py-2 rounded-lg text-xs text-slate-300 h-8 flex items-center">
                    <span className="mock-type-name text-cyan-400 font-semibold" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Target Role</label>
                  <div className="w-full bg-[#020617] border border-white/5 px-3 py-2 rounded-lg text-xs text-slate-300 h-8 flex items-center">
                    <span className="mock-type-role text-indigo-400 font-semibold" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Preview Page Canvas */}
            <div className="md:col-span-3 bg-[#020617] p-8 flex items-center justify-center relative overflow-hidden">
              {/* Glow Behind Mock Page */}
              <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
              
              <div className="w-[300px] h-[340px] bg-white rounded-lg shadow-xl p-6 flex flex-col justify-start relative text-slate-900 border border-slate-200">
                {/* Header Line */}
                <div className="border-b-2 border-slate-900 pb-2 mb-4">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide min-h-5 flex items-center">
                    <span className="mock-preview-val mock-type-name font-black tracking-tight" />
                  </h3>
                  <p className="text-[9px] text-cyan-700 font-bold uppercase min-h-4 flex items-center">
                    <span className="mock-preview-val mock-type-role" />
                  </p>
                </div>
                
                {/* Dummy Page Content Mock Blocks */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-1/3 bg-slate-900 rounded-xs" />
                    <div className="space-y-1">
                      <div className="h-1 w-full bg-slate-300 rounded-xs" />
                      <div className="h-1 w-5/6 bg-slate-300 rounded-xs" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-1/4 bg-slate-900 rounded-xs" />
                    <div className="space-y-1">
                      <div className="h-1 w-full bg-slate-300 rounded-xs" />
                      <div className="h-1 w-4/5 bg-slate-300 rounded-xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Grid Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-cyan-400 mb-3 font-montserrat">Architecture</h2>
          <p className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Engineered differently.<br/>
            Prioritizing what recruiters seek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Zero Data Footprint (Bento Large Double Width) */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-[2rem] border border-white/5 bg-slate-950/20 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/20">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-500" />
            
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Privacy Engineering</span>
                <h3 className="text-2xl font-black text-white mt-1 mb-3">Zero Database Footprint</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                  We collect no data. Your input forms exist entirely inside your browser's active window memory context. Once you close the tab, the workspace clears permanently.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-red-950/15 border border-red-500/10 text-red-400 flex-shrink-0">
                <Eraser size={22} className="animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-cyan-400 flex-shrink-0" />
                <span>No trackers or cookies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-cyan-400 flex-shrink-0" />
                <span>No signup or login required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-cyan-400 flex-shrink-0" />
                <span>No remote file uploads stored</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-cyan-400 flex-shrink-0" />
                <span>Local PDF parsing logic</span>
              </div>
            </div>
          </div>

          {/* Card 2: ATS Scanner Validation (Bento Small) */}
          <div className="relative group overflow-hidden rounded-[2rem] border border-white/5 bg-slate-950/20 backdrop-blur-md p-8 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/20">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />
            
            <div className="mb-6">
              <div className="p-3.5 rounded-2xl bg-indigo-950/15 border border-indigo-500/10 text-indigo-400 w-fit mb-4">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Recruiter Ready</span>
              <h3 className="text-xl font-black text-white mt-1 mb-2">ATS Validation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bypasses modern automated machine filters. 100% font compatibility and layout structural scanning logic guarantees high compatibility scores.
              </p>
            </div>

            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1">
              Verify compatibility score &rarr;
            </div>
          </div>

          {/* Card 3: AI Enhancement (Bento Small) */}
          <div className="relative group overflow-hidden rounded-[2rem] border border-white/5 bg-slate-950/20 backdrop-blur-md p-8 flex flex-col justify-between transition-all duration-300 hover:border-purple-500/20">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />
            
            <div className="mb-6">
              <div className="p-3.5 rounded-2xl bg-purple-950/15 border border-purple-500/10 text-pink-400 w-fit mb-4">
                <Zap size={20} />
              </div>
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Co-pilot</span>
              <h3 className="text-xl font-black text-white mt-1 mb-2">Nemotron AI</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generate tailored bullet points, experience summaries, and skill keywords derived directly from your target job description.
              </p>
            </div>

            <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-1">
              Improve experience inputs &rarr;
            </div>
          </div>

          {/* Card 4: Word & Document Export (Bento Large Double Width) */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-[2rem] border border-white/5 bg-slate-950/20 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/20">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />
            
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest">Outputs</span>
                <h3 className="text-2xl font-black text-white mt-1 mb-3">Office Word Export</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                  Export directly to native Microsoft Word (.docx) format using the exact styles and parameters of the classic resume structures. Fully editable in Word or Docs.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-cyan-950/15 border border-cyan-500/10 text-cyan-400 flex-shrink-0">
                <FileText size={22} />
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 border-t border-white/5 pt-4">
              <Smartphone className="text-cyan-400" size={14} />
              <span>Full responsive template adjustments and mobile preview controls included.</span>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer
        className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-slate-500 text-sm">
          © 2026 CV Dada · Hand-crafted by{" "}
          <span className="text-slate-300 font-bold">Nahian Alam</span>
        </p>
        <div className="text-xs text-slate-600 flex items-center gap-2">
          <span>Obsidian Aurora Design</span>
          <span>·</span>
          <span>100% Free & Secure</span>
        </div>
      </footer>
    </div>
  );
}
