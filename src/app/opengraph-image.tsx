import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site";

export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SWATCHES = ["#E31C6B", "#FF5A45", "#E8A631", "#0E8F82", "#7C2E8C"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FAF6F2",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* signature multi-hue hairline, same as the site footer */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 10,
            background: `linear-gradient(90deg, ${SWATCHES.join(", ")})`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            padding: "72px 96px 64px",
          }}
        >
          {/* brand mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Arial, sans-serif",
              fontSize: 22,
              letterSpacing: "0.28em",
              color: "#96897E",
            }}
          >
            THE NAIL ATELIER
          </div>

          {/* headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 62,
                lineHeight: 1.2,
                color: "#1A1613",
              }}
            >
              <div style={{ display: "flex" }}>Luxury nail artistry,</div>
              <div style={{ display: "flex" }}>
                <span>brought to&nbsp;</span>
                <span style={{ display: "flex", color: "#E31C6B", fontStyle: "italic" }}>
                  your
                </span>
                <span>&nbsp;doorstep.</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Arial, sans-serif",
                fontSize: 24,
                lineHeight: 1.5,
                color: "#3B342C",
                maxWidth: 640,
              }}
            >
              Bespoke sets, hand-finished by {siteConfig.artist.name} — in the calm
              of your own space.
            </div>
          </div>

          {/* footer row: contact + polish-rack swatches */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 22,
                letterSpacing: "0.02em",
                color: "#1A1613",
              }}
            >
              <span style={{ display: "flex", fontWeight: 700 }}>
                thenailatelier.in
              </span>
              <span style={{ display: "flex", margin: "0 16px", color: "#96897E" }}>
                ·
              </span>
              <span style={{ display: "flex", color: "#3B342C" }}>
                {siteConfig.contact.phoneDisplay}
              </span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {SWATCHES.map((c) => (
                <div
                  key={c}
                  style={{
                    display: "flex",
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: c,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
