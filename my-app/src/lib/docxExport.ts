// ─── DOCX EXPORT — CV Dada by Nahian Alam ────────────────────────────────────
// Classic + Minimal only. Photo embedded via borderless 2-col table header.
// Field names match types/resume.ts: institution/cgpa/name/date/phone+email
//
// BULLET FIX: Uses docx Numbering API (Word-native list style) so wrapped
// lines correctly hang-indent under text, not under the bullet symbol.
// Two numbering references: "bul-classic" (Times NR) and "bul-minimal" (Calibri)

import type { ResumeData, DocxTemplate } from "@/types/resume";

export async function exportDocx(
  resume: ResumeData,
  photo: string | null,
  template: DocxTemplate = "classic",
) {
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    BorderStyle,
    Table,
    TableRow,
    TableCell,
    WidthType,
    ImageRun,
    VerticalAlign,
    LevelFormat,
    TabStopType,
  } = await import("docx");
  const { saveAs } = await import("file-saver");

  // ─── PHOTO → BUFFER ───────────────────────────────────────────────────────
  type ImgType = "png" | "jpg" | "gif" | "bmp";
  let photoBuffer: Uint8Array | null = null;
  let photoType: ImgType = "jpg";

  if (photo && photo.startsWith("data:")) {
    try {
      const mime = photo.split(";")[0].split(":")[1] ?? "";
      const b64 = photo.split(",")[1];
      if (b64) {
        const bin = atob(b64);
        const buf = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
        photoBuffer = buf;
        photoType = mime.includes("png")
          ? "png"
          : mime.includes("gif")
            ? "gif"
            : "jpg";
      }
    } catch {
      photoBuffer = null;
    }
  }

  // Passport size: 35mm × 45mm → 99pt × 128pt
  const PW_PT = 99;
  const PH_PT = 128;

  // ─── SHARED ───────────────────────────────────────────────────────────────
  const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const allNone = {
    top: noBorder,
    bottom: noBorder,
    left: noBorder,
    right: noBorder,
    insideH: noBorder,
    insideV: noBorder,
  };

  // ─── NUMBERING CONFIG ─────────────────────────────────────────────────────
  // Word-native hanging bullet lists. Each level:
  //   indent.left   = 540 twips (text column)
  //   indent.hanging= 360 twips (bullet sits at 540-360 = 180 twips)
  // Wrapped lines automatically continue at 540 twips — correct alignment.
  const numberingConfig = {
    config: [
      {
        reference: "bul-classic",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 540, hanging: 360 },
                spacing: { after: 40 },
              },
              run: { font: "Times New Roman", size: 18, color: "111111" },
            },
          },
        ],
      },
      {
        reference: "bul-minimal",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 540, hanging: 360 },
                spacing: { after: 40 },
              },
              run: { font: "Calibri", size: 18, color: "475569" },
            },
          },
        ],
      },
    ],
  };

  // Bullet paragraph factory — uses numbering reference, not manual indent
  const bul = (
    text: string,
    ref: "bul-classic" | "bul-minimal",
    color = "111111",
  ) =>
    text
      .split("\n")
      .filter((l) => l.replace(/^[•\-]\s*/, "").trim())
      .map(
        (line) =>
          new Paragraph({
            numbering: { reference: ref, level: 0 },
            children: [
              new TextRun({
                text: line.replace(/^[•\-]\s*/, "").trim(),
                color,
              }),
            ],
          }),
      );

  // ─── PHOTO TABLE HEADER ───────────────────────────────────────────────────
  function makeHeader(
    nameRuns: InstanceType<(typeof import("docx"))["TextRun"]>[],
    contactRuns: InstanceType<(typeof import("docx"))["TextRun"]>[],
    linkRuns: InstanceType<(typeof import("docx"))["TextRun"]>[],
    centered: boolean,
    borderColor: string,
  ): unknown[] {
    if (photoBuffer) {
      const textParagraphs = [
        new Paragraph({ spacing: { after: 60 }, children: nameRuns }),
        new Paragraph({ spacing: { after: 50 }, children: contactRuns }),
        ...(linkRuns.length
          ? [new Paragraph({ spacing: { after: 30 }, children: linkRuns })]
          : []),
      ];

      return [
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: allNone,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 72, type: WidthType.PERCENTAGE },
                  borders: allNone,
                  verticalAlign: VerticalAlign.TOP,
                  children: textParagraphs,
                }),
                new TableCell({
                  width: { size: 28, type: WidthType.PERCENTAGE },
                  borders: allNone,
                  verticalAlign: VerticalAlign.TOP,
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      spacing: { after: 0 },
                      children: [
                        new ImageRun({
                          data: photoBuffer,
                          type: photoType,
                          transformation: { width: PW_PT, height: PH_PT },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 80, after: 160 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 8, color: borderColor },
          },
          children: [],
        }),
      ];
    } else {
      const align = centered ? AlignmentType.CENTER : AlignmentType.LEFT;
      return [
        new Paragraph({
          alignment: align,
          spacing: { after: 60 },
          children: nameRuns,
        }),
        new Paragraph({
          alignment: align,
          spacing: { after: 60 },
          children: contactRuns,
        }),
        ...(linkRuns.length
          ? [
              new Paragraph({
                alignment: align,
                spacing: { after: 160 },
                border: {
                  bottom: {
                    style: BorderStyle.SINGLE,
                    size: 8,
                    color: borderColor,
                  },
                },
                children: linkRuns,
              }),
            ]
          : [
              new Paragraph({
                alignment: align,
                spacing: { after: 160 },
                border: {
                  bottom: {
                    style: BorderStyle.SINGLE,
                    size: 8,
                    color: borderColor,
                  },
                },
                children: [],
              }),
            ]),
      ];
    }
  }

  // ─── CLASSIC ──────────────────────────────────────────────────────────────
  function buildClassic() {
    const R = (text: string, opts: Record<string, unknown> = {}) =>
      new TextRun({ text, font: "Times New Roman", size: 20, ...opts });

    const sh = (label: string) =>
      new Paragraph({
        spacing: { before: 220, after: 80 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
        },
        children: [R(label.toUpperCase(), { bold: true, size: 22 })],
      });

    const rows: unknown[] = [
      ...makeHeader(
        [R(resume.full_name || "YOUR NAME", { bold: true, size: 40 })],
        [
          R(
            [resume.email, resume.phone, resume.location]
              .filter(Boolean)
              .join("  •  "),
            { size: 18, italics: true },
          ),
        ],
        resume.linkedin || resume.github || resume.portfolio
          ? [
              R(
                [resume.linkedin, resume.github, resume.portfolio]
                  .filter(Boolean)
                  .join("  |  "),
                { size: 17, color: "1a3a8f" },
              ),
            ]
          : [],
        !photoBuffer,
        "000000",
      ),
    ];

    if (resume.summary) {
      rows.push(sh("Professional Summary"));
      rows.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [R(resume.summary, { size: 19 })],
        }),
      );
    }

    if (resume.education.some((e) => e.institution || e.degree)) {
      rows.push(sh("Education"));
      resume.education
        .filter((e) => e.institution || e.degree)
        .forEach((e) => {
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
              children: [
                R(e.degree, { bold: true, size: 21 }),
                ...(e.duration
                  ? [
                      R("	"),
                      R(e.duration, {
                        size: 18,
                        color: "555555",
                        italics: true,
                      }),
                    ]
                  : []),
              ],
            }),
          );
          rows.push(
            new Paragraph({
              spacing: { after: 100 },
              tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
              children: [
                R(e.institution, { italics: true, size: 20 }),
                ...(e.cgpa
                  ? [R("	"), R(`CGPA: ${e.cgpa}`, { size: 18, color: "555555" })]
                  : []),
              ],
            }),
          );
        });
    }

    if (resume.experience.some((e) => e.role)) {
      rows.push(sh("Work Experience"));
      resume.experience
        .filter((e) => e.role)
        .forEach((e) => {
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              children: [
                R(e.role, { bold: true }),
                R("  |  "),
                R(e.org, { italics: true }),
                R(`  (${e.duration})`, { size: 18, color: "555555" }),
              ],
            }),
          );
          if (e.bullets)
            rows.push(...(bul(e.bullets, "bul-classic") as unknown[]));
          rows.push(new Paragraph({ spacing: { after: 100 }, children: [] }));
        });
    }

    const projs = resume.projects.filter((p) => p.type !== "thesis" && p.name);
    if (projs.length) {
      rows.push(sh("Projects"));
      projs.forEach((p) => {
        rows.push(
          new Paragraph({
            spacing: { after: 20 },
            children: [
              R(p.name, { bold: true }),
              ...(p.duration
                ? [R(`  (${p.duration})`, { size: 18, color: "555555" })]
                : []),
            ],
          }),
        );
        if (p.link)
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              children: [R(p.link, { size: 17, color: "1a3a8f" })],
            }),
          );
        if (p.bullets)
          rows.push(...(bul(p.bullets, "bul-classic") as unknown[]));
        rows.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
      });
    }

    const theses = resume.projects.filter((p) => p.type === "thesis" && p.name);
    if (theses.length) {
      rows.push(sh("Thesis / Research"));
      theses.forEach((p) => {
        rows.push(
          new Paragraph({
            spacing: { after: 20 },
            children: [R(p.name, { bold: true })],
          }),
        );
        if (p.link)
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              children: [R(p.link, { size: 17, color: "1a3a8f" })],
            }),
          );
        if (p.bullets)
          rows.push(...(bul(p.bullets, "bul-classic") as unknown[]));
        rows.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
      });
    }

    if (resume.skills.some((s) => s.skills)) {
      rows.push(sh("Skills"));
      resume.skills
        .filter((s) => s.skills)
        .forEach((s) => {
          rows.push(
            new Paragraph({
              spacing: { after: 50 },
              children: [
                ...(s.category
                  ? [R(`${s.category}: `, { bold: true, size: 19 })]
                  : []),
                R(s.skills, { size: 19 }),
              ],
            }),
          );
        });
    }

    if (resume.certifications.some((c) => c.name)) {
      rows.push(sh("Certifications"));
      resume.certifications
        .filter((c) => c.name)
        .forEach((c) => {
          rows.push(
            new Paragraph({
              spacing: { after: 50 },
              children: [
                R(c.name, { bold: true }),
                R(`  —  ${[c.issuer, c.date].filter(Boolean).join(", ")}`, {
                  size: 18,
                  italics: true,
                }),
              ],
            }),
          );
        });
    }

    if (resume.references.some((r) => r.name)) {
      rows.push(sh("References"));
      resume.references
        .filter((r) => r.name)
        .forEach((r) => {
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              children: [
                R(r.name, { bold: true }),
                ...(r.title || r.org
                  ? [
                      R(`  —  ${[r.title, r.org].filter(Boolean).join(", ")}`, {
                        italics: true,
                        size: 18,
                      }),
                    ]
                  : []),
              ],
            }),
          );
          if (r.phone || r.email) {
            rows.push(
              new Paragraph({
                spacing: { after: 80 },
                children: [
                  R([r.phone, r.email].filter(Boolean).join("  ·  "), {
                    size: 17,
                    color: "555555",
                  }),
                ],
              }),
            );
          }
        });
    }

    if (resume.extras.some((x) => x.value)) {
      rows.push(sh("Additional Information"));
      resume.extras
        .filter((x) => x.value)
        .forEach((x) => {
          rows.push(
            new Paragraph({
              spacing: { after: 50 },
              children: [
                ...(x.label
                  ? [R(`${x.label}: `, { bold: true, size: 19 })]
                  : []),
                R(x.value, { size: 19 }),
              ],
            }),
          );
        });
    }

    return [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children: rows,
      },
    ];
  }

  // ─── MINIMAL ──────────────────────────────────────────────────────────────
  function buildMinimal() {
    const R = (text: string, opts: Record<string, unknown> = {}) =>
      new TextRun({ text, font: "Calibri", size: 20, ...opts });

    const sh = (label: string) =>
      new Paragraph({
        spacing: { before: 240, after: 80 },
        children: [
          R("▌ ", { color: "4f46e5", size: 20 }),
          R(label.toUpperCase(), { bold: true, size: 20, color: "0f172a" }),
        ],
      });

    const rows: unknown[] = [
      ...makeHeader(
        [
          R(resume.full_name || "YOUR NAME", {
            bold: true,
            size: 44,
            color: "0f172a",
          }),
        ],
        [
          R(
            [resume.email, resume.phone, resume.location]
              .filter(Boolean)
              .join("   ·   "),
            { size: 17, color: "475569" },
          ),
        ],
        resume.linkedin || resume.github || resume.portfolio
          ? [
              R(
                [resume.linkedin, resume.github, resume.portfolio]
                  .filter(Boolean)
                  .join("   ·   "),
                { size: 16, color: "4f46e5" },
              ),
            ]
          : [],
        false,
        "4f46e5",
      ),
    ];

    if (resume.summary) {
      rows.push(sh("Summary"));
      rows.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [R(resume.summary, { size: 19, color: "334155" })],
        }),
      );
    }

    if (resume.experience.some((e) => e.role)) {
      rows.push(sh("Experience"));
      resume.experience
        .filter((e) => e.role)
        .forEach((e) => {
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              children: [
                R(e.role, { bold: true, size: 20, color: "1e293b" }),
                R(`   ${e.org}`, { size: 18, color: "4f46e5" }),
                R(`   ${e.duration}`, { size: 16, color: "94a3b8" }),
              ],
            }),
          );
          if (e.bullets)
            rows.push(
              ...(bul(e.bullets, "bul-minimal", "475569") as unknown[]),
            );
          rows.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
        });
    }

    if (resume.education.some((e) => e.institution || e.degree)) {
      rows.push(sh("Education"));
      resume.education
        .filter((e) => e.institution || e.degree)
        .forEach((e) => {
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
              children: [
                R(e.degree, { bold: true, size: 19, color: "1e293b" }),
                R("	"),
                R(e.duration, { size: 16, color: "94a3b8", italics: true }),
              ],
            }),
          );
          rows.push(
            new Paragraph({
              spacing: { after: 80 },
              tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
              children: [
                R(e.institution, { size: 18, color: "4f46e5" }),
                ...(e.cgpa
                  ? [R("	"), R(`CGPA: ${e.cgpa}`, { size: 16, color: "94a3b8" })]
                  : []),
              ],
            }),
          );
        });
    }

    const projs = resume.projects.filter((p) => p.type !== "thesis" && p.name);
    if (projs.length) {
      rows.push(sh("Projects"));
      projs.forEach((p) => {
        rows.push(
          new Paragraph({
            spacing: { after: 20 },
            children: [
              R(p.name, { bold: true, size: 19, color: "1e293b" }),
              ...(p.duration
                ? [R(`   ${p.duration}`, { size: 15, color: "94a3b8" })]
                : []),
            ],
          }),
        );
        if (p.link)
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              children: [R(p.link, { size: 16, color: "4f46e5" })],
            }),
          );
        if (p.bullets)
          rows.push(...(bul(p.bullets, "bul-minimal", "475569") as unknown[]));
        rows.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
      });
    }

    const theses = resume.projects.filter((p) => p.type === "thesis" && p.name);
    if (theses.length) {
      rows.push(sh("Thesis / Research"));
      theses.forEach((p) => {
        rows.push(
          new Paragraph({
            spacing: { after: 20 },
            children: [R(p.name, { bold: true, size: 19, color: "1e293b" })],
          }),
        );
        if (p.link)
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              children: [R(p.link, { size: 16, color: "4f46e5" })],
            }),
          );
        if (p.bullets)
          rows.push(...(bul(p.bullets, "bul-minimal", "475569") as unknown[]));
        rows.push(new Paragraph({ spacing: { after: 80 }, children: [] }));
      });
    }

    if (resume.skills.some((s) => s.skills)) {
      rows.push(sh("Skills"));
      resume.skills
        .filter((s) => s.skills)
        .forEach((s) => {
          rows.push(
            new Paragraph({
              spacing: { after: 50 },
              children: [
                ...(s.category
                  ? [
                      R(`${s.category}:  `, {
                        bold: true,
                        size: 18,
                        color: "0f172a",
                      }),
                    ]
                  : []),
                R(s.skills, { size: 18, color: "334155" }),
              ],
            }),
          );
        });
    }

    if (resume.certifications.some((c) => c.name)) {
      rows.push(sh("Certifications"));
      resume.certifications
        .filter((c) => c.name)
        .forEach((c) => {
          rows.push(
            new Paragraph({
              spacing: { after: 50 },
              children: [
                R(c.name, { bold: true, size: 18, color: "1e293b" }),
                R(`   ${[c.issuer, c.date].filter(Boolean).join(" · ")}`, {
                  size: 16,
                  color: "94a3b8",
                }),
              ],
            }),
          );
        });
    }

    if (resume.references.some((r) => r.name)) {
      rows.push(sh("References"));
      resume.references
        .filter((r) => r.name)
        .forEach((r) => {
          rows.push(
            new Paragraph({
              spacing: { after: 20 },
              children: [
                R(r.name, { bold: true, size: 19, color: "1e293b" }),
                R(`   ${[r.title, r.org].filter(Boolean).join(", ")}`, {
                  size: 16,
                  color: "64748b",
                  italics: true,
                }),
              ],
            }),
          );
          if (r.phone || r.email) {
            rows.push(
              new Paragraph({
                spacing: { after: 80 },
                children: [
                  R([r.phone, r.email].filter(Boolean).join("  ·  "), {
                    size: 16,
                    color: "4f46e5",
                  }),
                ],
              }),
            );
          }
        });
    }

    if (resume.extras.some((x) => x.value)) {
      rows.push(sh("Additional"));
      resume.extras
        .filter((x) => x.value)
        .forEach((x) => {
          rows.push(
            new Paragraph({
              spacing: { after: 50 },
              children: [
                ...(x.label
                  ? [
                      R(`${x.label}:  `, {
                        bold: true,
                        size: 18,
                        color: "0f172a",
                      }),
                    ]
                  : []),
                R(x.value, { size: 18, color: "334155" }),
              ],
            }),
          );
        });
    }

    return [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children: rows,
      },
    ];
  }

  // ─── BUILD & SAVE ─────────────────────────────────────────────────────────
  const sections = template === "minimal" ? buildMinimal() : buildClassic();
  const doc = new Document({
    creator: "CV Dada by Nahian Alam",
    title: `${resume.full_name || "Resume"} — CV Dada`,
    numbering: numberingConfig,
    sections,
  });
  saveAs(
    await Packer.toBlob(doc),
    `${(resume.full_name || "Resume").replace(/\s+/g, "_")}_${template}_CVDada.docx`,
  );
}
