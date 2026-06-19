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

export const demoResume = (): ResumeData => ({
  full_name: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "+1 (555) 019-2834",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/janedoe",
  github: "",
  portfolio: "janedoe.marketing",
  summary: "Results-driven Digital Marketing Specialist with 5+ years of experience planning and executing multi-channel marketing campaigns. Proven track record of increasing brand awareness, driving website traffic, and optimizing digital ROI.",
  education: [
    {
      id: uid(),
      institution: "Stanford University",
      degree: "B.A. in Communication & Media",
      cgpa: "3.85",
      duration: "2016 – 2020",
    }
  ],
  experience: [
    {
      id: uid(),
      role: "Senior Marketing Manager",
      org: "Vanguard Media",
      duration: "Jan 2022 – Present",
      bullets: "Led a team of 3 specialists to execute content marketing campaigns, increasing organic search traffic by 55%.\nManaged a $45k digital advertising budget across Google Ads and Meta, achieving a 4.2x ROAS.\nCollaborated with product and sales departments to design customer acquisition strategies yielding $800k in new sales.",
    },
    {
      id: uid(),
      role: "Marketing Coordinator",
      org: "Elevate Brand Co.",
      duration: "Jul 2020 – Dec 2021",
      bullets: "Coordinated email marketing campaigns with over 100k active subscribers, achieving a 22% open rate.\nAnalyzed website performance metrics using Google Analytics to recommend page layout optimizations.\nDrafted engaging press releases and blog posts generating 5k+ monthly views.",
    }
  ],
  projects: [
    {
      id: uid(),
      name: "E-Commerce Launch Campaign",
      link: "vanguardmedia.com/launch",
      duration: "2023",
      bullets: "Directed the digital launch campaign for a new consumer goods brand, acquiring 10k subscribers pre-launch.\nUtilized social media marketing and influencer outreach to drive $50k in first-week sales.",
      type: "project",
    }
  ],
  skills: [
    {
      id: uid(),
      category: "Digital Marketing",
      skills: "SEO, SEM, Email Marketing, Google Ads, Meta Ads, Copywriting",
    },
    {
      id: uid(),
      category: "Tools & Analytics",
      skills: "Google Analytics, HubSpot, Mailchimp, Figma, WordPress",
    },
    {
      id: uid(),
      category: "Soft Skills",
      skills: "Project Management, Communication, Creative Writing, Team Leadership",
    }
  ],
  certifications: [
    {
      id: uid(),
      name: "Google Analytics Individual Qualification",
      issuer: "Google",
      date: "2023",
    }
  ],
  references: [
    {
      id: uid(),
      name: "John Smith",
      title: "Director of Marketing",
      org: "Vanguard Media",
      phone: "+1 (555) 019-9988",
      email: "john.smith@vanguard.com",
    }
  ],
  extras: [
    {
      id: uid(),
      label: "Languages",
      value: "English (Native), Spanish (Conversational)",
    }
  ],
});
