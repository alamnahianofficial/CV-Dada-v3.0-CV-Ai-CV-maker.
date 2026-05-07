"use client";
import { ImageIcon } from "lucide-react";

interface Props {
  photo: string | null;
  setPhoto: (p: string | null) => void;
}

// Only show photo if it's a real uploaded file (base64 data URL)
const isReal = (p: string | null) => !!p && p.startsWith("data:");

export default function PhotoUpload({ photo, setPhoto }: Props) {
  const valid = isReal(photo);
  return (
    <div className="sec-box flex items-center gap-5 mb-2">
      <label className="cursor-pointer">
        <div
          style={{
            width: 88,
            height: 110,
            borderRadius: 10,
            overflow: "hidden",
            border: valid ? "2px solid #3b82f6" : "2px dashed #334155",
            background: "#0f172a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {valid ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo!}
              alt="Profile preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          ) : (
            <ImageIcon size={22} color="#475569" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = () => setPhoto(r.result as string);
            r.readAsDataURL(f);
          }}
        />
      </label>
      <div>
        <p className="text-sm font-bold text-white mb-1">Passport Photo</p>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">
          Click to upload
        </p>
        {photo && (
          <button
            onClick={() => setPhoto(null)}
            className="text-[10px] text-red-400 hover:text-red-300 transition-colors font-semibold"
          >
            ✕ Remove
          </button>
        )}
      </div>
    </div>
  );
}
