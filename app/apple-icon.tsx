import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Image() {
  const profileBuffer = await readFile(join(process.cwd(), "public/images/profile.png"));
  const profileSrc = `data:image/png;base64,${profileBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          backgroundColor: "#00113a",
        }}
      >
        <img
          src={profileSrc}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }}
        />
      </div>
    ),
    { ...size }
  );
}
