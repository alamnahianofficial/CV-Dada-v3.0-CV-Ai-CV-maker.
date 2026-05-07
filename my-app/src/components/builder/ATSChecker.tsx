"use client";

import { useState } from "react";
import { calculateATSScore } from "@/lib/atsCalculator";
import type { ResumeData } from "@/types/resume";

interface Props {
  resume: ResumeData;
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 70 ? "#22c55e" : score >= 45 ? "#f59e0b" : "#ef4444";
  const label = score >= 70 ? "Good" : score >= 45 ? "Fair" : "Needs Work";
  const circumference = 2 * Math.PI * 34;
  const dash = (score / 100) * circumference;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 40 40)"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 900, color }}>{score}</span>
          <span style={{ fontSize: 8, color: "#64748b", fontWeight: 700 }}>
            / 100
          </span>
        </div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color }}>{label}</span>
    </div>
  );
}

export default function ATSChecker({ resume }: Props) {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<ReturnType<
    typeof calculateATSScore
  > | null>(null);

  const check = () => {
    if (!jobDescription.trim()) return;
    setResult(calculateATSScore(jobDescription, resume));
  };

  return (
    <div className="sec-box">
      <div className="sec-label" style={{ marginBottom: 12 }}>
        ATS Score Checker
      </div>

      <textarea
        className="di"
        style={{ minHeight: 96, marginBottom: 10 }}
        placeholder="Paste the job description here…"
        value={jobDescription}
        onChange={(e) => {
          setJobDescription(e.target.value);
          setResult(null);
        }}
      />

      <button
        onClick={check}
        disabled={!jobDescription.trim()}
        className="abtn"
        style={{
          width: "100%",
          background: "linear-gradient(135deg,#0f766e,#0d9488)",
          opacity: !jobDescription.trim() ? 0.5 : 1,
          marginBottom: result ? 12 : 0,
        }}
      >
        Check ATS Score
      </button>

      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Score + breakdown */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              padding: 12,
              background: "rgba(15,23,42,0.7)",
              border: "1px solid #1e293b",
              borderRadius: 10,
            }}
          >
            <ScoreRing score={result.score} />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {[
                ["Keyword match", `${result.breakdown.keywordMatch}/70`],
                ["Summary", `${result.breakdown.hasSummary}/6`],
                ["Skills", `${result.breakdown.hasSkills}/6`],
                ["Experience", `${result.breakdown.hasExperience}/5`],
                ["Education", `${result.breakdown.hasEducation}/3`],
                [
                  "Contact",
                  `${result.breakdown.hasEmail + result.breakdown.hasPhone}/10`,
                ],
              ].map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 10,
                    color: "#94a3b8",
                  }}
                >
                  <span>{label}</span>
                  <span style={{ color: "#e2e8f0", fontWeight: 700 }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing keywords */}
          {result.missing.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#f87171",
                  marginBottom: 6,
                }}
              >
                ⚠ Missing ({result.missing.length}):
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {result.missing.map((kw) => (
                  <span
                    key={kw}
                    style={{
                      padding: "2px 8px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 600,
                      background: "rgba(239,68,68,0.12)",
                      color: "#f87171",
                      border: "1px solid rgba(239,68,68,0.25)",
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Matched keywords */}
          {result.matched.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#4ade80",
                  marginBottom: 6,
                }}
              >
                ✓ Matched ({result.matched.length}):
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {result.matched.slice(0, 20).map((kw) => (
                  <span
                    key={kw}
                    style={{
                      padding: "2px 8px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 600,
                      background: "rgba(34,197,94,0.1)",
                      color: "#4ade80",
                      border: "1px solid rgba(34,197,94,0.2)",
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
