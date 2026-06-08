import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";

const rooms = [
  { en: "I. ENTRANCE", zh: "I. 入口", href: "#entrance" },
  { en: "II. ATLAS", zh: "II. 图谱", href: "#atlas" },
  { en: "III. QUIZ", zh: "III. 测验", href: "#quiz" },
  { en: "IV. LINEAGE", zh: "IV. 年轮", href: "#lineage" },
  { en: "V. SPECTRUM", zh: "V. 光谱", href: "#spectrum" },
  { en: "VI. ARCHIVE", zh: "VI. 档案室", href: "#reading" },
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
        className="exhibition-nav"
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
        <style>
          {`
            @media (max-width: 920px) {
              .exhibition-nav {
                padding: 0 1rem !important;
              }

              .exhibition-brand {
                max-width: calc(100vw - 8.5rem) !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                white-space: nowrap !important;
                font-size: 0.54rem !important;
                letter-spacing: 0.16em !important;
              }

              .mobile-nav-actions {
                display: inline-flex !important;
              }

              .exhibition-desktop-rooms {
                display: none !important;
              }
            }

            @media (min-width: 921px) {
              .mobile-nav-actions {
                display: none !important;
              }
            }
          `}
        </style>
        <button
          className="exhibition-brand"
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
        <div className="exhibition-desktop-rooms" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
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

        <div className="mobile-nav-actions" style={{ display: "none", alignItems: "center", gap: "0.45rem" }}>
          <button
            onClick={toggleLanguage}
            aria-label={isZh ? "Switch to English" : "切换到中文"}
            title={isZh ? "Switch to English" : "切换到中文"}
            style={{
              background: scrolled ? "rgba(111,0,255,0.1)" : "rgba(255,255,255,0.62)",
              border: "1px solid rgba(111,0,255,0.45)",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.55rem",
              color: "#6F00FF",
              padding: "0.34rem 0.48rem",
              minWidth: "3.4rem",
            }}
          >
            {language === "zh" ? "EN" : "中文"}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            style={{
              background: scrolled ? "rgba(111,0,255,0.08)" : "rgba(255,255,255,0.52)",
              border: "1px solid rgba(111,0,255,0.32)",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.82rem",
              color: scrolled ? "#6F00FF" : "rgba(17,17,17,0.7)",
              width: "2.2rem",
              height: "2rem",
            }}
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
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
