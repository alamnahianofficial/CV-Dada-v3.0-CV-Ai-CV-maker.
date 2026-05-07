"use client";
// ─── EXPERIENCE SECTION ───────────────────────────────────────────────────────

import { Loader2, Sparkles, Trash2 } from "lucide-react";
import SecHeader from "./SecHeader";
import type { ExpEntry, ResumeData } from "@/types/resume";

interface SectionOps<T> {
  add: () => void;
  remove: (id: number) => void;
  upd: (id: number, f: keyof T, v: string) => void;
}

interface Props {
  resume: ResumeData;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  ops: SectionOps<ExpEntry>;
  aiLoading: string | null;
  onAiImprove: (text: string, ctx: string, onResult: (v: string) => void, key: string) => void;
}

export default function ExperienceSection({ resume, collapsed, onToggle, ops, aiLoading, onAiImprove }: Props) {
  return (
    <div className="sec-box">
      <SecHeader id="exp" label="Work Experience" num="4" collapsed={collapsed} onToggle={onToggle} />
      {!collapsed["exp"] && (
        <>
          {resume.experience.map((e, idx) => (
            <div key={e.id}>
              {idx > 0 && <hr className="entry-divider" />}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-slate-600 font-bold">Job {idx + 1}</span>
                {idx > 0 && (
                  <button className="icon-btn" onClick={() => ops.remove(e.id)}>
                    <Trash2 size={12} color="#f87171" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input className="di text-xs col-span-2" placeholder="Role / Position"
                  value={e.role} onChange={(ev) => ops.upd(e.id, "role", ev.target.value)} />
                <input className="di text-xs col-span-2" placeholder="Company / Organization"
                  value={e.org} onChange={(ev) => ops.upd(e.id, "org", ev.target.value)} />
                <input className="di text-xs col-span-2" placeholder="Duration  e.g. Jan 2022 – Present"
                  value={e.duration} onChange={(ev) => ops.upd(e.id, "duration", ev.target.value)} />
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                  Responsibilities (one per line)
                </span>
                <button className="aibtn" disabled={!!aiLoading}
                  onClick={() => onAiImprove(e.bullets, "work experience",
                    (v) => ops.upd(e.id, "bullets", v), `exp-${e.id}`)}>
                  {aiLoading === `exp-${e.id}` ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />} AI
                </button>
              </div>
              <textarea className="di min-h-20 text-xs font-mono"
                placeholder="Led team of 5 to deliver…&#10;Reduced load time by 40%…"
                value={e.bullets} onChange={(ev) => ops.upd(e.id, "bullets", ev.target.value)} />
            </div>
          ))}
          <button className="add-btn" onClick={ops.add}>+ Add Job</button>
        </>
      )}
    </div>
  );
}
