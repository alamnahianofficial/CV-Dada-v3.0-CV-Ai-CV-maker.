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
    name: "Classic (ATS-Safe)",
    desc: "Single-column · Times New Roman · Best for ATS scanners & recruiters",
    icon: FileText,
  },
  {
    id: "minimal",
    name: "Minimal (Designer)",
    desc: "Clean · Calibri · Elegant for creative roles",
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
    <div className="sec-box">
      <div
        style={{
          fontSize: 9,
          fontWeight: 800,
          color: "#171717",
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
                borderRadius: 10,
                border: active
                  ? "1px solid #171717"
                  : "1px solid #e5e5e5",
                background: active
                  ? "#fafafa"
                  : "#ffffff",
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
                  background: active ? "#171717" : "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                <t.icon size={14} color={active ? "#ffffff" : "#737373"} />
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
                      fontSize: 12,
                      fontWeight: 700,
                      color: active ? "#171717" : "#525252",
                    }}
                  >
                    {t.name}
                  </span>
                  {active && (
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        background: "#171717",
                        color: "#ffffff",
                        padding: "2px 6px",
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
                    color: "#737373",
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
          padding: "12px 0",
          borderRadius: 10,
          border: "none",
          background: exporting ? "#e5e5e5" : "#171717",
          color: exporting ? "#a3a3a3" : "#ffffff",
          fontWeight: 700,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          cursor: exporting ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.2s ease",
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
