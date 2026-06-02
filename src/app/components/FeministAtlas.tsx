import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, X } from "lucide-react";
import umbrellaMarch from "../../imports/collage/umbrella-march.jpg";
import umbrellaThread from "../../imports/collage/umbrella-thread.jpg";
import maryWollstonecraft from "../../imports/portraits/mary-wollstonecraft.jpg";
import kateMillett from "../../imports/portraits/kate-millett.jpg";
import silviaFederici from "../../imports/portraits/silvia-federici.jpg";
import claraZetkin from "../../imports/portraits/clara-zetkin.jpg";
import carolGilligan from "../../imports/portraits/carol-gilligan.jpg";
import judithButler from "../../imports/portraits/judith-butler.jpg";
import audreLorde from "../../imports/portraits/audre-lorde.jpg";

const violet = "#6F00FF";
const deepViolet = "#24004D";
const nearBlack = "#F7F4FF";
const ink = "#111111";

const theories = [
  {
    id: "liberal",
    reading: "LIBERAL",
    label: "LIBERAL FEMINISM",
    stamp: "§ 01",
    figure: "Mary Wollstonecraft",
    tagline: "Equal rights within existing structures",
    core: "Advocates for legal equality, institutional reform, and equal access to education and opportunity. Believes the system can be reformed, not dismantled.",
    thinkers: "Wollstonecraft · Friedan · Steinem",
    quote: "\"I do not wish women to have power over men, but over themselves.\"",
    quoteBy: "Mary Wollstonecraft, 1792",
    concepts: ["Legal Reform", "Equal Opportunity", "Individual Rights", "Education"],
    portrait: maryWollstonecraft,
    accent: violet,
    rot: "-5deg",
    x: "-118%",
    y: "-38%",
  },
  {
    id: "radical",
    reading: "RADICAL",
    label: "RADICAL FEMINISM",
    stamp: "⬛ 02",
    figure: "Kate Millett",
    tagline: "Dismantle patriarchy at the root",
    core: "Identifies patriarchy as the foundational system of all oppression. Male dominance pervades institutions, language, culture, intimacy, and law.",
    thinkers: "Millett · Dworkin · MacKinnon",
    quote: "\"The personal is political.\"",
    quoteBy: "Radical feminist movement slogan",
    concepts: ["Patriarchy", "Sisterhood", "Sexual Politics", "Consciousness Raising"],
    portrait: kateMillett,
    accent: violet,
    rot: "4deg",
    x: "-42%",
    y: "-62%",
  },
  {
    id: "socialist",
    reading: "SOCIALIST",
    label: "SOCIALIST FEMINISM",
    stamp: "✦ 03",
    figure: "Silvia Federici",
    tagline: "Capitalism and patriarchy, inseparable",
    core: "Analyzes women's oppression as a product of both class society and male domination. Domestic labor, wages, and reproduction are battlegrounds.",
    thinkers: "Federici · Davis · Hartmann",
    quote: "\"The house is not the woman's world, but her prison.\"",
    quoteBy: "Silvia Federici",
    concepts: ["Domestic Labor", "Dual Systems", "Reproductive Work", "Class"],
    portrait: silviaFederici,
    accent: violet,
    rot: "-2deg",
    x: "42%",
    y: "-48%",
  },
  {
    id: "marxist",
    reading: "MARXIST",
    label: "MARXIST FEMINISM",
    stamp: "⚙ 04",
    figure: "Clara Zetkin",
    tagline: "Private property is the origin",
    core: "Traces women's subordination to private property and class relations. Economic liberation is inseparable from women's liberation.",
    thinkers: "Zetkin · Kollontai · Engels",
    quote: "\"Only in conjunction with the proletarian woman will socialism be victorious.\"",
    quoteBy: "Clara Zetkin",
    concepts: ["Class Struggle", "Social Reproduction", "Labor", "Alienation"],
    portrait: claraZetkin,
    accent: violet,
    rot: "6deg",
    x: "112%",
    y: "-26%",
  },
  {
    id: "cultural",
    reading: "CULTURAL",
    label: "CULTURAL FEMINISM",
    stamp: "♾ 05",
    figure: "Carol Gilligan",
    tagline: "Celebrate care, relation, and difference",
    core: "Argues that care, empathy, and cooperation have been undervalued because they are coded feminine. It reframes those values as cultural strengths.",
    thinkers: "Gilligan · Daly · Noddings",
    quote: "\"Women's ways of knowing are not inferior. They are different.\"",
    quoteBy: "Carol Gilligan",
    concepts: ["Ethics of Care", "Feminine Values", "Ecology", "Relationality"],
    portrait: carolGilligan,
    accent: violet,
    rot: "-7deg",
    x: "-96%",
    y: "42%",
  },
  {
    id: "postmodern",
    reading: "POSTMODERN",
    label: "POSTMODERN FEMINISM",
    stamp: "∞ 06",
    figure: "Judith Butler",
    tagline: "Gender is performance",
    core: "Challenges fixed identity. Gender is constituted through repetitive acts, discourse, citation, and power rather than a stable essence.",
    thinkers: "Butler · Haraway · Irigaray",
    quote: "\"There is no gender identity behind the expressions of gender.\"",
    quoteBy: "Judith Butler, 1990",
    concepts: ["Performativity", "Deconstruction", "Anti-Essentialism", "Discourse"],
    portrait: judithButler,
    accent: violet,
    rot: "3deg",
    x: "4%",
    y: "62%",
  },
  {
    id: "intersectional",
    reading: "INTERSECTIONAL",
    label: "INTERSECTIONAL FEMINISM",
    stamp: "⬡ 07",
    figure: "Audre Lorde",
    tagline: "All oppressions are connected",
    core: "Gender intersects with race, class, sexuality, disability, and nationality. No single axis can describe a woman's life.",
    thinkers: "Lorde · Crenshaw · hooks · Collins",
    quote: "\"There is no such thing as a single-issue struggle.\"",
    quoteBy: "Audre Lorde",
    concepts: ["Intersectionality", "Coalition", "Structural Racism", "Multiple Identities"],
    portrait: audreLorde,
    accent: violet,
    rot: "-3deg",
    x: "94%",
    y: "40%",
  },
];

type Theory = (typeof theories)[number];

function readMode(theory: Theory) {
  window.dispatchEvent(new CustomEvent("dailyfeminism:read-mode", { detail: { theory: theory.reading } }));
  document.querySelector("#reading")?.scrollIntoView({ behavior: "smooth" });
}

function TheoryCard({ theory, index, opened, onOpen }: { theory: Theory; index: number; opened: boolean; onOpen: () => void }) {
  return (
    <motion.button
      initial={false}
      animate={
        opened
          ? { opacity: 1, x: theory.x, y: theory.y, rotate: theory.rot, scale: 1 }
          : { opacity: 0, x: "0%", y: "10%", rotate: "0deg", scale: 0.72 }
      }
      transition={{ delay: opened ? index * 0.045 : 0, type: "spring", stiffness: 170, damping: 24, mass: 0.75 }}
      onClick={onOpen}
      whileHover={opened ? { y: `calc(${theory.y} - 8px)`, rotate: "0deg", scale: 1.03 } : undefined}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "clamp(210px, 22vw, 292px)",
        minHeight: "330px",
        translate: "-50% -50%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(239,232,255,0.98))",
        border: `1px solid ${theory.accent}75`,
        color: ink,
        cursor: opened ? "pointer" : "default",
        padding: "0",
        textAlign: "left",
        overflow: "hidden",
        boxShadow: `0 16px 34px rgba(17,17,17,0.12), 7px 7px 0 rgba(111,0,255,0.18)`,
        clipPath: "polygon(0 1%, 4% 0, 12% 1.5%, 23% 0, 38% 1%, 54% 0, 70% 1.2%, 86% 0, 100% 1%, 100% 99%, 94% 100%, 82% 98.5%, 68% 100%, 50% 99%, 35% 100%, 18% 98.8%, 6% 100%, 0 99%)",
        pointerEvents: opened ? "auto" : "none",
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        contain: "layout paint style",
      }}
    >
      <div style={{ height: "148px", position: "relative", overflow: "hidden", background: nearBlack }}>
        <img
          src={theory.portrait}
          alt={theory.figure}
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 18%",
            filter: "grayscale(1)",
            opacity: 0.66,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${theory.accent}38 0 22%, transparent 22% 100%)` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.34) 1px, transparent 1.5px)", backgroundSize: "9px 9px", opacity: 0.16 }} />
        <div style={{ position: "absolute", left: "0.8rem", bottom: "0.65rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.54rem", letterSpacing: "0.16em", color: ink, background: "rgba(5,4,7,0.72)", padding: "0.28rem 0.45rem" }}>
          {theory.figure}
        </div>
      </div>

      <div style={{ padding: "1rem 1rem 1.15rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.65rem", color: theory.accent, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.18em" }}>
          <span>{theory.stamp}</span>
          <span>ARCHIVE CARD</span>
        </div>
        <h3 style={{ margin: "0 0 0.55rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", lineHeight: 0.9, letterSpacing: "0.02em", color: ink }}>
          {theory.label}
        </h3>
        <p style={{ margin: "0 0 0.85rem", fontFamily: "'Special Elite', cursive", color: "rgba(17,17,17,0.64)", fontSize: "0.78rem", lineHeight: 1.45, fontStyle: "italic" }}>
          {theory.tagline}
        </p>
        <div style={{ height: "1px", background: `${theory.accent}55`, marginBottom: "0.75rem" }} />
        <p style={{ margin: 0, fontFamily: "'IBM Plex Mono', monospace", color: "rgba(17,17,17,0.5)", fontSize: "0.58rem", lineHeight: 1.55, letterSpacing: "0.04em" }}>
          {theory.thinkers}
        </p>
      </div>
    </motion.button>
  );
}

function DetailModal({ theory, onClose }: { theory: Theory; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(17,17,17,0.42)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, rotate: "1deg", y: 24 }}
        animate={{ scale: 1, rotate: "-0.4deg", y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "min(760px, 100%)",
          maxHeight: "86vh",
          overflowY: "auto",
          background: "linear-gradient(180deg, #ffffff, #f1ebff)",
          border: `1px solid ${theory.accent}88`,
          color: ink,
          boxShadow: "0 30px 90px rgba(17,17,17,0.22)",
          display: "grid",
          gridTemplateColumns: "minmax(190px, 0.82fr) 1.2fr",
        }}
      >
        <div style={{ position: "relative", minHeight: "420px", background: nearBlack }}>
          <img
            src={theory.portrait}
            alt={theory.figure}
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", opacity: 0.72 }}
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent, ${nearBlack}), linear-gradient(120deg, ${theory.accent}36, transparent 62%)` }} />
          <div style={{ position: "absolute", left: "1rem", bottom: "1rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", lineHeight: 0.92 }}>
            {theory.figure}
          </div>
        </div>
        <div style={{ padding: "2.3rem", position: "relative" }}>
          <button
            onClick={onClose}
            style={{ position: "absolute", right: "1.1rem", top: "1.1rem", border: "none", background: "transparent", color: ink, cursor: "pointer" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: theory.accent, fontSize: "0.58rem", letterSpacing: "0.2em", marginBottom: "0.55rem" }}>
            {theory.stamp} / FEMINIST ARCHIVE
          </div>
          <h2 style={{ margin: "0 0 0.55rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.7rem", lineHeight: 0.9, letterSpacing: "0.02em" }}>
            {theory.label}
          </h2>
          <p style={{ margin: "0 0 1.35rem", color: "rgba(17,17,17,0.66)", fontFamily: "'Special Elite', cursive", fontSize: "0.86rem", lineHeight: 1.5, fontStyle: "italic" }}>
            {theory.tagline}
          </p>
          <div style={{ height: "1px", background: `${theory.accent}55`, marginBottom: "1.35rem" }} />

          <p style={{ margin: "0 0 1.25rem", fontFamily: "'IM Fell English', serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(17,17,17,0.76)" }}>
            {theory.core}
          </p>
          <blockquote style={{ margin: "0 0 1.25rem", padding: "0.95rem 1rem", borderLeft: `5px solid ${theory.accent}`, background: "rgba(111,0,255,0.16)" }}>
            <p style={{ margin: "0 0 0.35rem", fontFamily: "'IM Fell English', serif", fontStyle: "italic", lineHeight: 1.55, color: "rgba(17,17,17,0.78)" }}>{theory.quote}</p>
            <cite style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.56rem", color: theory.accent, letterSpacing: "0.1em" }}>{theory.quoteBy}</cite>
          </blockquote>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.4rem" }}>
            {theory.concepts.map((concept) => (
              <span key={concept} style={{ border: `1px solid ${theory.accent}55`, color: theory.accent, padding: "0.28rem 0.62rem", fontFamily: "'Special Elite', cursive", fontSize: "0.72rem" }}>
                {concept}
              </span>
            ))}
          </div>
          <button
            onClick={() => readMode(theory)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              border: `1px solid ${theory.accent}`,
              background: theory.accent,
              color: nearBlack,
              padding: "0.72rem 1rem",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.64rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              boxShadow: `7px 7px 0 ${deepViolet}`,
            }}
          >
            <BookOpen size={14} /> Read mode
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeministAtlas() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<Theory | null>(null);

  const openEnvelope = () => {
    setOpened(true);
    window.setTimeout(() => {
      document.querySelector("#atlas-card-stage")?.scrollIntoView({ behavior: "auto", block: "center" });
    }, 120);
  };

  return (
    <section
      id="atlas"
      style={{
        background: `linear-gradient(90deg, rgba(111,0,255,0.12) 1px, transparent 1px), linear-gradient(0deg, rgba(17,17,17,0.055) 1px, transparent 1px), ${nearBlack}`,
        backgroundSize: "72px 72px",
        position: "relative",
        padding: "6.5rem 2rem 8rem",
        overflow: "hidden",
        minHeight: "1080px",
        color: ink,
      }}
    >
      <style>
        {`
          @media (max-width: 820px) {
            #atlas {
              min-height: 1700px !important;
            }
          }
        `}
      </style>

      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(17,17,17,0.12) 1px, transparent 1.5px)", backgroundSize: "18px 18px", opacity: 0.18 }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent 0 14px, rgba(17,17,17,0.035) 14px 15px)", opacity: 0.45 }} />
      <img aria-hidden="true" src={umbrellaMarch} decoding="async" style={{ position: "absolute", right: "-4%", top: "7%", width: "min(32vw, 420px)", opacity: 0.1, transform: "rotate(2deg)", pointerEvents: "none" }} />
      <img aria-hidden="true" src={umbrellaThread} decoding="async" style={{ position: "absolute", left: "-5%", bottom: "7%", width: "min(30vw, 360px)", opacity: 0.08, transform: "rotate(-4deg)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1160px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.56rem", letterSpacing: "0.28em", color: violet, marginBottom: "0.8rem" }}>
            FEMINIST ARCHIVE / SECTION II / SEALED THEORY FILES
          </div>
          <h2 style={{ margin: 0, fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.6rem, 9vw, 8rem)", lineHeight: 0.86, letterSpacing: 0 }}>
            THEORY<br />
            <span style={{ color: "transparent", WebkitTextStroke: `2px ${violet}` }}>ARCHIVE</span>
          </h2>
          <p style={{ margin: "1rem 0 0", maxWidth: "520px", fontFamily: "'Special Elite', cursive", fontSize: "0.92rem", lineHeight: 1.65, fontStyle: "italic", color: "rgba(17,17,17,0.64)" }}>
            Open the envelope. Seven theory cards, seven representative voices, one living map of feminist thought.
          </p>
        </motion.div>

        <div style={{ position: "relative", minHeight: "720px" }}>
          <motion.button
            onClick={openEnvelope}
            animate={opened ? { y: 178, scale: 0.62, opacity: 0.16 } : { y: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 24, mass: 0.8 }}
            style={{
              position: "absolute",
              left: "50%",
              top: "48%",
              translate: "-50% -50%",
              width: "min(640px, 82vw)",
              aspectRatio: "1.62",
              border: "none",
              background: "transparent",
              cursor: opened ? "default" : "pointer",
              pointerEvents: opened ? "none" : "auto",
              filter: "none",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
            aria-label="Open theory archive envelope"
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg, #ffffff, #efe7ff)", border: `2px solid ${violet}`, clipPath: "polygon(0 18%, 50% 55%, 100% 18%, 100% 100%, 0 100%)", boxShadow: "0 22px 48px rgba(17,17,17,0.14)" }} />
            <div style={{ position: "absolute", inset: "0 0 42% 0", background: deepViolet, border: `2px solid ${violet}`, clipPath: opened ? "polygon(0 100%, 50% 20%, 100% 100%)" : "polygon(0 0, 50% 100%, 100% 0)", transformOrigin: "50% 100%" }} />
            <div style={{ position: "absolute", left: "50%", top: "54%", translate: "-50% -50%", width: "78px", height: "78px", borderRadius: "50%", background: violet, display: "grid", placeItems: "center", color: nearBlack, fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", boxShadow: `0 0 0 8px ${deepViolet}` }}>
              ♀
            </div>
            <div style={{ position: "absolute", left: "2rem", bottom: "1.35rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", color: "rgba(17,17,17,0.72)", letterSpacing: "0.18em", textAlign: "left" }}>
              {opened ? "ARCHIVE OPENED" : "CLICK TO OPEN"}<br />
              <span style={{ color: "rgba(17,17,17,0.52)" }}>THEORY CARDS / 7 FILES</span>
            </div>
          </motion.button>

          <div
            id="atlas-card-stage"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: opened ? "auto" : "none",
              contain: "layout paint style",
            }}
          >
            {theories.map((theory, index) => (
              <TheoryCard key={theory.id} theory={theory} index={index} opened={opened} onOpen={() => setSelected(theory)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <DetailModal theory={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
