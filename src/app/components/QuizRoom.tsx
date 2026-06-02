import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { RotateCcw } from "lucide-react";

type Scores = {
  liberal: number; radical: number; socialist: number; marxist: number;
  cultural: number; postmodern: number; intersectional: number;
};

const questions = [
  {
    q: "What is the primary cause of women's oppression?",
    options: [
      { text: "Legal and institutional barriers that can be reformed through law", scores: { liberal: 3 } },
      { text: "The patriarchal system of male dominance pervading all institutions", scores: { radical: 3, cultural: 1 } },
      { text: "The intersection of capitalism and patriarchy working in tandem", scores: { socialist: 3 } },
      { text: "Private property and the capitalist class structure", scores: { marxist: 3 } },
    ],
  },
  {
    q: "A woman earns significantly less than her male colleague. The solution is...",
    options: [
      { text: "Enforce equal pay legislation and anti-discrimination laws", scores: { liberal: 3 } },
      { text: "Dismantle the patriarchal corporate structure entirely", scores: { radical: 3 } },
      { text: "Unionize and address class-based wage inequality at its root", scores: { socialist: 2, marxist: 2 } },
      { text: "Recognize the devaluation of feminized labor across all identities", scores: { intersectional: 2, cultural: 1 } },
    ],
  },
  {
    q: "How do you understand gender?",
    options: [
      { text: "It is real but should not determine one's rights or opportunities", scores: { liberal: 2, cultural: 1 } },
      { text: "It is a hierarchy — masculine over feminine — that must be overturned", scores: { radical: 3 } },
      { text: "It is a social construction we can and should destabilize", scores: { postmodern: 3 } },
      { text: "It is one axis among many — race, class, disability shape it equally", scores: { intersectional: 3 } },
    ],
  },
  {
    q: "Domestic labor — cooking, cleaning, childcare — is...",
    options: [
      { text: "Work that should be equally shared; policy must support this", scores: { liberal: 2 } },
      { text: "A tool of women's subordination requiring radical reimagining", scores: { radical: 3 } },
      { text: "Unpaid labor that sustains capitalism and should be socialized", scores: { socialist: 3, marxist: 2 } },
      { text: "Care work that embodies feminine values society should honor", scores: { cultural: 3 } },
    ],
  },
  {
    q: "A woman of color faces workplace discrimination. The most complete analysis is...",
    options: [
      { text: "She faces gender discrimination — the same laws should protect her", scores: { liberal: 1 } },
      { text: "Her race and gender create a unique oppression reducible to neither alone", scores: { intersectional: 3 } },
      { text: "She faces patriarchal oppression across all communities", scores: { radical: 2 } },
      { text: "Capitalism exploits race and gender divisions for profit", scores: { socialist: 2, marxist: 2 } },
    ],
  },
  {
    q: "Marriage as an institution is...",
    options: [
      { text: "Reformable — it should be a partnership of equals", scores: { liberal: 3 } },
      { text: "A primary site of women's oppression and should be abolished", scores: { radical: 3 } },
      { text: "An economic arrangement serving capitalist reproduction needs", scores: { marxist: 3, socialist: 1 } },
      { text: "A site of care that honors feminine values of commitment", scores: { cultural: 2 } },
    ],
  },
  {
    q: "Men's role in feminism?",
    options: [
      { text: "Full allies — equal partners in the feminist movement", scores: { liberal: 3 } },
      { text: "Supporters from outside — feminism must remain women-led", scores: { radical: 3, cultural: 1 } },
      { text: "Class allies — working-class solidarity across gender is key", scores: { socialist: 2, marxist: 2 } },
      { text: "Men must deconstruct their own masculinity and privilege", scores: { postmodern: 2, intersectional: 2 } },
    ],
  },
  {
    q: "Which statement resonates most with you?",
    options: [
      { text: "\"Women can achieve equality through access to the same rights as men\"", scores: { liberal: 3 } },
      { text: "\"The master's tools will never dismantle the master's house\"", scores: { radical: 2, postmodern: 1, cultural: 1 } },
      { text: "\"You cannot have feminism without socialism\"", scores: { socialist: 3, marxist: 1 } },
      { text: "\"There is no such thing as a single-issue struggle\"", scores: { intersectional: 3 } },
    ],
  },
  {
    q: "Gender difference — feminine traits like care and empathy...",
    options: [
      { text: "Are irrelevant to questions of rights and equality", scores: { liberal: 2 } },
      { text: "Are genuinely valuable and deeply undervalued by society", scores: { cultural: 3 } },
      { text: "Are social constructions perpetuated through power and discourse", scores: { postmodern: 3 } },
      { text: "Are created by and serve to maintain patriarchal hierarchy", scores: { radical: 2 } },
    ],
  },
  {
    q: "Feminist movements that focus only on middle-class white women are...",
    options: [
      { text: "Still progress — gains eventually lift all women", scores: { liberal: 1 } },
      { text: "Missing the most marginalized — intersectionality must be centered", scores: { intersectional: 3 } },
      { text: "Missing class — working-class women must be in the fight", scores: { socialist: 3 } },
      { text: "Divided by patriarchy's tactic of pitting women against each other", scores: { radical: 2, cultural: 1 } },
    ],
  },
  {
    q: "Reproductive rights are...",
    options: [
      { text: "An individual right to bodily autonomy that must be legally protected", scores: { liberal: 3 } },
      { text: "The central battleground where patriarchy controls women's bodies", scores: { radical: 3 } },
      { text: "Shaped by race and class — Black and poor women most affected", scores: { intersectional: 3 } },
      { text: "Reproductive labor central to capitalism's need for a future workforce", scores: { marxist: 2, socialist: 2 } },
    ],
  },
  {
    q: "Technology and digital spaces in relation to feminism...",
    options: [
      { text: "Are powerful tools — close the gender digital divide for equality", scores: { liberal: 2 } },
      { text: "Replicate patriarchal violence — online harassment is structural", scores: { radical: 2, intersectional: 1 } },
      { text: "Are profit-driven platforms exploiting gendered and racialized labor", scores: { socialist: 2, marxist: 2 } },
      { text: "Destabilize fixed gender categories — a site of queer resistance", scores: { postmodern: 3 } },
    ],
  },
  {
    q: "The category \"woman\" is...",
    options: [
      { text: "A meaningful identity deserving equal rights and recognition", scores: { liberal: 2, cultural: 1 } },
      { text: "Defined by subjection to patriarchal male domination", scores: { radical: 2 } },
      { text: "Complex and contested — shaped by race, class, and other forces", scores: { intersectional: 3 } },
      { text: "A social construct worth questioning and disrupting", scores: { postmodern: 3 } },
    ],
  },
  {
    q: "If you could change one thing in society right now...",
    options: [
      { text: "Equal representation of women in all leadership positions", scores: { liberal: 3 } },
      { text: "Dismantling patriarchal power structures in culture and institutions", scores: { radical: 3 } },
      { text: "A redistribution of wealth and end to exploitative capitalism", scores: { marxist: 2, socialist: 2 } },
      { text: "A culture that values care, empathy, and cooperation over competition", scores: { cultural: 3 } },
    ],
  },
  {
    q: "The most important feminist frontier right now is...",
    options: [
      { text: "Shattering the glass ceiling and achieving political parity", scores: { liberal: 3 } },
      { text: "Eliminating sexual violence and the culture that enables it", scores: { radical: 3 } },
      { text: "Building global solidarity with working women across borders", scores: { socialist: 3 } },
      { text: "Abolishing all fixed categories of identity — including gender itself", scores: { postmodern: 2, intersectional: 1 } },
    ],
  },
];

const resultInfo: Record<keyof Scores, { name: string; color: string; paper: string; ink: string; books: string[] }> = {
  liberal: { name: "Liberal Feminism", color: "#8B5A2B", paper: "#F0E8D2", ink: "#1A0A00",
    books: ["A Vindication of the Rights of Woman — Wollstonecraft", "The Feminine Mystique — Betty Friedan", "The Second Sex — Simone de Beauvoir"] },
  radical: { name: "Radical Feminism", color: "#6B1A1A", paper: "#EDE0DC", ink: "#1A0000",
    books: ["Sexual Politics — Kate Millett", "The Dialectic of Sex — Shulamith Firestone", "The Female Eunuch — Germaine Greer"] },
  socialist: { name: "Socialist Feminism", color: "#5A5000", paper: "#E8E4DC", ink: "#0A0A00",
    books: ["Caliban and the Witch — Silvia Federici", "Women, Race & Class — Angela Davis", "The Unhappy Marriage — Heidi Hartmann"] },
  marxist: { name: "Marxist Feminism", color: "#3A3030", paper: "#E4E0D8", ink: "#0A0000",
    books: ["The Origin of the Family — Friedrich Engels", "Women and Socialism — Clara Zetkin", "Social Reproduction Theory — Tithi Bhattacharya"] },
  cultural: { name: "Cultural Feminism", color: "#1A4020", paper: "#E4EAE0", ink: "#001500",
    books: ["In a Different Voice — Carol Gilligan", "Caring — Nel Noddings", "Woman and Nature — Susan Griffin"] },
  postmodern: { name: "Postmodern Feminism", color: "#2A0A5A", paper: "#E0DDE8", ink: "#050010",
    books: ["Gender Trouble — Judith Butler", "A Cyborg Manifesto — Donna Haraway", "Speculum of the Other Woman — Irigaray"] },
  intersectional: { name: "Intersectional Feminism", color: "#0A2A3A", paper: "#E0E8EC", ink: "#000510",
    books: ["Sister Outsider — Audre Lorde", "Mapping the Margins — Kimberlé Crenshaw", "Black Feminist Thought — Patricia Hill Collins"] },
};

function Results({ scores }: { scores: Scores }) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const pcts = Object.fromEntries(
    Object.entries(scores).map(([k, v]) => [k, Math.round((v / total) * 100)])
  ) as Record<keyof Scores, number>;
  const sorted = (Object.entries(pcts) as [keyof Scores, number][]).sort(([, a], [, b]) => b - a);
  const [primary] = sorted;
  const info = resultInfo[primary[0]];

  const radarData = Object.entries(pcts).map(([k, v]) => ({
    subject: resultInfo[k as keyof Scores].name.replace(" Feminism", ""),
    value: v,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      style={{
        background: info.paper,
        padding: "3rem",
        position: "relative",
        clipPath: "polygon(0 1%, 2% 0, 5% 1%, 12% 0, 20% 1.5%, 30% 0, 42% 1%, 57% 0, 72% 1%, 85% 0, 94% 1%, 100% 0, 100% 99%, 97% 100%, 92% 98.5%, 85% 100%, 77% 99%, 68% 100%, 59% 98.5%, 49% 100%, 39% 99%, 29% 100%, 20% 98.5%, 12% 100%, 5% 99%, 1% 100%, 0 99%)",
        filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.25))",
      }}
    >
      {/* Stamp header */}
      <div style={{
        borderTop: `3px solid ${info.color}`,
        borderBottom: `1px solid ${info.color}`,
        padding: "0.4rem 0",
        marginBottom: "0.4rem",
      }}>
        <div style={{ borderBottom: `1px solid ${info.color}30`, paddingBottom: "0.3rem", marginBottom: "0.3rem" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", color: info.color, opacity: 0.7 }}>
            FEMINIST ARCHIVE — THEORY ASSESSMENT — RESULT CLASSIFIED
          </span>
        </div>
      </div>

      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: info.ink, lineHeight: 0.9, marginBottom: "0.4rem" }}>
        YOUR TENDENCY:
      </h3>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        color: info.color,
        lineHeight: 0.9,
        marginBottom: "1.5rem",
      }}>
        {info.name.toUpperCase()}
      </div>

      <div style={{ height: "1px", background: info.color, opacity: 0.2, marginBottom: "1.5rem" }} />

      {/* Radar chart */}
      <div style={{ height: "260px", marginBottom: "1.5rem" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke={`${info.color}25`} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: info.color, fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", opacity: 0.6 }} />
            <Radar dataKey="value" stroke={info.color} fill={info.color} fillOpacity={0.15} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Score bars */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: info.color, opacity: 0.6, marginBottom: "0.75rem" }}>
          COMPATIBILITY BREAKDOWN
        </div>
        {sorted.map(([key, pct]) => (
          <div key={key} style={{ marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
              <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.75rem", color: info.ink, opacity: 0.7 }}>
                {resultInfo[key].name}
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: info.color }}>
                {pct}%
              </span>
            </div>
            <div style={{ height: "2px", background: `${info.color}18` }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ height: "100%", background: info.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recommended reading */}
      <div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: info.color, opacity: 0.6, marginBottom: "0.6rem" }}>
          ASSIGNED READING
        </div>
        {info.books.map((b, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.4rem", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: info.color, opacity: 0.5, flexShrink: 0, marginTop: "0.1rem" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.85rem", color: info.ink, opacity: 0.8, lineHeight: 1.4 }}>
              {b}
            </span>
          </div>
        ))}
      </div>

      {/* Corner stamp */}
      <div style={{
        position: "absolute", bottom: "2.5rem", right: "2rem",
        transform: "rotate(12deg)",
        border: `2px solid ${info.color}40`,
        padding: "0.3rem 0.6rem",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.5rem", color: `${info.color}50`,
        letterSpacing: "0.2em", lineHeight: 1.5,
      }}>
        CERTIFIED<br />FEMINIST<br />♀
      </div>
    </motion.div>
  );
}

export function QuizRoom() {
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [scores, setScores] = useState<Scores>({ liberal: 0, radical: 0, socialist: 0, marxist: 0, cultural: 0, postmodern: 0, intersectional: 0 });
  const [done, setDone] = useState(false);

  const advance = () => {
    if (sel === null) return;
    const opts = questions[qi].options[sel].scores;
    const ns = { ...scores };
    Object.entries(opts).forEach(([k, v]) => { ns[k as keyof Scores] += v as number; });
    setScores(ns);
    if (qi + 1 >= questions.length) setDone(true);
    else { setQi(qi + 1); setSel(null); }
  };

  const reset = () => { setQi(0); setSel(null); setDone(false); setScores({ liberal: 0, radical: 0, socialist: 0, marxist: 0, cultural: 0, postmodern: 0, intersectional: 0 }); };

  const progress = (qi / questions.length) * 100;

  return (
    <section
      id="quiz"
      style={{
        background: "#EDE8D8",
        padding: "6rem 3rem 8rem",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px", opacity: 0.5,
      }} />

      {/* Photocopy-style border */}
      <div style={{
        position: "absolute", inset: "2rem",
        border: "1px solid rgba(13,13,13,0.08)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Background archive photo */}
      <div style={{
        position: "absolute", top: "5%", right: "2%",
        width: "30%", zIndex: 0,
        opacity: 0.06, transform: "rotate(1.5deg)",
      }}>
        <img
          src="https://images.unsplash.com/photo-1761519609203-fabba0a62c87?w=600&q=60"
          alt=""
          style={{ width: "100%", filter: "grayscale(1) contrast(1.5)" }}
        />
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "3rem" }}
        >
          <div style={{ borderTop: "3px solid #0D0D0D", borderBottom: "1px solid #0D0D0D", padding: "0.35rem 0", marginBottom: "0.3rem" }}>
            <div style={{ borderBottom: "1px solid rgba(13,13,13,0.2)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.28em", color: "#0D0D0D", opacity: 0.45 }}>
                FEMINIST ARCHIVE — SECTION IV — THEORY ASSESSMENT FORM
              </span>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "#0D0D0D", lineHeight: 0.88 }}>
            FEMINIST<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.5px #2C0A5E" }}>THEORY</span> QUIZ
          </h2>
          <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", color: "#2C0A5E", fontStyle: "italic", marginTop: "0.75rem" }}>
            15 questions. Discover your feminist tradition.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Results scores={scores} />
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <button
                  onClick={reset}
                  style={{
                    background: "none", border: "1px solid rgba(13,13,13,0.3)",
                    padding: "0.6rem 1.5rem", cursor: "pointer",
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem",
                    letterSpacing: "0.15em", color: "#0D0D0D",
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  }}
                >
                  <RotateCcw size={12} /> RETAKE
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key={`q${qi}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {/* Progress bar */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.15em", color: "rgba(13,13,13,0.4)" }}>
                    {String(qi + 1).padStart(2, "0")} / {questions.length}
                  </span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: "#2C0A5E" }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div style={{ height: "1px", background: "rgba(13,13,13,0.1)" }}>
                  <motion.div animate={{ width: `${progress}%` }} style={{ height: "1px", background: "#2C0A5E" }} />
                </div>
              </div>

              {/* Question paper */}
              <div style={{
                background: "#F5F0E4",
                padding: "2rem",
                marginBottom: "1.5rem",
                position: "relative",
                clipPath: "polygon(0 2%, 2% 0, 5% 1.5%, 10% 0, 17% 1%, 25% 0, 35% 1.5%, 46% 0, 58% 1%, 70% 0, 82% 1.5%, 93% 0, 100% 1%, 100% 99%, 97% 100%, 92% 98.5%, 86% 100%, 78% 99%, 70% 100%, 60% 99%, 50% 100%, 39% 99%, 28% 100%, 18% 99%, 9% 100%, 3% 98.5%, 0 100%)",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))",
              }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#2C0A5E", opacity: 0.5, marginBottom: "0.75rem" }}>
                  QUESTION {String(qi + 1).padStart(2, "0")}
                </div>
                <div style={{ height: "1px", background: "rgba(13,13,13,0.12)", marginBottom: "1rem" }} />
                <p style={{ fontFamily: "'IM Fell English', serif", fontSize: "1.1rem", color: "#0D0D0D", lineHeight: 1.55 }}>
                  {questions[qi].q}
                </p>
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
                {questions[qi].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSel(i)}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "0.9rem",
                      padding: "0.9rem 1.1rem",
                      background: sel === i ? "rgba(44,10,94,0.06)" : "rgba(13,13,13,0.02)",
                      border: `1px solid ${sel === i ? "rgba(44,10,94,0.35)" : "rgba(13,13,13,0.1)"}`,
                      cursor: "pointer", textAlign: "left",
                      transition: "all 0.15s",
                      fontFamily: "'Special Elite', cursive",
                      fontSize: "0.85rem", color: "#0D0D0D", lineHeight: 1.5,
                    }}
                    onMouseEnter={(e) => { if (sel !== i) e.currentTarget.style.borderColor = "rgba(13,13,13,0.25)"; }}
                    onMouseLeave={(e) => { if (sel !== i) e.currentTarget.style.borderColor = "rgba(13,13,13,0.1)"; }}
                  >
                    <span style={{
                      width: "20px", height: "20px", flexShrink: 0,
                      border: `1px solid ${sel === i ? "#2C0A5E" : "rgba(13,13,13,0.3)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      color: sel === i ? "#2C0A5E" : "rgba(13,13,13,0.4)",
                      background: sel === i ? "rgba(44,10,94,0.08)" : "transparent",
                      marginTop: "1px",
                    }}>
                      {sel === i ? "✓" : String.fromCharCode(65 + i)}
                    </span>
                    {opt.text}
                  </button>
                ))}
              </div>

              {/* Next */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={advance}
                  disabled={sel === null}
                  style={{
                    padding: "0.65rem 1.75rem",
                    background: sel !== null ? "#2C0A5E" : "transparent",
                    border: `1px solid ${sel !== null ? "#2C0A5E" : "rgba(13,13,13,0.15)"}`,
                    color: sel !== null ? "#EDE8D8" : "rgba(13,13,13,0.25)",
                    cursor: sel !== null ? "pointer" : "not-allowed",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem", letterSpacing: "0.15em",
                    transition: "all 0.2s",
                  }}
                >
                  {qi + 1 === questions.length ? "SUBMIT →" : "NEXT →"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
