"use client";
import { Loader2, Sparkles, Trash2 } from "lucide-react";
import SecHeader from "./SecHeader";
import type { ResumeData } from "@/types/resume";

interface SectionOps {
  add: () => void;
  addThesis: () => void;
  remove: (id: number) => void;
  upd: (id: number, f: string, v: string) => void;
}

interface Props {
  resume: ResumeData;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  ops: SectionOps;
  aiLoading: string | null;
  onAiImprove: (
    text: string,
    ctx: string,
    onResult: (v: string) => void,
    key: string,
  ) => void;
}

function LinkRow({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 10,
        padding: "0 10px",
        height: 36,
        marginBottom: 8,
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      <input
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: 12,
          color: "#e2e8f0",
        }}
        placeholder="GitHub / Live demo link"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function ProjectsSection({
  resume,
  collapsed,
  onToggle,
  ops,
  aiLoading,
  onAiImprove,
}: Props) {
  const projects = resume.projects.filter((p) => p.type !== "thesis");
  return (
    <div className="sec-box">
      <SecHeader
        id="proj"
        label="Projects"
        num="5"
        collapsed={collapsed}
        onToggle={onToggle}
      />
      {!collapsed["proj"] && (
        <>
          {projects.map((p, idx) => (
            <div key={p.id}>
              {idx > 0 && <hr className="entry-divider" />}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-slate-600 font-bold">
                  Project {idx + 1}
                </span>
                {idx > 0 && (
                  <button className="icon-btn" onClick={() => ops.remove(p.id)}>
                    <Trash2 size={12} color="#f87171" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  className="di text-xs col-span-2"
                  placeholder="Project Name"
                  value={p.name ?? ""}
                  onChange={(ev) => ops.upd(p.id, "name", ev.target.value)}
                />
                <input
                  className="di text-xs col-span-2"
                  placeholder="Duration  e.g. 2023 – 2024"
                  value={p.duration ?? ""}
                  onChange={(ev) => ops.upd(p.id, "duration", ev.target.value)}
                />
              </div>
              <LinkRow
                value={p.link ?? ""}
                onChange={(v) => ops.upd(p.id, "link", v)}
              />
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                  Description (one per line)
                </span>
                <button
                  className="aibtn"
                  disabled={!!aiLoading}
                  onClick={() =>
                    onAiImprove(
                      p.bullets ?? "",
                      "project description",
                      (v) => ops.upd(p.id, "bullets", v),
                      `proj-${p.id}`,
                    )
                  }
                >
                  {aiLoading === `proj-${p.id}` ? (
                    <Loader2 size={10} className="animate-spin" />
                  ) : (
                    <Sparkles size={10} />
                  )}{" "}
                  AI
                </button>
              </div>
              <textarea
                className="di text-xs font-mono"
                style={{ minHeight: 70 }}
                placeholder={
                  "Built REST API with…\nAchieved 95% test coverage…"
                }
                value={p.bullets ?? ""}
                onChange={(ev) => ops.upd(p.id, "bullets", ev.target.value)}
              />
            </div>
          ))}
          <button className="add-btn" onClick={ops.add}>
            + Add Project
          </button>
        </>
      )}
    </div>
  );
}

export function ThesisSection({
  resume,
  collapsed,
  onToggle,
  ops,
  aiLoading,
  onAiImprove,
}: Props) {
  const theses = resume.projects.filter((p) => p.type === "thesis");
  return (
    <div className="sec-box">
      <SecHeader
        id="thesis"
        label="Thesis / Research"
        num="6"
        collapsed={collapsed}
        onToggle={onToggle}
      />
      {!collapsed["thesis"] && (
        <>
          {theses.length === 0 && (
            <p className="text-[10px] text-slate-600 mb-2">
              No thesis added yet.
            </p>
          )}
          {theses.map((p, idx) => (
            <div key={p.id}>
              {idx > 0 && <hr className="entry-divider" />}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-slate-600 font-bold">
                  Thesis {idx + 1}
                </span>
                <button className="icon-btn" onClick={() => ops.remove(p.id)}>
                  <Trash2 size={12} color="#f87171" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  className="di text-xs col-span-2"
                  placeholder="Thesis / Research Title"
                  value={p.name ?? ""}
                  onChange={(ev) => ops.upd(p.id, "name", ev.target.value)}
                />
                <input
                  className="di text-xs col-span-2"
                  placeholder="Duration  e.g. 2022 – 2024"
                  value={p.duration ?? ""}
                  onChange={(ev) => ops.upd(p.id, "duration", ev.target.value)}
                />
              </div>
              <LinkRow
                value={p.link ?? ""}
                onChange={(v) => ops.upd(p.id, "link", v)}
              />
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                  Abstract / Key Points (one per line)
                </span>
                <button
                  className="aibtn"
                  disabled={!!aiLoading}
                  onClick={() =>
                    onAiImprove(
                      p.bullets ?? "",
                      "thesis description",
                      (v) => ops.upd(p.id, "bullets", v),
                      `thesis-${p.id}`,
                    )
                  }
                >
                  {aiLoading === `thesis-${p.id}` ? (
                    <Loader2 size={10} className="animate-spin" />
                  ) : (
                    <Sparkles size={10} />
                  )}{" "}
                  AI
                </button>
              </div>
              <textarea
                className="di text-xs font-mono"
                style={{ minHeight: 70 }}
                placeholder={"Developed a model for…\nPublished in IEEE…"}
                value={p.bullets ?? ""}
                onChange={(ev) => ops.upd(p.id, "bullets", ev.target.value)}
              />
            </div>
          ))}
          <button className="add-btn" onClick={ops.addThesis}>
            + Add Thesis
          </button>
        </>
      )}
    </div>
  );
}
