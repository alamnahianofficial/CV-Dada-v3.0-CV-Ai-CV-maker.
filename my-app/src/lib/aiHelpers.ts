"use client";
import { uid } from "@/lib/resumeDefaults";
import type { ResumeData, AIResponse } from "@/types/resume";

function hydrateIds(d: AIResponse): ResumeData {
  return {
    full_name: d.full_name ?? "", email: d.email ?? "", phone: d.phone ?? "",
    location: d.location ?? "", linkedin: d.linkedin ?? "", github: d.github ?? "",
    portfolio: d.portfolio ?? "", summary: d.summary ?? "",
    education: (d.education ?? []).map(e=>({...e, id:uid()})),
    experience: (d.experience ?? []).map(e=>({...e, id:uid()})),
    projects: (d.projects ?? []).map(e=>({...e, id:uid(), type:(e.type ?? "project") as "project"|"thesis"})),
    skills: (d.skills ?? []).map(e=>({...e, id:uid()})),
    certifications: (d.certifications ?? []).map(e=>({...e, id:uid()})),
    references: (d.references ?? []).map(e=>({...e, id:uid()})),
    extras: (d.extras ?? []).map(e=>({...e, id:uid()})),
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
