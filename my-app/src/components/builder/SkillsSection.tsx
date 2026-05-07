"use client";
// ─── SKILLS SECTION ───────────────────────────────────────────────────────────

import { Trash2 } from "lucide-react";
import SecHeader from "./SecHeader";
import type { SkillEntry, ResumeData } from "@/types/resume";

interface SectionOps<T> {
  add: () => void;
  remove: (id: number) => void;
  upd: (id: number, f: keyof T, v: string) => void;
}

interface Props {
  resume: ResumeData;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  ops: SectionOps<SkillEntry>;
  sectionNum: string;
}

export default function SkillsSection({ resume, collapsed, onToggle, ops, sectionNum }: Props) {
  return (
    <div className="sec-box">
      <SecHeader id="skills" label="Skills" num={sectionNum} collapsed={collapsed} onToggle={onToggle} />
      {!collapsed["skills"] && (
        <>
          <p className="text-[10px] text-slate-600 mb-2">Category: list of skills on each row</p>
          {resume.skills.map((s, idx) => (
            <div key={s.id} className="flex gap-2 mb-2 items-center">
              <input className="di text-xs" style={{ maxWidth: 130 }} placeholder="e.g. Languages"
                value={s.category} onChange={(e) => ops.upd(s.id, "category", e.target.value)} />
              <input className="di text-xs flex-1" placeholder="Python, React, Docker…"
                value={s.skills} onChange={(e) => ops.upd(s.id, "skills", e.target.value)} />
              {idx > 0 && (
                <button className="icon-btn" onClick={() => ops.remove(s.id)}>
                  <Trash2 size={12} color="#f87171" />
                </button>
              )}
            </div>
          ))}
          <button className="add-btn" onClick={ops.add}>+ Add Category</button>
        </>
      )}
    </div>
  );
}
