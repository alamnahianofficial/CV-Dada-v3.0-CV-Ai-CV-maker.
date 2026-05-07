"use client";
import { Trash2 } from "lucide-react";
import SecHeader from "./SecHeader";
import type { CertEntry, ResumeData } from "@/types/resume";

interface SectionOps<T> {
  add: () => void;
  remove: (id: number) => void;
  upd: (id: number, f: keyof T, v: string) => void;
}
interface Props {
  resume: ResumeData;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  ops: SectionOps<CertEntry>;
  sectionNum: string;
}

export default function CertificationsSection({
  resume,
  collapsed,
  onToggle,
  ops,
  sectionNum,
}: Props) {
  return (
    <div className="sec-box">
      <SecHeader
        id="cert"
        label="Certifications"
        num={sectionNum}
        collapsed={collapsed}
        onToggle={onToggle}
      />
      {!collapsed["cert"] && (
        <>
          {resume.certifications.map((c, idx) => (
            <div key={c.id}>
              {idx > 0 && <hr className="entry-divider" />}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-slate-600 font-bold">
                  Cert {idx + 1}
                </span>
                {idx > 0 && (
                  <button className="icon-btn" onClick={() => ops.remove(c.id)}>
                    <Trash2 size={12} color="#f87171" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="di text-xs col-span-2"
                  placeholder="Certificate Name"
                  value={c.name ?? ""}
                  onChange={(e) => ops.upd(c.id, "name", e.target.value)}
                />
                <input
                  className="di text-xs"
                  placeholder="Issuer  e.g. Coursera"
                  value={c.issuer ?? ""}
                  onChange={(e) => ops.upd(c.id, "issuer", e.target.value)}
                />
                <input
                  className="di text-xs"
                  placeholder="Date  e.g. 2024"
                  value={c.date ?? ""}
                  onChange={(e) => ops.upd(c.id, "date", e.target.value)}
                />
              </div>
            </div>
          ))}
          <button className="add-btn" onClick={ops.add}>
            + Add Certificate
          </button>
        </>
      )}
    </div>
  );
}
