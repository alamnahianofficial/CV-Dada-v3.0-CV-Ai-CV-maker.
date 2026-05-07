import { NextRequest, NextResponse } from "next/server";

const MODEL = "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

async function callOpenRouter(system: string, user: string, maxTokens = 2000) {
  const key = process.env.OPENROUTER_API_KEY ?? "";
  if (!key) throw new Error("OPENROUTER_API_KEY not set in .env.local");
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization":`Bearer ${key}`, "HTTP-Referer":SITE_URL, "X-Title":"CV Dada by Nahian Alam", "Content-Type":"application/json" },
    body: JSON.stringify({ model:MODEL, max_tokens:maxTokens, temperature:0.3, messages:[{role:"system",content:system},{role:"user",content:user}] }),
  });
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

const SCHEMA = `{ "full_name":string, "email":string, "phone":string, "location":string, "linkedin":string, "github":string, "portfolio":string, "summary":string, "education":[{"org":string,"degree":string,"gpa":string,"duration":string}], "experience":[{"role":string,"org":string,"duration":string,"bullets":string}], "projects":[{"title":string,"tech":string,"link":string,"duration":string,"bullets":string,"type":"project"}], "skills":[{"category":string,"skills":string}], "certifications":[{"title":string,"issuer":string,"year":string}], "references":[{"name":string,"title":string,"org":string,"contact":string}], "extras":[{"label":string,"value":string}] }`;

const GENERATE_SYS = `You are an expert CV writer. Return ONLY valid JSON (no markdown, no explanation) matching: ${SCHEMA}. Rules: bullets=newline-separated action-verb sentences. skills.skills=comma-separated list.`;
const PARSE_SYS = `You are an expert CV parser. Extract all data from the text. Return ONLY valid JSON (no markdown) matching: ${SCHEMA}.`;
const IMPROVE_SYS = `You are a professional CV writer. Rewrite the text to be professional, concise, ATS-optimized with strong action verbs. Return ONLY the improved text. No explanation.`;

export async function POST(req: NextRequest) {
  try {
    const { mode, prompt, text, context } = await req.json();
    if (mode === "improve") {
      const raw = await callOpenRouter(IMPROVE_SYS, `Section: ${context ?? "general"}\n\nText:\n${text ?? prompt}`, 600);
      return NextResponse.json({ summary: raw.trim() });
    }
    const raw = mode === "parse"
      ? await callOpenRouter(PARSE_SYS, text ?? "", 3500)
      : await callOpenRouter(GENERATE_SYS, `Brief:\n${prompt}`, 3000);
    const clean = raw.replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/```\s*$/i,"").trim();
    return NextResponse.json(JSON.parse(clean));
  } catch(err) {
    console.error("[api/ai]", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status:500 });
  }
}
