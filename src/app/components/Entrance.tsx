import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import sewingRoad from "../../imports/9b362052e5b7524cc56549a710bbf89c-1.jpg";
import blueHands from "../../imports/c16b39abb2f8e74ec1e49a0fd3a23c96-1.jpg";
import { useLanguage } from "../i18n";

const fragments = [
  { en: "THE PERSONAL IS POLITICAL", zh: "个人的即政治的", top: "18%", left: "64%", rot: "-2deg", tone: "violet" },
  { en: "NO GODS / NO MASTERS / NO SILENCE", zh: "不沉默 / 不服从 / 不退让", top: "30%", left: "6%", rot: "-1deg", tone: "white" },
  { en: "SISTERHOOD IS GLOBAL", zh: "姐妹情谊是全球性的", top: "52%", left: "56%", rot: "2deg", tone: "dark" },
  { en: "FROM THEORY TO PRAXIS", zh: "从理论到实践", top: "72%", left: "8%", rot: "1.5deg", tone: "violet" },
  { en: "ARCHIVE / ATLAS / QUIZ", zh: "档案 / 图谱 / 测验", top: "82%", left: "61%", rot: "-3deg", tone: "white" },
];

const violet = "#6F00FF";
const deepViolet = "#24004D";
const nearBlack = "#111111";
const paperWhite = "#F5F5F5";
const paper = "#F7F4FF";

export function Entrance() {
  const ref = useRef<HTMLDivElement>(null);
  const { isZh } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -44]);

  return (
    <section
      id="entrance"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "720px",
        height: "100vh",
        overflow: "hidden",
        background: paper,
        color: nearBlack,
        isolation: "isolate",
      }}
    >
      <style>
        {`
          @media (max-width: 700px) {
            .entrance-subtitle {
              left: 2.25rem !important;
              top: 58vh !important;
              max-width: calc(100vw - 4.5rem) !important;
            }

            .entrance-spine {
              display: none !important;
            }

            .entrance-fragment {
              font-size: 0.48rem !important;
              letter-spacing: 0.09em !important;
              box-shadow: 5px 5px 0 rgba(0,0,0,0.25) !important;
            }

            .entrance-fragment[data-fragment="0"] {
              display: none !important;
            }

            .entrance-fragment[data-fragment="2"] {
              display: none !important;
            }

            .entrance-fragment[data-fragment="4"] {
              display: none !important;
            }

            .entrance-title-daily {
              font-size: 5.45rem !important;
            }

            .entrance-title-feminism {
              font-size: 3.45rem !important;
            }
          }
        `}
      </style>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(111,0,255,0.12) 0 1px, transparent 1px 100%), linear-gradient(0deg, rgba(17,17,17,0.055) 0 1px, transparent 1px 100%)",
          backgroundSize: "72px 72px",
          opacity: 0.75,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backgroundImage:
            "radial-gradient(rgba(17,17,17,0.12) 1px, transparent 1.5px), radial-gradient(rgba(111,0,255,0.25) 1px, transparent 1.5px)",
          backgroundPosition: "0 0, 12px 12px",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(90deg, black 0 34%, transparent 34% 58%, black 58% 100%)",
          opacity: 0.26,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 25,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
          opacity: 0.06,
          contain: "paint",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "clamp(14px, 2vw, 24px)",
          background: violet,
          zIndex: 9,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-9vw",
          bottom: "11%",
          width: "clamp(170px, 24vw, 360px)",
          aspectRatio: "1",
          border: "clamp(18px, 3vw, 42px) solid rgba(111,0,255,0.22)",
          borderRadius: "50%",
          zIndex: 5,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "clamp(34px, 8vw, 110px)",
          top: "6%",
          width: "clamp(130px, 18vw, 260px)",
          height: "clamp(12px, 1.5vw, 22px)",
          background: violet,
          boxShadow: "88px 34px 0 rgba(255,255,255,0.86), 38px 68px 0 rgba(111,0,255,0.72)",
          zIndex: 10,
        }}
      />

      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "clamp(18px, 4vw, 58px)",
          top: "8%",
          width: "clamp(150px, 24vw, 350px)",
          height: "76%",
          y: ySlow,
          zIndex: 6,
          transform: "rotate(-1.5deg)",
        }}
      >
        <img
          src={blueHands}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 18%",
            filter: "grayscale(1) contrast(1.2) brightness(1.18)",
            opacity: 0.22,
          }}
        />
        <div
          className="entrance-title-daily"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(111,0,255,0.12), transparent 58%, rgba(111,0,255,0.16))",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          right: "-5%",
          bottom: 0,
          height: "96%",
          width: "min(62vw, 760px)",
          y: yFast,
          zIndex: 7,
        }}
      >
        <img
          src={sewingRoad}
          alt="Vintage collage of a woman sewing a road"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "right bottom",
            filter: "grayscale(1) contrast(1.06) brightness(1.22)",
            opacity: 0.34,
          }}
        />
      </motion.div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "6%",
          top: "10%",
          bottom: "16%",
          width: "min(38vw, 460px)",
          zIndex: 8,
          background:
            "linear-gradient(90deg, transparent 0 45%, rgba(111,0,255,0.82) 45% 49%, transparent 49% 100%), linear-gradient(0deg, transparent 0 24%, rgba(255,255,255,0.92) 24% 27%, transparent 27% 100%)",
          clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 92%)",
          opacity: 0.24,
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          left: "clamp(2rem, 8vw, 7rem)",
          top: "clamp(7.5rem, 18vh, 11rem)",
          zIndex: 14,
          y: titleY,
        }}
        initial={{ opacity: 0, x: -36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        <div
          className="entrance-title-feminism"
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: "clamp(6.2rem, 17vw, 16rem)",
            lineHeight: 0.82,
            color: nearBlack,
            letterSpacing: 0,
            userSelect: "none",
            textShadow: "0 12px 34px rgba(111,0,255,0.14)",
          }}
        >
          DAILY
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: "clamp(4.4rem, 12vw, 11rem)",
            lineHeight: 0.82,
            color: "transparent",
          WebkitTextStroke: `2px ${violet}`,
            letterSpacing: 0,
            userSelect: "none",
          }}
        >
          FEMINISM
        </div>
      </motion.div>

      <motion.p
        className="entrance-subtitle"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        style={{
          position: "absolute",
          left: "clamp(2.2rem, 8vw, 7.2rem)",
          top: "clamp(25rem, 58vh, 32rem)",
          maxWidth: "min(440px, 68vw)",
          zIndex: 14,
          margin: 0,
          fontFamily: "'IM Fell English', Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(1rem, 2vw, 1.35rem)",
          lineHeight: 1.42,
          color: "rgba(17,17,17,0.72)",
        }}
      >
          {isZh ? "女性主义从来不是一种声音，而是一代代女性留下的思想与行动。" : "Feminism has never been a single voice, but the ideas and actions women leave for one another."}
      </motion.p>

      {fragments.map((fragment, index) => {
        const palette =
          fragment.tone === "violet"
              ? { background: violet, color: paperWhite, border: "rgba(17,17,17,0.18)" }
            : fragment.tone === "dark"
              ? { background: "rgba(17,17,17,0.92)", color: paperWhite, border: "rgba(111,0,255,0.72)" }
              : { background: "rgba(255,255,255,0.92)", color: nearBlack, border: "rgba(111,0,255,0.42)" };

        return (
          <motion.div
            key={fragment.en}
            className="entrance-fragment"
            data-fragment={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 + index * 0.12 }}
            style={{
              position: "absolute",
              top: fragment.top,
              left: fragment.left,
              transform: `rotate(${fragment.rot})`,
              zIndex: 13,
              padding: "0.32rem 0.55rem",
              border: `1px solid ${palette.border}`,
              background: palette.background,
              color: palette.color,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "clamp(0.48rem, 0.9vw, 0.68rem)",
              lineHeight: 1.2,
              letterSpacing: "0.12em",
              whiteSpace: "nowrap",
              boxShadow: "8px 8px 0 rgba(0,0,0,0.25)",
              userSelect: "none",
            }}
          >
            {isZh ? fragment.zh : fragment.en}
          </motion.div>
        );
      })}

      <div
        className="entrance-spine"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "2.5rem",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          zIndex: 16,
          color: "rgba(111,0,255,0.72)",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.62rem",
          letterSpacing: "0.26em",
          whiteSpace: "nowrap",
        }}
      >
        {isZh ? "女性主义档案 / 紫色特刊 / 1792 至今" : "FEMINIST ARCHIVE / PURPLE ISSUE / 1792 TO NOW"}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "clamp(125px, 18vh, 176px)",
          zIndex: 18,
          background: `linear-gradient(180deg, transparent, ${paper} 58%, ${paper})`,
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.65 }}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(2rem, 5vh, 3.4rem)",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <button
          onClick={() => document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            minWidth: "clamp(150px, 18vw, 210px)",
            padding: "0.86rem 1.25rem",
            background: violet,
            color: paperWhite,
            border: "1px solid rgba(255,255,255,0.72)",
            cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.76rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            boxShadow: `10px 10px 0 ${deepViolet}`,
            transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.transform = "translateY(-3px)";
            event.currentTarget.style.boxShadow = `13px 13px 0 ${deepViolet}`;
            event.currentTarget.style.background = "#A78BFA";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = "translateY(0)";
            event.currentTarget.style.boxShadow = `10px 10px 0 ${deepViolet}`;
            event.currentTarget.style.background = violet;
          }}
        >
          {isZh ? "开始" : "START"}
        </button>
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            color: "rgba(17,17,17,0.52)",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "1.2rem",
          }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
