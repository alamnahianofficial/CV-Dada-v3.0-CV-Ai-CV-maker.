"use client";
// ─── ADDITIONAL INFO (EXTRAS) SECTION ────────────────────────────────────────

import { Trash2 } from "lucide-react";
import SecHeader from "./SecHeader";
import type { ExtraEntry, ResumeData } from "@/types/resume";

interface SectionOps<T> {
  add: () => void;
  remove: (id: number) => void;
  upd: (id: number, f: keyof T, v: string) => void;
}

interface Props {
  resume: ResumeData;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  ops: SectionOps<ExtraEntry>;
  sectionNum: string;
}

export default function ExtrasSection({ resume, collapsed, onToggle, ops, sectionNum }: Props) {
  return (
    <div className="sec-box pb-6">
      <SecHeader id="extra" label="Additional Info" num={sectionNum} collapsed={collapsed} onToggle={onToggle} />
      {!collapsed["extra"] && (
        <>
          {resume.extras.map((e, idx) => (
            <div key={e.id} className="flex gap-2 mb-2 items-center">
              <input className="di text-xs" style={{ maxWidth: 150 }} placeholder="Label"
                value={e.label} onChange={(ev) => ops.upd(e.id, "label", ev.target.value)} />
              <input className="di text-xs flex-1" placeholder="Value"
                value={e.value} onChange={(ev) => ops.upd(e.id, "value", ev.target.value)} />
              {idx > 0 && (
                <button className="icon-btn" onClick={() => ops.remove(e.id)}>
                  <Trash2 size={12} color="#f87171" />
                </button>
              )}
            </div>
          ))}
          <button className="add-btn" onClick={ops.add}>+ Add Row</button>
        </>
      )}
    </div>
  );
}
