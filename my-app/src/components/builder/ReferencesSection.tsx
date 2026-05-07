"use client";
import { Trash2 } from "lucide-react";
import SecHeader from "./SecHeader";
import type { RefEntry, ResumeData } from "@/types/resume";

interface SectionOps<T> {
  add: () => void;
  remove: (id: number) => void;
  upd: (id: number, f: keyof T, v: string) => void;
}
interface Props {
  resume: ResumeData;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  ops: SectionOps<RefEntry>;
  sectionNum: string;
}

export default function ReferencesSection({
  resume,
  collapsed,
  onToggle,
  ops,
  sectionNum,
}: Props) {
  return (
    <div className="sec-box">
      <SecHeader
        id="refs"
        label="References"
        num={sectionNum}
        collapsed={collapsed}
        onToggle={onToggle}
      />
      {!collapsed["refs"] && (
        <>
          {resume.references.map((r, idx) => (
            <div key={r.id}>
              {idx > 0 && <hr className="entry-divider" />}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-slate-600 font-bold">
                  Reference {idx + 1}
                </span>
                {idx > 0 && (
                  <button className="icon-btn" onClick={() => ops.remove(r.id)}>
                    <Trash2 size={12} color="#f87171" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="di text-xs col-span-2"
                  placeholder="Full Name"
                  value={r.name ?? ""}
                  onChange={(e) => ops.upd(r.id, "name", e.target.value)}
                />
                <input
                  className="di text-xs"
                  placeholder="Job Title"
                  value={r.title ?? ""}
                  onChange={(e) => ops.upd(r.id, "title", e.target.value)}
                />
                <input
                  className="di text-xs"
                  placeholder="Organization"
                  value={r.org ?? ""}
                  onChange={(e) => ops.upd(r.id, "org", e.target.value)}
                />
                <input
                  className="di text-xs"
                  placeholder="Phone"
                  value={r.phone ?? ""}
                  onChange={(e) => ops.upd(r.id, "phone", e.target.value)}
                />
                <input
                  className="di text-xs"
                  placeholder="Email"
                  value={r.email ?? ""}
                  onChange={(e) => ops.upd(r.id, "email", e.target.value)}
                />
              </div>
            </div>
          ))}
          <button className="add-btn" onClick={ops.add}>
            + Add Reference
          </button>
        </>
      )}
    </div>
  );
}
