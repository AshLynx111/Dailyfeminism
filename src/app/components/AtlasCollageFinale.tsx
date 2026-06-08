import femaleCollagePreview from "../../imports/collage/female-collage-violet-soft.png";
import { useLanguage } from "../i18n";

export function AtlasCollageFinale() {
  const { isZh } = useLanguage();

  return (
    <section
      id="atlas-collage-finale"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(90deg, rgba(111,0,255,0.1) 1px, transparent 1px), linear-gradient(0deg, rgba(17,17,17,0.045) 1px, transparent 1px), var(--daily-paper)",
        backgroundSize: "72px 72px",
        padding: "5rem 1rem 5.5rem",
        display: "grid",
        justifyItems: "center",
        color: "var(--daily-black)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(17,17,17,0.16) 1px, transparent 1.5px)",
          backgroundSize: "18px 18px",
          opacity: 0.24,
        }}
      />
      <figure
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(100%, 980px)",
          margin: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            background: "#fff",
            boxShadow: "0 24px 70px rgba(17,17,17,0.16), 14px 14px 0 rgba(111,0,255,0.18)",
            overflow: "hidden",
          }}
        >
          <img
            src={femaleCollagePreview}
            alt="Female collage preview"
            decoding="async"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "contrast(1.05) brightness(1.03)",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(111,0,255,0.18), transparent 38%, rgba(111,0,255,0.08))",
              mixBlendMode: "soft-light",
              pointerEvents: "none",
            }}
          />
        </div>
        <figcaption
          style={{
            margin: "1.55rem auto 0",
            maxWidth: "none",
            whiteSpace: "nowrap",
            textAlign: "center",
            fontFamily: "'IM Fell English', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(0.72rem, 1.6vw, 1.3rem)",
            lineHeight: 1.55,
            color: "rgba(17,17,17,0.72)",
          }}
        >
          {isZh ? "女性主义从来不是一种声音，而是一代代女性留下的思想与行动。" : "Feminism has never been a single voice, but the ideas and actions women leave for one another."}
        </figcaption>
      </figure>
    </section>
  );
}
