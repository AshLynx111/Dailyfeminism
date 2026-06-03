import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import mirrorGarden from "../../imports/collage/mirror-garden.jpg";
import { useLanguage } from "../i18n";

const nodes = [
  { id: "liberal", label: "LIBERAL", labelZh: "自由", x: 340, y: 110, r: 48, fill: "#F5F5F5", stroke: "#6F00FF" },
  { id: "radical", label: "RADICAL", labelZh: "激进", x: 580, y: 210, r: 52, fill: "#6F00FF", stroke: "#F5F5F5" },
  { id: "socialist", label: "SOCIALIST", labelZh: "社会主义", x: 500, y: 390, r: 50, fill: "#F5F5F5", stroke: "#6F00FF" },
  { id: "marxist", label: "MARXIST", labelZh: "马克思", x: 210, y: 360, r: 46, fill: "#24004D", stroke: "#6F00FF" },
  { id: "cultural", label: "CULTURAL", labelZh: "文化", x: 120, y: 200, r: 46, fill: "#F5F5F5", stroke: "#6F00FF" },
  { id: "postmodern", label: "POSTMODERN", labelZh: "后现代", x: 310, y: 510, r: 52, fill: "#6F00FF", stroke: "#F5F5F5" },
  { id: "intersectional", label: "INTERSECTIONAL", labelZh: "交叉性", x: 510, y: 550, r: 58, fill: "#F5F5F5", stroke: "#6F00FF" },
];

const connections = [
  { a: "liberal", b: "radical", w: 1.5, label: "rights focus", labelZh: "权利焦点" },
  { a: "liberal", b: "socialist", w: 1.2, label: "workplace equality", labelZh: "职场平等" },
  { a: "radical", b: "cultural", w: 2, label: "patriarchy critique", labelZh: "父权批判" },
  { a: "radical", b: "socialist", w: 1.5, label: "systemic analysis", labelZh: "系统分析" },
  { a: "socialist", b: "marxist", w: 2.8, label: "economic analysis", labelZh: "经济分析" },
  { a: "marxist", b: "liberal", w: 0.8, label: "class vs. rights", labelZh: "阶级与权利" },
  { a: "postmodern", b: "intersectional", w: 2.2, label: "identity politics", labelZh: "身份政治" },
  { a: "postmodern", b: "radical", w: 1.2, label: "gender critique", labelZh: "性别批判" },
  { a: "intersectional", b: "socialist", w: 2, label: "class+race+gender", labelZh: "阶级+种族+性别" },
  { a: "intersectional", b: "liberal", w: 1.5, label: "rights expansion", labelZh: "权利扩展" },
  { a: "cultural", b: "liberal", w: 1.2, label: "women's values", labelZh: "女性价值" },
  { a: "postmodern", b: "cultural", w: 1, label: "identity", labelZh: "身份" },
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

const descriptionsZh: Record<string, string> = {
  liberal: "通过改革和法律准入实现平等，在既有结构内部行动。",
  radical: "父权制是根源。要拆解整个系统，而不只是处理症状。",
  socialist: "资本主义与父权制共同运作，二者都必须被挑战。",
  marxist: "私有财产创造了女性压迫，阶级斗争是解放路径。",
  cultural: "照护、共情与合作等女性化价值是一种力量。",
  postmodern: "性别是一种表演，不是本质。解构一切固定范畴。",
  intersectional: "种族、阶级、性别与性取向彼此交叉，不能只用单一轴线理解政治。",
};

export function SpectrumRoom() {
  const [active, setActive] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const { isZh } = useLanguage();

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
        background: "#F7F4FF",
        position: "relative",
        padding: "6rem 3rem 8rem",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Halftone dot texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.12) 1px, transparent 1.5px), repeating-linear-gradient(0deg, transparent 0 15px, rgba(17,17,17,0.035) 15px 16px)",
        backgroundSize: "18px 18px, auto",
        opacity: 0.36,
      }} />

      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px", opacity: 0.5,
      }} />

      {/* Collage layer */}
      <div style={{
        position: "absolute", bottom: "3%", left: "-5%",
        width: "min(34vw, 430px)",
        zIndex: 0, pointerEvents: "none",
        opacity: 0.08,
        transform: "rotate(-3deg)",
      }} />
      <img
        src={mirrorGarden}
        alt=""
        style={{
          position: "absolute",
          bottom: "4%",
          left: "-5%",
          width: "min(34vw, 430px)",
          zIndex: 0,
          opacity: 0.08,
          transform: "rotate(-3deg)",
          pointerEvents: "none",
        }}
      />

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
          color: "#6F00FF", opacity: 1, marginBottom: "0.75rem",
        }}>
          {isZh ? "女性主义档案 — 第四展厅 — 光谱地图" : "FEMINIST ARCHIVE — SECTION III — SPECTRUM MAP"}
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          color: "#111111", lineHeight: 0.88,
        }}>
          {isZh ? "理论" : "THEORY"}<br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px #6F00FF" }}>
            {isZh ? "光谱" : "SPECTRUM"}
          </span>
        </h2>
        <p style={{
          fontFamily: "'Special Elite', cursive",
          fontSize: "0.85rem", color: "rgba(17,17,17,0.62)",
          fontStyle: "italic", marginTop: "0.75rem",
        }}>
          {isZh ? "一张关于张力、重叠与联盟的地图。" : "A map of tensions, overlaps, and alliances."}
        </p>

        <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={() => { setCompareMode(!compareMode); setCompare([]); }}
            style={{
              padding: "0.35rem 0.9rem",
              background: compareMode ? "#6F00FF" : "transparent",
              border: "1px solid #6F00FF",
              color: compareMode ? "#F5F5F5" : "#6F00FF",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem", letterSpacing: "0.12em",
            }}
          >
            {compareMode ? (isZh ? "▪ 对比中" : "▪ COMPARING") : (isZh ? "对比模式" : "COMPARE MODE")}
          </button>
          {compareMode && (
            <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.7rem", color: "rgba(17,17,17,0.5)", paddingTop: "0.35rem", fontStyle: "italic" }}>
              {isZh ? "点击两个节点" : "click two nodes"}
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
            border: "1px solid rgba(111,0,255,0.28)",
            background: "rgba(255,255,255,0.64)",
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
                <circle cx="8" cy="8" r="0.8" fill="rgba(17,17,17,0.08)" />
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
                    stroke={isActive || isCompared ? "#6F00FF" : "rgba(17,17,17,0.16)"}
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
                      fill="#6F00FF"
                      fontSize="8"
                      textAnchor="middle"
                      fontFamily="'IBM Plex Mono', monospace"
                    >
                      {isZh ? conn.labelZh : conn.label}
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
                    {isZh ? node.labelZh : node.label}
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
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#6F00FF", marginBottom: "0.25rem" }}>
                  {isZh ? "正在对比" : "COMPARING"}
                </div>
                {compare.map((id) => {
                  const n = getNode(id);
                  return (
                    <div key={id} style={{
                      padding: "1.25rem", background: "rgba(255,255,255,0.72)",
                      border: `1px solid ${n.stroke}40`,
                    }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: n.fill, marginBottom: "0.4rem" }}>
                        {isZh ? n.labelZh : n.label}
                      </div>
                      <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.78rem", color: "rgba(17,17,17,0.68)", lineHeight: 1.55 }}>
                        {isZh ? descriptionsZh[id] : descriptions[id]}
                      </p>
                    </div>
                  );
                })}
                <button onClick={() => setCompare([])} style={{
                  background: "none", border: "1px solid rgba(111,0,255,0.6)",
                  color: "#6F00FF", cursor: "pointer",
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem",
                  letterSpacing: "0.1em", padding: "0.4rem",
                }}>
                  {isZh ? "清除" : "CLEAR"}
                </button>
              </motion.div>
            ) : active ? (
              <motion.div key={active} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                {(() => {
                  const n = getNode(active);
                  return (
                    <div style={{
                      padding: "1.5rem",
                      background: "rgba(255,255,255,0.72)",
                      border: `1px solid ${n.stroke}50`,
                    }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", color: n.fill, lineHeight: 1, marginBottom: "0.5rem" }}>
                        {isZh ? n.labelZh : n.label}
                      </div>
                      <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", color: "rgba(17,17,17,0.68)", lineHeight: 1.6, marginBottom: "1rem" }}>
                        {isZh ? descriptionsZh[active] : descriptions[active]}
                      </p>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#6F00FF", marginBottom: "0.5rem" }}>
                        {isZh ? "连接到：" : "CONNECTED TO:"}
                      </div>
                      {connections
                        .filter((c) => c.a === active || c.b === active)
                        .map((c) => {
                          const other = getNode(c.a === active ? c.b : c.a);
                          return (
                            <div key={other.id} style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.3rem" }}>
                              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: other.fill, flexShrink: 0 }} />
                              <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.7rem", color: "rgba(17,17,17,0.5)" }}>
                                {isZh ? other.labelZh : other.label} <em>— {isZh ? c.labelZh : c.label}</em>
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
                style={{ padding: "1.5rem", border: "1px solid rgba(111,0,255,0.28)", background: "rgba(255,255,255,0.72)" }}
              >
                <p style={{ fontFamily: "'Special Elite', cursive", fontStyle: "italic", fontSize: "0.82rem", color: "rgba(17,17,17,0.56)", lineHeight: 1.65 }}>
                  {compareMode
                    ? (isZh ? "点击两个节点，对比它们的理论位置。" : "Click two nodes to compare their theoretical positions.")
                    : (isZh ? "悬停节点，查看不同传统之间的连接和联盟。" : "Hover a node to see connections and alliances between traditions.")}
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  {nodes.map((n) => (
                    <div key={n.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: n.fill, border: `1px solid ${n.stroke}`, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: "rgba(17,17,17,0.52)", letterSpacing: "0.06em" }}>
                        {isZh ? n.labelZh : n.label}
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
