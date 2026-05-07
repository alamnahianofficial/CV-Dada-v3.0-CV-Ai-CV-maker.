"use client";
// ─── AI SUGGESTIONS ───────────────────────────────────────────────────────────

import { useState } from "react";
import { Loader2, Sparkles, Lightbulb } from "lucide-react";
import type { ResumeData } from "@/types/resume";

interface Props {
  resume: ResumeData;
  jobDescription: string;
}

export default function AISuggestions({ resume, jobDescription }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getSuggestions = async () => {
    if (!jobDescription.trim()) {
      setError("Paste a job description above first.");
      return;
    }
    setError("");
    setLoading(true);
    setSuggestions([]);

    // FIX: was p.name — correct field is p.title
    const resumeText = [
      resume.summary,
      ...resume.experience.map((e) => `${e.role} at ${e.org}: ${e.bullets}`),
      ...resume.skills.map((s) => `${s.category}: ${s.skills}`),
      ...resume.projects.map((p) => `${p.title}: ${p.bullets}`),
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are a professional resume coach. Analyze the job description and resume below. Return ONLY a JSON object with this exact structure, no markdown:
{"suggestions": ["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4", "suggestion 5"]}

Each suggestion must be specific, actionable, and under 120 characters.

Job Description:
${jobDescription.slice(0, 800)}

Resume Summary:
${resumeText.slice(0, 600)}`,
        }),
      });

      const data = await res.json();
      let parsed: string[] = [];

      if (Array.isArray(data.extras) && data.extras.length > 0) {
        parsed = data.extras.map((e: { value: string }) => e.value).filter(Boolean);
      }

      if (!parsed.length && data.summary) {
        try {
          const match = data.summary.match(/\{[\s\S]*\}/);
          if (match) {
            const obj = JSON.parse(match[0]);
            if (Array.isArray(obj.suggestions)) parsed = obj.suggestions;
          }
        } catch {
          /* empty */
        }
      }

      if (parsed.length) {
        setSuggestions(parsed);
      } else {
        setError("Could not parse suggestions. Try rephrasing the job description.");
      }
    } catch {
      setError("Request failed. Check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sec-box">
      <div className="sec-label" style={{ marginBottom: 10 }}>
        AI Suggestions
      </div>

      {!jobDescription.trim() && (
        <p style={{ fontSize: 10, color: "#64748b", marginBottom: 10, lineHeight: 1.6 }}>
          Paste a job description in the field above to get personalised suggestions.
        </p>
      )}

      <button
        onClick={getSuggestions}
        disabled={loading || !jobDescription.trim()}
        className="abtn"
        style={{
          width: "100%",
          background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
          opacity: loading || !jobDescription.trim() ? 0.5 : 1,
          marginBottom: 10,
        }}
      >
        {loading ? (
          <>
            <Loader2 size={12} className="animate-spin" /> Analysing…
          </>
        ) : (
          <>
            <Sparkles size={12} /> Get AI Suggestions
          </>
        )}
      </button>

      {error && (
        <p style={{ fontSize: 10, color: "#f87171", marginBottom: 8 }}>{error}</p>
      )}

      {suggestions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {suggestions.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
                padding: "8px 10px",
                borderRadius: 10,
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.18)",
              }}
            >
              <Lightbulb size={12} color="#a5b4fc" style={{ marginTop: 1, flexShrink: 0 }} />
              <p style={{ fontSize: 11, color: "#cbd5e1", lineHeight: 1.55, margin: 0 }}>
                {s}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
