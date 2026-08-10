import { ImageResponse } from "next/og";
import { site } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1c2333",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5b9bd9",
            marginBottom: 28,
            display: "flex",
          }}
        >
          Est. {site.founded} · Abu Dhabi, UAE
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 980,
            display: "flex",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 56,
            fontSize: 24,
            color: "#c7d0e0",
          }}
        >
          <div style={{ display: "flex" }}>{site.yearsInBusiness} Years</div>
          <div style={{ display: "flex" }}>ISO 9001 Certified</div>
          <div style={{ display: "flex" }}>{site.name}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
