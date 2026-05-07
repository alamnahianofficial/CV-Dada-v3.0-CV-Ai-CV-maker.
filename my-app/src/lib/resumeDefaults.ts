// ─── RESUME DEFAULTS — CV Dada by Nahian Alam ────────────────────────────────
// Field names MUST match types/resume.ts exactly:
//   EduEntry:     institution, degree, cgpa, duration
//   ExpEntry:     role, org, duration, bullets
//   ProjectEntry: name, link, duration, bullets, type
//   SkillEntry:   category, skills
//   CertEntry:    name, issuer, date
//   RefEntry:     name, title, org, phone, email
//   ExtraEntry:   label, value

import type {
  EduEntry,
  ExpEntry,
  ProjectEntry,
  SkillEntry,
  CertEntry,
  RefEntry,
  ExtraEntry,
  ResumeData,
} from "@/types/resume";

let _c = 1;
export const uid = (): number => {
  _c++;
  return Date.now() + _c;
};

export const blankEdu = (): EduEntry => ({
  id: uid(),
  institution: "",
  degree: "",
  cgpa: "",
  duration: "",
});

export const blankExp = (): ExpEntry => ({
  id: uid(),
  role: "",
  org: "",
  duration: "",
  bullets: "",
});

export const blankProj = (): ProjectEntry => ({
  id: uid(),
  name: "",
  link: "",
  duration: "",
  bullets: "",
  type: "project",
});

export const blankThesis = (): ProjectEntry => ({
  id: uid(),
  name: "",
  link: "",
  duration: "",
  bullets: "",
  type: "thesis",
});

export const blankSkill = (): SkillEntry => ({
  id: uid(),
  category: "",
  skills: "",
});

export const blankCert = (): CertEntry => ({
  id: uid(),
  name: "",
  issuer: "",
  date: "",
});

export const blankRef = (): RefEntry => ({
  id: uid(),
  name: "",
  title: "",
  org: "",
  phone: "",
  email: "",
});

export const blankExtra = (): ExtraEntry => ({
  id: uid(),
  label: "",
  value: "",
});

export const initResume = (): ResumeData => ({
  full_name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",
  summary: "",
  education: [blankEdu()],
  experience: [blankExp()],
  projects: [blankProj()],
  skills: [blankSkill()],
  certifications: [blankCert()],
  references: [blankRef()],
  extras: [blankExtra()],
});
