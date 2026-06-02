import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const nodes = [
  { id: "liberal", label: "Liberal", x: 350, y: 120, color: "#F59E0B", size: 52 },
  { id: "radical", label: "Radical", x: 580, y: 240, color: "#EF4444", size: 56 },
  { id: "socialist", label: "Socialist", x: 480, y: 400, color: "#F97316", size: 54 },
  { id: "marxist", label: "Marxist", x: 220, y: 380, color: "#DC2626", size: 50 },
  { id: "cultural", label: "Cultural", x: 130, y: 230, color: "#10B981", size: 50 },
  { id: "postmodern", label: "Postmodern", x: 310, y: 520, color: "#8B5CF6", size: 56 },
  { id: "intersectional", label: "Intersectional", x: 490, y: 560, color: "#06B6D4", size: 60 },
];

const connections = [
  { from: "liberal", to: "radical", strength: 0.4, label: "Women's rights focus" },
  { from: "liberal", to: "socialist", strength: 0.5, label: "Workplace equality" },
  { from: "radical", to: "cultural", strength: 0.6, label: "Patriarchy critique" },
  { from: "radical", to: "socialist", strength: 0.5, label: "Systemic analysis" },
  { from: "socialist", to: "marxist", strength: 0.85, label: "Economic analysis" },
  { from: "marxist", to: "liberal", strength: 0.3, label: "Class vs. rights" },
  { from: "postmodern", to: "intersectional", strength: 0.75, label: "Identity politics" },
  { from: "postmodern", to: "radical", strength: 0.4, label: "Gender critique" },
  { from: "intersectional", to: "socialist", strength: 0.7, label: "Class+race+gender" },
  { from: "intersectional", to: "liberal", strength: 0.5, label: "Rights expansion" },
  { from: "cultural", to: "liberal", strength: 0.45, label: "Women's values" },
  { from: "postmodern", to: "cultural", strength: 0.35, label: "Identity" },
];

const theorySummaries: Record<string, string> = {
  liberal: "Focuses on legal reform and equal rights within existing institutions.",
  radical: "Identifies patriarchy as the root of all oppression.",
  socialist: "Combines gender and class analysis in dual systems theory.",
  marxist: "Grounds women's oppression in capitalist property relations.",
  cultural: "Celebrates feminine values: care, empathy, cooperation.",
  postmodern: "Deconstructs gender as a social performance.",
  intersectional: "Maps overlapping systems of race, class, gender, and more.",
};

export function SpectrumMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compared, setCompared] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const toggleCompare = (id: string) => {
    if (compared.includes(id)) {
      setCompared(compared.filter((c) => c !== id));
    } else if (compared.length < 2) {
      setCompared([...compared, id]);
    } else {
      setCompared([compared[1], id]);
    }
  };

  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

  const activeConnections = hoveredNode
    ? connections.filter((c) => c.from === hoveredNode || c.to === hoveredNode)
    : connections;

  return (
    <section
      id="spectrum"
      style={{
        background: "linear-gradient(180deg, #0A0414 0%, #100822 50%, #0A0414 100%)",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "3rem" }}
        >
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            color: "#7B2FBE",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            ♀ Section II
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            color: "#F5F0EA",
            lineHeight: 0.95,
          }}>
            FEMINIST
            <br />
            <span style={{ WebkitTextStroke: "2px rgba(196,181,253,0.5)", color: "transparent" }}>
              SPECTRUM MAP
            </span>
          </h2>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1rem",
            color: "rgba(196,181,253,0.6)",
            fontStyle: "italic",
            marginTop: "1rem",
            maxWidth: "480px",
          }}>
            An interactive network of relationships, overlaps, and tensions between feminist traditions.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => { setCompareMode(!compareMode); setCompared([]); }}
              style={{
                padding: "0.6rem 1.4rem",
                background: compareMode ? "#7B2FBE" : "transparent",
                border: "1px solid rgba(196,181,253,0.3)",
                color: "#C4B5FD",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              {compareMode ? "Compare Mode ON" : "Compare Mode"}
            </button>
            {compareMode && (
              <span style={{
                padding: "0.6rem 1rem",
                color: "rgba(196,181,253,0.5)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
              }}>
                Select 2 theories to compare
              </span>
            )}
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", alignItems: "start" }}>
          {/* SVG Network */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              background: "rgba(196,181,253,0.02)",
              border: "1px solid rgba(196,181,253,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 720 680"
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(196,181,253,0.04)" strokeWidth="0.5" />
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="720" height="680" fill="url(#grid)" />

              {/* Connections */}
              {activeConnections.map((conn, i) => {
                const fromNode = getNodeById(conn.from);
                const toNode = getNodeById(conn.to);
                if (!fromNode || !toNode) return null;
                const isActive = hoveredNode === conn.from || hoveredNode === conn.to;
                return (
                  <g key={i}>
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isActive ? fromNode.color : "rgba(196,181,253,0.12)"}
                      strokeWidth={isActive ? conn.strength * 4 : conn.strength * 1.5}
                      strokeDasharray={isActive ? "none" : "4,4"}
                      opacity={hoveredNode && !isActive ? 0.2 : 1}
                      style={{ transition: "all 0.3s" }}
                    />
                    {isActive && (
                      <text
                        x={(fromNode.x + toNode.x) / 2}
                        y={(fromNode.y + toNode.y) / 2 - 6}
                        fill="rgba(196,181,253,0.7)"
                        fontSize="9"
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
                const isHovered = hoveredNode === node.id;
                const isCompared = compared.includes(node.id);
                const isDimmed = hoveredNode && !isHovered && !connections.some(
                  (c) => (c.from === hoveredNode && c.to === node.id) || (c.to === hoveredNode && c.from === node.id)
                );

                return (
                  <g
                    key={node.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => !compareMode && setHoveredNode(node.id)}
                    onMouseLeave={() => !compareMode && setHoveredNode(null)}
                    onClick={() => compareMode && toggleCompare(node.id)}
                  >
                    {/* Glow ring */}
                    {(isHovered || isCompared) && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size + 10}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1"
                        opacity="0.4"
                        filter="url(#glow)"
                      />
                    )}

                    {/* Main circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size}
                      fill={`${node.color}20`}
                      stroke={node.color}
                      strokeWidth={isHovered || isCompared ? 2.5 : 1}
                      opacity={isDimmed ? 0.25 : 1}
                      style={{ transition: "all 0.3s" }}
                    />

                    {/* Inner circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size * 0.4}
                      fill={node.color}
                      opacity={isHovered || isCompared ? 0.9 : 0.5}
                      style={{ transition: "all 0.3s" }}
                    />

                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y + node.size + 16}
                      fill={isHovered || isCompared ? node.color : "rgba(196,181,253,0.7)"}
                      fontSize="11"
                      textAnchor="middle"
                      fontFamily="'IBM Plex Mono', monospace"
                      opacity={isDimmed ? 0.3 : 1}
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
              {compareMode && compared.length === 2 ? (
                <motion.div
                  key="compare"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color: "#7B2FBE",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}>
                    Comparing
                  </div>
                  {compared.map((id) => {
                    const node = getNodeById(id)!;
                    return (
                      <div key={id} style={{
                        padding: "1.25rem",
                        border: `1px solid ${node.color}40`,
                        background: `${node.color}08`,
                      }}>
                        <div style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.65rem",
                          color: node.color,
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          marginBottom: "0.5rem",
                        }}>
                          {node.label} Feminism
                        </div>
                        <p style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.8rem",
                          color: "rgba(240,235,255,0.75)",
                          lineHeight: 1.6,
                        }}>
                          {theorySummaries[id]}
                        </p>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => setCompared([])}
                    style={{
                      padding: "0.5rem",
                      background: "transparent",
                      border: "1px solid rgba(196,181,253,0.2)",
                      color: "rgba(196,181,253,0.5)",
                      cursor: "pointer",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.7rem",
                    }}
                  >
                    Clear comparison
                  </button>
                </motion.div>
              ) : hoveredNode ? (
                <motion.div
                  key={hoveredNode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {(() => {
                    const node = getNodeById(hoveredNode)!;
                    const connectedTo = connections
                      .filter((c) => c.from === hoveredNode || c.to === hoveredNode)
                      .map((c) => {
                        const otherId = c.from === hoveredNode ? c.to : c.from;
                        const other = getNodeById(otherId)!;
                        return { other, label: c.label, strength: c.strength };
                      });
                    return (
                      <div style={{ padding: "1.5rem", border: `1px solid ${node.color}40`, background: `${node.color}08` }}>
                        <div style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "2.5rem",
                          color: node.color,
                          lineHeight: 1,
                          marginBottom: "0.25rem",
                        }}>
                          {node.label}
                        </div>
                        <p style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.82rem",
                          color: "rgba(240,235,255,0.75)",
                          lineHeight: 1.65,
                          marginBottom: "1.25rem",
                        }}>
                          {theorySummaries[hoveredNode]}
                        </p>
                        <div style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          color: node.color,
                          textTransform: "uppercase",
                          marginBottom: "0.75rem",
                        }}>
                          Connected to:
                        </div>
                        {connectedTo.map(({ other, label }) => (
                          <div key={other.id} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginBottom: "0.4rem",
                          }}>
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: other.color, flexShrink: 0 }} />
                            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "rgba(196,181,253,0.7)" }}>
                              {other.label} — <em>{label}</em>
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    padding: "1.5rem",
                    border: "1px solid rgba(196,181,253,0.1)",
                    background: "rgba(196,181,253,0.02)",
                  }}
                >
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    color: "rgba(196,181,253,0.4)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}>
                    {compareMode
                      ? "Click two theories to compare them side by side."
                      : "Hover over a node to explore connections and relationships."}
                  </p>
                  <div style={{ marginTop: "1.5rem" }}>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      color: "rgba(196,181,253,0.3)",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                    }}>
                      Legend
                    </div>
                    {nodes.map((n) => (
                      <div key={n.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: n.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "rgba(196,181,253,0.5)" }}>
                          {n.label} Feminism
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
