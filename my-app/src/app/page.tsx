"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Eraser, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
          >
            D
          </div>
          <span
            className="text-2xl font-black tracking-tighter text-white"
            style={{ fontFamily: "Montserrat,sans-serif" }}
          >
            CV Dada
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            Architected by
          </span>
          <span className="text-sm font-black text-indigo-400 tracking-tight">
            Nahian Alam
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-indigo-400 text-xs font-bold mb-8"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <Sparkles size={14} /> The Ultimate ATS-Safe CV Engine
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.85] mb-8 tracking-tighter">
              Precision built.
              <br />
              <span style={{ color: "#4f46e5" }}>Privacy first.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-md leading-relaxed">
              Create professional, ATS-optimized resumes in minutes. No
              tracking, no accounts, no data collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/builder"
                className="group flex items-center justify-center gap-2 px-8 py-4 text-white rounded-2xl font-bold text-lg transition-all shadow-lg"
                style={{ background: "#4f46e5" }}
              >
                Start Building{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <div
                className="flex items-center gap-3 px-6 py-4 rounded-2xl"
                style={{
                  border: "1px solid #1e293b",
                  background: "rgba(15,23,42,0.5)",
                }}
              >
                <ShieldCheck className="text-emerald-500" size={20} />
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-wider">
                  100% Safe · No Database
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500 italic text-sm">
              <Eraser size={16} />
              <span>
                Session-based: refresh the page and all data is gone forever.
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-4 rounded-full pointer-events-none"
              style={{
                background: "rgba(99,102,241,0.08)",
                filter: "blur(60px)",
              }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              <div
                className="p-8 rounded-[2rem] hover:border-slate-700 transition-colors"
                style={{
                  border: "1px solid #1e293b",
                  background: "rgba(15,23,42,0.3)",
                }}
              >
                <div
                  className="mb-4 p-3 rounded-2xl w-fit"
                  style={{ background: "rgba(30,41,59,0.5)" }}
                >
                  <ShieldCheck className="text-indigo-400" size={22} />
                </div>
                <h3 className="text-white font-bold mb-2">ATS Reality Check</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Engineered to bypass strict machine filters with 100%
                  readability.
                </p>
              </div>
              <div
                className="p-8 rounded-[2rem] hover:border-slate-700 transition-colors"
                style={{
                  border: "1px solid #1e293b",
                  background: "rgba(15,23,42,0.3)",
                }}
              >
                <div
                  className="mb-4 p-3 rounded-2xl w-fit"
                  style={{ background: "rgba(30,41,59,0.5)" }}
                >
                  <Zap className="text-yellow-400" size={22} />
                </div>
                <h3 className="text-white font-bold mb-2">AI Intelligence</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Instant suggestions powered by Nvidia Nemotron AI.
                </p>
              </div>
              <div
                className="sm:col-span-2 p-8 rounded-[2rem]"
                style={{
                  border: "1px solid #1e293b",
                  background: "rgba(15,23,42,0.4)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">
                      Zero Data Footprint
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                      Your CV is processed entirely in your browser session.
                      Once you close the tab, your data vanishes permanently.
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: "rgba(239,68,68,0.1)" }}
                  >
                    <Eraser className="text-red-500" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer
        className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6"
        style={{ borderTop: "1px solid #0f172a" }}
      >
        <p className="text-slate-500 text-sm">
          © 2026 CV Dada · Hand-crafted by{" "}
          <span className="text-slate-300 font-bold">Nahian Alam</span>
        </p>
      </footer>
    </div>
  );
}
