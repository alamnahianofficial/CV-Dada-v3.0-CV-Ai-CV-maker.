"use client";
import { Trash2 } from "lucide-react";
import SecHeader from "./SecHeader";
import type { EduEntry, ResumeData } from "@/types/resume";

interface SectionOps<T> {
  add: () => void;
  remove: (id: number) => void;
  upd: (id: number, f: keyof T, v: string) => void;
}

interface Props {
  resume: ResumeData;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  ops: SectionOps<EduEntry>;
}

export default function EducationSection({
  resume,
  collapsed,
  onToggle,
  ops,
}: Props) {
  return (
    <div className="sec-box">
      <SecHeader
        id="edu"
        label="Education"
        num="3"
        collapsed={collapsed}
        onToggle={onToggle}
      />
      {!collapsed["edu"] && (
        <>
          {resume.education.map((e, idx) => (
            <div key={e.id}>
              {idx > 0 && <hr className="entry-divider" />}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-slate-600 font-bold">
                  Degree {idx + 1}
                </span>
                {idx > 0 && (
                  <button className="icon-btn" onClick={() => ops.remove(e.id)}>
                    <Trash2 size={12} color="#f87171" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="di text-xs col-span-2"
                  placeholder="University / Institution"
                  value={e.institution ?? ""}
                  onChange={(ev) =>
                    ops.upd(e.id, "institution", ev.target.value)
                  }
                />
                <input
                  className="di text-xs col-span-2"
                  placeholder="Degree  e.g. BSc Computer Science"
                  value={e.degree ?? ""}
                  onChange={(ev) => ops.upd(e.id, "degree", ev.target.value)}
                />
                <input
                  className="di text-xs"
                  placeholder="Duration  e.g. 2020 – 2024"
                  value={e.duration ?? ""}
                  onChange={(ev) => ops.upd(e.id, "duration", ev.target.value)}
                />
                <input
                  className="di text-xs"
                  placeholder="CGPA  e.g. 3.75"
                  value={e.cgpa ?? ""}
                  onChange={(ev) => ops.upd(e.id, "cgpa", ev.target.value)}
                />
              </div>
            </div>
          ))}
          <button className="add-btn" onClick={ops.add}>
            + Add Degree
          </button>
        </>
      )}
    </div>
  );
}
