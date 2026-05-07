"use client";
// ─── SECTION HEADER ───────────────────────────────────────────────────────────
// Reused by every builder section panel.

import { ChevronDown, ChevronUp } from "lucide-react";

interface SecHeaderProps {
  id: string;
  label: string;
  num: string;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export default function SecHeader({ id, label, num, collapsed, onToggle }: SecHeaderProps) {
  return (
    <button
      onClick={() => onToggle(id)}
      className="w-full flex justify-between items-center mb-3"
      style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <div className="sec-label mb-0">{num} · {label}</div>
      {collapsed[id]
        ? <ChevronDown size={14} color="#475569" />
        : <ChevronUp  size={14} color="#475569" />}
    </button>
  );
}
