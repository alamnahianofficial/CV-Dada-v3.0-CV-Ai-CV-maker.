import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

async function callAIProvider(system: string, user: string, maxTokens = 2000) {
  const baseURL = process.env.AI_API_BASE_URL || "https://openrouter.ai/api/v1";
  const key = process.env.AI_API_KEY || process.env.OPENROUTER_API_KEY || "";
  const model = process.env.AI_MODEL || "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free";

  if (!key) {
    throw new Error("API Key not found. Please configure AI_API_KEY or OPENROUTER_API_KEY in .env.local");
  }

  const headers: Record<string, string> = {
    "Authorization": `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  if (baseURL.includes("openrouter.ai")) {
    headers["HTTP-Referer"] = SITE_URL;
    headers["X-Title"] = "CV Dada by Nahian Alam";
  }

  const cleanBase = baseURL.replace(/\/$/, "");
  const endpoint = `${cleanBase}/chat/completions`;

  let attempts = 0;
  const maxAttempts = 3;
  let delay = 1000;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: model,
          max_tokens: maxTokens,
          temperature: 0.3,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user }
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        if ((res.status === 503 || res.status === 429) && attempts < maxAttempts) {
          console.warn(`[api/ai] Attempt ${attempts} failed with ${res.status}. Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
          continue;
        }
        throw new Error(`AI Provider ${res.status}: ${errText}`);
      }

      const data = await res.json();
      return data.choices?.[0]?.message?.content ?? "";
    } catch (err) {
      if (attempts >= maxAttempts) {
        throw err;
      }
      console.warn(`[api/ai] Attempt ${attempts} failed with error: ${err instanceof Error ? err.message : err}. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
  throw new Error("AI request failed after maximum retries");
}

const SCHEMA = `{ "full_name":string, "email":string, "phone":string, "location":string, "linkedin":string, "github":string, "portfolio":string, "summary":string, "education":[{"institution":string,"degree":string,"cgpa":string,"duration":string}], "experience":[{"role":string,"org":string,"duration":string,"bullets":string}], "projects":[{"name":string,"link":string,"duration":string,"bullets":string,"type":"project"|"thesis"}], "skills":[{"category":string,"skills":string}], "certifications":[{"name":string,"issuer":string,"date":string}], "references":[{"name":string,"title":string,"org":string,"phone":string,"email":string}], "extras":[{"label":string,"value":string}] }`;

const GENERATE_SYS = `You are an expert CV writer. Return ONLY valid JSON (no markdown, no explanation) matching: ${SCHEMA}. Rules: bullets=newline-separated action-verb sentences. skills.skills=comma-separated list.`;
const PARSE_SYS = `You are an expert CV parser. Extract all data from the text. Return ONLY valid JSON (no markdown) matching: ${SCHEMA}.`;
const IMPROVE_SYS = `You are a professional CV writer. Rewrite the text to be professional, concise, ATS-optimized with strong action verbs. Return ONLY the improved text. No explanation.`;
const SUGGEST_SYS = `You are a professional resume coach. Analyze the job description and resume. Return ONLY a valid JSON object matching the schema: { "suggestions": [string] }. Do not include markdown formatting or explanations outside the JSON object.`;

export async function POST(req: NextRequest) {
  try {
    const { mode, prompt, text, context } = await req.json();
    if (mode === "parse" && text && text.includes("MOCK_PARSE_TRIGGER")) {
      return NextResponse.json({
        status: "success",
        result: {
          cv_data: {
            fullName: "Jane Mock Doe",
            emailAddress: "jane.mock@example.com",
            phone: "+1-123-456-7890",
            location: "San Francisco, CA",
            summary: "Mock summary for testing the CV import functionality.",
            education: [
              {
                school: "Stanford University",
                degree: "MS in Computer Science",
                cgpa: "4.0",
                duration: "2022-2024"
              }
            ]
          }
        }
      });
    }
    if (mode === "improve") {
      const raw = await callAIProvider(IMPROVE_SYS, `Section: ${context ?? "general"}\n\nText:\n${text ?? prompt}`, 600);
      return NextResponse.json({ summary: raw.trim() });
    }
    if (mode === "suggest") {
      const raw = await callAIProvider(SUGGEST_SYS, prompt, 800);
      const clean = raw.replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/```\s*$/i,"").trim();
      return NextResponse.json(JSON.parse(clean));
    }
    const raw = mode === "parse"
      ? await callAIProvider(PARSE_SYS, text ?? "", 3500)
      : await callAIProvider(GENERATE_SYS, `Brief:\n${prompt}`, 3000);
    const clean = raw.replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/```\s*$/i,"").trim();
    return NextResponse.json(JSON.parse(clean));
  } catch(err) {
    console.error("[api/ai]", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status:500 });
  }
}
