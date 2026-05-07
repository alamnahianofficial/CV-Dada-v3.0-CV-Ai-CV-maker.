"use client";
// ─── STANDARD CV PREVIEW — CV Dada by Nahian Alam ────────────────────────────
// Templates: Classic (Times New Roman, ATS) | Minimal (Calibri, designer)
// PHOTO FIX: header container uses minHeight = PH + paddingBottom when photo
//            present → photo never bleeds into content below.
// INLINE STYLES ONLY — no Tailwind classes inside this file.

import React from "react";
import { ResumeData, DocxTemplate } from "@/types/resume";
/* eslint-disable @next/next/no-img-element */

interface Props {
  resume: ResumeData;
  photo: string | null;
  template: DocxTemplate;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

// Passport size: 35mm × 45mm at 96dpi screen
const PW = 90; // px width
const PH = 115; // px height
const PAD_BOTTOM = 10; // header paddingBottom (px)

// Only render photo if it's a real uploaded file (base64 data URL)
const isValidPhoto = (p: string | null): p is string =>
  !!p && p.startsWith("data:");

// ─── BULLET RENDERER ──────────────────────────────────────────────────────────
// Flex row: bullet stays fixed left, text wraps in its own column.
// overflow:"hidden" on row + overflowWrap:"anywhere" on text span are both
// required to break extremely long tokens with no spaces.
const Bul = ({
  text,
  f,
  size = 9.5,
  color = "#111",
}: {
  text: string;
  f: string;
  size?: number;
  color?: string;
}) => (
  <div style={{ paddingLeft: 8 }}>
    {text
      .split("\n")
      .filter((l) => l.replace(/^[•\-]\s*/, "").trim())
      .map((line, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 4,
            margin: "2px 0",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: f,
              fontSize: size,
              color,
              flexShrink: 0,
              lineHeight: 1.6,
            }}
          >
            •
          </span>
          <span
            style={{
              fontFamily: f,
              fontSize: size,
              color,
              lineHeight: 1.6,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              flex: 1,
              minWidth: 0,
            }}
          >
            {line.replace(/^[•\-]\s*/, "").trim()}
          </span>
        </div>
      ))}
  </div>
);

// ─── CLASSIC ──────────────────────────────────────────────────────────────────
const Classic = ({
  resume,
  photo,
}: {
  resume: ResumeData;
  photo: string | null;
}) => {
  const F = '"Times New Roman", Times, serif';
  const hasPhoto = isValidPhoto(photo);

  const SH = ({ label }: { label: string }) => (
    <h2
      style={{
        fontFamily: F,
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        borderBottom: "1.5px solid #000",
        paddingBottom: 2,
        margin: "14px 0 6px",
        color: "#000",
      }}
    >
      {label}
    </h2>
  );

  return (
    <div
      style={{
        fontFamily: F,
        fontSize: 10.5,
        color: "#111",
        padding: "13mm 13mm 12mm",
        background: "#fff",
        width: "210mm",
        boxSizing: "border-box",
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      {/*
        HEADER
        ─────────────────────────────────────────────────────────────────────
        KEY FIX: minHeight = PH + PAD_BOTTOM when photo present.
        This guarantees the absolutely-positioned photo never escapes the
        header container and overlaps the content sections below.
        paddingRight reserves horizontal space so text doesn't run under photo.
      */}
      <div
        style={{
          position: "relative",
          paddingRight: hasPhoto ? PW + 14 : 0,
          paddingBottom: PAD_BOTTOM,
          // ✅ THE FIX: lock header height to at least passport photo height
          minHeight: hasPhoto ? PH + PAD_BOTTOM : undefined,
          borderBottom: "2px solid #000",
          marginBottom: 14,
          boxSizing: "border-box",
        }}
      >
        {hasPhoto && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: PW,
              height: PH,
              border: "1px solid #ccc",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={photo}
              alt="Photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
        )}

        {/* Name + contact — left-aligned when photo present, centered otherwise */}
        <div style={hasPhoto ? {} : { textAlign: "center" }}>
          <h1
            style={{
              fontFamily: F,
              fontSize: hasPhoto ? 22 : 24,
              fontWeight: 700,
              textTransform: "uppercase",
              margin: "0 0 5px",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}
          >
            {resume.full_name || "YOUR NAME"}
          </h1>
          <p
            style={{
              fontFamily: F,
              fontSize: 9.5,
              margin: "0 0 3px",
              color: "#333",
            }}
          >
            {[resume.email, resume.phone, resume.location]
              .filter(Boolean)
              .join("  •  ")}
          </p>
          {(resume.linkedin || resume.github || resume.portfolio) && (
            <p
              style={{
                fontFamily: F,
                fontSize: 9,
                margin: 0,
                color: "#1a3a8f",
              }}
            >
              {[resume.linkedin, resume.github, resume.portfolio]
                .filter(Boolean)
                .join("  |  ")}
            </p>
          )}
        </div>
      </div>

      {/* ── SUMMARY ── */}
      {resume.summary && (
        <div style={{ marginBottom: 12 }}>
          <SH label="Professional Summary" />
          <p
            style={{
              fontFamily: F,
              fontSize: 10.5,
              lineHeight: 1.65,
              margin: 0,
              textAlign: "justify",
            }}
          >
            {resume.summary}
          </p>
        </div>
      )}

      {/* ── EDUCATION ── */}
      {resume.education?.filter((e) => e.institution || e.degree).length >
        0 && (
        <div style={{ marginBottom: 12 }}>
          <SH label="Education" />
          {resume.education
            .filter((e) => e.institution || e.degree)
            .map((e) => (
              <div key={e.id} style={{ marginBottom: 7 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{ fontFamily: F, fontWeight: 700, fontSize: 11 }}
                  >
                    {e.degree}
                  </span>
                  <span
                    style={{
                      fontFamily: F,
                      fontSize: 9.5,
                      color: "#444",
                      fontStyle: "italic",
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {e.duration}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{
                      fontFamily: F,
                      fontStyle: "italic",
                      fontSize: 10.5,
                    }}
                  >
                    {e.institution}
                  </span>
                  {e.cgpa && (
                    <span
                      style={{
                        fontFamily: F,
                        fontSize: 9.5,
                        color: "#444",
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      CGPA: {e.cgpa}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* ── EXPERIENCE ── */}
      {resume.experience?.filter((e) => e.role).length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <SH label="Work Experience" />
          {resume.experience
            .filter((e) => e.role)
            .map((e) => (
              <div key={e.id} style={{ marginBottom: 10 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{ fontFamily: F, fontWeight: 700, fontSize: 11 }}
                  >
                    {e.role}
                  </span>
                  <span
                    style={{
                      fontFamily: F,
                      fontSize: 9.5,
                      color: "#444",
                      fontStyle: "italic",
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {e.duration}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: F,
                    fontStyle: "italic",
                    fontSize: 10.5,
                    margin: "2px 0 4px",
                    color: "#333",
                  }}
                >
                  {e.org}
                </p>
                {e.bullets && <Bul text={e.bullets} f={F} />}
              </div>
            ))}
        </div>
      )}

      {/* ── PROJECTS ── */}
      {resume.projects?.filter((p) => p.type !== "thesis" && p.name).length >
        0 && (
        <div style={{ marginBottom: 12 }}>
          <SH label="Projects" />
          {resume.projects
            .filter((p) => p.type !== "thesis" && p.name)
            .map((p) => (
              <div key={p.id} style={{ marginBottom: 9 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{ fontFamily: F, fontWeight: 700, fontSize: 11 }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontFamily: F,
                      fontSize: 9.5,
                      color: "#444",
                      fontStyle: "italic",
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {p.duration}
                  </span>
                </div>
                {p.link && (
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: 9,
                      margin: "1px 0 2px",
                      color: "#1a3a8f",
                    }}
                  >
                    {p.link}
                  </p>
                )}
                {p.bullets && <Bul text={p.bullets} f={F} />}
              </div>
            ))}
        </div>
      )}

      {/* ── THESIS ── */}
      {resume.projects?.filter((p) => p.type === "thesis" && p.name).length >
        0 && (
        <div style={{ marginBottom: 12 }}>
          <SH label="Thesis / Research" />
          {resume.projects
            .filter((p) => p.type === "thesis" && p.name)
            .map((p) => (
              <div key={p.id} style={{ marginBottom: 8 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{ fontFamily: F, fontWeight: 700, fontSize: 11 }}
                  >
                    {p.name}
                  </span>
                  {p.duration && (
                    <span
                      style={{
                        fontFamily: F,
                        fontSize: 9.5,
                        color: "#444",
                        fontStyle: "italic",
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      {p.duration}
                    </span>
                  )}
                </div>
                {p.link && (
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: 9,
                      margin: "2px 0 2px",
                      color: "#1a3a8f",
                    }}
                  >
                    {p.link}
                  </p>
                )}
                {p.bullets && <Bul text={p.bullets} f={F} />}
              </div>
            ))}
        </div>
      )}

      {/* ── SKILLS ── */}
      {resume.skills?.filter((s) => s.skills).length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <SH label="Skills" />
          {resume.skills
            .filter((s) => s.skills)
            .map((s) => (
              <p
                key={s.id}
                style={{
                  fontFamily: F,
                  fontSize: 10.5,
                  margin: "3px 0",
                  lineHeight: 1.5,
                }}
              >
                {s.category && (
                  <strong style={{ fontFamily: F }}>{s.category}: </strong>
                )}
                {s.skills}
              </p>
            ))}
        </div>
      )}

      {/* ── CERTIFICATIONS ── */}
      {resume.certifications?.filter((c) => c.name).length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <SH label="Certifications" />
          {resume.certifications
            .filter((c) => c.name)
            .map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{ fontFamily: F, fontWeight: 700, fontSize: 10.5 }}
                >
                  {c.name}
                </span>
                <span
                  style={{
                    fontFamily: F,
                    fontSize: 10,
                    fontStyle: "italic",
                    color: "#444",
                    flexShrink: 0,
                    marginLeft: 8,
                  }}
                >
                  {c.issuer}
                  {c.date && ` · ${c.date}`}
                </span>
              </div>
            ))}
        </div>
      )}

      {/* ── REFERENCES ── */}
      {resume.references?.filter((r) => r.name).length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <SH label="References" />
          {resume.references
            .filter((r) => r.name)
            .map((r) => (
              <div key={r.id} style={{ marginBottom: 5 }}>
                <p
                  style={{
                    fontFamily: F,
                    fontSize: 10.5,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  <strong>{r.name}</strong>
                  {r.title && <span>, {r.title}</span>}
                  {r.org && <span> — {r.org}</span>}
                </p>
                {(r.phone || r.email) && (
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: 9.5,
                      margin: "1px 0 0",
                      color: "#444",
                    }}
                  >
                    {[r.phone, r.email].filter(Boolean).join("  ·  ")}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}

      {/* ── EXTRAS ── */}
      {resume.extras?.filter((x) => x.value).length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <SH label="Additional Information" />
          {resume.extras
            .filter((x) => x.value)
            .map((x) => (
              <p
                key={x.id}
                style={{ fontFamily: F, fontSize: 10.5, margin: "3px 0" }}
              >
                {x.label && (
                  <strong style={{ fontFamily: F }}>{x.label}: </strong>
                )}
                {x.value}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

// ─── MINIMAL ──────────────────────────────────────────────────────────────────
const Minimal = ({
  resume,
  photo,
}: {
  resume: ResumeData;
  photo: string | null;
}) => {
  const F = "'Calibri','Segoe UI',Arial,sans-serif";
  const hasPhoto = isValidPhoto(photo);

  const SH = ({ label }: { label: string }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        margin: "15px 0 7px",
      }}
    >
      <div
        style={{
          width: 3,
          height: 13,
          background: "#4f46e5",
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <h2
        style={{
          fontFamily: F,
          fontSize: 9.5,
          fontWeight: 800,
          textTransform: "uppercase",
          color: "#0f172a",
          margin: 0,
          letterSpacing: "0.12em",
        }}
      >
        {label}
      </h2>
      <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
    </div>
  );

  const MinBul = ({ text }: { text: string }) => (
    <div style={{ paddingLeft: 8, borderLeft: "2px solid #e2e8f0" }}>
      {text
        .split("\n")
        .filter((l) => l.replace(/^[•\-]\s*/, "").trim())
        .map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 4,
              margin: "2px 0",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontFamily: F,
                fontSize: 9.5,
                color: "#475569",
                flexShrink: 0,
                lineHeight: 1.6,
              }}
            >
              •
            </span>
            <span
              style={{
                fontFamily: F,
                fontSize: 9.5,
                color: "#475569",
                lineHeight: 1.6,
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                flex: 1,
                minWidth: 0,
              }}
            >
              {line.replace(/^[•\-]\s*/, "").trim()}
            </span>
          </div>
        ))}
    </div>
  );

  return (
    <div
      style={{
        fontFamily: F,
        fontSize: 10,
        color: "#1e293b",
        padding: "13mm 14mm 12mm",
        background: "#fff",
        width: "210mm",
        boxSizing: "border-box",
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      {/*
        HEADER
        ─────────────────────────────────────────────────────────────────────
        Same fix as Classic: minHeight = PH + PAD_BOTTOM when photo present.
      */}
      <div
        style={{
          position: "relative",
          paddingRight: hasPhoto ? PW + 14 : 0,
          paddingBottom: PAD_BOTTOM,
          // ✅ THE FIX: lock header height to at least passport photo height
          minHeight: hasPhoto ? PH + PAD_BOTTOM : undefined,
          marginBottom: 12,
          borderBottom: "2px solid #e2e8f0",
          boxSizing: "border-box",
        }}
      >
        {hasPhoto && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: PW,
              height: PH,
              borderRadius: 6,
              border: "2px solid #e2e8f0",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            }}
          >
            <img
              src={photo}
              alt="Photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
        )}

        <h1
          style={{
            fontFamily: F,
            fontSize: 28,
            fontWeight: 900,
            color: "#0f172a",
            margin: "0 0 5px",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {resume.full_name || "YOUR NAME"}
        </h1>
        <div
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              height: 3,
              width: 34,
              background: "#4f46e5",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              height: 3,
              width: 11,
              background: "#a5b4fc",
              borderRadius: 2,
            }}
          />
        </div>
        <p
          style={{
            fontFamily: F,
            fontSize: 9.5,
            color: "#475569",
            margin: "0 0 3px",
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          {[resume.email, resume.phone, resume.location]
            .filter(Boolean)
            .join("   ·   ")}
        </p>
        {(resume.linkedin || resume.github || resume.portfolio) && (
          <p
            style={{ fontFamily: F, fontSize: 9, color: "#4f46e5", margin: 0 }}
          >
            {[resume.linkedin, resume.github, resume.portfolio]
              .filter(Boolean)
              .join("   ·   ")}
          </p>
        )}
      </div>

      {/* ── SUMMARY ── */}
      {resume.summary && (
        <div>
          <SH label="Summary" />
          <p
            style={{
              fontFamily: F,
              fontSize: 9.5,
              color: "#334155",
              lineHeight: 1.7,
              margin: "0 0 2px",
              textAlign: "justify",
            }}
          >
            {resume.summary}
          </p>
        </div>
      )}

      {/* ── EXPERIENCE ── */}
      {resume.experience?.filter((e) => e.role).length > 0 && (
        <div>
          <SH label="Experience" />
          {resume.experience
            .filter((e) => e.role)
            .map((e) => (
              <div key={e.id} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: F,
                      fontWeight: 800,
                      fontSize: 10.5,
                      color: "#0f172a",
                    }}
                  >
                    {e.role}
                  </span>
                  <span
                    style={{
                      fontFamily: F,
                      fontSize: 8.5,
                      color: "#94a3b8",
                      fontStyle: "italic",
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {e.duration}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: F,
                    fontSize: 9,
                    color: "#4f46e5",
                    fontWeight: 700,
                    margin: "2px 0 4px",
                  }}
                >
                  {e.org}
                </p>
                {e.bullets && <MinBul text={e.bullets} />}
              </div>
            ))}
        </div>
      )}

      {/* ── EDUCATION ── */}
      {resume.education?.filter((e) => e.institution || e.degree).length >
        0 && (
        <div>
          <SH label="Education" />
          {resume.education
            .filter((e) => e.institution || e.degree)
            .map((e) => (
              <div key={e.id} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: F,
                      fontWeight: 800,
                      fontSize: 10.5,
                      color: "#0f172a",
                    }}
                  >
                    {e.degree}
                  </span>
                  <span
                    style={{
                      fontFamily: F,
                      fontSize: 8.5,
                      color: "#94a3b8",
                      fontStyle: "italic",
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {e.duration}
                    {e.cgpa && `  ·  CGPA: ${e.cgpa}`}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: F,
                    fontSize: 9,
                    color: "#4f46e5",
                    fontWeight: 600,
                    margin: "1px 0 0",
                  }}
                >
                  {e.institution}
                </p>
              </div>
            ))}
        </div>
      )}

      {/* ── PROJECTS ── */}
      {resume.projects?.filter((p) => p.type !== "thesis" && p.name).length >
        0 && (
        <div>
          <SH label="Projects" />
          {resume.projects
            .filter((p) => p.type !== "thesis" && p.name)
            .map((p) => (
              <div key={p.id} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: F,
                      fontWeight: 800,
                      fontSize: 10.5,
                      color: "#0f172a",
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontFamily: F,
                      fontSize: 8.5,
                      color: "#94a3b8",
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {p.duration}
                  </span>
                </div>
                {p.link && (
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: 9,
                      margin: "1px 0 3px",
                      color: "#4f46e5",
                    }}
                  >
                    {p.link}
                  </p>
                )}
                {p.bullets && <MinBul text={p.bullets} />}
              </div>
            ))}
        </div>
      )}

      {/* ── THESIS ── */}
      {resume.projects?.filter((p) => p.type === "thesis" && p.name).length >
        0 && (
        <div>
          <SH label="Thesis / Research" />
          {resume.projects
            .filter((p) => p.type === "thesis" && p.name)
            .map((p) => (
              <div key={p.id} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: F,
                      fontWeight: 800,
                      fontSize: 10.5,
                      color: "#0f172a",
                    }}
                  >
                    {p.name}
                  </span>
                  {p.duration && (
                    <span
                      style={{
                        fontFamily: F,
                        fontSize: 8.5,
                        color: "#94a3b8",
                        fontStyle: "italic",
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      {p.duration}
                    </span>
                  )}
                </div>
                {p.link && (
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: 9,
                      margin: "2px 0 3px",
                      color: "#4f46e5",
                    }}
                  >
                    {p.link}
                  </p>
                )}
                {p.bullets && <MinBul text={p.bullets} />}
              </div>
            ))}
        </div>
      )}

      {/* ── SKILLS ── */}
      {resume.skills?.filter((s) => s.skills).length > 0 && (
        <div>
          <SH label="Skills" />
          {resume.skills
            .filter((s) => s.skills)
            .map((s) => (
              <p
                key={s.id}
                style={{
                  fontFamily: F,
                  fontSize: 9.5,
                  margin: "3px 0",
                  color: "#334155",
                  lineHeight: 1.5,
                }}
              >
                {s.category && (
                  <strong style={{ fontFamily: F, color: "#0f172a" }}>
                    {s.category}:{" "}
                  </strong>
                )}
                {s.skills}
              </p>
            ))}
        </div>
      )}

      {/* ── CERTIFICATIONS ── */}
      {resume.certifications?.filter((c) => c.name).length > 0 && (
        <div>
          <SH label="Certifications" />
          {resume.certifications
            .filter((c) => c.name)
            .map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: F,
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  {c.name}
                </span>
                <span
                  style={{
                    fontFamily: F,
                    fontSize: 8.5,
                    color: "#94a3b8",
                    fontStyle: "italic",
                    flexShrink: 0,
                    marginLeft: 8,
                  }}
                >
                  {c.issuer}
                  {c.date && `  ·  ${c.date}`}
                </span>
              </div>
            ))}
        </div>
      )}

      {/* ── REFERENCES ── */}
      {resume.references?.filter((r) => r.name).length > 0 && (
        <div>
          <SH label="References" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px 18px",
            }}
          >
            {resume.references
              .filter((r) => r.name)
              .map((r) => (
                <div key={r.id}>
                  <p
                    style={{
                      fontFamily: F,
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: 0,
                    }}
                  >
                    {r.name}
                  </p>
                  {r.title && (
                    <p
                      style={{
                        fontFamily: F,
                        fontSize: 8.5,
                        color: "#64748b",
                        margin: "1px 0",
                        fontStyle: "italic",
                      }}
                    >
                      {r.title}
                      {r.org && `, ${r.org}`}
                    </p>
                  )}
                  {(r.phone || r.email) && (
                    <p
                      style={{
                        fontFamily: F,
                        fontSize: 8.5,
                        color: "#4f46e5",
                        margin: 0,
                      }}
                    >
                      {[r.phone, r.email].filter(Boolean).join("  ·  ")}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ── EXTRAS ── */}
      {resume.extras?.filter((x) => x.value).length > 0 && (
        <div>
          <SH label="Additional" />
          {resume.extras
            .filter((x) => x.value)
            .map((x) => (
              <p
                key={x.id}
                style={{
                  fontFamily: F,
                  fontSize: 9.5,
                  margin: "3px 0",
                  color: "#334155",
                }}
              >
                {x.label && (
                  <strong style={{ fontFamily: F, color: "#0f172a" }}>
                    {x.label}:{" "}
                  </strong>
                )}
                {x.value}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function StandardCV({
  resume,
  photo,
  template,
  previewRef,
}: Props) {
  return (
    <div
      ref={previewRef}
      id="resume-preview"
      style={{
        width: "210mm",
        background: "#fff",
        transformOrigin: "top left",
      }}
    >
      {template === "classic" ? (
        <Classic resume={resume} photo={photo} />
      ) : (
        <Minimal resume={resume} photo={photo} />
      )}
    </div>
  );
}
