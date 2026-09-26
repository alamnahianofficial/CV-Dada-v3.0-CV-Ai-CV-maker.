# CV Dada v3

**AI-powered CV builder. Privacy first, no accounts, no tracking.**

Built by **Nahian Alam**

---

## Overview

CV Dada helps you build a clean, ATS-friendly resume in minutes. Fill out the form yourself, generate one with AI from a short description, or upload an old resume and let it auto-fill everything. Nothing is stored — all data lives in your browser session and disappears when you close the tab.

---

## Features

- **Two templates** — Classic (Times New Roman, ATS-safe) and Minimal (Calibri, design-friendly)
- **AI generation** — build a full CV from a short text description
- **Smart parsing** — upload a PDF or DOCX resume and auto-fill the form
- **ATS score checker** — paste a job description to see your match score and missing keywords
- **AI field improvement** — rewrite any section to sound more professional
- **Photo support** — upload and embed a passport-style photo in your CV
- **Zero storage** — no database, no accounts, no analytics

---

## Tech Stack

| Layer       | Tool                                      |
| ----------- | ------------------------------------------ |
| Framework   | Next.js 16, React 19                       |
| Styling     | Tailwind CSS v4                            |
| Language    | TypeScript                                 |
| Animations  | Framer Motion v12                          |
| Word export | docx v9.6.1                                |
| DOCX import | jszip                                      |
| AI          | Google Gemini 2.5 Flash (via OpenRouter)   |

---

## Getting Started

```bash
git clone https://github.com/alamnahianofficial/ai-resume-builder-clean.git
cd ai-resume-builder-clean
npm install
```

Create a `.env.local` file in the project root:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get a free API key at [openrouter.ai](https://openrouter.ai)

Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure
src/
  app/
    page.tsx                  # Landing page
    builder/page.tsx          # Builder UI
    api/ai/route.ts           # AI route (generate / improve / parse)
    api/parse-pdf/route.ts    # Server-side PDF text extraction
  components/
    StandardCV.tsx            # CV preview (Classic + Minimal)
    builder/                  # Form sections, AI modal, ATS checker, etc.
  lib/
    aiHelpers.ts
    atsCalculator.ts
    docxExport.ts
    resumeDefaults.ts
  types/
    resume.ts

    
---

## Templates

| Template | Font                | Best For                          |
| -------- | ------------------- | ---------------------------------- |
| Classic  | Times New Roman      | Corporate, ATS-heavy applications |
| Minimal  | Calibri / Segoe UI   | Design, tech, creative roles      |

---

## AI Modes

| Mode     | Description                                         |
| -------- | ----------------------------------------------------- |
| generate | Build a full CV from a plain-text brief               |
| improve  | Rewrite a single field with better, ATS-ready wording  |
| parse    | Extract structured data from an uploaded PDF/DOCX      |

---

## Privacy

No database. No accounts. No tracking. All CV data lives in React state and is cleared the moment you refresh or close the tab. The AI call sends only the text you submit — nothing else.
