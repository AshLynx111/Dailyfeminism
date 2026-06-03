import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";

const rooms = [
  { en: "I. ENTRANCE", zh: "I. 入口", href: "#entrance" },
  { en: "II. ATLAS", zh: "II. 图谱", href: "#atlas" },
  { en: "III. QUIZ", zh: "III. 测验", href: "#quiz" },
  { en: "IV. SPECTRUM", zh: "IV. 光谱", href: "#spectrum" },
  { en: "V. ARCHIVE", zh: "V. 档案室", href: "#reading" },
];

export function ExhibitionNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isZh, toggleLanguage, language } = useLanguage();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          padding: "0 2rem",
          height: "52px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(247,244,255,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(111,0,255,0.45)" : "none",
          transition: "background 0.25s ease, border-color 0.25s ease",
        }}
      >
        <button
          onClick={() => go("#entrance")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem", letterSpacing: "0.25em",
          color: scrolled ? "#6F00FF" : "rgba(17,17,17,0.72)",
            transition: "color 0.4s",
          }}
        >
          ♀ {isZh ? "日常女性主义" : "DAILY FEMINISM"}
        </button>

        {/* Desktop rooms */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden md:flex">
          {rooms.map((r) => (
            <button
              key={r.href}
              onClick={() => go(r.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.52rem", letterSpacing: "0.18em",
                color: scrolled ? "rgba(17,17,17,0.52)" : "rgba(17,17,17,0.5)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6F00FF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "rgba(17,17,17,0.52)" : "rgba(17,17,17,0.5)")}
            >
              {isZh ? r.zh : r.en}
            </button>
          ))}
          <button
            onClick={toggleLanguage}
            aria-label={isZh ? "Switch to English" : "切换到中文"}
            title={isZh ? "Switch to English" : "切换到中文"}
            style={{
              background: scrolled ? "rgba(111,0,255,0.1)" : "rgba(255,255,255,0.42)",
              border: "1px solid rgba(111,0,255,0.45)",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              color: "#6F00FF",
              padding: "0.32rem 0.55rem",
            }}
          >
            {language === "zh" ? "EN" : "中文"}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.7rem",
            color: scrolled ? "#6F00FF" : "rgba(17,17,17,0.7)",
          }}
        >
          {open ? "✕" : "≡"}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "fixed", top: "52px", left: 0, right: 0, zIndex: 499,
              background: "rgba(247,244,255,0.96)",
              borderBottom: "1px solid rgba(111,0,255,0.45)",
              padding: "1.5rem 2rem",
              display: "flex", flexDirection: "column", gap: "1rem",
            }}
          >
            {rooms.map((r) => (
              <button
                key={r.href}
                onClick={() => go(r.href)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem", letterSpacing: "0.2em",
                  color: "rgba(17,17,17,0.72)",
                  textAlign: "left",
                  transition: "color 0.2s",
                }}
              >
                {isZh ? r.zh : r.en}
              </button>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setOpen(false);
              }}
              style={{
                background: "rgba(111,0,255,0.08)",
                border: "1px solid rgba(111,0,255,0.45)",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "#6F00FF",
                textAlign: "left",
                padding: "0.65rem 0.75rem",
              }}
            >
              {language === "zh" ? "SWITCH TO ENGLISH" : "切换到中文"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
