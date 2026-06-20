import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookHeart, X } from "lucide-react";
import { useLanguage } from "./i18n";

export type TheoryId =
  | "liberal"
  | "radical"
  | "socialist"
  | "marxist"
  | "cultural"
  | "postmodern"
  | "intersectional";

export type ReflectionSourceType = "theory" | "quiz" | "lineage" | "reading";
export type ReflectionLens =
  | "structure"
  | "experience"
  | "relationships"
  | "emotion"
  | "labor"
  | "identity";

export type ReflectionSource = {
  type: ReflectionSourceType;
  id: string;
  title: string;
  theoryIds: TheoryId[];
  snapshot: string;
};

export type ReflectionRecord = ReflectionSource & {
  version: 1;
  recordId: string;
  createdAt: string;
  answers: [string, string, string];
  lenses: ReflectionLens[];
};

type ReflectionContextValue = {
  records: ReflectionRecord[];
  openReflection: (source: ReflectionSource) => void;
  deleteReflection: (recordId: string) => boolean;
};

const STORAGE_KEY = "dailyfeminism:reflections:v1";
const sourceTypes: ReflectionSourceType[] = ["theory", "quiz", "lineage", "reading"];
const lensIds: ReflectionLens[] = ["structure", "experience", "relationships", "emotion", "labor", "identity"];
const theoryIds: TheoryId[] = ["liberal", "radical", "socialist", "marxist", "cultural", "postmodern", "intersectional"];
const ReflectionContext = createContext<ReflectionContextValue | null>(null);

function isReflectionRecord(value: unknown): value is ReflectionRecord {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ReflectionRecord>;
  return (
    item.version === 1 &&
    typeof item.recordId === "string" &&
    typeof item.createdAt === "string" &&
    sourceTypes.includes(item.type as ReflectionSourceType) &&
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.snapshot === "string" &&
    Array.isArray(item.theoryIds) &&
    item.theoryIds.every((id) => theoryIds.includes(id as TheoryId)) &&
    !Number.isNaN(Date.parse(item.createdAt)) &&
    Array.isArray(item.answers) &&
    item.answers.length === 3 &&
    item.answers.every((answer) => typeof answer === "string") &&
    Array.isArray(item.lenses) &&
    item.lenses.every((lens) => lensIds.includes(lens as ReflectionLens))
  );
}

function readRecords() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isReflectionRecord) : [];
  } catch {
    return [];
  }
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const theoryColors: Record<TheoryId, string> = {
  liberal: "#7C3AED",
  radical: "#C026D3",
  socialist: "#EA580C",
  marxist: "#DC2626",
  cultural: "#0F766E",
  postmodern: "#2563EB",
  intersectional: "#6F00FF",
};

export const theoryLabels: Record<TheoryId, { en: string; zh: string }> = {
  liberal: { en: "Liberal", zh: "自由主义" },
  radical: { en: "Radical", zh: "激进" },
  socialist: { en: "Socialist", zh: "社会主义" },
  marxist: { en: "Marxist", zh: "马克思主义" },
  cultural: { en: "Cultural", zh: "文化" },
  postmodern: { en: "Postmodern", zh: "后现代" },
  intersectional: { en: "Intersectional", zh: "交叉性" },
};

export const lensLabels: Record<ReflectionLens, { en: string; zh: string }> = {
  structure: { en: "Institutional structure", zh: "制度结构" },
  experience: { en: "Individual experience", zh: "个体经验" },
  relationships: { en: "Relationships", zh: "关系互动" },
  emotion: { en: "Emotion", zh: "情感感受" },
  labor: { en: "Labor & resources", zh: "劳动与资源" },
  identity: { en: "Identity & situation", zh: "身份与处境" },
};

export function ReflectionProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<ReflectionRecord[]>(readRecords);
  const [source, setSource] = useState<ReflectionSource | null>(null);
  const [answers, setAnswers] = useState<[string, string, string]>(["", "", ""]);
  const [lenses, setLenses] = useState<ReflectionLens[]>([]);
  const [attempted, setAttempted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const { isZh } = useLanguage();

  useEffect(() => {
    if (!source) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSource(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [source]);

  const persist = (next: ReflectionRecord[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setRecords(next);
      setStorageError(false);
      return true;
    } catch {
      setStorageError(true);
      return false;
    }
  };

  const value = useMemo<ReflectionContextValue>(
    () => ({
      records,
      openReflection: (nextSource) => {
        setSavedNotice(false);
        setSource(nextSource);
        setAnswers(["", "", ""]);
        setLenses([]);
        setAttempted(false);
        setStorageError(false);
      },
      deleteReflection: (recordId) => persist(records.filter((record) => record.recordId !== recordId)),
    }),
    [records],
  );

  const questions = isZh
    ? [
        "在我的生活经验中，哪里让我想起这一部分内容？",
        "我现在更倾向如何理解这种情况？",
        "如果这种情况持续存在，我的感受是？",
      ]
    : [
        "Where in my life does this part remind me of something I have experienced?",
        "How am I more inclined to understand this situation now?",
        "How do I feel if this situation continues?",
      ];

  const submit = () => {
    if (!source || saving) return;
    setAttempted(true);
    const normalized = answers.map((answer) => answer.trim()) as [string, string, string];
    if (normalized.some((answer) => !answer)) return;
    setSaving(true);
    const next: ReflectionRecord = {
      ...source,
      version: 1,
      recordId: makeId(),
      createdAt: new Date().toISOString(),
      answers: normalized,
      lenses,
    };
    if (persist([...records, next])) {
      setSource(null);
      setSavedNotice(true);
    }
    setSaving(false);
  };

  return (
    <ReflectionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {source && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => event.target === event.currentTarget && setSource(null)}
            style={overlayStyle}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="reflection-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              style={drawerStyle}
            >
              <button onClick={() => setSource(null)} aria-label={isZh ? "关闭" : "Close"} style={closeStyle}>
                <X size={19} />
              </button>
              <div style={kickerStyle}>{isZh ? "私人思想档案 / 仅存于此浏览器" : "PRIVATE THOUGHT ARCHIVE / THIS BROWSER ONLY"}</div>
              <h2 id="reflection-title" style={{ margin: "0.55rem 2rem 0.5rem 0", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", lineHeight: 0.95 }}>
                {isZh ? "记录此刻的理解" : "RECORD THIS THOUGHT"}
              </h2>
              <div style={{ borderLeft: "4px solid #6F00FF", background: "rgba(111,0,255,0.07)", padding: "0.75rem 0.85rem", marginBottom: "1.2rem" }}>
                <div style={{ ...kickerStyle, marginBottom: "0.25rem" }}>{source.type.toUpperCase()}</div>
                <div style={{ fontFamily: "'IM Fell English', serif", fontSize: "1rem", lineHeight: 1.35 }}>{source.title}</div>
                <div style={{ marginTop: "0.3rem", fontFamily: "'Special Elite', cursive", fontSize: "0.72rem", color: "rgba(17,17,17,0.58)", lineHeight: 1.45 }}>{source.snapshot}</div>
              </div>

              {questions.map((question, index) => (
                <label key={question} style={{ display: "block", marginBottom: "1rem" }}>
                  <span style={{ display: "block", fontFamily: "'IM Fell English', serif", fontSize: "0.94rem", lineHeight: 1.45, marginBottom: "0.42rem" }}>
                    <span style={{ color: "#6F00FF", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", marginRight: "0.45rem" }}>0{index + 1}</span>
                    {question}
                  </span>
                  <textarea
                    autoFocus={index === 0}
                    value={answers[index]}
                    onChange={(event) => {
                      const next = [...answers] as [string, string, string];
                      next[index] = event.target.value;
                      setAnswers(next);
                    }}
                    aria-invalid={attempted && !answers[index].trim()}
                    rows={index === 0 ? 3 : 2}
                    style={{ ...textareaStyle, borderColor: attempted && !answers[index].trim() ? "#B91C1C" : "rgba(111,0,255,0.3)" }}
                  />
                  {attempted && !answers[index].trim() && (
                    <span style={{ display: "block", color: "#B91C1C", fontSize: "0.65rem", marginTop: "0.25rem" }}>{isZh ? "请写下这一部分。" : "Please complete this reflection."}</span>
                  )}
                </label>
              ))}

              <fieldset style={{ border: 0, padding: 0, margin: "0 0 1.2rem" }}>
                <legend style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: "#6F00FF", letterSpacing: "0.12em", marginBottom: "0.55rem" }}>
                  {isZh ? "可选：我使用了哪些理解视角？" : "OPTIONAL: WHICH LENSES AM I USING?"}
                </legend>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {lensIds.map((lens) => {
                    const active = lenses.includes(lens);
                    return (
                      <button
                        type="button"
                        aria-pressed={active}
                        key={lens}
                        onClick={() => setLenses(active ? lenses.filter((item) => item !== lens) : [...lenses, lens])}
                        style={{ ...lensStyle, background: active ? "#6F00FF" : "transparent", color: active ? "#fff" : "#6F00FF" }}
                      >
                        {isZh ? lensLabels[lens].zh : lensLabels[lens].en}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {storageError && (
                <div role="alert" style={{ color: "#991B1B", background: "#FEE2E2", padding: "0.7rem", fontSize: "0.72rem", lineHeight: 1.5, marginBottom: "0.8rem" }}>
                  {isZh ? "浏览器无法保存这条记录。你的文字仍在这里，请检查隐私或存储设置后重试。" : "This browser could not save the record. Your text is still here; check storage or privacy settings and try again."}
                </div>
              )}
              <button type="button" disabled={saving} onClick={submit} style={submitStyle}>
                <BookHeart size={15} /> {isZh ? "存入我的思想年轮" : "ADD TO MY THOUGHT RINGS"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {savedNotice && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            style={noticeStyle}
          >
            <div>
              <div style={{ ...kickerStyle, color: "#fff" }}>{isZh ? "已存入思想档案" : "SAVED TO YOUR THOUGHT ARCHIVE"}</div>
              <div style={{ marginTop: "0.25rem", fontFamily: "'IM Fell English', serif", fontSize: "0.88rem" }}>{isZh ? "这条记录已在当前浏览器中成为一张思想卡片。" : "This reflection is now a thought card in this browser."}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              <button
                onClick={() => {
                  setSavedNotice(false);
                  document.querySelector("#thought-rings")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={noticePrimaryStyle}
              >
                {isZh ? "查看我的思想年轮" : "VIEW MY THOUGHT RINGS"}
              </button>
              <button onClick={() => setSavedNotice(false)} style={noticeSecondaryStyle}>{isZh ? "继续浏览" : "KEEP BROWSING"}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReflectionContext.Provider>
  );
}

export function useReflections() {
  const context = useContext(ReflectionContext);
  if (!context) throw new Error("useReflections must be used inside ReflectionProvider");
  return context;
}

export function ReflectionTrigger({ source, compact = false, onBeforeOpen }: { source: ReflectionSource; compact?: boolean; onBeforeOpen?: () => void }) {
  const { openReflection } = useReflections();
  const { isZh } = useLanguage();
  return (
    <button type="button" onClick={() => { onBeforeOpen?.(); openReflection(source); }} style={{ ...triggerStyle, padding: compact ? "0.58rem 0.72rem" : triggerStyle.padding }}>
      <BookHeart size={14} /> {isZh ? "记录此刻的理解" : "RECORD THIS THOUGHT"}
    </button>
  );
}

const overlayStyle: CSSProperties = { position: "fixed", inset: 0, zIndex: 4000, background: "rgba(17,17,17,0.48)", display: "flex", justifyContent: "flex-end" };
const drawerStyle: CSSProperties = { width: "min(100%, 560px)", height: "100%", overflowY: "auto", background: "linear-gradient(180deg,#fff,#f4efff)", padding: "clamp(1.25rem,4vw,2.2rem)", boxShadow: "-24px 0 70px rgba(17,17,17,0.2)", position: "relative", color: "#111" };
const closeStyle: CSSProperties = { position: "absolute", right: "1.15rem", top: "1.15rem", border: "1px solid rgba(111,0,255,0.28)", background: "#fff", color: "#6F00FF", width: "2.1rem", height: "2.1rem", display: "grid", placeItems: "center", cursor: "pointer" };
const kickerStyle: CSSProperties = { fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.15em", color: "#6F00FF" };
const textareaStyle: CSSProperties = { width: "100%", resize: "vertical", border: "1px solid rgba(111,0,255,0.3)", background: "rgba(255,255,255,0.82)", padding: "0.72rem", color: "#111", fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", lineHeight: 1.55, outlineColor: "#6F00FF", boxSizing: "border-box" };
const lensStyle: CSSProperties = { border: "1px solid rgba(111,0,255,0.5)", padding: "0.36rem 0.55rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.56rem" };
const triggerStyle: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.45rem", border: "1px solid #6F00FF", background: "#fff", color: "#6F00FF", padding: "0.72rem 0.9rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", boxShadow: "5px 5px 0 rgba(111,0,255,0.16)" };
const submitStyle: CSSProperties = { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", border: "1px solid #6F00FF", background: "#6F00FF", color: "#fff", padding: "0.8rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", boxShadow: "7px 7px 0 #24004D" };
const noticeStyle: CSSProperties = { position: "fixed", zIndex: 4200, left: "50%", bottom: "1.2rem", translate: "-50% 0", width: "min(calc(100% - 2rem), 720px)", boxSizing: "border-box", background: "#24004D", color: "#fff", border: "1px solid #A78BFA", padding: "0.9rem 1rem", boxShadow: "0 18px 50px rgba(17,17,17,0.28)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem" };
const noticePrimaryStyle: CSSProperties = { border: "1px solid #fff", background: "#fff", color: "#24004D", padding: "0.55rem 0.7rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.54rem" };
const noticeSecondaryStyle: CSSProperties = { ...noticePrimaryStyle, background: "transparent", color: "#fff" };
