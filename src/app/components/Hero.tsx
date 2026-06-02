import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import img1 from "figma:asset/9b362052e5b7524cc56549a710bbf89c.jpg";
import img2 from "figma:asset/c16b39abb2f8e74ec1e49a0fd3a23c96.jpg";

const floatingWords = [
  "LIBERATION", "EQUALITY", "RESISTANCE", "SOLIDARITY",
  "INTERSECTIONALITY", "AUTONOMY", "THEORY", "PRAXIS",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const scrollToAtlas = () => {
    document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="hero"
      ref={ref}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        background: "#0A0414",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(196,181,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          zIndex: 1,
        }}
      />

      {/* Gradient blobs */}
      <motion.div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,47,190,0.35) 0%, transparent 70%)",
          top: "-100px",
          left: "-100px",
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
          zIndex: 2,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,22,158,0.25) 0%, transparent 70%)",
          bottom: "-50px",
          right: "-50px",
          x: mousePos.x * -0.3,
          y: mousePos.y * -0.3,
          zIndex: 2,
        }}
      />

      {/* Collage image 1 - vintage sewing woman */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "0",
          left: "-5%",
          width: "42%",
          maxWidth: "480px",
          y: y1,
          x: mousePos.x * 0.4,
          zIndex: 4,
          mixBlendMode: "luminosity",
          opacity: 0.55,
        }}
      >
        <img
          src={img1}
          alt="Feminist collage - woman sewing road"
          style={{ width: "100%", height: "auto", clipPath: "polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)" }}
        />
      </motion.div>

      {/* Collage image 2 - digital collage hands */}
      <motion.div
        style={{
          position: "absolute",
          top: "-5%",
          right: "-3%",
          width: "32%",
          maxWidth: "320px",
          y: y2,
          x: mousePos.x * -0.5,
          zIndex: 4,
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      >
        <img
          src={img2}
          alt="Digital collage"
          style={{ width: "100%", height: "auto", clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)" }}
        />
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "15%",
          left: "12%",
          width: "120px",
          height: "120px",
          border: "1px solid rgba(196,181,253,0.3)",
          zIndex: 3,
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "20%",
          right: "18%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: "2px solid rgba(196,181,253,0.2)",
          zIndex: 3,
        }}
      />

      {/* Floating text words */}
      {floatingWords.map((word, i) => (
        <motion.div
          key={word}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.08, 0.15, 0.08],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4 + i * 0.7,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            color: "rgba(196,181,253,0.5)",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            fontFamily: "'IBM Plex Mono', monospace",
            top: `${10 + (i * 11) % 75}%`,
            left: `${5 + (i * 17) % 85}%`,
            zIndex: 3,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transform: i % 2 === 0 ? "rotate(-90deg)" : "none",
          }}
        >
          {word}
        </motion.div>
      ))}

      {/* Purple horizontal accent lines */}
      <div style={{ position: "absolute", top: "40%", left: 0, right: 0, zIndex: 3 }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.4), transparent)",
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: "800px",
          padding: "0 2rem",
          y: y3,
          opacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.35em",
            color: "rgba(196,181,253,0.6)",
            marginBottom: "1rem",
            textTransform: "uppercase",
          }}
        >
          ♀ A Digital Exhibition
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 14vw, 11rem)",
            lineHeight: 0.9,
            color: "#F5F0EA",
            letterSpacing: "0.02em",
            marginBottom: "0.5rem",
            position: "relative",
          }}
        >
          <span style={{ display: "block" }}>DAILY</span>
          <span
            style={{
              display: "block",
              WebkitTextStroke: "2px #C4B5FD",
              color: "transparent",
            }}
          >
            FEMINISM
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            height: "2px",
            background: "linear-gradient(90deg, transparent, #7B2FBE, #C4B5FD, #7B2FBE, transparent)",
            margin: "1.5rem auto",
            width: "60%",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            color: "rgba(196,181,253,0.8)",
            fontStyle: "italic",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
            maxWidth: "520px",
            margin: "0 auto 2.5rem",
          }}
        >
          Explore the many voices of feminist thought through art, theory, and self-discovery
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <button
            onClick={scrollToAtlas}
            style={{
              padding: "0.9rem 2.5rem",
              background: "#7B2FBE",
              color: "#F5F0EA",
              border: "none",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              transition: "all 0.3s",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#9333EA";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#7B2FBE";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Enter the Exhibition
          </button>
          <button
            onClick={() => document.querySelector("#quiz")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "0.9rem 2.5rem",
              background: "transparent",
              color: "#C4B5FD",
              border: "1px solid rgba(196,181,253,0.4)",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C4B5FD";
              e.currentTarget.style.background = "rgba(196,181,253,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(196,181,253,0.4)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Take the Quiz
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ color: "rgba(196,181,253,0.4)", fontSize: "0.6rem", letterSpacing: "0.3em", fontFamily: "'IBM Plex Mono', monospace" }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, rgba(196,181,253,0.4), transparent)" }}
        />
      </motion.div>
    </div>
  );
}
