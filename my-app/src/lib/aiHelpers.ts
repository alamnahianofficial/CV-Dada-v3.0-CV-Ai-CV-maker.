"use client";
import { uid } from "@/lib/resumeDefaults";
import type { ResumeData, AIResponse } from "@/types/resume";

function findBestResumeObject(obj: any): any {
  if (!obj || typeof obj !== "object") return null;

  let bestObj: any = null;
  let maxKeys = -1;

  const resumeKeys = ["full_name", "fullName", "email", "summary", "education", "experience", "projects", "skills"];

  function traverse(current: any) {
    if (!current || typeof current !== "object") return;

    let count = 0;
    if (!Array.isArray(current)) {
      const currentKeys = Object.keys(current).map(k => k.toLowerCase());
      for (const k of resumeKeys) {
        if (currentKeys.includes(k.toLowerCase())) {
          count++;
        }
      }

      if (count > maxKeys) {
        maxKeys = count;
        bestObj = current;
      }
    }

    for (const key of Object.keys(current)) {
      const val = current[key];
      if (typeof val === "object" && val !== null) {
        traverse(val);
      }
    }
  }

  traverse(obj);
  return bestObj || obj;
}

function getVal(obj: any, keys: string[]): any {
  if (!obj || typeof obj !== "object") return undefined;
  for (const k of keys) {
    if (k in obj) return obj[k];
    const lowerK = k.toLowerCase();
    for (const actualKey of Object.keys(obj)) {
      if (actualKey.toLowerCase() === lowerK) {
        return obj[actualKey];
      }
    }
  }
  return undefined;
}

function hydrateIds(data: AIResponse): ResumeData {
  const d = findBestResumeObject(data);

  return {
    full_name: getVal(d, ["full_name", "fullName", "name", "Name", "fullname"]) ?? "",
    email: getVal(d, ["email", "emailAddress", "email_address"]) ?? "",
    phone: getVal(d, ["phone", "phoneNumber", "phone_number", "contact"]) ?? "",
    location: getVal(d, ["location", "address"]) ?? "",
    linkedin: getVal(d, ["linkedin", "linkedin_url", "linkedinUrl"]) ?? "",
    github: getVal(d, ["github", "github_url", "githubUrl"]) ?? "",
    portfolio: getVal(d, ["portfolio", "portfolio_url", "portfolioUrl", "website"]) ?? "",
    summary: getVal(d, ["summary", "professional_summary", "objective"]) ?? "",
    education: (getVal(d, ["education", "edu", "educations"]) ?? []).map((e: any) => ({
      institution: getVal(e, ["institution", "school", "college", "university", "org"]) ?? "",
      degree: getVal(e, ["degree", "major", "program"]) ?? "",
      cgpa: getVal(e, ["cgpa", "gpa", "grade"]) ?? "",
      duration: getVal(e, ["duration", "dates", "year", "years"]) ?? "",
      id: uid(),
    })),
    experience: (getVal(d, ["experience", "exp", "work_history", "history", "experiences"]) ?? []).map((e: any) => ({
      role: getVal(e, ["role", "title", "job_title", "position"]) ?? "",
      org: getVal(e, ["org", "company", "organization", "employer"]) ?? "",
      duration: getVal(e, ["duration", "dates", "years"]) ?? "",
      bullets: getVal(e, ["bullets", "description", "responsibilities", "tasks"]) ?? "",
      id: uid(),
    })),
    projects: (getVal(d, ["projects", "proj", "project"]) ?? []).map((e: any) => ({
      name: getVal(e, ["name", "title", "project_name"]) ?? "",
      link: getVal(e, ["link", "url", "project_url"]) ?? "",
      duration: getVal(e, ["duration", "dates", "year"]) ?? "",
      bullets: getVal(e, ["bullets", "description"]) ?? "",
      type: (getVal(e, ["type"]) ?? "project") as "project" | "thesis",
      id: uid(),
    })),
    skills: (getVal(d, ["skills", "skill"]) ?? []).map((e: any) => ({
      category: getVal(e, ["category", "name", "skill_type"]) ?? "",
      skills: getVal(e, ["skills", "list", "items"]) ?? "",
      id: uid(),
    })),
    certifications: (getVal(d, ["certifications", "certs", "credentials"]) ?? []).map((e: any) => ({
      name: getVal(e, ["name", "title", "certification_name"]) ?? "",
      issuer: getVal(e, ["issuer", "org", "issuing_organization", "authority"]) ?? "",
      date: getVal(e, ["date", "duration", "year"]) ?? "",
      id: uid(),
    })),
    references: (getVal(d, ["references", "refs"]) ?? []).map((e: any) => ({
      name: getVal(e, ["name", "contact_name"]) ?? "",
      title: getVal(e, ["title", "role", "position"]) ?? "",
      org: getVal(e, ["org", "company"]) ?? "",
      phone: getVal(e, ["phone", "contact"]) ?? "",
      email: getVal(e, ["email"]) ?? "",
      id: uid(),
    })),
    extras: (getVal(d, ["extras", "additional_info", "hobbies"]) ?? []).map((e: any) => ({
      label: getVal(e, ["label", "title", "name", "key"]) ?? "",
      value: getVal(e, ["value", "description", "val"]) ?? "",
      id: uid(),
    })),
  };
}

async function callAI(body: Record<string,unknown>) {
  return fetch("/api/ai", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
}

export async function generateCVWithAI(brief: string, setResume:(r:ResumeData)=>void, setStatus:(s:string)=>void) {
  setStatus("Calling AI…");
  try {
    const res = await callAI({ mode:"generate", prompt:brief.slice(0,2000) });
    setStatus("Parsing…");
    const d = await res.json() as AIResponse;
    if (d.error) throw new Error(d.error);
    setResume(hydrateIds(d));
    setStatus("done");
  } catch(err) { console.error(err); setStatus("error"); }
}

export async function aiImprove(text:string, context:string, onResult:(v:string)=>void, setLoading:(k:string|null)=>void, key:string) {
  if (!text.trim()) return;
  setLoading(key);
  try {
    const res = await callAI({ mode:"improve", text, context });
    const d = await res.json() as { summary?:string; error?:string };
    if (d.summary) onResult(d.summary.trim());
  } catch(err) { console.error(err); }
  setLoading(null);
}

export async function parseCVText(rawText:string, setResume:(r:ResumeData)=>void, setStatus:(s:string)=>void) {
  setStatus("Parsing your CV…");
  try {
    const res = await callAI({ mode:"parse", text:rawText.slice(0,8000) });
    setStatus("Structuring data…");
    const d = await res.json() as AIResponse;
    if (d.error) throw new Error(d.error);
    setResume(hydrateIds(d));
    setStatus("done");
  } catch(err) { console.error(err); setStatus("error"); }
}
