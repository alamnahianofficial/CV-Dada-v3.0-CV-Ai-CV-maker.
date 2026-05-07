"use client";

import { useState, useCallback, useRef } from "react";
import { ShieldCheck, Eraser, Sparkles, Upload } from "lucide-react";
import { motion } from "framer-motion";

import type { ResumeData, DocxTemplate } from "@/types/resume";
import {
  initResume,
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
    <div className="min-h-screen bg-[#030712] text-slate-300 font-sans">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-[100] bg-[#030712]/80 backdrop-blur-2xl border-b border-white/5 px-8 h-20 flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative w-11 h-11 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center font-black text-white text-xl font-montserrat">
              D
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white leading-none uppercase font-montserrat">
              CV Dada
            </h1>
            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mt-1.5 opacity-80">
              Built by Nahian Alam
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[3%] border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-indigo-400" /> Private
            Session
          </div>
          <button
            onClick={() => setAiModalOpen(true)}
            className="px-6 py-2.5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2"
          >
            <Sparkles size={14} /> AI Generate
          </button>
        </div>
      </header>

      <main className="flex h-[calc(100vh-80px)]">
        {/* ── EDITOR ── */}
        <aside className="w-full lg:w-[540px] xl:w-[640px] overflow-y-auto border-r border-white/5 bg-[#030712] p-8 space-y-8 scrollbar-hide no-print">
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
        <section className="hidden lg:flex flex-1 bg-[#020617] overflow-auto items-start justify-center p-16 relative">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="origin-top scale-[0.7] xl:scale-[0.8] 2xl:scale-[0.9] shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            <StandardCV resume={resume} photo={photo} template={template} />
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
    </div>
  );
}
