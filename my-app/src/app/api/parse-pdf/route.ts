import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  let tmpPath: string | null = null;
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    // Write to a temp file so pdf-parse v2 can read it via file:// URL
    tmpPath = join(tmpdir(), `cv_${randomUUID()}.pdf`);
    await writeFile(tmpPath, buffer);

    let text = "";
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { PDFParse, VerbosityLevel } = require("pdf-parse");
      const fileUrl = "file:///" + tmpPath.replace(/\\/g, "/");
      const parser = new PDFParse({ verbosity: VerbosityLevel.ERRORS, url: fileUrl });
      await parser.load();
      const result = await parser.getText();
      text = result?.text ?? (typeof result === "string" ? result : "");
    } catch {
      // Fallback: try to extract readable text from raw PDF binary
      text = fallbackExtract(buffer.toString("latin1"));
    }

    if (!text.trim()) {
      return NextResponse.json({ error: "Empty or scanned PDF — try a text-based PDF" }, { status: 422 });
    }
    return NextResponse.json({ text: text.slice(0, 12000) });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  } finally {
    // Always clean up the temp file
    if (tmpPath) {
      try { await unlink(tmpPath); } catch { /* ignore */ }
    }
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
