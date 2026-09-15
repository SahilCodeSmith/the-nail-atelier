import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site";

export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF6F2",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.24em",
            color: "#1A1613",
          }}
        >
          THE NAIL ATELIER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.08,
            color: "#1A1613",
            maxWidth: "16ch",
          }}
        >
          Luxury nail artistry, brought to your doorstep.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.04em",
            color: "#E31C6B",
          }}
        >
          {`Home visits by appointment  ·  ${siteConfig.contact.phoneDisplay}`}
        </div>
      </div>
    ),
    size,
  );
}
