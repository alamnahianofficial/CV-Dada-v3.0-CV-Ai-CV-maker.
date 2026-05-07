"use client";
// ─── SUMMARY SECTION ──────────────────────────────────────────────────────────

import { Loader2, Sparkles } from "lucide-react";
import SecHeader from "./SecHeader";
import type { ResumeData } from "@/types/resume";

interface Props {
  resume: ResumeData;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  setField: (f: keyof ResumeData, v: string) => void;
  aiLoading: string | null;
  onAiImprove: (text: string, ctx: string, onResult: (v: string) => void, key: string) => void;
}

export default function SummarySection({ resume, collapsed, onToggle, setField, aiLoading, onAiImprove }: Props) {
  return (
    <div className="sec-box">
      <div className="flex items-center justify-between">
        <SecHeader id="summary" label="Professional Summary" num="2" collapsed={collapsed} onToggle={onToggle} />
        <button
          className="aibtn mb-3 ml-2 shrink-0"
          disabled={!!aiLoading}
          onClick={() => onAiImprove(resume.summary, "professional summary", (v) => setField("summary", v), "summary")}
        >
          {aiLoading === "summary" ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />} AI
        </button>
      </div>
      {!collapsed["summary"] && (
        <textarea
          className="di min-h-20 text-xs"
          placeholder="Write a 2–4 sentence professional profile…"
          value={resume.summary}
          onChange={(e) => setField("summary", e.target.value)}
        />
      )}
    </div>
  );
}
