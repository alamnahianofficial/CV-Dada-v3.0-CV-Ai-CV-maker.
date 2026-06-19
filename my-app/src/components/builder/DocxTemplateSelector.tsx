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
    <div className="sec-box" style={{ borderColor: "rgba(6, 182, 212, 0.25)" }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 900,
          color: "#06b6d4",
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
                padding: "12px 14px",
                borderRadius: 12,
                border: active
                  ? "1px solid rgba(6, 182, 212, 0.45)"
                  : "1px solid rgba(255, 255, 255, 0.05)",
                background: active
                  ? "rgba(6, 182, 212, 0.08)"
                  : "rgba(2, 6, 23, 0.4)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  padding: 8,
                  borderRadius: 8,
                  background: active ? "#06b6d4" : "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
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
                        background: "#06b6d4",
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
            ? "rgba(255, 255, 255, 0.05)"
            : "linear-gradient(135deg,#06b6d4,#6366f1)",
          color: exporting ? "#64748b" : "#fff",
          fontWeight: 950,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          cursor: exporting ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: exporting ? "none" : "0 4px 20px rgba(6, 182, 212, 0.25)",
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
