// ─── SHARED RESUME TYPES — CV Dada by Nahian Alam ────────────────────────────
// FIELD NAMES (source of truth — do not change):
//   EduEntry:     institution, degree, cgpa, duration
//   ProjectEntry: name, link, duration, bullets, type
//   CertEntry:    name, issuer, date
//   RefEntry:     name, title, org, phone, email
//   SkillEntry:   category, skills
//   ExpEntry:     role, org, duration, bullets
//   ExtraEntry:   label, value

export interface EduEntry {
  id: number;
  institution: string;
  degree: string;
  cgpa: string;
  duration: string;
}

export interface ExpEntry {
  id: number;
  role: string;
  org: string;
  duration: string;
  bullets: string;
}

export interface ProjectEntry {
  id: number;
  name: string;
  link: string;
  duration: string;
  bullets: string;
  type: "project" | "thesis";
}

export interface SkillEntry {
  id: number;
  category: string;
  skills: string;
}

export interface CertEntry {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

export interface RefEntry {
  id: number;
  name: string;
  title: string;
  org: string;
  phone: string;
  email: string;
}

export interface ExtraEntry {
  id: number;
  label: string;
  value: string;
}

export interface ResumeData {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  education: EduEntry[];
  experience: ExpEntry[];
  projects: ProjectEntry[];
  skills: SkillEntry[];
  certifications: CertEntry[];
  references: RefEntry[];
  extras: ExtraEntry[];
}

export interface AIResponse {
  full_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  summary?: string;
  education?: Omit<EduEntry, "id">[];
  experience?: Omit<ExpEntry, "id">[];
  projects?: Omit<ProjectEntry, "id">[];
  skills?: Omit<SkillEntry, "id">[];
  certifications?: Omit<CertEntry, "id">[];
  references?: Omit<RefEntry, "id">[];
  extras?: Omit<ExtraEntry, "id">[];
  error?: string;
}

// Only classic and minimal — modern removed
export type DocxTemplate = "classic" | "minimal";
