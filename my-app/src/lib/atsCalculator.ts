// ─── ATS CALCULATOR — CV Dada by Nahian Alam ─────────────────────────────────
// Field names: p.name (projects), c.name/c.issuer (certs), e.institution (edu)

import type { ResumeData } from "@/types/resume";

function tokenize(t: string): string[] {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9\s+#]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function extractKeywords(jd: string): string[] {
  const stop = new Set([
    "the",
    "and",
    "for",
    "with",
    "are",
    "you",
    "our",
    "will",
    "have",
    "this",
    "that",
    "from",
    "they",
    "their",
    "your",
    "also",
    "work",
    "able",
    "must",
    "can",
    "may",
    "not",
    "all",
    "any",
    "new",
    "one",
  ]);
  return [...new Set(tokenize(jd).filter((w) => !stop.has(w)))];
}

export interface ATSResult {
  score: number;
  matched: string[];
  missing: string[];
  breakdown: {
    keywordMatch: number;
    hasPhone: number;
    hasEmail: number;
    hasSummary: number;
    hasSkills: number;
    hasExperience: number;
    hasEducation: number;
  };
}

export function calculateATSScore(
  jobDescription: string,
  resume: ResumeData,
): ATSResult {
  if (!jobDescription.trim()) {
    return {
      score: 0,
      matched: [],
      missing: [],
      breakdown: {
        keywordMatch: 0,
        hasPhone: 0,
        hasEmail: 0,
        hasSummary: 0,
        hasSkills: 0,
        hasExperience: 0,
        hasEducation: 0,
      },
    };
  }

  const resumeText = [
    resume.full_name,
    resume.summary,
    ...resume.skills.map((s) => `${s.category} ${s.skills}`),
    ...resume.experience.map((e) => `${e.role} ${e.org} ${e.bullets}`),
    // ✅ Fixed: p.name (was p.title), no tech field
    ...resume.projects.map((p) => `${p.name} ${p.bullets}`),
    // ✅ Fixed: c.name/c.issuer (was c.title)
    ...resume.certifications.map((c) => `${c.name} ${c.issuer}`),
    ...resume.extras.map((e) => `${e.label} ${e.value}`),
    // ✅ Added education text for keyword matching
    ...resume.education.map((e) => `${e.degree} ${e.institution}`),
  ]
    .filter(Boolean)
    .join(" ");

  const resumeTokens = new Set(tokenize(resumeText));
  const sorted = [...extractKeywords(jobDescription)]
    .sort((a, b) => b.length - a.length)
    .slice(0, 40);

  const matched = sorted.filter((k) => resumeTokens.has(k));
  const missing = sorted.filter((k) => !resumeTokens.has(k)).slice(0, 10);

  const keywordMatch = sorted.length
    ? Math.round((matched.length / sorted.length) * 70)
    : 0;

  const hasPhone = resume.phone ? 5 : 0;
  const hasEmail = resume.email ? 5 : 0;
  const hasSummary = resume.summary.length > 30 ? 6 : 0;
  const hasSkills = resume.skills.some((s) => s.skills) ? 6 : 0;
  const hasExperience = resume.experience.some((e) => e.role) ? 5 : 0;
  // ✅ Fixed: e.institution (was e.org)
  const hasEducation = resume.education.some((e) => e.institution) ? 3 : 0;

  return {
    score: Math.min(
      100,
      keywordMatch +
        hasPhone +
        hasEmail +
        hasSummary +
        hasSkills +
        hasExperience +
        hasEducation,
    ),
    matched,
    missing,
    breakdown: {
      keywordMatch,
      hasPhone,
      hasEmail,
      hasSummary,
      hasSkills,
      hasExperience,
      hasEducation,
    },
  };
}
