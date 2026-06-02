import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { ChevronRight, RotateCcw } from "lucide-react";

type Scores = {
  liberal: number;
  radical: number;
  socialist: number;
  marxist: number;
  cultural: number;
  postmodern: number;
  intersectional: number;
};

type Option = {
  text: string;
  scores: Partial<Scores>;
};

type Question = {
  id: number;
  question: string;
  context?: string;
  options: Option[];
};

const questions: Question[] = [
  {
    id: 1,
    question: "What do you think is the PRIMARY cause of women's oppression?",
    options: [
      { text: "Legal and institutional barriers that can be reformed", scores: { liberal: 3 } },
      { text: "The deep-rooted system of male dominance (patriarchy)", scores: { radical: 3, cultural: 1 } },
      { text: "The intersection of capitalism and patriarchy working together", scores: { socialist: 3 } },
      { text: "Private property and the class structure of capitalism", scores: { marxist: 3 } },
    ],
  },
  {
    id: 2,
    question: "A woman earns less than her male colleague for identical work. What's the most important solution?",
    options: [
      { text: "Pass equal pay legislation and enforce anti-discrimination laws", scores: { liberal: 3 } },
      { text: "Dismantle the entire patriarchal corporate structure", scores: { radical: 3 } },
      { text: "Unionize workers and address class-based wage inequality", scores: { socialist: 2, marxist: 2 } },
      { text: "Recognize that pay gaps reflect broader cultural devaluation of women's work", scores: { cultural: 2, intersectional: 2 } },
    ],
  },
  {
    id: 3,
    question: "How do you think about gender?",
    options: [
      { text: "It's biologically real but shouldn't determine one's opportunities", scores: { liberal: 2, cultural: 1 } },
      { text: "It's a system of hierarchy — masculine over feminine — that must be overturned", scores: { radical: 3 } },
      { text: "It's a social construction that can and should be destabilized", scores: { postmodern: 3 } },
      { text: "It's one of many interlocking identity categories that shape experience", scores: { intersectional: 3 } },
    ],
  },
  {
    id: 4,
    question: "What is your view on domestic labor (cooking, cleaning, childcare)?",
    options: [
      { text: "It should be equally shared between partners; policies should support this", scores: { liberal: 2 } },
      { text: "It is a tool of women's subordination; we must radically reimagine household structures", scores: { radical: 3 } },
      { text: "It is unpaid labor that sustains capitalism; it should be paid and socialized", scores: { socialist: 3, marxist: 2 } },
      { text: "It embodies care and nurturing, values society should celebrate more broadly", scores: { cultural: 3 } },
    ],
  },
  {
    id: 5,
    question: "A woman of color faces discrimination at her workplace. Which analysis resonates most?",
    options: [
      { text: "She faces gender discrimination — the same laws that protect all women should help", scores: { liberal: 1 } },
      { text: "Her race and gender create a unique form of oppression not reducible to either alone", scores: { intersectional: 3 } },
      { text: "She faces patriarchal oppression that manifests across different communities", scores: { radical: 2 } },
      { text: "Her experience reflects how capitalism exploits both race and gender divisions", scores: { socialist: 2, marxist: 2 } },
    ],
  },
  {
    id: 6,
    question: "What is your view on marriage as an institution?",
    options: [
      { text: "It should be reformed to ensure equality between partners", scores: { liberal: 3 } },
      { text: "It is a primary institution of women's oppression and should be abolished", scores: { radical: 3 } },
      { text: "It is an economic arrangement that serves capitalist interests in reproduction", scores: { marxist: 3, socialist: 1 } },
      { text: "It can be a site of care and love, but needs to honor feminine values", scores: { cultural: 2 } },
    ],
  },
  {
    id: 7,
    question: "How do you view pornography and the sex industry?",
    options: [
      { text: "Women should have the legal right to choose; focus on safety and labor rights", scores: { liberal: 2, postmodern: 1 } },
      { text: "It is fundamentally exploitative and reflects male sexual violence against women", scores: { radical: 3 } },
      { text: "It's a complex issue — some exploitative, some empowering; context matters", scores: { postmodern: 2, intersectional: 2 } },
      { text: "It reflects how capitalism commodifies women's bodies under patriarchy", scores: { socialist: 2, marxist: 2 } },
    ],
  },
  {
    id: 8,
    question: "What role should men play in feminism?",
    options: [
      { text: "Full allies — men should be equal partners in the feminist movement", scores: { liberal: 3 } },
      { text: "Supporters from outside — feminism must remain a women-led movement", scores: { radical: 3, cultural: 1 } },
      { text: "Working-class men face exploitation too; solidarity across gender is key", scores: { socialist: 2, marxist: 2 } },
      { text: "Men must deconstruct their own masculinity and privilege", scores: { postmodern: 2, intersectional: 2 } },
    ],
  },
  {
    id: 9,
    question: "Which best describes your view on gender difference?",
    options: [
      { text: "Differences exist but are irrelevant to questions of rights and equality", scores: { liberal: 3 } },
      { text: "Feminine qualities like care and empathy are genuinely valuable and undervalued", scores: { cultural: 3 } },
      { text: "Gender differences are largely social constructions perpetuated by power", scores: { postmodern: 3 } },
      { text: "Differences are created by and serve to maintain patriarchal hierarchy", scores: { radical: 2 } },
    ],
  },
  {
    id: 10,
    question: "How do technology and digital spaces relate to feminism?",
    options: [
      { text: "They're powerful tools for equality — close the gender digital divide", scores: { liberal: 2 } },
      { text: "Online spaces replicate patriarchal violence — harassment is structural", scores: { radical: 2, intersectional: 1 } },
      { text: "Tech platforms are profit-driven and exploit gendered and racialized labor", scores: { socialist: 2, marxist: 2 } },
      { text: "Digital identity destabilizes fixed gender categories — a site of resistance", scores: { postmodern: 3 } },
    ],
  },
  {
    id: 11,
    question: "A feminist movement focuses only on middle-class white women's issues. You think...",
    options: [
      { text: "It's still progress — all feminist gains lift all women eventually", scores: { liberal: 1 } },
      { text: "It needs to center the experiences of women most marginalized by multiple systems", scores: { intersectional: 3 } },
      { text: "It must include working-class women; gender liberation requires class solidarity", scores: { socialist: 3 } },
      { text: "All women share the experience of patriarchal oppression as their bond", scores: { radical: 2, cultural: 1 } },
    ],
  },
  {
    id: 12,
    question: "How do you feel about reproductive rights?",
    options: [
      { text: "Women have an individual right to bodily autonomy — access must be legally protected", scores: { liberal: 3 } },
      { text: "Reproductive control is how patriarchy controls women's bodies and lives", scores: { radical: 3 } },
      { text: "Reproductive injustice affects poor women and women of color most severely", scores: { intersectional: 3 } },
      { text: "Reproductive labor is central to capitalism's need for a future workforce", scores: { marxist: 2, socialist: 2 } },
    ],
  },
  {
    id: 13,
    question: "Which statement feels most true to you?",
    options: [
      { text: "\"Women can achieve equality by gaining access to the same rights and opportunities as men\"", scores: { liberal: 3 } },
      { text: "\"The master's tools will never dismantle the master's house\"", scores: { radical: 2, postmodern: 1, cultural: 1 } },
      { text: "\"You cannot have feminism without socialism, or socialism without feminism\"", scores: { socialist: 3, marxist: 1 } },
      { text: "\"There is no such thing as a single-issue struggle\"", scores: { intersectional: 3 } },
    ],
  },
  {
    id: 14,
    question: "If you could change one thing about society right now, it would be...",
    options: [
      { text: "Equal representation of women in all leadership and decision-making roles", scores: { liberal: 3 } },
      { text: "The elimination of patriarchal power structures that dominate culture and institutions", scores: { radical: 3 } },
      { text: "A redistribution of wealth and an end to exploitative capitalist labor relations", scores: { marxist: 2, socialist: 2 } },
      { text: "A culture that genuinely values care, empathy, and cooperation over competition", scores: { cultural: 3 } },
    ],
  },
  {
    id: 15,
    question: "How do you think about \"woman\" as a category?",
    options: [
      { text: "It's a real and meaningful identity that deserves equal rights and recognition", scores: { liberal: 2, cultural: 1 } },
      { text: "It describes those who are oppressed by the male-dominated patriarchal system", scores: { radical: 2 } },
      { text: "It's a complex, contested category shaped by race, class, and other factors", scores: { intersectional: 3 } },
      { text: "It's a social construct that should be questioned, troubled, and ultimately disrupted", scores: { postmodern: 3 } },
    ],
  },
];

const theoryInfo: Record<keyof Scores, { name: string; color: string; desc: string; books: string[] }> = {
  liberal: {
    name: "Liberal Feminism",
    color: "#F59E0B",
    desc: "You believe in working within existing systems to achieve equality through legal reform, education, and institutional change.",
    books: ["A Vindication of the Rights of Woman — Wollstonecraft", "The Feminine Mystique — Betty Friedan", "The Second Sex — Simone de Beauvoir"],
  },
  radical: {
    name: "Radical Feminism",
    color: "#EF4444",
    desc: "You see patriarchy as the fundamental system of oppression that must be dismantled rather than reformed.",
    books: ["Sexual Politics — Kate Millett", "The Dialectic of Sex — Shulamith Firestone", "The Female Eunuch — Germaine Greer"],
  },
  socialist: {
    name: "Socialist Feminism",
    color: "#F97316",
    desc: "You understand women's oppression as rooted in both patriarchy and capitalism — two inseparable systems that must be challenged together.",
    books: ["Caliban and the Witch — Silvia Federici", "Women, Race & Class — Angela Davis", "The Unhappy Marriage of Marxism and Feminism — Heidi Hartmann"],
  },
  marxist: {
    name: "Marxist Feminism",
    color: "#DC2626",
    desc: "You trace women's oppression to the origins of private property and see class struggle as central to feminist liberation.",
    books: ["The Origin of the Family — Friedrich Engels", "Women and Socialism — Clara Zetkin", "Social Reproduction Theory — Tithi Bhattacharya"],
  },
  cultural: {
    name: "Cultural Feminism",
    color: "#10B981",
    desc: "You celebrate distinctly feminine values — care, empathy, cooperation — and seek to build a feminist culture that honors them.",
    books: ["In a Different Voice — Carol Gilligan", "Caring — Nel Noddings", "Woman and Nature — Susan Griffin"],
  },
  postmodern: {
    name: "Postmodern Feminism",
    color: "#8B5CF6",
    desc: "You question fixed gender identities, see gender as performative, and are drawn to deconstructing the very categories feminism uses.",
    books: ["Gender Trouble — Judith Butler", "A Cyborg Manifesto — Donna Haraway", "Speculum of the Other Woman — Luce Irigaray"],
  },
  intersectional: {
    name: "Intersectional Feminism",
    color: "#06B6D4",
    desc: "You believe that feminist analysis must account for the interlocking systems of race, class, gender, sexuality, and other axes of power.",
    books: ["Sister Outsider — Audre Lorde", "Mapping the Margins — Kimberlé Crenshaw", "Black Feminist Thought — Patricia Hill Collins"],
  },
};

function QuizResults({ scores }: { scores: Scores }) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const percentages = Object.fromEntries(
    Object.entries(scores).map(([k, v]) => [k, Math.round((v / total) * 100)])
  ) as Record<keyof Scores, number>;

  const sorted = (Object.entries(percentages) as [keyof Scores, number][])
    .sort(([, a], [, b]) => b - a);

  const [primary] = sorted;
  const [, secondary] = sorted;

  const radarData = Object.entries(percentages).map(([key, value]) => ({
    subject: theoryInfo[key as keyof Scores].name.replace(" Feminism", ""),
    value,
    fullMark: 100,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      {/* Primary result */}
      <div style={{
        padding: "2.5rem",
        border: `2px solid ${theoryInfo[primary[0]].color}60`,
        background: `${theoryInfo[primary[0]].color}0a`,
        marginBottom: "2rem",
        position: "relative",
        clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: theoryInfo[primary[0]].color,
          textTransform: "uppercase",
          marginBottom: "0.75rem",
        }}>
          Your Primary Affinity — {primary[1]}%
        </div>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "3rem",
          color: "#F5F0EA",
          lineHeight: 1,
          marginBottom: "1rem",
        }}>
          {theoryInfo[primary[0]].name}
        </h3>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem",
          color: "rgba(240,235,255,0.85)",
          lineHeight: 1.7,
          fontStyle: "italic",
        }}>
          {theoryInfo[primary[0]].desc}
        </p>
      </div>

      {/* Radar Chart */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "#7B2FBE",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}>
          Your Feminist Spectrum
        </div>
        <div style={{ height: "320px", background: "rgba(196,181,253,0.02)", border: "1px solid rgba(196,181,253,0.08)", padding: "1rem" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(196,181,253,0.15)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "rgba(196,181,253,0.6)", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}
              />
              <Radar
                name="Affinity"
                dataKey="value"
                stroke={theoryInfo[primary[0]].color}
                fill={theoryInfo[primary[0]].color}
                fillOpacity={0.2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* All scores */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "#7B2FBE",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}>
          Compatibility Breakdown
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {sorted.map(([key, pct]) => {
            const info = theoryInfo[key];
            return (
              <div key={key}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "rgba(240,235,255,0.8)" }}>
                    {info.name}
                  </span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.8rem", color: info.color }}>
                    {pct}%
                  </span>
                </div>
                <div style={{ height: "4px", background: "rgba(196,181,253,0.1)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{ height: "100%", background: info.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secondary affinity */}
      {secondary && secondary[1] > 10 && (
        <div style={{
          padding: "1.5rem",
          border: `1px solid ${theoryInfo[secondary[0]].color}40`,
          background: `${theoryInfo[secondary[0]].color}06`,
          marginBottom: "2rem",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: theoryInfo[secondary[0]].color,
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}>
            Secondary Tendency — {secondary[1]}%
          </div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.85rem",
            color: "rgba(240,235,255,0.7)",
            lineHeight: 1.65,
          }}>
            You also show strong alignment with <strong style={{ color: theoryInfo[secondary[0]].color }}>{theoryInfo[secondary[0]].name}</strong>. This combination suggests a nuanced perspective that draws from multiple traditions.
          </p>
        </div>
      )}

      {/* Reading recommendations */}
      <div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "#7B2FBE",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}>
          Recommended Reading
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {theoryInfo[primary[0]].books.map((book, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              padding: "0.75rem 1rem",
              background: "rgba(196,181,253,0.04)",
              border: "1px solid rgba(196,181,253,0.08)",
            }}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                color: theoryInfo[primary[0]].color,
                flexShrink: 0,
              }}>
                0{i + 1}
              </span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.9rem",
                color: "rgba(240,235,255,0.8)",
                fontStyle: "italic",
              }}>
                {book}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState<Scores>({
    liberal: 0, radical: 0, socialist: 0, marxist: 0,
    cultural: 0, postmodern: 0, intersectional: 0,
  });

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  const handleSelect = (optionIdx: number) => {
    setSelected(optionIdx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const option = question.options[selected];
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([key, val]) => {
      newScores[key as keyof Scores] += val as number;
    });
    setScores(newScores);
    setAnswers([...answers, selected]);

    if (currentQ + 1 >= questions.length) {
      setShowResults(true);
    } else {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setShowResults(false);
    setScores({ liberal: 0, radical: 0, socialist: 0, marxist: 0, cultural: 0, postmodern: 0, intersectional: 0 });
  };

  return (
    <section
      id="quiz"
      style={{
        background: "#0D0620",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.3), transparent)",
      }} />

      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "4rem", textAlign: "center" }}
        >
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            color: "#7B2FBE",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            ♀ Section III
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
              THEORY QUIZ
            </span>
          </h2>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1rem",
            color: "rgba(196,181,253,0.6)",
            fontStyle: "italic",
            marginTop: "1rem",
          }}>
            15 questions. Discover which feminist tradition resonates with your worldview.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {showResults ? (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "#C4B5FD",
                  marginBottom: "0.5rem",
                }}>
                  YOUR RESULTS
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  color: "#F5F0EA",
                  fontStyle: "italic",
                }}>
                  Your Feminist Profile
                </h3>
              </div>
              <QuizResults scores={scores} />
              <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <button
                  onClick={handleReset}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.9rem 2rem",
                    background: "transparent",
                    border: "1px solid rgba(196,181,253,0.3)",
                    color: "#C4B5FD",
                    cursor: "pointer",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#C4B5FD"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(196,181,253,0.3)"}
                >
                  <RotateCcw size={14} /> Retake Quiz
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              {/* Progress */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "rgba(196,181,253,0.5)",
                  }}>
                    Question {currentQ + 1} of {questions.length}
                  </span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#7B2FBE",
                  }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div style={{ height: "2px", background: "rgba(196,181,253,0.1)", overflow: "hidden" }}>
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    style={{ height: "100%", background: "linear-gradient(90deg, #7B2FBE, #C4B5FD)" }}
                  />
                </div>
              </div>

              {/* Question */}
              <div style={{
                padding: "2rem 2rem 2.5rem",
                border: "1px solid rgba(196,181,253,0.12)",
                background: "rgba(196,181,253,0.02)",
                marginBottom: "1.5rem",
                clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
              }}>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  color: "#7B2FBE",
                  marginBottom: "1rem",
                }}>
                  Q{String(currentQ + 1).padStart(2, "0")}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  color: "#F5F0EA",
                  lineHeight: 1.45,
                }}>
                  {question.question}
                </h3>
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    style={{
                      padding: "1.1rem 1.5rem",
                      textAlign: "left",
                      background: selected === i ? "rgba(123,47,190,0.2)" : "rgba(196,181,253,0.02)",
                      border: selected === i ? "1px solid #7B2FBE" : "1px solid rgba(196,181,253,0.12)",
                      color: selected === i ? "#F5F0EA" : "rgba(240,235,255,0.7)",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.9rem",
                      lineHeight: 1.55,
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                    onMouseEnter={(e) => {
                      if (selected !== i) {
                        e.currentTarget.style.borderColor = "rgba(196,181,253,0.3)";
                        e.currentTarget.style.background = "rgba(196,181,253,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selected !== i) {
                        e.currentTarget.style.borderColor = "rgba(196,181,253,0.12)";
                        e.currentTarget.style.background = "rgba(196,181,253,0.02)";
                      }
                    }}
                  >
                    <span style={{
                      width: "24px",
                      height: "24px",
                      border: selected === i ? "2px solid #7B2FBE" : "1px solid rgba(196,181,253,0.3)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: selected === i ? "#7B2FBE" : "transparent",
                      color: "#F5F0EA",
                      fontSize: "0.65rem",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}>
                      {selected === i ? "✓" : String.fromCharCode(65 + i)}
                    </span>
                    {opt.text}
                  </button>
                ))}
              </div>

              {/* Next button */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.9rem 2rem",
                    background: selected !== null ? "#7B2FBE" : "rgba(196,181,253,0.05)",
                    border: "none",
                    color: selected !== null ? "#F5F0EA" : "rgba(196,181,253,0.3)",
                    cursor: selected !== null ? "pointer" : "not-allowed",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    transition: "all 0.3s",
                    clipPath: selected !== null ? "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" : "none",
                  }}
                >
                  {currentQ + 1 === questions.length ? "See Results" : "Next"} <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
