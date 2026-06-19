"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ShieldCheck, Eraser, Sparkles, Upload, Edit3, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import type { ResumeData, DocxTemplate } from "@/types/resume";
import {
  initResume,
  demoResume,
  blankEdu,
  blankExp,
  blankProj,
  blankThesis,
  blankSkill,
  blankCert,
  blankRef,
  blankExtra,
} from "@/lib/resumeDefaults";
import { exportDocx } from "@/lib/docxExport";
import { aiImprove, generateCVWithAI } from "@/lib/aiHelpers";

import StandardCV from "@/components/StandardCV";
import DocxTemplateSelector from "@/components/builder/DocxTemplateSelector";
import ATSChecker from "@/components/builder/ATSChecker";
import AISuggestions from "@/components/builder/AISuggestions";
import AIModal from "@/components/builder/AIModal";
import CVImport from "@/components/builder/CVImport";
import PhotoUpload from "@/components/builder/PhotoUpload";
import PersonalSection from "@/components/builder/PersonalSection";
import SummarySection from "@/components/builder/SummarySection";
import EducationSection from "@/components/builder/EducationSection";
import ExperienceSection from "@/components/builder/ExperienceSection";
import {
  ProjectsSection,
  ThesisSection,
} from "@/components/builder/ProjectsSection";
import SkillsSection from "@/components/builder/SkillsSection";
import CertificationsSection from "@/components/builder/CertificationsSection";
import ReferencesSection from "@/components/builder/ReferencesSection";
import ExtrasSection from "@/components/builder/ExtrasSection";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function makeArrayOps<T extends { id: number }>(
  key: keyof ResumeData,
  blank: () => T,
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>,
) {
  return {
    add: () =>
      setResume((r) => ({
        ...r,
        [key]: [...(r[key] as unknown as T[]), blank()],
      })),
    remove: (id: number) =>
      setResume((r) => ({
        ...r,
        [key]: (r[key] as unknown as T[]).filter((x) => x.id !== id),
      })),
    upd: (id: number, field: keyof T, value: string) =>
      setResume((r) => ({
        ...r,
        [key]: (r[key] as unknown as T[]).map((x) =>
          x.id === id ? { ...x, [field]: value } : x,
        ),
      })),
  };
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BuilderPage() {
  const [resume, setResume] = useState<ResumeData>(initResume);
  const [photo, setPhoto] = useState<string | null>(null);
  const [template, setTemplate] = useState<DocxTemplate>("classic");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiBrief, setAiBrief] = useState("");
  const [genStatus, setGenStatus] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [introLoading, setIntroLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIntroLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);
  const previewRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);
  const [previewHeight, setPreviewHeight] = useState(1123);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      
      const targetWidth = 794;
      const padding = window.innerWidth < 640 ? 16 : window.innerWidth < 1024 ? 32 : 64;
      const availableWidth = width - padding;
      
      let newScale = 0.8;
      if (availableWidth < targetWidth) {
        newScale = Math.max(0.35, availableWidth / targetWidth);
      } else {
        if (window.innerWidth >= 1536) {
          newScale = 0.9;
        } else if (window.innerWidth >= 1280) {
          newScale = 0.8;
        } else {
          newScale = 0.7;
        }
      }
      setScale(newScale);

      if (previewRef.current) {
        setPreviewHeight(previewRef.current.clientHeight);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    if (previewRef.current) {
      observer.observe(previewRef.current);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [resume, photo, template]);

  // Ref for synchronous genStatus read after await
  const genStatusRef = useRef("");
  const setGenStatusSafe = useCallback((val: string) => {
    genStatusRef.current = val;
    setGenStatus(val);
  }, []);

  const onToggle = useCallback(
    (id: string) => setCollapsed((c) => ({ ...c, [id]: !c[id] })),
    [],
  );
  const setField = useCallback(
    (f: keyof ResumeData, v: string) => setResume((r) => ({ ...r, [f]: v })),
    [],
  );

  const onAiImprove = useCallback(
    (text: string, ctx: string, onResult: (v: string) => void, key: string) =>
      aiImprove(text, ctx, onResult, setAiLoading, key),
    [],
  );

  const handleExport = async () => {
    setExporting(true);
    setExportError(null);
    try {
      await exportDocx(resume, photo, template);
    } catch (err) {
      setExportError(err instanceof Error ? err.message : "Export failed.");
    } finally {
      setExporting(false);
    }
  };

  const handleGenerate = async () => {
    setGenStatusSafe("");
    await generateCVWithAI(aiBrief, setResume, setGenStatusSafe);
    if (genStatusRef.current !== "error") setAiModalOpen(false);
  };

  // ─── OPS ──────────────────────────────────────────────────────────────────
  const eduOps = makeArrayOps("education", blankEdu, setResume);
  const expOps = makeArrayOps("experience", blankExp, setResume);
  const skillOps = makeArrayOps("skills", blankSkill, setResume);
  const certOps = makeArrayOps("certifications", blankCert, setResume);
  const refOps = makeArrayOps("references", blankRef, setResume);
  const extraOps = makeArrayOps("extras", blankExtra, setResume);

  const projOps = {
    add: () =>
      setResume((r) => ({ ...r, projects: [...r.projects, blankProj()] })),
    addThesis: () =>
      setResume((r) => ({ ...r, projects: [...r.projects, blankThesis()] })),
    remove: (id: number) =>
      setResume((r) => ({
        ...r,
        projects: r.projects.filter((p) => p.id !== id),
      })),
    upd: (id: number, field: string, value: string) =>
      setResume((r) => ({
        ...r,
        projects: r.projects.map((p) =>
          p.id === id ? { ...p, [field]: value } : p,
        ),
      })),
  };

  return (
    <>
      <AnimatePresence>
        {introLoading && <IntroWelcomeScreen />}
      </AnimatePresence>
      <div className="min-h-screen bg-[#030712] text-slate-200 font-sans relative overflow-x-hidden">
      {/* Background Aurora lighting */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-[100] bg-[#030712]/80 backdrop-blur-2xl border-b border-white/5 px-4 sm:px-8 h-20 flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative w-11 h-11 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center font-black text-white text-xl font-montserrat shadow-md">
              D
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent leading-none uppercase font-montserrat">
              CV Dada
            </h1>
            <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.25em] mt-1.5 opacity-80">
              Built by Nahian Alam
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[3%] border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-cyan-400" /> Private
            Session
          </div>
          {/* Powered by Gemini badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-[rgba(66,133,244,0.25)] bg-[rgba(66,133,244,0.06)] hover:border-[rgba(66,133,244,0.4)] hover:bg-[rgba(66,133,244,0.1)] transition-all duration-300 cursor-default group">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M12 2L13.9 8.1L20 10L13.9 11.9L12 18L10.1 11.9L4 10L10.1 8.1L12 2Z" fill="url(#gemini-grad)" />
              <defs>
                <linearGradient id="gemini-grad" x1="4" y1="2" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4285F4" />
                  <stop offset="0.5" stopColor="#9C27B0" />
                  <stop offset="1" stopColor="#EA4335" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(90deg, #4285F4, #9C27B0, #EA4335)'}}>
              Powered by Gemini
            </span>
          </div>
          <button
            onClick={() => setAiModalOpen(true)}
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01] active:scale-100 transition-all flex items-center gap-2 border-0 cursor-pointer shadow-md"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>
              <span className="hidden sm:inline">AI Generate</span>
              <span className="sm:hidden">AI Gen</span>
            </span>
          </button>
        </div>
      </header>

      <main className="flex h-[calc(100vh-80px)] relative">
        {/* ── EDITOR ── */}
        <aside className={`w-full lg:w-[540px] xl:w-[640px] overflow-y-auto border-r border-white/5 bg-[#030712] p-6 sm:p-8 space-y-8 scrollbar-hide no-print ${
          activeTab === "edit" ? "block" : "hidden lg:block"
        }`}>
          <div className="max-w-2xl mx-auto space-y-5 pb-24">
            <DocxTemplateSelector
              selected={template}
              onChange={setTemplate}
              onExport={handleExport}
              exporting={exporting}
            />

            {exportError && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#f87171",
                  fontSize: 11,
                }}
              >
                ⚠ {exportError}
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setResume(demoResume());
                }}
                className="py-3 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-cyan-500/10"
              >
                <Sparkles size={14} className="text-cyan-400" />
                Load Sample CV
              </button>
              <button
                onClick={() => {
                  setResume(initResume());
                  setPhoto(null);
                }}
                className="py-3 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-red-500/5"
              >
                <Eraser size={14} className="text-red-400" />
                Clear Form
              </button>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 text-[10px] italic">
              <Eraser size={13} />
              <span>
                Session Mode: data clears on refresh. CV Dada · Built by Nahian
                Alam.
              </span>
            </div>

            {/* CV Import */}
            <CVImport setResume={setResume} />

            <ATSChecker resume={resume} />

            {/* Job description for AI suggestions */}
            <div className="space-y-2">
              <div className="sec-label">
                Target Job Description (for AI suggestions)
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here…"
                rows={3}
                className="di text-xs"
                style={{ resize: "vertical" }}
              />
            </div>
            <AISuggestions resume={resume} jobDescription={jobDescription} />

            <PhotoUpload photo={photo} setPhoto={setPhoto} />

            <div className="space-y-4">
              <PersonalSection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                setField={setField}
              />
              <SummarySection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                setField={setField}
                aiLoading={aiLoading}
                onAiImprove={onAiImprove}
              />
              <EducationSection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                ops={eduOps}
              />
              <ExperienceSection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                ops={expOps}
                aiLoading={aiLoading}
                onAiImprove={onAiImprove}
              />
              <ProjectsSection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                ops={projOps}
                aiLoading={aiLoading}
                onAiImprove={onAiImprove}
              />
              <ThesisSection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                ops={projOps}
                aiLoading={aiLoading}
                onAiImprove={onAiImprove}
              />
              <SkillsSection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                ops={skillOps}
                sectionNum="skills"
              />
              <CertificationsSection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                ops={certOps}
                sectionNum="certifications"
              />
              <ReferencesSection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                ops={refOps}
                sectionNum="references"
              />
              <ExtrasSection
                resume={resume}
                collapsed={collapsed}
                onToggle={onToggle}
                ops={extraOps}
                sectionNum="extras"
              />
            </div>
          </div>
        </aside>

        {/* ── PREVIEW ── */}
        <section
          ref={containerRef}
          className={`flex-1 bg-[#020617] overflow-auto items-start justify-center p-4 sm:p-8 lg:p-16 relative no-print ${
            activeTab === "preview" ? "flex" : "hidden lg:flex"
          }`}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              width: `${794 * scale}px`,
              height: `${previewHeight * scale}px`,
              minHeight: `${297 * 3.78 * scale}px`,
            }}
            className="origin-top shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden"
          >
            <div
              ref={previewRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: "794px",
                height: "auto",
                minHeight: "1123px",
              }}
            >
              <StandardCV resume={resume} photo={photo} template={template} />
            </div>
          </motion.div>
        </section>
      </main>

      <AIModal
        open={aiModalOpen}
        aiBrief={aiBrief}
        onChange={setAiBrief}
        onClose={() => setAiModalOpen(false)}
        onGenerate={handleGenerate}
        genStatus={genStatus}
      />

      {/* ── MOBILE NAVIGATION TAB BAR ── */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 rounded-full p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] no-print">
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border-0 cursor-pointer ${
            activeTab === "edit"
              ? "bg-linear-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25"
              : "text-slate-400 hover:text-slate-200 bg-transparent"
          }`}
        >
          <Edit3 size={12} />
          <span>Edit Form</span>
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border-0 cursor-pointer ${
            activeTab === "preview"
              ? "bg-linear-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25"
              : "text-slate-400 hover:text-slate-200 bg-transparent"
          }`}
        >
          <Eye size={12} />
          <span>Preview CV</span>
        </button>
      </div>
    </div>
    </>
  );
}

function IntroWelcomeScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#030712",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      {/* Ambient background glows */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {/* Glowing Logo Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "relative",
            width: 90,
            height: 90,
            borderRadius: 24,
            background: "linear-gradient(135deg,#06b6d4,#6366f1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(6,182,212,0.3)"
          }}
        >
          {/* Animated spinning outline ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: 27,
              border: "1px dashed rgba(6,182,212,0.4)"
            }}
          />
          <span style={{ fontSize: 42, fontWeight: 950, color: "#fff", fontFamily: "Montserrat, sans-serif" }}>D</span>
        </motion.div>

          {/* Brand Name */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: 24,
              fontWeight: 950,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              fontFamily: "Montserrat, sans-serif",
              margin: 0,
              marginTop: 8,
              color: "#fff"
            }}
          >
            CV Dada
          </motion.h2>

          {/* Version 3.0 Badge with pulsing glow */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              background: "rgba(6,182,212,0.12)",
              border: "1px solid rgba(6,182,212,0.3)",
              borderRadius: 30,
              padding: "5px 14px",
              fontSize: 10,
              fontWeight: 900,
              color: "#06b6d4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(6,182,212,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#06b6d4", display: "inline-block" }} className="animate-ping" />
            Version 3.0
          </motion.div>
        </div>

        {/* Progress Line */}
        <div style={{ position: "absolute", bottom: 64, width: 200, height: 2, background: "rgba(255,255,255,0.03)", borderRadius: 2, overflow: "hidden" }}>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #06b6d4, #6366f1)" }}
          />
        </div>
      </motion.div>
  );
}
