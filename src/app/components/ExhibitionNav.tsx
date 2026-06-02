import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const rooms = [
  { label: "I. ENTRANCE", href: "#entrance" },
  { label: "II. ATLAS", href: "#atlas" },
  { label: "III. SPECTRUM", href: "#spectrum" },
  { label: "IV. QUIZ", href: "#quiz" },
  { label: "V. ARCHIVE", href: "#reading" },
];

export function ExhibitionNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          background: scrolled ? "rgba(13,13,13,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(237,232,216,0.08)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <button
          onClick={() => go("#entrance")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem", letterSpacing: "0.25em",
            color: scrolled ? "rgba(237,232,216,0.6)" : "rgba(13,13,13,0.5)",
            transition: "color 0.4s",
          }}
        >
          ♀ DAILY FEMINISM
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
                color: scrolled ? "rgba(237,232,216,0.4)" : "rgba(13,13,13,0.4)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? "rgba(237,232,216,0.9)" : "rgba(13,13,13,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "rgba(237,232,216,0.4)" : "rgba(13,13,13,0.4)")}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.7rem",
            color: scrolled ? "rgba(237,232,216,0.6)" : "rgba(13,13,13,0.6)",
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
              background: "rgba(13,13,13,0.96)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(237,232,216,0.08)",
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
                  color: "rgba(237,232,216,0.5)",
                  textAlign: "left",
                  transition: "color 0.2s",
                }}
              >
                {r.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
