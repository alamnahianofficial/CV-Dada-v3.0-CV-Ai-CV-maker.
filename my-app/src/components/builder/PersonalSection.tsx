"use client";
// ─── PERSONAL SECTION ────────────────────────────────────────────────────────

import SecHeader from "./SecHeader";
import type { ResumeData } from "@/types/resume";

interface Props {
  resume: ResumeData;
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  setField: (f: keyof ResumeData, v: string) => void;
}

function LinkInput({
  icon,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 10,
        padding: "0 10px",
        height: 38,
      }}
    >
      <span style={{ flexShrink: 0, opacity: 0.5 }}>{icon}</span>
      <input
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: 12,
          color: "#e2e8f0",
        }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#60a5fa">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" fill="#60a5fa" />
    <circle cx="4" cy="4" r="2" fill="#60a5fa" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PortfolioIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function PersonalSection({ resume, collapsed, onToggle, setField }: Props) {
  return (
    <div className="sec-box">
      <SecHeader id="personal" label="Personal Information" num="1" collapsed={collapsed} onToggle={onToggle} />
      {!collapsed["personal"] && (
        <>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              className="di text-xs col-span-2"
              placeholder="Full Name"
              value={resume.full_name}
              onChange={(e) => setField("full_name", e.target.value)}
            />
            <input
              className="di text-xs"
              placeholder="Email"
              value={resume.email}
              onChange={(e) => setField("email", e.target.value)}
            />
            <input
              className="di text-xs"
              placeholder="Phone"
              value={resume.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
            <input
              className="di text-xs col-span-2"
              placeholder="Location  e.g. Dhaka, Bangladesh"
              value={resume.location}
              onChange={(e) => setField("location", e.target.value)}
            />
          </div>

          {/* Profile Links — each has a proper box with an icon */}
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "#475569",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 8,
              marginTop: 12,
            }}
          >
            Profile Links
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <LinkInput
              icon={<LinkedInIcon />}
              placeholder="LinkedIn URL  e.g. linkedin.com/in/yourname"
              value={resume.linkedin}
              onChange={(v) => setField("linkedin", v)}
            />
            <LinkInput
              icon={<GitHubIcon />}
              placeholder="GitHub URL  e.g. github.com/yourname"
              value={resume.github}
              onChange={(v) => setField("github", v)}
            />
            <LinkInput
              icon={<PortfolioIcon />}
              placeholder="Portfolio / Website URL"
              value={resume.portfolio}
              onChange={(v) => setField("portfolio", v)}
            />
          </div>
        </>
      )}
    </div>
  );
}
