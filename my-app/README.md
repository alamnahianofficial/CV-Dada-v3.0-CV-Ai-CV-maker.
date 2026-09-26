# CV Dada v3 — AI Powered CV Maker

> Built with privacy in mind. No accounts, no database, no tracking.

Made by **Nahian Alam**

---

## What's New in v3.0

- Switched the AI provider to Google's Gemini 2.5 Flash. It now automatically retries if the API is busy or overloaded.
- Added a backup way to download DOCX files, in case the browser blocks the normal download method.
- Added a new splash/loading screen with smooth animations when the app starts up.
- Fixed some bugs in how uploaded PDFs and DOCX files are read, so fields like institution, CGPA, certification dates, phone, and email now fill in correctly.
- Added quick prompt buttons (CS, Marketing, Finance, Customer Success) that auto-fill good starter descriptions for your field.
- Added a "Load Sample CV" button to quickly see an example, and a "Clear Form" button to start over.

---

## Features

- Two resume templates: Classic (Times New Roman, good for ATS) and Minimal (Calibri, good for design-focused roles).
- AI can build your whole CV from a short description, or read an existing PDF/DOCX and fill in the form for you.
- Paste a job description and get a score showing how well your CV matches it, plus suggestions for missing keywords.
- You can ask the AI to improve any single section of your CV to sound more professional.
- Supports uploading a passport-style photo, which shows up correctly in both the preview and the exported DOCX.
- Nothing is saved anywhere. Your data lives only in the browser and disappears when you refresh or close the tab.

---

## Tech Used

| Part          | Tool                                    |
| ------------- | ---------------------------------------- |
| Framework     | Next.js 16, React 19                     |
| Styling       | Tailwind CSS v4                          |
| Language      | TypeScript                               |
| Animations    | framer-motion v12                        |
| Word export   | docx v9.6.1                              |
| DOCX import   | jszip                                    |
| AI            | Google Gemini 2.5 Flash (OpenAI-style API) |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/alamnahianofficial/ai-resume-builder-clean.git
cd ai-resume-builder-clean
```

### 2. Install packages

```bash
npm install
```

### 3. Add your API key

Create a `.env.local` file in the project folder with:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

You can get a free key at [openrouter.ai](https://openrouter.ai)

### 4. Start the app

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## Project Structure
