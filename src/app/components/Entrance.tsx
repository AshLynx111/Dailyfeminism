import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import img1 from "figma:asset/9b362052e5b7524cc56549a710bbf89c-1.jpg";
import img2 from "figma:asset/c16b39abb2f8e74ec1e49a0fd3a23c96-1.jpg";

const fragments = [
  { text: "THE PERSONAL IS POLITICAL", top: "20%", left: "62%", rot: "-2deg", size: "0.62rem", mono: true },
  { text: "VOL. I — 1848 — 1970 — 1989 — NOW", top: "81%", left: "6%", rot: "1.5deg", size: "0.58rem", mono: true },
  { text: "consciousness\nraising", top: "58%", left: "74%", rot: "-5deg", size: "0.85rem", italic: true },
  { text: "from theory to praxis", top: "91%", left: "42%", rot: "0.5deg", size: "0.65rem", italic: true },
  { text: "♀ FEMINIST ARCHIVE ♀", top: "6%", left: "42%", rot: "0deg", size: "0.6rem", mono: true },
  { text: "SISTERHOOD IS\nGLOBAL", top: "44%", left: "52%", rot: "3deg", size: "1.1rem", display: true },
  { text: "patriarchy is a structure, not a destiny.", top: "65%", left: "3%", rot: "-1.2deg", size: "0.72rem", italic: true },
  { text: "1848", top: "35%", left: "36%", rot: "-8deg", size: "3rem", display: true, ghost: true },
  { text: "—————", top: "74%", left: "58%", rot: "2deg", size: "1rem", mono: true },
];

export function Entrance() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fadeOut = useTransform(scrollYProgress, [0.4, 0.85], [1, 0]);

  return (
    <div
      id="entrance"
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "720px",
        overflow: "hidden",
        background: "#EDE8D8",
      }}
    >
      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
        opacity: 0.6,
      }} />

      {/* Purple ink wash */}
      <div style={{
        position: "absolute", top: "-20%", right: "-15%",
        width: "75%", height: "95%",
        background: "radial-gradient(ellipse at 60% 40%, rgba(44,10,94,0.12) 0%, rgba(44,10,94,0.04) 50%, transparent 72%)",
        zIndex: 1, pointerEvents: "none",
      }} />

      {/* Horizontal press lines */}
      {[46, 47.8, 49].map((t, i) => (
        <div key={i} style={{
          position: "absolute", top: `${t}%`, left: 0, right: 0,
          height: i === 1 ? "2px" : "1px",
          background: i === 1 ? "rgba(13,13,13,0.18)" : "rgba(13,13,13,0.07)",
          zIndex: 15, pointerEvents: "none",
        }} />
      ))}

      {/* Spine text - left edge */}
      <div style={{
        position: "absolute", left: "1.2rem", top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem",
        color: "#2C0A5E", letterSpacing: "0.28em", zIndex: 25,
        whiteSpace: "nowrap", opacity: 0.55,
      }}>
        FEMINIST ARCHIVE — EST. 1792 — ISSUE NO. 1 — CLASSIFIED
      </div>

      {/* Protest photo - background ghost layer */}
      <div style={{
        position: "absolute", top: "15%", left: "28%", width: "36%",
        zIndex: 3, opacity: 0.15, mixBlendMode: "multiply",
        transform: "rotate(1.2deg)",
      }}>
        <img
          src="https://images.unsplash.com/photo-1687602234660-4ec339ef6583?w=700&q=65"
          alt=""
          style={{ width: "100%", filter: "grayscale(1) contrast(1.4)" }}
        />
      </div>

      {/* Marching women - ghost */}
      <div style={{
        position: "absolute", bottom: "0", left: "18%", width: "28%",
        zIndex: 4, opacity: 0.12, mixBlendMode: "multiply",
        transform: "rotate(-0.8deg)",
      }}>
        <img
          src="https://images.unsplash.com/photo-1697183381110-afb6d440c305?w=600&q=65"
          alt=""
          style={{ width: "100%", filter: "grayscale(1) contrast(1.2)" }}
        />
      </div>

      {/* Sewing woman - primary image, large right */}
      <motion.div style={{
        position: "absolute", right: "-6%", bottom: 0,
        height: "95%", zIndex: 8, y: yFast,
      }}>
        <img
          src={img1}
          alt="Feminist collage — woman sewing"
          style={{
            height: "100%", width: "auto",
            filter: "saturate(0.6) contrast(1.08) sepia(0.12)",
            mixBlendMode: "multiply",
          }}
        />
      </motion.div>

      {/* Digital hands collage - left overlay */}
      <motion.div style={{
        position: "absolute", left: "2%", top: "-8%",
        height: "82%", zIndex: 9, y: ySlow,
      }}>
        <img
          src={img2}
          alt="Digital feminist collage"
          style={{
            height: "100%", width: "auto",
            filter: "saturate(0.25) contrast(1.3) sepia(0.04)",
            mixBlendMode: "multiply",
            transform: "rotate(-1.8deg)",
          }}
        />
      </motion.div>

      {/* DAILY — massive title */}
      <motion.div
        style={{ position: "absolute", top: "1%", left: "-2%", zIndex: 12, y: ySlow }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(7rem, 19vw, 17rem)",
          lineHeight: 0.82,
          color: "#0D0D0D",
          letterSpacing: "-0.01em",
          userSelect: "none",
        }}>
          DAILY
        </div>
      </motion.div>

      {/* FEMINISM — outlined */}
      <motion.div
        style={{ position: "absolute", top: "27%", left: "-1%", zIndex: 13, y: ySlow }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.18, ease: "easeOut" }}
      >
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(4.5rem, 13vw, 12rem)",
          lineHeight: 0.85,
          color: "transparent",
          WebkitTextStroke: "2px #2C0A5E",
          letterSpacing: "0.01em",
          userSelect: "none",
        }}>
          FEMINISM
        </div>
      </motion.div>

      {/* Subtitle under title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          position: "absolute", top: "50%", left: "1rem",
          fontFamily: "'IM Fell English', serif",
          fontStyle: "italic",
          fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
          color: "#2C0A5E",
          zIndex: 14,
          maxWidth: "260px",
          lineHeight: 1.5,
          transform: "translateY(1rem)",
        }}
      >
        Explore the many voices<br />of feminist thought
      </motion.div>

      {/* Scattered fragments */}
      {fragments.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 + i * 0.12 }}
          style={{
            position: "absolute",
            top: f.top, left: f.left,
            transform: `rotate(${f.rot})`,
            fontFamily: f.display ? "'Bebas Neue', sans-serif"
              : f.mono ? "'IBM Plex Mono', monospace"
              : "'Special Elite', cursive",
            fontSize: f.size,
            color: f.ghost ? "rgba(44,10,94,0.08)" : f.display ? "rgba(13,13,13,0.55)" : "#0D0D0D",
            fontStyle: f.italic ? "italic" : "normal",
            letterSpacing: f.mono ? "0.15em" : "0.04em",
            zIndex: f.ghost ? 2 : 16,
            whiteSpace: "pre-line",
            lineHeight: 1.35,
            userSelect: "none",
          }}
        >
          {f.text}
        </motion.div>
      ))}

      {/* Archive stamp box */}
      <div style={{
        position: "absolute", bottom: "18%", right: "14%",
        zIndex: 17, transform: "rotate(9deg)",
        border: "2px solid rgba(44,10,94,0.3)",
        padding: "0.4rem 0.8rem",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.6rem", color: "rgba(44,10,94,0.3)",
        letterSpacing: "0.25em", lineHeight: 1.6,
      }}>
        ARCHIVE<br />CLASSIFIED<br />♀ 1848
      </div>

      {/* Torn paper bottom edge */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "60px", zIndex: 28, pointerEvents: "none",
        clipPath: "polygon(0 100%, 0 30%, 2% 55%, 5% 20%, 8% 45%, 12% 10%, 16% 40%, 20% 8%, 25% 38%, 30% 12%, 35% 42%, 40% 6%, 45% 35%, 50% 15%, 55% 40%, 60% 5%, 65% 38%, 70% 12%, 75% 44%, 80% 8%, 85% 38%, 90% 14%, 95% 40%, 98% 18%, 100% 35%, 100% 100%)",
        background: "#EDE8D8",
      }} />

      {/* Enter CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          position: "absolute", bottom: "2.5rem",
          left: "50%", transform: "translateX(-50%)",
          zIndex: 25, textAlign: "center",
        }}
      >
        <motion.button
          onClick={() => document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" })}
          whileHover={{ letterSpacing: "0.3em" }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Special Elite', cursive",
            fontSize: "0.75rem", color: "#0D0D0D",
            letterSpacing: "0.2em", display: "flex",
            flexDirection: "column", alignItems: "center", gap: "0.3rem",
            transition: "letter-spacing 0.3s",
          }}
        >
          ENTER THE ARCHIVE
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "block" }}
          >
            ↓
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
