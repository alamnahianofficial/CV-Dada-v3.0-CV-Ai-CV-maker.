"use client";
import { FileText, Layout, Loader2, type LucideIcon } from "lucide-react";
import type { DocxTemplate } from "@/types/resume";

interface Props {
  selected: DocxTemplate;
  onChange: (t: DocxTemplate) => void;
  onExport: () => void;
  exporting: boolean;
}

const TEMPLATES: {
  id: DocxTemplate;
  name: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  {
    id: "classic",
    name: "Classic  (ATS-Safe)",
    desc: "Single-column · Times New Roman · Best for ATS scanners & recruiters",
    icon: FileText,
  },
  {
    id: "minimal",
    name: "Minimal  (Designer)",
    desc: "Clean · Calibri · Indigo accents · Elegant for creative roles",
    icon: Layout,
  },
];

export default function DocxTemplateSelector({
  selected,
  onChange,
  onExport,
  exporting,
}: Props) {
  return (
    <div className="sec-box" style={{ borderColor: "rgba(99,102,241,0.25)" }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 900,
          color: "#a5b4fc",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          marginBottom: 12,
        }}
      >
        Choose Template
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 14,
        }}
      >
        {TEMPLATES.map((t) => {
          const active = selected === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 12,
                border: active
                  ? "1px solid rgba(99,102,241,0.5)"
                  : "1px solid #1e293b",
                background: active
                  ? "rgba(99,102,241,0.08)"
                  : "rgba(15,23,42,0.5)",
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  padding: 7,
                  borderRadius: 8,
                  background: active ? "#4f46e5" : "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <t.icon size={14} color={active ? "#fff" : "#64748b"} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: active ? "#fff" : "#94a3b8",
                    }}
                  >
                    {t.name}
                  </span>
                  {active && (
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 900,
                        background: "#4f46e5",
                        color: "#fff",
                        padding: "1px 6px",
                        borderRadius: 4,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Active
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontSize: 10,
                    color: "#475569",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {t.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Single download button */}
      <button
        onClick={onExport}
        disabled={exporting}
        style={{
          width: "100%",
          padding: "13px 0",
          borderRadius: 12,
          border: "none",
          background: exporting
            ? "#1e293b"
            : "linear-gradient(135deg,#4f46e5,#7c3aed)",
          color: exporting ? "#64748b" : "#fff",
          fontWeight: 900,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          cursor: exporting ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.2s",
          boxShadow: exporting ? "none" : "0 4px 20px rgba(79,70,229,0.3)",
        }}
      >
        {exporting ? (
          <>
            <Loader2
              size={14}
              style={{ animation: "spin 1s linear infinite" }}
            />{" "}
            Generating…
          </>
        ) : (
          <>
            <FileText size={14} /> Download Word Document
          </>
        )}
      </button>
    </div>
  );
}
