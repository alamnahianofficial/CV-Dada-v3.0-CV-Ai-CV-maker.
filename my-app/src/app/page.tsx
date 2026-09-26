"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Eraser, ArrowRight, FileText, CheckCircle, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717] font-sans overflow-x-hidden relative">
      {/* Floating Translucent Navigation Bar */}
      <nav className="sticky top-0 z-[100] bg-[#fafafa]/80 backdrop-blur-md border-b border-black/5 no-print">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-sm bg-[#171717]"
            >
              D
            </div>
            <span
              className="text-lg font-bold tracking-tight text-[#171717]"
            >
              CV Dada
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#737373]">
            <a href="#mockup" className="hover:text-[#171717] transition-colors">How it works</a>
            <a href="#features" className="hover:text-[#171717] transition-colors">Privacy</a>
            <a href="#features" className="hover:text-[#171717] transition-colors">ATS Safety</a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/builder"
              className="px-5 py-2.5 rounded-lg bg-[#171717] text-white text-sm font-medium hover:bg-[#262626] active:scale-95 transition-all shadow-sm"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Center-Aligned Hero Section */}
      <header className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[#525252] text-xs font-medium mb-8 bg-black/5 border border-black/10"
        >
          <Sparkles size={12} className="text-[#171717]" /> The Cleanest ATS-Safe CV Engine
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold text-[#171717] leading-[1.05] tracking-tight mb-6"
        >
          A better way to build
          <br />
          <span className="text-slate-400">
            your professional resume.
          </span>
        </motion.h1>


        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="text-lg md:text-xl text-[#737373] max-w-2xl mx-auto mb-10 leading-relaxed font-inter"
        >
          Generate ATS-optimized resumes in minutes with AI.{" "}
          <span>No accounts, no tracking — completely private.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/builder"
            className="group flex items-center justify-center gap-2 px-8 py-4 text-white bg-[#171717] rounded-xl font-medium text-base transition-all hover:bg-[#262626] w-full sm:w-auto shadow-sm"
          >
            Start Building
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
          <a
            href="#mockup"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-black/10 bg-white hover:bg-black/5 transition-all text-[#171717] text-base font-medium w-full sm:w-auto"
          >
            See How it Works
          </a>
        </motion.div>
      </header>

      {/* Asymmetric Bento Grid Features Section */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Zero Data Footprint */}
          <div className="md:col-span-2 rounded-2xl border border-black/10 bg-white p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#171717] mt-1 mb-3">Zero Database Footprint</h3>
                <p className="text-sm text-[#737373] leading-relaxed max-w-md">
                  We collect no data. Your input forms exist entirely inside your browser's active window memory. Once you close the tab, the workspace clears permanently.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-black/5 text-[#171717] flex-shrink-0">
                <Eraser size={20} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-black/5 text-sm text-[#525252]">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#171717]" />
                <span>No trackers or cookies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#171717]" />
                <span>No signup or login required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#171717]" />
                <span>No remote file uploads stored</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#171717]" />
                <span>Local PDF parsing logic</span>
              </div>
            </div>
          </div>

          {/* Card 2: ATS Scanner Validation */}
          <div className="rounded-2xl border border-black/10 bg-white p-8 flex flex-col justify-between shadow-sm">
            <div className="mb-6">
              <div className="p-3 rounded-xl bg-black/5 text-[#171717] w-fit mb-5">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#171717] mt-1 mb-2">ATS Validation</h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Bypasses modern automated machine filters. 100% font compatibility and layout structural scanning logic guarantees high compatibility scores.
              </p>
            </div>
          </div>

          {/* Card 3: AI Enhancement */}
          <div className="rounded-2xl border border-black/10 bg-white p-8 flex flex-col justify-between shadow-sm">
            <div className="mb-6">
              <div className="p-3 rounded-xl bg-black/5 text-[#171717] w-fit mb-5">
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#171717] mt-1 mb-2">Gemini AI</h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Generate tailored bullet points, experience summaries, and skill keywords derived directly from your target job description.
              </p>
            </div>
          </div>

          {/* Card 4: Word & Document Export */}
          <div className="md:col-span-2 rounded-2xl border border-black/10 bg-white p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#171717] mt-1 mb-3">Office Word Export</h3>
                <p className="text-sm text-[#737373] leading-relaxed max-w-md">
                  Export directly to native Microsoft Word (.docx) format using the exact styles and parameters of the classic resume structures. Fully editable in Word or Docs.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-black/5 text-[#171717] flex-shrink-0">
                <FileText size={20} />
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#525252] border-t border-black/5 pt-6">
              <Smartphone className="text-[#171717]" size={16} />
              <span>Full responsive template adjustments and mobile preview controls included.</span>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer
        className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 border-t border-black/5"
      >
        <p className="text-[#737373] text-sm font-medium">
          © 2026 CV Dada
        </p>
        <div className="text-sm text-[#525252] flex items-center gap-2 font-medium">
          <span>Obsidian Aurora Design</span>
          <span>·</span>
          <span>100% Free & Secure</span>
        </div>
      </footer>
    </div>
  );
}
