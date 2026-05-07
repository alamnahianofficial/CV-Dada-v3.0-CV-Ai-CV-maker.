"use client";
import { useState, useRef } from "react";
import { Upload, Loader2, CheckCircle, XCircle, FileText } from "lucide-react";
import { parseCVText } from "@/lib/aiHelpers";
import type { ResumeData } from "@/types/resume";

interface Props { setResume: (r: ResumeData) => void; }
type Status = "idle" | "reading" | "parsing" | "done" | "error";

async function extractDocxText(file: File): Promise<string> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const xmlFile = zip.file("word/document.xml");
  if (!xmlFile) throw new Error("Not a valid DOCX");
  const xml = await xmlFile.async("string");
  return xml.replace(/<w:br[^>]*\/>/g,"\n").replace(/<\/w:p>/g,"\n").replace(/<[^>]+>/g," ")
    .replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&apos;/g,"'").replace(/&quot;/g,'"')
    .replace(/[ \t]{2,}/g," ").replace(/\n{3,}/g,"\n\n").trim();
}

async function extractPdfText(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/parse-pdf", { method:"POST", body:fd });
  if (!res.ok) throw new Error(`PDF parse failed: ${res.statusText}`);
  const { text, error } = await res.json();
  if (error) throw new Error(error);
  return text ?? "";
}

export default function CVImport({ setResume }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setErrorMsg("");
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf","docx"].includes(ext)) { setErrorMsg("Only PDF or DOCX supported."); setStatus("error"); return; }
    setStatus("reading");
    let rawText = "";
    try {
      rawText = ext === "docx" ? await extractDocxText(file) : await extractPdfText(file);
    } catch(err) { setErrorMsg("Could not read file. Ensure it's a valid PDF or DOCX."); setStatus("error"); console.error(err); return; }
    if (!rawText.trim()) { setErrorMsg("File appears empty or is a scanned image. Try a text-based PDF."); setStatus("error"); return; }
    setStatus("parsing");
    await parseCVText(rawText, setResume, (s) => {
      if (s === "done") setStatus("done");
      else if (s === "error") { setErrorMsg("AI could not parse CV. Try again or fill manually."); setStatus("error"); }
    });
  };

  const reset = () => { setStatus("idle"); setFileName(""); setErrorMsg(""); if (inputRef.current) inputRef.current.value = ""; };
  const isLoading = status === "reading" || status === "parsing";

  return (
    <div className="sec-box" style={{borderColor:"rgba(99,102,241,0.25)"}}>
      <div style={{fontSize:9,fontWeight:900,color:"#a5b4fc",textTransform:"uppercase",letterSpacing:"0.2em",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
        <Upload size={12}/> Import Existing CV
      </div>
      <p style={{fontSize:10,color:"#475569",marginBottom:12,lineHeight:1.6}}>Upload your old PDF or DOCX — AI auto-fills all fields.</p>

      {status === "idle" && (
        <label onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)handleFile(f);}}
          style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,padding:"20px 16px",borderRadius:12,border:"2px dashed #1e293b",background:"rgba(99,102,241,0.03)",cursor:"pointer"}}>
          <div style={{width:40,height:40,borderRadius:10,background:"rgba(99,102,241,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <FileText size={20} color="#818cf8"/>
          </div>
          <div style={{textAlign:"center"}}>
            <p style={{fontSize:11,fontWeight:700,color:"#e2e8f0",margin:0}}>Drop PDF or DOCX here</p>
            <p style={{fontSize:10,color:"#475569",margin:"4px 0 0"}}>or click to browse</p>
          </div>
          <input ref={inputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)handleFile(f);}}/>
        </label>
      )}

      {isLoading && (
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,background:"rgba(99,102,241,0.07)",border:"1px solid rgba(99,102,241,0.2)"}}>
          <Loader2 size={18} color="#818cf8" style={{animation:"spin 1s linear infinite",flexShrink:0}}/>
          <div>
            <p style={{fontSize:11,fontWeight:700,color:"#e2e8f0",margin:0}}>{status==="reading"?"Reading file…":"AI parsing your CV…"}</p>
            <p style={{fontSize:10,color:"#475569",margin:"2px 0 0"}}>{fileName}</p>
          </div>
        </div>
      )}

      {status === "done" && (
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,padding:"12px 16px",borderRadius:12,background:"rgba(34,197,94,0.07)",border:"1px solid rgba(34,197,94,0.2)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <CheckCircle size={18} color="#4ade80" style={{flexShrink:0}}/>
            <div>
              <p style={{fontSize:11,fontWeight:700,color:"#4ade80",margin:0}}>CV imported!</p>
              <p style={{fontSize:10,color:"#475569",margin:"2px 0 0"}}>All fields filled. Review and edit.</p>
            </div>
          </div>
          <button onClick={reset} style={{background:"none",border:"1px solid #1e293b",borderRadius:7,padding:"4px 10px",color:"#64748b",fontSize:10,cursor:"pointer"}}>Import another</button>
        </div>
      )}

      {status === "error" && (
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,padding:"12px 16px",borderRadius:12,background:"rgba(239,68,68,0.07)",border:"1px solid rgba(239,68,68,0.2)"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
            <XCircle size={18} color="#f87171" style={{flexShrink:0,marginTop:1}}/>
            <div>
              <p style={{fontSize:11,fontWeight:700,color:"#f87171",margin:0}}>Import failed</p>
              <p style={{fontSize:10,color:"#94a3b8",margin:"3px 0 0",lineHeight:1.5}}>{errorMsg}</p>
            </div>
          </div>
          <button onClick={reset} style={{background:"none",border:"1px solid #1e293b",borderRadius:7,padding:"4px 10px",color:"#64748b",fontSize:10,cursor:"pointer",flexShrink:0}}>Try again</button>
        </div>
      )}
    </div>
  );
}
