# CV Dada v2 — AI Powered CV Maker

> **Precision built. Privacy first.**  
> ATS-optimized resume builder with AI assistance — no accounts, no database, no tracking.

Built by **Nahian Alam**

---

## What's New in v2

- Fixed passport photo overlap in preview
- Fixed bullet point alignment in preview and Word export
- Fixed CGPA right-alignment in exported `.docx`
- Fixed all field name mismatches (`institution`, `cgpa`, `name`, `date`, `phone+email`)
- Word-native hanging indent bullets via `docx` Numbering API
- ATS calculator now scores education and project keywords correctly

---

## Features

- **Two professional templates** — Classic (Times New Roman, ATS-safe) and Minimal (Calibri, designer-ready)
- **AI generation** — generate a full CV from a brief text description via Nvidia Nemotron
- **AI improvement** — rewrite individual fields for ATS optimization
- **CV import** — upload an existing PDF or DOCX and auto-fill all fields
- **ATS score checker** — paste a job description and get a real-time keyword match score
- **Passport photo support** — embedded correctly in both preview and Word export
- **Word export only** — `.docx` with proper hanging-indent bullets, right-aligned dates, and embedded photo
- **Session-based privacy** — all data lives in browser memory, gone on refresh

---

## Stack

| Layer       | Tech                                                              |
| ----------- | ----------------------------------------------------------------- |
| Framework   | Next.js 16, React 19                                              |
| Styling     | Tailwind CSS v4                                                   |
| Language    | TypeScript                                                        |
| Word export | `docx` v9.6.1                                                     |
| DOCX import | `jszip`                                                           |
| AI          | OpenRouter → `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` |

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/alamnahianofficial/ai-resume-builder-clean.git
cd ai-resume-builder-clean
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get a free API key at [openrouter.ai](https://openrouter.ai)

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
  app/
    page.tsx                  # Landing page
    builder/page.tsx          # Builder UI
    api/ai/route.ts           # OpenRouter AI route (generate / improve / parse)
    api/parse-pdf/route.ts    # Server-side PDF text extraction
    globals.css
    layout.tsx
  components/
    StandardCV.tsx            # CV preview (Classic + Minimal)
    builder/
      AIModal.tsx
      AISuggestions.tsx
      ATSChecker.tsx
      CertificationsSection.tsx
      CVImport.tsx
      DocxTemplateSelector.tsx
      EducationSection.tsx
      ExperienceSection.tsx
      ExtrasSection.tsx
      PersonalSection.tsx
      PhotoUpload.tsx
      ProjectsSection.tsx
      ReferencesSection.tsx
      SkillsSection.tsx
      SummarySection.tsx
  lib/
    aiHelpers.ts
    atsCalculator.ts
    docxExport.ts
    resumeDefaults.ts
  types/
    resume.ts
```

---

## Templates

| Template | Font               | Best For                          |
| -------- | ------------------ | --------------------------------- |
| Classic  | Times New Roman    | Corporate, ATS-heavy applications |
| Minimal  | Calibri / Segoe UI | Design, tech, creative roles      |

---

## AI Modes

| Mode       | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `generate` | Build a full CV from a plain-text brief                    |
| `improve`  | Rewrite a single field with ATS-optimized language         |
| `parse`    | Extract structured data from raw CV text (PDF/DOCX import) |

---

## Privacy

- No database
- No user accounts
- No analytics or tracking
- All CV data is stored in React state only — disappears when the tab is closed or refreshed
- The AI API call sends only the text you submit, nothing else

---

## License

MIT © 2026 Nahian Alam
