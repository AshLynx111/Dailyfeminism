import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const nodes = [
  { id: "liberal", label: "LIBERAL", x: 340, y: 110, r: 48, fill: "#D4B896", stroke: "#8B5A2B" },
  { id: "radical", label: "RADICAL", x: 580, y: 210, r: 52, fill: "#C89898", stroke: "#6B1A1A" },
  { id: "socialist", label: "SOCIALIST", x: 500, y: 390, r: 50, fill: "#C8C090", stroke: "#5A5000" },
  { id: "marxist", label: "MARXIST", x: 210, y: 360, r: 46, fill: "#C0B8B0", stroke: "#3A3030" },
  { id: "cultural", label: "CULTURAL", x: 120, y: 200, r: 46, fill: "#B8C8B0", stroke: "#1A4020" },
  { id: "postmodern", label: "POSTMODERN", x: 310, y: 510, r: 52, fill: "#C0B0C8", stroke: "#2A0A5A" },
  { id: "intersectional", label: "INTERSECTIONAL", x: 510, y: 550, r: 58, fill: "#A8C0C8", stroke: "#0A2A3A" },
];

const connections = [
  { a: "liberal", b: "radical", w: 1.5, label: "rights focus" },
  { a: "liberal", b: "socialist", w: 1.2, label: "workplace equality" },
  { a: "radical", b: "cultural", w: 2, label: "patriarchy critique" },
  { a: "radical", b: "socialist", w: 1.5, label: "systemic analysis" },
  { a: "socialist", b: "marxist", w: 2.8, label: "economic analysis" },
  { a: "marxist", b: "liberal", w: 0.8, label: "class vs. rights" },
  { a: "postmodern", b: "intersectional", w: 2.2, label: "identity politics" },
  { a: "postmodern", b: "radical", w: 1.2, label: "gender critique" },
  { a: "intersectional", b: "socialist", w: 2, label: "class+race+gender" },
  { a: "intersectional", b: "liberal", w: 1.5, label: "rights expansion" },
  { a: "cultural", b: "liberal", w: 1.2, label: "women's values" },
  { a: "postmodern", b: "cultural", w: 1, label: "identity" },
];

const descriptions: Record<string, string> = {
  liberal: "Equality through reform and legal access — working within existing structures.",
  radical: "Patriarchy is the root. Dismantle the entire system, not just its symptoms.",
  socialist: "Capitalism and patriarchy operate together. Both must fall.",
  marxist: "Private property created women's oppression. Class struggle is the path.",
  cultural: "Feminine values — care, empathy, cooperation — are our strength.",
  postmodern: "Gender is a performance, not an essence. Deconstruct everything.",
  intersectional: "Race, class, gender, sexuality intersect. No single-axis politics.",
};

export function SpectrumRoom() {
  const [active, setActive] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  const isConnected = (id: string) => {
    if (!active) return true;
    return id === active || connections.some(
      (c) => (c.a === active && c.b === id) || (c.b === active && c.a === id)
    );
  };

  const toggleCompare = (id: string) => {
    if (compare.includes(id)) setCompare(compare.filter((c) => c !== id));
    else if (compare.length < 2) setCompare([...compare, id]);
    else setCompare([compare[1], id]);
  };

  return (
    <section
      id="spectrum"
      style={{
        background: "#0D0D0D",
        position: "relative",
        padding: "6rem 3rem 8rem",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Halftone dot texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(circle, rgba(220,210,190,0.06) 1px, transparent 1px)`,
        backgroundSize: "18px 18px",
      }} />

      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px", opacity: 0.5,
      }} />

      {/* Purple wash */}
      <div style={{
        position: "absolute", bottom: "-20%", left: "-10%",
        width: "60%", height: "80%",
        background: "radial-gradient(ellipse, rgba(44,10,94,0.25) 0%, transparent 65%)",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ position: "relative", zIndex: 2, marginBottom: "3rem" }}
      >
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.55rem", letterSpacing: "0.3em",
          color: "#D4C8A8", opacity: 0.4, marginBottom: "0.75rem",
        }}>
          FEMINIST ARCHIVE — SECTION III — SPECTRUM MAP
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          color: "#EDE8D8", lineHeight: 0.88,
        }}>
          THEORY<br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(212,200,168,0.5)" }}>
            SPECTRUM
          </span>
        </h2>
        <p style={{
          fontFamily: "'Special Elite', cursive",
          fontSize: "0.85rem", color: "rgba(212,200,168,0.55)",
          fontStyle: "italic", marginTop: "0.75rem",
        }}>
          A map of tensions, overlaps, and alliances.
        </p>

        <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={() => { setCompareMode(!compareMode); setCompare([]); }}
            style={{
              padding: "0.35rem 0.9rem",
              background: compareMode ? "rgba(212,200,168,0.15)" : "transparent",
              border: "1px solid rgba(212,200,168,0.25)",
              color: "rgba(212,200,168,0.7)",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem", letterSpacing: "0.12em",
            }}
          >
            {compareMode ? "▪ COMPARING" : "COMPARE MODE"}
          </button>
          {compareMode && (
            <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.7rem", color: "rgba(212,200,168,0.35)", paddingTop: "0.35rem", fontStyle: "italic" }}>
              click two nodes
            </span>
          )}
        </div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "2rem", position: "relative", zIndex: 2, alignItems: "start" }}>
        {/* SVG Network */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            border: "1px solid rgba(212,200,168,0.08)",
            background: "rgba(0,0,0,0.3)",
            position: "relative",
          }}
        >
          <svg viewBox="0 0 700 660" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <filter id="hand-drawn">
                <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="1" seed="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
              </filter>
              <filter id="glow-sm">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="8" r="0.8" fill="rgba(212,200,168,0.06)" />
              </pattern>
            </defs>

            {/* Background dot grid */}
            <rect width="700" height="660" fill="url(#dots)" />

            {/* Connections */}
            {connections.map((conn, i) => {
              const a = getNode(conn.a);
              const b = getNode(conn.b);
              const isActive = active === conn.a || active === conn.b;
              const isCompared = compare.includes(conn.a) && compare.includes(conn.b);

              return (
                <g key={i}>
                  <line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={isActive || isCompared ? "rgba(212,200,168,0.6)" : "rgba(212,200,168,0.1)"}
                    strokeWidth={isActive || isCompared ? conn.w * 2 : conn.w * 0.8}
                    strokeDasharray={isActive || isCompared ? "none" : "3,5"}
                    filter={isActive ? "url(#hand-drawn)" : undefined}
                    style={{ transition: "all 0.3s" }}
                    opacity={active && !isActive && !isCompared ? 0.15 : 1}
                  />
                  {(isActive || isCompared) && (
                    <text
                      x={(a.x + b.x) / 2}
                      y={(a.y + b.y) / 2 - 7}
                      fill="rgba(212,200,168,0.5)"
                      fontSize="8"
                      textAnchor="middle"
                      fontFamily="'IBM Plex Mono', monospace"
                    >
                      {conn.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const dim = !!active && !isConnected(node.id) && !compare.includes(node.id);
              const isActive = active === node.id || compare.includes(node.id);

              return (
                <g
                  key={node.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => !compareMode && setActive(node.id)}
                  onMouseLeave={() => !compareMode && setActive(null)}
                  onClick={() => compareMode && toggleCompare(node.id)}
                >
                  {/* Outer glow ring */}
                  {isActive && (
                    <circle cx={node.x} cy={node.y} r={node.r + 12}
                      fill="none"
                      stroke={node.stroke}
                      strokeWidth="1"
                      opacity="0.3"
                      filter="url(#glow-sm)"
                    />
                  )}

                  {/* Main circle */}
                  <circle
                    cx={node.x} cy={node.y} r={node.r}
                    fill={node.fill}
                    stroke={node.stroke}
                    strokeWidth={isActive ? 2 : 1}
                    opacity={dim ? 0.18 : isActive ? 1 : 0.65}
                    style={{ transition: "all 0.3s" }}
                    filter={isActive ? "url(#hand-drawn)" : undefined}
                  />

                  {/* Label */}
                  <text
                    x={node.x} y={node.y + 4}
                    fill={isActive ? node.stroke : "rgba(13,13,13,0.7)"}
                    fontSize={node.id === "intersectional" ? "8" : "9"}
                    textAnchor="middle"
                    fontFamily="'IBM Plex Mono', monospace"
                    fontWeight="500"
                    opacity={dim ? 0.2 : 1}
                    style={{ transition: "all 0.3s" }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Info panel */}
        <div>
          <AnimatePresence mode="wait">
            {compareMode && compare.length === 2 ? (
              <motion.div key="comp" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
              >
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(212,200,168,0.4)", marginBottom: "0.25rem" }}>
                  COMPARING
                </div>
                {compare.map((id) => {
                  const n = getNode(id);
                  return (
                    <div key={id} style={{
                      padding: "1.25rem", background: "rgba(212,200,168,0.04)",
                      border: `1px solid ${n.stroke}40`,
                    }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: n.fill, marginBottom: "0.4rem" }}>
                        {n.label}
                      </div>
                      <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.78rem", color: "rgba(212,200,168,0.65)", lineHeight: 1.55 }}>
                        {descriptions[id]}
                      </p>
                    </div>
                  );
                })}
                <button onClick={() => setCompare([])} style={{
                  background: "none", border: "1px solid rgba(212,200,168,0.15)",
                  color: "rgba(212,200,168,0.35)", cursor: "pointer",
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem",
                  letterSpacing: "0.1em", padding: "0.4rem",
                }}>
                  CLEAR
                </button>
              </motion.div>
            ) : active ? (
              <motion.div key={active} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                {(() => {
                  const n = getNode(active);
                  return (
                    <div style={{
                      padding: "1.5rem",
                      background: "rgba(212,200,168,0.03)",
                      border: `1px solid ${n.stroke}50`,
                    }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", color: n.fill, lineHeight: 1, marginBottom: "0.5rem" }}>
                        {n.label}
                      </div>
                      <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", color: "rgba(212,200,168,0.65)", lineHeight: 1.6, marginBottom: "1rem" }}>
                        {descriptions[active]}
                      </p>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(212,200,168,0.35)", marginBottom: "0.5rem" }}>
                        CONNECTED TO:
                      </div>
                      {connections
                        .filter((c) => c.a === active || c.b === active)
                        .map((c) => {
                          const other = getNode(c.a === active ? c.b : c.a);
                          return (
                            <div key={other.id} style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.3rem" }}>
                              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: other.fill, flexShrink: 0 }} />
                              <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.7rem", color: "rgba(212,200,168,0.5)" }}>
                                {other.label} <em>— {c.label}</em>
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ padding: "1.5rem", border: "1px solid rgba(212,200,168,0.07)", background: "rgba(212,200,168,0.02)" }}
              >
                <p style={{ fontFamily: "'Special Elite', cursive", fontStyle: "italic", fontSize: "0.82rem", color: "rgba(212,200,168,0.3)", lineHeight: 1.65 }}>
                  {compareMode
                    ? "Click two nodes to compare their theoretical positions."
                    : "Hover a node to see connections and alliances between traditions."}
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  {nodes.map((n) => (
                    <div key={n.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: n.fill, border: `1px solid ${n.stroke}`, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: "rgba(212,200,168,0.35)", letterSpacing: "0.06em" }}>
                        {n.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
