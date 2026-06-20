import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookHeart, Trash2, X } from "lucide-react";
import { useLanguage } from "../i18n";
import {
  lensLabels,
  theoryColors,
  theoryLabels,
  useReflections,
  type ReflectionLens,
  type ReflectionRecord,
  type TheoryId,
} from "../reflections";

const sourceLabels = {
  theory: { en: "Theory card", zh: "理论流派" },
  quiz: { en: "Quiz profile", zh: "测试画像" },
  lineage: { en: "Lineage stage", zh: "谱系阶段" },
  reading: { en: "Reading", zh: "阅读档案" },
};

function periodKey(record: ReflectionRecord) {
  return record.createdAt.slice(0, 7);
}

function sharedContext(a: ReflectionRecord, b: ReflectionRecord) {
  return (
    a.id === b.id ||
    a.theoryIds.some((id) => b.theoryIds.includes(id)) ||
    a.lenses.some((lens) => b.lenses.includes(lens))
  );
}

function nodeColor(record: ReflectionRecord) {
  const colors = record.theoryIds.map((id) => theoryColors[id]).filter(Boolean);
  if (colors.length <= 1) return colors[0] ?? "#6F00FF";
  return `url(#gradient-${record.recordId.replace(/[^a-zA-Z0-9]/g, "")})`;
}

function ThoughtCard({ record, onClose }: { record: ReflectionRecord; onClose: () => void }) {
  const { isZh } = useLanguage();
  const { deleteReflection } = useReflections();
  const [confirming, setConfirming] = useState(false);
  const date = new Intl.DateTimeFormat(isZh ? "zh-CN" : "en", { dateStyle: "long", timeStyle: "short" }).format(new Date(record.createdAt));
  const prompts = isZh
    ? ["生活经验", "此刻的理解", "持续存在时的感受"]
    : ["LIVED EXPERIENCE", "MY INTERPRETATION", "IF THIS CONTINUES"];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const remove = () => {
    if (deleteReflection(record.recordId)) onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={modalOverlay} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="thought-card-title"
        initial={{ scale: 0.94, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0 }}
        style={cardStyle}
      >
        <button onClick={onClose} aria-label={isZh ? "关闭" : "Close"} style={closeStyle}><X size={18} /></button>
        <div style={eyebrowStyle}>{isZh ? sourceLabels[record.type].zh : sourceLabels[record.type].en} / {date}</div>
        <h3 id="thought-card-title" style={{ fontFamily: "'IM Fell English', serif", fontSize: "1.55rem", lineHeight: 1.2, margin: "0.6rem 2rem 0.35rem 0" }}>{record.title}</h3>
        <p style={{ margin: "0 0 1rem", fontFamily: "'Special Elite', cursive", fontSize: "0.76rem", lineHeight: 1.55, color: "rgba(17,17,17,0.58)" }}>{record.snapshot}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.38rem", marginBottom: "1.2rem" }}>
          {record.theoryIds.map((id) => <span key={id} style={{ ...tagStyle, color: theoryColors[id], borderColor: `${theoryColors[id]}66` }}>{isZh ? theoryLabels[id].zh : theoryLabels[id].en}</span>)}
          {record.lenses.map((lens) => <span key={lens} style={tagStyle}>{isZh ? lensLabels[lens].zh : lensLabels[lens].en}</span>)}
        </div>
        {record.answers.map((answer, index) => (
          <section key={prompts[index]} style={{ borderTop: "1px solid rgba(111,0,255,0.18)", padding: "0.85rem 0" }}>
            <div style={eyebrowStyle}>0{index + 1} / {prompts[index]}</div>
            <p style={{ margin: "0.45rem 0 0", whiteSpace: "pre-wrap", fontFamily: "'IM Fell English', serif", fontSize: "0.98rem", lineHeight: 1.65 }}>{answer}</p>
          </section>
        ))}
        {confirming ? (
          <div style={{ padding: "0.8rem", background: "#FEE2E2", color: "#7F1D1D" }}>
            <p style={{ margin: "0 0 0.65rem", fontSize: "0.75rem", lineHeight: 1.45 }}>{isZh ? "删除后无法恢复这段思想记录。" : "This thought record cannot be restored after deletion."}</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={remove} style={{ ...deleteButton, background: "#991B1B", color: "#fff" }}>{isZh ? "确认删除" : "DELETE"}</button>
              <button onClick={() => setConfirming(false)} style={deleteButton}>{isZh ? "保留" : "KEEP"}</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirming(true)} style={deleteButton}><Trash2 size={13} /> {isZh ? "删除这张思想卡片" : "DELETE THOUGHT CARD"}</button>
        )}
      </motion.article>
    </motion.div>
  );
}

export function ThoughtRings() {
  const { records } = useReflections();
  const { isZh } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sorted = useMemo(() => [...records].sort((a, b) => a.createdAt.localeCompare(b.createdAt)), [records]);
  const periods = useMemo(() => [...new Set(sorted.map(periodKey))], [sorted]);
  const selected = sorted.find((record) => record.recordId === selectedId) ?? null;
  const ringGap = Math.min(54, 205 / Math.max(periods.length - 1, 1));

  const nodes = useMemo(() => {
    const byPeriod = new Map<string, ReflectionRecord[]>();
    sorted.forEach((record) => byPeriod.set(periodKey(record), [...(byPeriod.get(periodKey(record)) ?? []), record]));
    return sorted.map((record) => {
      const ringIndex = periods.indexOf(periodKey(record));
      const peers = byPeriod.get(periodKey(record)) ?? [];
      const peerIndex = peers.findIndex((item) => item.recordId === record.recordId);
      const angle = -Math.PI / 2 + (Math.PI * 2 * peerIndex) / Math.max(peers.length, 1) + ringIndex * 0.32;
      const radius = 82 + ringIndex * ringGap;
      const revisits = sorted.filter((item) => item.id === record.id && item.createdAt <= record.createdAt).length;
      return { record, x: 310 + Math.cos(angle) * radius, y: 310 + Math.sin(angle) * radius, radius: 8 + Math.min(revisits - 1, 4) * 2.2 };
    });
  }, [periods, ringGap, sorted]);

  const connections = useMemo(() => nodes.flatMap((node, index) => nodes.slice(0, index).filter((other) => sharedContext(node.record, other.record)).slice(-2).map((other) => ({ from: other, to: node }))), [nodes]);
  const maxRingRadius = 82 + Math.max(periods.length - 1, 0) * ringGap;

  return (
    <section id="thought-rings" className="thought-rings-section" style={sectionStyle}>
      <style>{`
        @media (max-width: 820px) {
          .thought-rings-section { padding: 4.5rem 1rem 6rem !important; }
          .thought-rings-layout { grid-template-columns: 1fr !important; }
          .thought-rings-viz { min-height: 420px !important; }
          .thought-rings-svg { width: min(620px, 155vw) !important; max-width: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .thought-rings-section * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
        }
      `}</style>
      <div aria-hidden="true" style={textureStyle} />
      <div style={{ maxWidth: "1160px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.header initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "2.5rem" }}>
          <div style={eyebrowStyle}>{isZh ? "女性主义档案 / 第七展厅 / 私人思想轨迹" : "FEMINIST ARCHIVE / SECTION VII / PRIVATE THOUGHT TRAJECTORY"}</div>
          <h2 style={{ margin: "0.65rem 0 0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,9vw,7rem)", lineHeight: 0.86 }}>
            {isZh ? "我的思想" : "MY THOUGHT"}<br /><span style={{ color: "transparent", WebkitTextStroke: "2px #6F00FF" }}>{isZh ? "年轮" : "RINGS"}</span>
          </h2>
          <p style={{ maxWidth: "620px", margin: "1rem 0 0", fontFamily: "'IM Fell English', serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(17,17,17,0.66)" }}>
            {isZh ? "思想不是一次测试给出的结论。每一次把理论带回生活的记录，都会让这组年轮继续生长。" : "Thought is not a conclusion delivered by one test. Every time theory returns to lived experience, these rings keep growing."}
          </p>
        </motion.header>

        {sorted.length === 0 ? (
          <div style={emptyStyle}>
            <BookHeart size={34} color="#6F00FF" />
            <h3 style={{ margin: "0.9rem 0 0.5rem", fontFamily: "'IM Fell English', serif", fontSize: "1.5rem" }}>{isZh ? "你的第一圈还没有形成" : "YOUR FIRST RING HAS NOT FORMED YET"}</h3>
            <p style={{ maxWidth: "580px", margin: "0 auto 1.25rem", fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(17,17,17,0.58)" }}>
              {isZh ? "从理论卡片、测试画像、谱系阶段或一本书出发，点击“记录此刻的理解”。这里不会创建脱离理论来源的自由笔记。" : "Begin from a theory card, quiz profile, lineage stage, or book and choose ‘Record this thought.’ This archive does not create notes detached from a source."}
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              {[["#atlas", isZh ? "理论卡片" : "THEORIES"], ["#quiz", isZh ? "测试画像" : "QUIZ"], ["#lineage", isZh ? "理论年轮" : "LINEAGE"], ["#reading", isZh ? "阅读档案" : "READING"]].map(([href, label]) => (
                <button key={href} onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })} style={sourceButton}>{label}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="thought-rings-layout" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(240px,0.7fr)", gap: "1.5rem", alignItems: "stretch" }}>
            <div className="thought-rings-viz" style={{ minHeight: "620px", border: "1px solid rgba(111,0,255,0.28)", background: "rgba(255,255,255,0.64)", overflow: "auto", display: "grid", placeItems: "center" }}>
              <svg className="thought-rings-svg" role="group" aria-label={isZh ? "我的思想年轮，选择节点查看记录" : "My thought rings. Select a node to view its record."} viewBox="0 0 620 620" style={{ width: "100%", maxWidth: "620px", height: "auto" }}>
                <defs>
                  <pattern id="lens-grid" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M 6 0 L 0 0 0 6" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.75" /></pattern>
                  <pattern id="lens-wave" width="10" height="6" patternUnits="userSpaceOnUse"><path d="M0 3 Q2.5 0 5 3 T10 3" fill="none" stroke="#fff" strokeWidth="1" opacity="0.8" /></pattern>
                  <pattern id="lens-lines" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#fff" strokeWidth="1.2" opacity="0.75" /></pattern>
                  {sorted.filter((record) => record.theoryIds.length > 1).map((record) => (
                    <linearGradient key={record.recordId} id={`gradient-${record.recordId.replace(/[^a-zA-Z0-9]/g, "")}`}>
                      {record.theoryIds.map((id, index) => <stop key={id} offset={`${(index / Math.max(record.theoryIds.length - 1, 1)) * 100}%`} stopColor={theoryColors[id]} />)}
                    </linearGradient>
                  ))}
                </defs>
                <circle cx="310" cy="310" r="24" fill="#24004D" opacity="0.9" />
                <text x="310" y="314" textAnchor="middle" fill="#fff" fontFamily="'IBM Plex Mono', monospace" fontSize="8">{isZh ? "此刻" : "NOW"}</text>
                {periods.map((period, index) => <circle key={period} cx="310" cy="310" r={82 + index * ringGap} fill="none" stroke="#6F00FF" strokeWidth="1" strokeDasharray={index % 2 ? "3 6" : "1 4"} opacity={Math.min(0.2 + index * 0.04, 0.58)} />)}
                {maxRingRadius < 250 && <circle cx="310" cy="310" r={maxRingRadius + 54} fill="none" stroke="#6F00FF" strokeWidth="0.6" opacity="0.08" />}
                {connections.map(({ from, to }) => <line key={`${from.record.recordId}-${to.record.recordId}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#6F00FF" strokeWidth="0.8" opacity="0.18" />)}
                {nodes.map(({ record, x, y, radius }) => {
                  const pattern = record.lenses.includes("structure") ? "url(#lens-grid)" : record.lenses.includes("emotion") ? "url(#lens-wave)" : record.lenses.some((lens) => ["labor", "identity"].includes(lens)) ? "url(#lens-lines)" : null;
                  return (
                    <g
                      key={record.recordId}
                      role="button"
                      tabIndex={0}
                      aria-label={`${record.title}, ${new Date(record.createdAt).toLocaleDateString()}`}
                      onClick={() => setSelectedId(record.recordId)}
                      onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setSelectedId(record.recordId)}
                      style={{ cursor: "pointer", outline: "none" }}
                    >
                      <motion.circle initial={{ r: 0 }} animate={{ r: radius + 5 }} cx={x} cy={y} fill="none" stroke={record.theoryIds[0] ? theoryColors[record.theoryIds[0]] : "#6F00FF"} strokeWidth="1" opacity="0.3" />
                      <circle cx={x} cy={y} r={radius} fill={nodeColor(record)} stroke="#fff" strokeWidth="2" />
                      {pattern && <circle cx={x} cy={y} r={Math.max(radius - 2, 2)} fill={pattern} />}
                    </g>
                  );
                })}
              </svg>
            </div>
            <aside style={{ border: "1px solid rgba(111,0,255,0.28)", background: "#fff", padding: "1.25rem", boxShadow: "8px 8px 0 rgba(111,0,255,0.1)" }}>
              <div style={eyebrowStyle}>{isZh ? "轨迹图例" : "TRAJECTORY KEY"}</div>
              <div style={{ margin: "0.8rem 0 1.2rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.7rem", color: "#6F00FF", lineHeight: 0.9 }}>{sorted.length}<span style={{ marginLeft: "0.4rem", fontSize: "0.85rem", color: "#111" }}>{isZh ? "张思想卡" : "THOUGHT CARDS"}</span></div>
              <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.72rem", lineHeight: 1.55, color: "rgba(17,17,17,0.58)" }}>{isZh ? "环层代表记录时期，颜色代表理论来源，纹理代表理解视角，节点变大表示你再次回到了同一来源。" : "Rings mark periods, color marks theory, texture marks interpretation, and a growing node means you returned to the same source."}</p>
              <div style={{ borderTop: "1px solid rgba(111,0,255,0.18)", paddingTop: "0.8rem", marginTop: "1rem" }}>
                {(Object.keys(theoryLabels) as TheoryId[]).map((id) => <div key={id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.45rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem" }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: theoryColors[id] }} />{isZh ? theoryLabels[id].zh : theoryLabels[id].en}</div>)}
              </div>
              <p style={{ marginTop: "1.1rem", paddingTop: "0.8rem", borderTop: "1px solid rgba(111,0,255,0.18)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", lineHeight: 1.5, color: "rgba(17,17,17,0.46)" }}>{isZh ? "隐私说明：所有内容只保存在当前浏览器。清除网站数据后无法恢复。" : "PRIVACY: Everything stays in this browser. Clearing site data permanently removes it."}</p>
            </aside>
          </div>
        )}
      </div>
      <AnimatePresence>{selected && <ThoughtCard record={selected} onClose={() => setSelectedId(null)} />}</AnimatePresence>
    </section>
  );
}

const sectionStyle: CSSProperties = { background: "linear-gradient(90deg,rgba(111,0,255,.1) 1px,transparent 1px),linear-gradient(0deg,rgba(17,17,17,.04) 1px,transparent 1px),#F1EBFF", backgroundSize: "72px 72px", position: "relative", padding: "6rem 3rem 8rem", overflow: "hidden", color: "#111" };
const textureStyle: CSSProperties = { position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(111,0,255,.16) 1px,transparent 1.5px)", backgroundSize: "18px 18px", opacity: 0.28 };
const eyebrowStyle: CSSProperties = { fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#6F00FF", lineHeight: 1.5 };
const emptyStyle: CSSProperties = { textAlign: "center", padding: "clamp(2rem,7vw,5rem) 1rem", border: "1px solid rgba(111,0,255,0.28)", background: "rgba(255,255,255,0.68)", boxShadow: "10px 10px 0 rgba(111,0,255,0.1)" };
const sourceButton: CSSProperties = { border: "1px solid #6F00FF", background: "transparent", color: "#6F00FF", padding: "0.55rem 0.75rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem" };
const modalOverlay: CSSProperties = { position: "fixed", inset: 0, zIndex: 3500, background: "rgba(17,17,17,0.48)", display: "grid", placeItems: "center", padding: "1rem" };
const cardStyle: CSSProperties = { width: "min(620px,100%)", maxHeight: "88vh", overflowY: "auto", position: "relative", background: "linear-gradient(180deg,#fff,#F1EBFF)", border: "1px solid rgba(111,0,255,0.5)", padding: "clamp(1.3rem,4vw,2.3rem)", boxShadow: "0 30px 90px rgba(17,17,17,0.22)" };
const closeStyle: CSSProperties = { position: "absolute", right: "1rem", top: "1rem", width: "2rem", height: "2rem", display: "grid", placeItems: "center", border: "1px solid rgba(111,0,255,0.28)", background: "#fff", color: "#6F00FF", cursor: "pointer" };
const tagStyle: CSSProperties = { border: "1px solid rgba(111,0,255,0.36)", color: "#6F00FF", padding: "0.28rem 0.48rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.54rem" };
const deleteButton: CSSProperties = { display: "inline-flex", alignItems: "center", gap: "0.4rem", border: "1px solid rgba(153,27,27,0.4)", background: "transparent", color: "#991B1B", padding: "0.55rem 0.7rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.56rem" };
