import { NextRequest, NextResponse } from "next/server";
import { PDFParse, VerbosityLevel } from "pdf-parse";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    let text = "";
    try {
      const parser = new PDFParse({ verbosity: VerbosityLevel.ERRORS, data: buffer });
      await (parser as any).load();
      const result = await parser.getText();
      text = result?.text ?? (typeof result === "string" ? result : "");
    } catch (e) {
      // Fallback: try to extract readable text from raw PDF binary
      console.warn("Primary PDF parse failed, trying fallback:", e);
      text = fallbackExtract(buffer.toString("latin1"));
    }

    if (!text.trim()) {
      return NextResponse.json({ error: "Empty or scanned PDF — try a text-based PDF" }, { status: 422 });
    }
    return NextResponse.json({ text: text.slice(0, 12000) });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

function fallbackExtract(raw: string): string {
  const chunks: string[] = [];
  const btEt = /BT([\s\S]*?)ET/g;
  let m: RegExpExecArray | null;
  while ((m = btEt.exec(raw)) !== null) {
    const parenRe = /\(([^)]{1,300})\)/g;
    let m2: RegExpExecArray | null;
    while ((m2 = parenRe.exec(m[1])) !== null) {
      const s = m2[1]
        .replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\\t/g, " ")
        .replace(/\\\(/g, "(").replace(/\\\)/g, ")").replace(/\\\\/g, "\\").trim();
      if (s.length > 1) chunks.push(s);
    }
  }
  if (chunks.length) return chunks.join(" ");
  return (raw.match(/[\x20-\x7E]{4,}/g) ?? [])
    .filter(s => !/^[\d\s./-]+$/.test(s))
    .join(" ")
    .slice(0, 12000);
}
