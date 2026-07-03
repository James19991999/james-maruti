import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site-data";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const profileBuffer = await readFile(join(process.cwd(), "public/images/profile.png"));
  const profileSrc = `data:image/png;base64,${profileBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#00113a",
          padding: "60px",
        }}
      >
        <img
          src={profileSrc}
          width={320}
          height={510}
          style={{ objectFit: "cover", borderRadius: "12px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: 60,
            color: "#ffffff",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 28, color: "#c4a882", marginTop: 16 }}>
            UI Architect &amp; Digital Strategist
          </div>
          <div style={{ fontSize: 20, color: "#aab4c8", marginTop: 24, maxWidth: 520, lineHeight: 1.4 }}>
            Architecting scalable Next.js systems with media-psychology-driven UI/UX.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
