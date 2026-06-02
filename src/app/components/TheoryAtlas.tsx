import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";

const theories = [
  {
    id: "liberal",
    label: "Liberal",
    title: "Liberal Feminism",
    color: "#F59E0B",
    accent: "#FDE68A",
    symbol: "§",
    tagline: "Equal rights within existing systems",
    core: "Advocates for legal equality, institutional reform, and equal opportunities within existing societal structures. Believes change can be achieved through law and education.",
    concepts: ["Legal Equality", "Voting Rights", "Educational Access", "Workplace Reform", "Individual Rights", "Anti-Discrimination Law"],
    thinkers: ["Mary Wollstonecraft", "Betty Friedan", "Gloria Steinem", "Simone de Beauvoir"],
    debates: "Criticized for focusing on privileged women and ignoring systemic class/race inequalities. Some argue it works within rather than challenging the root system.",
    quote: "\"I do not wish women to have power over men; but over themselves.\" — Mary Wollstonecraft",
    bgPattern: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(253,230,138,0.05) 100%)",
  },
  {
    id: "radical",
    label: "Radical",
    title: "Radical Feminism",
    color: "#EF4444",
    accent: "#FCA5A5",
    symbol: "⬛",
    tagline: "Dismantle patriarchy at the root",
    core: "Identifies patriarchy as the foundational system of oppression. Argues that male dominance pervades all social structures and must be dismantled rather than reformed.",
    concepts: ["Patriarchy", "Consciousness-Raising", "Sisterhood", "Male Privilege", "Sexual Politics", "Separatism"],
    thinkers: ["Andrea Dworkin", "Catharine MacKinnon", "Kate Millett", "Shulamith Firestone"],
    debates: "Tensions around gender essentialism, trans inclusion, and the relationship with sexuality. Critiqued for potential biological determinism and exclusivity.",
    quote: "\"Feminism is the theory, lesbianism is the practice.\" — Ti-Grace Atkinson",
    bgPattern: "linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(252,165,165,0.05) 100%)",
  },
  {
    id: "socialist",
    label: "Socialist",
    title: "Socialist Feminism",
    color: "#F97316",
    accent: "#FDBA74",
    symbol: "✦",
    tagline: "Capitalism and patriarchy, inseparable",
    core: "Analyzes women's oppression as the product of both patriarchy and capitalism working in tandem. Argues that economic and gender liberation must go together.",
    concepts: ["Domestic Labor", "Dual Systems Theory", "Reproductive Labor", "Class Consciousness", "Economic Inequality", "Wages for Housework"],
    thinkers: ["Silvia Federici", "Heidi Hartmann", "Angela Davis", "Zillah Eisenstein"],
    debates: "The 'dual systems' debate: are patriarchy and capitalism truly separable? How to prioritize when they conflict? Relations with mainstream socialist movements.",
    quote: "\"The house is not the woman's world, but her prison.\" — Silvia Federici",
    bgPattern: "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(253,186,116,0.05) 100%)",
  },
  {
    id: "marxist",
    label: "Marxist",
    title: "Marxist Feminism",
    color: "#DC2626",
    accent: "#F87171",
    symbol: "⚙",
    tagline: "Gender oppression rooted in property",
    core: "Locates women's oppression in the historical development of private property and class society. Sees gender hierarchy as a function of capitalist production relations.",
    concepts: ["Private Property", "Social Reproduction", "Class Analysis", "Commodity Fetishism", "Base and Superstructure", "Alienated Labor"],
    thinkers: ["Friedrich Engels", "Karl Marx", "Clara Zetkin", "Alexandra Kollontai"],
    debates: "Tension with radical feminism over whether class or gender is primary. Questions of whether abolishing capitalism automatically liberates women.",
    quote: "\"The first class antagonism is that between man and woman in monogamy.\" — Friedrich Engels",
    bgPattern: "linear-gradient(135deg, rgba(220,38,38,0.1) 0%, rgba(248,113,113,0.05) 100%)",
  },
  {
    id: "cultural",
    label: "Cultural",
    title: "Cultural Feminism",
    color: "#10B981",
    accent: "#6EE7B7",
    symbol: "♾",
    tagline: "Celebrate feminine values and culture",
    core: "Emphasizes the value of traditionally feminine traits — care, empathy, cooperation — and seeks to build a feminist culture that honors these qualities rather than devaluing them.",
    concepts: ["Ethics of Care", "Feminine Values", "Goddess Spirituality", "Woman-Centered Culture", "Nurturing", "Ecological Feminism"],
    thinkers: ["Carol Gilligan", "Mary Daly", "Nel Noddings", "Susan Griffin"],
    debates: "Risk of reinforcing gender essentialism. Does celebrating feminine traits entrench the very binary that feminism seeks to dismantle?",
    quote: "\"Care is the antithesis of simple pity or supplication... it is a relationship of seeing the whole person.\" — Carol Gilligan",
    bgPattern: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(110,231,183,0.05) 100%)",
  },
  {
    id: "postmodern",
    label: "Postmodern",
    title: "Postmodern Feminism",
    color: "#8B5CF6",
    accent: "#C4B5FD",
    symbol: "∞",
    tagline: "Gender is a performance",
    core: "Challenges the idea of a fixed female identity. Argues gender is socially constructed through repetitive acts and discourses. Deconstructs binaries and universal claims.",
    concepts: ["Performativity", "Deconstruction", "Power/Knowledge", "Subjectivity", "Discourse Analysis", "Anti-Essentialism"],
    thinkers: ["Judith Butler", "Michel Foucault (influence)", "Donna Haraway", "Luce Irigaray"],
    debates: "Accused of political paralysis — if identity is unstable, how do we organize? Tensions with material feminism over prioritizing discourse vs. lived experience.",
    quote: "\"Gender is not something one is, it is something one does.\" — Judith Butler",
    bgPattern: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(196,181,253,0.05) 100%)",
  },
  {
    id: "intersectional",
    label: "Intersectional",
    title: "Intersectional Feminism",
    color: "#06B6D4",
    accent: "#67E8F9",
    symbol: "⬡",
    tagline: "All axes of oppression are connected",
    core: "Recognizes that gender intersects with race, class, sexuality, disability, and nationality to create unique experiences of oppression. No single identity defines a woman's experience.",
    concepts: ["Intersectionality", "Multiple Identities", "Structural Racism", "Coalition Building", "Lived Experience", "Interlocking Systems"],
    thinkers: ["Kimberlé Crenshaw", "bell hooks", "Patricia Hill Collins", "Audre Lorde"],
    debates: "How to build coalitions across differences? Risk of infinite fragmentation. Questions of hierarchy among oppressions and political strategy.",
    quote: "\"There is no such thing as a single-issue struggle because we do not live single-issue lives.\" — Audre Lorde",
    bgPattern: "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(103,232,249,0.05) 100%)",
  },
];

function TheoryCard({ theory, onOpen }: { theory: typeof theories[0]; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpen}
      style={{
        background: hovered ? theory.bgPattern : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? theory.color + "60" : "rgba(196,181,253,0.12)"}`,
        padding: "2rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "16px",
        height: "16px",
        background: theory.color,
        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
      }} />

      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "3.5rem",
        color: theory.color,
        opacity: hovered ? 1 : 0.5,
        lineHeight: 1,
        marginBottom: "0.75rem",
        transition: "opacity 0.3s",
      }}>
        {theory.symbol}
      </div>

      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.25em",
        color: theory.color,
        textTransform: "uppercase",
        marginBottom: "0.5rem",
        opacity: 0.8,
      }}>
        {theory.label}
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.3rem",
        color: "#F5F0EA",
        marginBottom: "0.75rem",
        lineHeight: 1.2,
      }}>
        {theory.title}
      </h3>

      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.8rem",
        color: "rgba(196,181,253,0.6)",
        fontStyle: "italic",
        marginBottom: "1.2rem",
        lineHeight: 1.5,
      }}>
        {theory.tagline}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
        {theory.concepts.slice(0, 3).map((c) => (
          <span key={c} style={{
            padding: "0.2rem 0.6rem",
            border: `1px solid ${theory.color}40`,
            color: theory.accent,
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            fontFamily: "'IBM Plex Mono', monospace",
          }}>
            {c}
          </span>
        ))}
      </div>

      <motion.div
        animate={{ x: hovered ? 4 : 0 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: theory.color,
          fontSize: "0.75rem",
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: "0.1em",
        }}
      >
        Explore <ArrowRight size={14} />
      </motion.div>
    </motion.div>
  );
}

function TheoryModal({ theory, onClose }: { theory: typeof theories[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#100822",
          border: `1px solid ${theory.color}40`,
          maxWidth: "680px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "2.5rem",
          position: "relative",
          clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "none",
            border: "none",
            color: "rgba(196,181,253,0.5)",
            cursor: "pointer",
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "2rem" }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "5rem",
            color: theory.color,
            lineHeight: 1,
            flexShrink: 0,
          }}>
            {theory.symbol}
          </div>
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: theory.color,
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}>
              Theory
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              color: "#F5F0EA",
              lineHeight: 1.1,
            }}>
              {theory.title}
            </h2>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              color: theory.accent,
              fontSize: "0.95rem",
              marginTop: "0.3rem",
            }}>
              {theory.tagline}
            </p>
          </div>
        </div>

        <div style={{ height: "1px", background: `linear-gradient(90deg, ${theory.color}60, transparent)`, marginBottom: "2rem" }} />

        {/* Core */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: theory.color, textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Core Argument
          </div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(240,235,255,0.85)", lineHeight: 1.7, fontSize: "0.95rem" }}>
            {theory.core}
          </p>
        </div>

        {/* Concepts */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: theory.color, textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Key Concepts
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {theory.concepts.map((c) => (
              <span key={c} style={{
                padding: "0.35rem 0.8rem",
                border: `1px solid ${theory.color}50`,
                color: theory.accent,
                fontSize: "0.75rem",
                fontFamily: "'IBM Plex Mono', monospace",
                background: `${theory.color}10`,
              }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Thinkers */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: theory.color, textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Representative Thinkers
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {theory.thinkers.map((t) => (
              <div key={t} style={{
                padding: "0.5rem 1rem",
                background: `${theory.color}15`,
                color: "#F5F0EA",
                fontSize: "0.85rem",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                borderLeft: `2px solid ${theory.color}`,
              }}>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <blockquote style={{
          margin: "0 0 2rem",
          padding: "1.25rem 1.5rem",
          background: `${theory.color}08`,
          borderLeft: `3px solid ${theory.color}`,
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          color: "rgba(196,181,253,0.85)",
          fontSize: "0.95rem",
          lineHeight: 1.65,
        }}>
          {theory.quote}
        </blockquote>

        {/* Debates */}
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: theory.color, textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Key Debates & Critiques
          </div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(240,235,255,0.7)", lineHeight: 1.7, fontSize: "0.9rem" }}>
            {theory.debates}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TheoryAtlas() {
  const [selected, setSelected] = useState<typeof theories[0] | null>(null);

  return (
    <section
      id="atlas"
      style={{
        background: "#0A0414",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(123,47,190,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem" }}
        >
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            color: "#7B2FBE",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            ♀ Section I
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            color: "#F5F0EA",
            lineHeight: 0.95,
            letterSpacing: "0.02em",
          }}>
            FEMINIST
            <br />
            <span style={{ WebkitTextStroke: "2px rgba(196,181,253,0.5)", color: "transparent" }}>
              THEORY ATLAS
            </span>
          </h2>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            color: "rgba(196,181,253,0.6)",
            fontStyle: "italic",
            marginTop: "1rem",
            maxWidth: "480px",
          }}>
            Seven distinct traditions of feminist thought — click to explore each world.
          </p>
        </motion.div>

        {/* Theory grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {theories.map((theory, i) => (
            <motion.div
              key={theory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TheoryCard theory={theory} onOpen={() => setSelected(theory)} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <TheoryModal theory={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
