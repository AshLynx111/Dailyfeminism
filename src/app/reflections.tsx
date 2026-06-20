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

type LocalizedPrompt = {
  question: string;
  helper: string;
};

const reflectionPromptSets: Record<ReflectionSourceType, { zh: LocalizedPrompt[]; en: LocalizedPrompt[] }> = {
  theory: {
    zh: [
      { question: "这个流派的哪一个观点，让你想到生活中的某个具体场景？", helper: "可以从工作、家庭、教育、亲密关系、身体、安全感或网络经历中选择一件事。" },
      { question: "如果用这个流派的视角重新看这件事，你会注意到什么？", helper: "例如规则由谁制定、机会如何分配、谁承担代价，或哪些感受曾被当成个人问题。" },
      { question: "这个视角解释了什么，又有哪些地方无法完全解释你的经验？", helper: "可以写认同、犹豫、抵触或仍未解决的问题。" },
    ],
    en: [
      { question: "Which idea from this school brings a specific moment in your life to mind?", helper: "You might begin with work, family, education, intimacy, your body, safety, or an online experience." },
      { question: "What becomes visible when you reconsider that moment through this school's perspective?", helper: "Consider who makes the rules, how opportunities are distributed, who bears the cost, or which feelings were treated as merely personal." },
      { question: "What does this perspective explain, and where does it fail to fully explain your experience?", helper: "You can record agreement, hesitation, resistance, or a question that remains unresolved." },
    ],
  },
  quiz: {
    zh: [
      { question: "测试结果中，哪一部分最像你？哪一部分不像你？", helper: "用一个真实选择、经历或长期关注的问题来说明。" },
      { question: "当这些倾向放进同一件现实问题中，它们会如何影响你的判断？", helper: "可以选择职场公平、照护劳动、身体自主、贫富差距、身份差异等具体问题。" },
      { question: "这份结果让你接下来更想观察自己的什么变化？", helper: "例如判断问题的角度、情绪反应、与他人的讨论方式或实际选择。" },
    ],
    en: [
      { question: "Which part of this result feels most like you, and which part does not?", helper: "Use a real choice, experience, or issue you have cared about over time as evidence." },
      { question: "How might these tendencies shape your judgment when applied to one real issue?", helper: "You might choose workplace fairness, care labor, bodily autonomy, economic inequality, or differences in identity." },
      { question: "What change in yourself does this result make you want to observe next?", helper: "Consider how you frame an issue, respond emotionally, discuss it with others, or make practical choices." },
    ],
  },
  lineage: {
    zh: [
      { question: "这一历史阶段的核心问题，在今天以什么形式出现在你的生活或周围？", helper: "可以联系家庭分工、工作制度、社会新闻、公共政策或身边人的经历。" },
      { question: "对照当时与现在，你认为哪些事情改变了，哪些结构仍然存在？", helper: "可以比较法律、观念、资源分配、表达空间或日常习惯。" },
      { question: "知道这段历史后，你会怎样重新理解自己或他人的某段经验？", helper: "写下一个发生变化的判断，也可以记录仍然无法回答的疑问。" },
    ],
    en: [
      { question: "How does this historical stage's central question appear in your life or surroundings today?", helper: "Connect it to family roles, workplace systems, news, public policy, or someone close to you." },
      { question: "Compared with that period, what has changed and which structures still remain?", helper: "You might compare laws, beliefs, access to resources, room for expression, or everyday habits." },
      { question: "How does knowing this history change the way you understand an experience of your own or someone else's?", helper: "Record a judgment that shifted, or a question the history still cannot answer." },
    ],
  },
  reading: {
    zh: [
      { question: "这份阅读档案中的哪个观点，挑战或补充了你原来的理解？", helper: "不需要总结全书，只需选择一句话、一个概念或一处让你停顿的内容。" },
      { question: "你会用这个观点重新看待哪一件现实中的事情？", helper: "可以是个人经历、社会事件、影视内容、网络讨论或一段关系。" },
      { question: "带着这个观点回到生活后，你想继续观察或追问什么？", helper: "可以关注自己的反应、他人的处境、制度规则，或这个理论解释不到的部分。" },
    ],
    en: [
      { question: "Which idea in this reading archive challenges or adds to your earlier understanding?", helper: "You do not need to summarize the book. Choose one sentence, concept, or moment that made you pause." },
      { question: "What real situation would you reconsider through this idea?", helper: "It might be a personal experience, public event, film, online discussion, or relationship." },
      { question: "After returning to life with this idea, what do you want to keep observing or questioning?", helper: "Notice your own response, another person's situation, institutional rules, or what this theory still cannot explain." },
    ],
  },
};

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

  const prompts = source ? reflectionPromptSets[source.type][isZh ? "zh" : "en"] : [];

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

              {prompts.map((prompt, index) => (
                <label key={prompt.question} style={{ display: "block", marginBottom: "1rem" }}>
                  <span style={{ display: "block", fontFamily: "'IM Fell English', serif", fontSize: "0.94rem", lineHeight: 1.45, marginBottom: "0.42rem" }}>
                    <span style={{ color: "#6F00FF", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", marginRight: "0.45rem" }}>0{index + 1}</span>
                    {prompt.question}
                  </span>
                  <span style={helperStyle}>{isZh ? "提示：" : "PROMPT: "}{prompt.helper}</span>
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
const helperStyle: CSSProperties = { display: "block", margin: "-0.12rem 0 0.48rem 1.55rem", paddingLeft: "0.55rem", borderLeft: "2px solid rgba(111,0,255,0.24)", color: "rgba(17,17,17,0.56)", fontFamily: "'Special Elite', cursive", fontSize: "0.7rem", lineHeight: 1.5 };
const textareaStyle: CSSProperties = { width: "100%", resize: "vertical", border: "1px solid rgba(111,0,255,0.3)", background: "rgba(255,255,255,0.82)", padding: "0.72rem", color: "#111", fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", lineHeight: 1.55, outlineColor: "#6F00FF", boxSizing: "border-box" };
const lensStyle: CSSProperties = { border: "1px solid rgba(111,0,255,0.5)", padding: "0.36rem 0.55rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.56rem" };
const triggerStyle: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.45rem", border: "1px solid #6F00FF", background: "#fff", color: "#6F00FF", padding: "0.72rem 0.9rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", boxShadow: "5px 5px 0 rgba(111,0,255,0.16)" };
const submitStyle: CSSProperties = { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", border: "1px solid #6F00FF", background: "#6F00FF", color: "#fff", padding: "0.8rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", boxShadow: "7px 7px 0 #24004D" };
const noticeStyle: CSSProperties = { position: "fixed", zIndex: 4200, left: "50%", bottom: "1.2rem", translate: "-50% 0", width: "min(calc(100% - 2rem), 720px)", boxSizing: "border-box", background: "#24004D", color: "#fff", border: "1px solid #A78BFA", padding: "0.9rem 1rem", boxShadow: "0 18px 50px rgba(17,17,17,0.28)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem" };
const noticePrimaryStyle: CSSProperties = { border: "1px solid #fff", background: "#fff", color: "#24004D", padding: "0.55rem 0.7rem", cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.54rem" };
const noticeSecondaryStyle: CSSProperties = { ...noticePrimaryStyle, background: "transparent", color: "#fff" };
