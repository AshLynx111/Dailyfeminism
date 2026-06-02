import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const theories = [
  {
    id: "liberal",
    label: "LIBERAL FEMINISM",
    stamp: "§ 01",
    tagline: "Equal rights within existing structures",
    core: "Advocates for legal equality, institutional reform, and equal access to education and opportunity. Believes the system can be reformed — not dismantled.",
    thinkers: "Wollstonecraft · Friedan · Steinem",
    quote: "\"I do not wish women to have power over men — but over themselves.\"",
    quoteBy: "— Mary Wollstonecraft, 1792",
    concepts: ["Legal Reform", "Equal Opportunity", "Individual Rights", "Education"],
    paperColor: "#F0E8D2",
    inkColor: "#1A0A00",
    accentColor: "#5C3A00",
    rot: "-1.5deg",
    gridArea: "1 / 1 / 2 / 2",
    offsetY: "0px",
  },
  {
    id: "radical",
    label: "RADICAL FEMINISM",
    stamp: "⬛ 02",
    tagline: "Dismantle patriarchy at the root",
    core: "Identifies patriarchy as the foundational system of all oppression. Argues that male dominance pervades every institution and must be abolished — not reformed.",
    thinkers: "Dworkin · MacKinnon · Millett",
    quote: "\"Feminism is the theory. Lesbianism is the practice.\"",
    quoteBy: "— Ti-Grace Atkinson",
    concepts: ["Patriarchy", "Sisterhood", "Sexual Politics", "Consciousness Raising"],
    paperColor: "#EDE0DC",
    inkColor: "#1A0000",
    accentColor: "#5C1010",
    rot: "2deg",
    gridArea: "1 / 2 / 2 / 3",
    offsetY: "20px",
  },
  {
    id: "socialist",
    label: "SOCIALIST FEMINISM",
    stamp: "✦ 03",
    tagline: "Capitalism + patriarchy, inseparable",
    core: "Analyzes women's oppression as a product of both class society and male domination. Domestic labor, wages, and reproduction are battlegrounds.",
    thinkers: "Federici · Davis · Hartmann",
    quote: "\"The house is not the woman's world — but her prison.\"",
    quoteBy: "— Silvia Federici",
    concepts: ["Domestic Labor", "Dual Systems", "Reproductive Work", "Class"],
    paperColor: "#E8E4DC",
    inkColor: "#0A0A00",
    accentColor: "#3D3A00",
    rot: "-2.5deg",
    gridArea: "1 / 3 / 2 / 4",
    offsetY: "-10px",
  },
  {
    id: "marxist",
    label: "MARXIST FEMINISM",
    stamp: "⚙ 04",
    tagline: "Private property is the origin",
    core: "Traces women's subordination to the emergence of private property and class relations. Economic liberation is inseparable from women's liberation.",
    thinkers: "Engels · Zetkin · Kollontai",
    quote: "\"The first class antagonism is that between man and woman.\"",
    quoteBy: "— Friedrich Engels, 1884",
    concepts: ["Private Property", "Class Struggle", "Social Reproduction", "Alienation"],
    paperColor: "#E4E0D8",
    inkColor: "#0A0000",
    accentColor: "#400010",
    rot: "1.8deg",
    gridArea: "2 / 1 / 3 / 2",
    offsetY: "5px",
  },
  {
    id: "cultural",
    label: "CULTURAL FEMINISM",
    stamp: "♾ 05",
    tagline: "Celebrate the feminine",
    core: "Argues that care, empathy, and cooperation — traditionally feminine — are undervalued. Seeks to build culture around these values rather than devaluing them.",
    thinkers: "Gilligan · Daly · Noddings",
    quote: "\"Women's ways of knowing are not inferior — they are different.\"",
    quoteBy: "— Carol Gilligan",
    concepts: ["Ethics of Care", "Feminine Values", "Goddess Culture", "Ecology"],
    paperColor: "#E4EAE0",
    inkColor: "#001500",
    accentColor: "#003015",
    rot: "-3deg",
    gridArea: "2 / 2 / 3 / 3",
    offsetY: "15px",
  },
  {
    id: "postmodern",
    label: "POSTMODERN FEMINISM",
    stamp: "∞ 06",
    tagline: "Gender is performance",
    core: "Challenges fixed gender identity. Gender is not something one is — it is something one does, constituted through repetitive acts and discourse.",
    thinkers: "Butler · Haraway · Irigaray",
    quote: "\"There is no gender identity behind the expressions of gender.\"",
    quoteBy: "— Judith Butler, 1990",
    concepts: ["Performativity", "Deconstruction", "Anti-Essentialism", "Discourse"],
    paperColor: "#E0DDE8",
    inkColor: "#050010",
    accentColor: "#1E0A40",
    rot: "2.5deg",
    gridArea: "2 / 3 / 3 / 4",
    offsetY: "-5px",
  },
  {
    id: "intersectional",
    label: "INTERSECTIONAL FEMINISM",
    stamp: "⬡ 07",
    tagline: "All oppressions are connected",
    core: "Gender intersects with race, class, sexuality, disability, and nationality to produce unique experiences. No single axis defines a woman's life.",
    thinkers: "Crenshaw · hooks · Lorde · Collins",
    quote: "\"There is no such thing as a single-issue struggle.\"",
    quoteBy: "— Audre Lorde",
    concepts: ["Intersectionality", "Multiple Identities", "Structural Racism", "Coalition"],
    paperColor: "#E0E8EC",
    inkColor: "#000510",
    accentColor: "#00203A",
    rot: "-1deg",
    gridArea: "3 / 1 / 4 / 3",
    offsetY: "0px",
  },
];

function TornPaperFragment({ theory, onOpen }: { theory: typeof theories[0]; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onOpen}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
      style={{
        background: theory.paperColor,
        border: "none",
        cursor: "pointer",
        padding: "1.75rem 1.5rem",
        textAlign: "left",
        transform: `rotate(${theory.rot}) translateY(${theory.offsetY})`,
        transformOrigin: "center",
        position: "relative",
        overflow: "visible",
        clipPath: "polygon(0 2%, 1.5% 0, 4% 1.5%, 8% 0.5%, 13% 2%, 18% 0, 24% 1%, 31% 0.5%, 38% 1.5%, 45% 0, 53% 1%, 60% 0.5%, 67% 1.5%, 74% 0, 81% 1%, 88% 0.5%, 94% 1.5%, 100% 0, 100% 98%, 98.5% 100%, 95% 98.5%, 91% 100%, 87% 98%, 83% 100%, 79% 98.5%, 74% 100%, 69% 98%, 63% 100%, 57% 99%, 50% 100%, 43% 98.5%, 36% 100%, 29% 98%, 22% 100%, 15% 99%, 8% 100%, 3% 98.5%, 0 100%)",
        filter: hovered ? "drop-shadow(0 8px 24px rgba(0,0,0,0.22))" : "drop-shadow(0 3px 8px rgba(0,0,0,0.12))",
        transition: "filter 0.3s",
        minHeight: "200px",
        width: "100%",
      }}
    >
      {/* Stamp */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.58rem",
        color: theory.accentColor,
        letterSpacing: "0.2em",
        opacity: 0.6,
        marginBottom: "0.75rem",
      }}>
        {theory.stamp}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
        color: theory.inkColor,
        letterSpacing: "0.04em",
        lineHeight: 1,
        marginBottom: "0.6rem",
      }}>
        {theory.label}
      </div>

      {/* Typewritten line */}
      <div style={{
        height: "1px",
        background: theory.inkColor,
        opacity: 0.15,
        marginBottom: "0.75rem",
      }} />

      {/* Tagline */}
      <div style={{
        fontFamily: "'Special Elite', cursive",
        fontSize: "0.8rem",
        color: theory.accentColor,
        fontStyle: "italic",
        marginBottom: "0.75rem",
        lineHeight: 1.4,
      }}>
        {theory.tagline}
      </div>

      {/* Thinkers */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.6rem",
        color: theory.inkColor,
        opacity: 0.5,
        letterSpacing: "0.08em",
        marginBottom: "0.5rem",
      }}>
        {theory.thinkers}
      </div>

      {/* Dotted expand hint */}
      <div style={{
        marginTop: "auto",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.55rem",
        color: theory.accentColor,
        opacity: hovered ? 0.8 : 0,
        letterSpacing: "0.15em",
        transition: "opacity 0.2s",
        paddingTop: "0.75rem",
      }}>
        ↗ READ MORE
      </div>
    </motion.button>
  );
}

function DetailModal({ theory, onClose }: { theory: typeof theories[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(13,13,13,0.75)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, rotate: "2deg", y: 30 }}
        animate={{ scale: 1, rotate: "0.5deg", y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theory.paperColor,
          maxWidth: "620px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "3rem",
          position: "relative",
          clipPath: "polygon(0 1%, 2% 0, 5% 1%, 10% 0, 16% 1.5%, 23% 0, 32% 1%, 42% 0, 55% 1.5%, 67% 0, 78% 1%, 88% 0, 95% 1%, 100% 0, 100% 99%, 97% 100%, 92% 98.5%, 86% 100%, 79% 99%, 72% 100%, 64% 99%, 56% 100%, 47% 99.5%, 38% 100%, 29% 99%, 20% 100%, 13% 98.5%, 6% 100%, 1% 99%, 0 100%)",
          filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.4))",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1.5rem", right: "1.5rem",
            background: "none", border: "none", cursor: "pointer",
            color: theory.accentColor, opacity: 0.5,
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: theory.accentColor, letterSpacing: "0.2em", marginBottom: "0.5rem", opacity: 0.6 }}>
          {theory.stamp} — FEMINIST ARCHIVE
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", color: theory.inkColor, letterSpacing: "0.03em", lineHeight: 1, marginBottom: "0.4rem" }}>
          {theory.label}
        </h2>
        <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.9rem", color: theory.accentColor, fontStyle: "italic", marginBottom: "1.5rem" }}>
          {theory.tagline}
        </div>

        <div style={{ height: "2px", background: theory.inkColor, opacity: 0.12, marginBottom: "1.5rem" }} />

        {/* Core argument */}
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: theory.accentColor, letterSpacing: "0.2em", marginBottom: "0.6rem", opacity: 0.6 }}>
          CORE ARGUMENT
        </div>
        <p style={{ fontFamily: "'IM Fell English', serif", fontSize: "1rem", color: theory.inkColor, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {theory.core}
        </p>

        {/* Quote */}
        <blockquote style={{
          margin: "0 0 1.5rem",
          padding: "1rem 1.25rem",
          borderLeft: `3px solid ${theory.accentColor}`,
          opacity: 0.75,
        }}>
          <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.95rem", color: theory.inkColor, lineHeight: 1.6, marginBottom: "0.3rem" }}>
            {theory.quote}
          </p>
          <cite style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: theory.accentColor, letterSpacing: "0.1em" }}>
            {theory.quoteBy}
          </cite>
        </blockquote>

        {/* Key concepts */}
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: theory.accentColor, letterSpacing: "0.2em", marginBottom: "0.75rem", opacity: 0.6 }}>
          KEY CONCEPTS
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {theory.concepts.map((c) => (
            <span key={c} style={{
              border: `1px solid ${theory.accentColor}50`,
              padding: "0.25rem 0.6rem",
              fontFamily: "'Special Elite', cursive",
              fontSize: "0.7rem",
              color: theory.accentColor,
            }}>
              {c}
            </span>
          ))}
        </div>

        {/* Thinkers */}
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: theory.accentColor, letterSpacing: "0.2em", marginBottom: "0.5rem", opacity: 0.6 }}>
          THINKERS
        </div>
        <div style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.95rem", color: theory.inkColor, opacity: 0.8 }}>
          {theory.thinkers}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeministAtlas() {
  const [selected, setSelected] = useState<typeof theories[0] | null>(null);

  return (
    <section
      id="atlas"
      style={{
        background: "#E8E2D4",
        position: "relative",
        padding: "6rem 3rem 8rem",
        overflow: "hidden",
      }}
    >
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        opacity: 0.5,
      }} />

      {/* Section header — newspaper masthead style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ position: "relative", zIndex: 2, marginBottom: "3.5rem" }}
      >
        <div style={{ borderTop: "3px solid #0D0D0D", borderBottom: "1px solid #0D0D0D", paddingTop: "0.4rem", paddingBottom: "0.4rem", marginBottom: "0.3rem" }}>
          <div style={{ borderBottom: "1px solid #0D0D0D", paddingBottom: "0.3rem", marginBottom: "0.3rem" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "#0D0D0D", opacity: 0.5 }}>
              FEMINIST ARCHIVE — SECTION II — THEORETICAL FRAMEWORKS — EST. 1792
            </span>
          </div>
        </div>

        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3.5rem, 10vw, 8rem)",
          color: "#0D0D0D",
          lineHeight: 0.88,
          letterSpacing: "0.01em",
        }}>
          FEMINIST<br />
          <span style={{ color: "transparent", WebkitTextStroke: "2px #2C0A5E" }}>THEORY</span>{" "}
          ATLAS
        </h2>

        <p style={{
          fontFamily: "'Special Elite', cursive",
          fontSize: "0.9rem",
          color: "#2C0A5E",
          marginTop: "1rem",
          fontStyle: "italic",
          maxWidth: "420px",
          lineHeight: 1.6,
        }}>
          Seven traditions. Seven ways of seeing. Hover to read — click to enter.
        </p>
      </motion.div>

      {/* Protest photo - large background element */}
      <div style={{
        position: "absolute", top: "10%", right: "-2%",
        width: "35%", zIndex: 1, opacity: 0.08,
        transform: "rotate(1deg)",
      }}>
        <img
          src="https://images.unsplash.com/photo-1633522966269-9d738ffc12b0?w=700&q=60"
          alt=""
          style={{ width: "100%", filter: "grayscale(1) contrast(1.5)", mixBlendMode: "multiply" }}
        />
      </div>

      {/* Theory fragments grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "2rem 2.5rem",
        position: "relative",
        zIndex: 2,
      }}>
        {theories.map((theory, i) => (
          <motion.div
            key={theory.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
          >
            <TornPaperFragment theory={theory} onOpen={() => setSelected(theory)} />
          </motion.div>
        ))}
      </div>

      {/* Torn paper transition to next section */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "80px", zIndex: 10, pointerEvents: "none",
        clipPath: "polygon(0 100%, 0 55%, 2.5% 30%, 5% 60%, 8% 20%, 12% 50%, 16% 15%, 20% 45%, 25% 10%, 30% 42%, 35% 8%, 40% 38%, 45% 12%, 50% 45%, 55% 5%, 60% 40%, 65% 10%, 70% 48%, 75% 15%, 80% 42%, 85% 8%, 90% 38%, 95% 20%, 98% 50%, 100% 30%, 100% 100%)",
        background: "#0D0D0D",
      }} />
    </section>
  );
}
