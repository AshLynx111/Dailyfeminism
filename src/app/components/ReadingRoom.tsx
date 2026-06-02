import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, BookOpen } from "lucide-react";

const books = [
  {
    id: 1,
    title: "A Vindication of the Rights of Woman",
    author: "Mary Wollstonecraft",
    year: "1792",
    theory: "Liberal",
    color: "#F59E0B",
    description: "One of the earliest works of feminist philosophy. Wollstonecraft argues that women are not naturally inferior to men but appear so due to lack of education. She advocates for equal educational opportunities as the foundation of political and social equality.",
    why: "The foundational text of liberal feminism — a starting point for understanding how education and rights became central feminist demands.",
    difficulty: "Foundational",
    excerpt: "\"I do not wish them [women] to have power over men; but over themselves.\"",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
  },
  {
    id: 2,
    title: "Gender Trouble",
    author: "Judith Butler",
    year: "1990",
    theory: "Postmodern",
    color: "#8B5CF6",
    description: "Butler's landmark work argues that gender is not a natural fact but a cultural performance — something we 'do' rather than 'have.' She challenges the sex/gender binary and opens the way for queer theory.",
    why: "Revolutionary and challenging — it fundamentally changes how we think about gender identity and challenges every other feminist tradition.",
    difficulty: "Advanced",
    excerpt: "\"There is no gender identity behind the expressions of gender; that identity is performatively constituted.\"",
    image: "https://images.unsplash.com/photo-1529589941132-43606325dfb4?w=400&q=80",
  },
  {
    id: 3,
    title: "Sister Outsider",
    author: "Audre Lorde",
    year: "1984",
    theory: "Intersectional",
    color: "#06B6D4",
    description: "A collection of essays and speeches by the visionary Black lesbian feminist poet. Lorde explores the intersections of race, gender, class, and sexuality with extraordinary clarity and power. Essential for understanding why difference must be a source of strength.",
    why: "A must-read for its poetic force and political clarity. Lorde shows how overlooking difference within feminist movements perpetuates harm.",
    difficulty: "Accessible",
    excerpt: "\"It is not our differences that divide us. It is our inability to recognize, accept, and celebrate those differences.\"",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
  },
  {
    id: 4,
    title: "Caliban and the Witch",
    author: "Silvia Federici",
    year: "2004",
    theory: "Socialist",
    color: "#F97316",
    description: "A radical historical analysis of how the transition to capitalism was built on the destruction of women's power. Federici traces the witch hunts as a deliberate attack on female communal life and autonomous sexuality, showing how capitalism required women's unpaid reproductive labor.",
    why: "A paradigm-shifting historical materialist analysis. Connects the origins of capitalism directly to the subordination of women's bodies and labor.",
    difficulty: "Intermediate",
    excerpt: "\"The witch-hunt was a war against women... it was an attempt to destroy the control that women had exercised over their reproductive function.\"",
    image: "https://images.unsplash.com/photo-1620130674275-d709994ed7c8?w=400&q=80",
  },
  {
    id: 5,
    title: "The Feminine Mystique",
    author: "Betty Friedan",
    year: "1963",
    theory: "Liberal",
    color: "#F59E0B",
    description: "The book that sparked second-wave feminism in America. Friedan identifies 'the problem that has no name' — the pervasive unhappiness of educated women confined to domestic roles — and argues for women's access to careers and public life.",
    why: "Essential for understanding the second wave. Also important for its critiques — it primarily addressed white, educated, middle-class women and ignored other forms of oppression.",
    difficulty: "Accessible",
    excerpt: "\"The problem lay buried, unspoken, for many years in the minds of American women.\"",
    image: "https://images.unsplash.com/photo-1529589941132-43606325dfb4?w=400&q=80",
  },
  {
    id: 6,
    title: "Sexual Politics",
    author: "Kate Millett",
    year: "1970",
    theory: "Radical",
    color: "#EF4444",
    description: "A founding text of radical feminism that analyzes how literature, psychology, and politics have been used to maintain male power over women. Millett argues that 'personal is political' — that sexuality is itself a political institution.",
    why: "Groundbreaking for its literary criticism and political analysis. Demonstrates how patriarchy operates through culture, not just law.",
    difficulty: "Intermediate",
    excerpt: "\"Coitus can scarcely be said to take place in a vacuum... it is set so deeply within the larger context of human affairs that it serves as a charged microcosm.\"",
    image: "https://images.unsplash.com/photo-1620130674275-d709994ed7c8?w=400&q=80",
  },
  {
    id: 7,
    title: "Women, Race & Class",
    author: "Angela Y. Davis",
    year: "1981",
    theory: "Intersectional",
    color: "#06B6D4",
    description: "Davis traces the historical connections between the women's movement, the Black liberation movement, and the labor movement. She argues that race, class, and gender oppressions are inseparable and that any feminism that ignores race and class will fail.",
    why: "An essential corrective to white feminist histories. Davis shows how the suffrage movement's racism undermined its own goals.",
    difficulty: "Accessible",
    excerpt: "\"Racism and sexism are not simply analogous; they are deeply interconnected.\"",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
  },
  {
    id: 8,
    title: "In a Different Voice",
    author: "Carol Gilligan",
    year: "1982",
    theory: "Cultural",
    color: "#10B981",
    description: "Gilligan challenges the male-centered developmental psychology of her teacher Lawrence Kohlberg. She argues that women's moral reasoning is relational and contextual — an 'ethics of care' — rather than the abstract rule-following Kohlberg valorized.",
    why: "Influential and controversial — valued feminine moral perspectives while raising questions about essentialism.",
    difficulty: "Accessible",
    excerpt: "\"The different voice I describe is characterized not by gender but by theme. Its association with women is an empirical observation.\"",
    image: "https://images.unsplash.com/photo-1620130674275-d709994ed7c8?w=400&q=80",
  },
];

function BookCard({ book }: { book: typeof books[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      style={{
        border: `1px solid ${expanded ? book.color + "50" : "rgba(196,181,253,0.1)"}`,
        background: expanded ? `${book.color}06` : "rgba(255,255,255,0.015)",
        transition: "border-color 0.3s, background 0.3s",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          padding: "1.75rem 2rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "1rem",
          alignItems: "start",
          textAlign: "left",
        }}
      >
        <div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.6rem", flexWrap: "wrap" }}>
            <span style={{
              padding: "0.2rem 0.7rem",
              background: `${book.color}20`,
              border: `1px solid ${book.color}40`,
              color: book.color,
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              fontFamily: "'IBM Plex Mono', monospace",
              textTransform: "uppercase",
            }}>
              {book.theory}
            </span>
            <span style={{
              fontSize: "0.65rem",
              color: "rgba(196,181,253,0.4)",
              fontFamily: "'IBM Plex Mono', monospace",
            }}>
              {book.year}
            </span>
            <span style={{
              padding: "0.2rem 0.6rem",
              border: "1px solid rgba(196,181,253,0.15)",
              color: "rgba(196,181,253,0.5)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              fontFamily: "'IBM Plex Mono', monospace",
            }}>
              {book.difficulty}
            </span>
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.15rem",
            color: "#F5F0EA",
            lineHeight: 1.3,
            marginBottom: "0.3rem",
          }}>
            {book.title}
          </h3>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.85rem",
            color: "rgba(196,181,253,0.55)",
            fontStyle: "italic",
          }}>
            — {book.author}
          </p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          style={{ color: book.color, marginTop: "0.25rem", flexShrink: 0 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div style={{ padding: "0 2rem 2rem" }}>
              <div style={{
                height: "1px",
                background: `linear-gradient(90deg, ${book.color}40, transparent)`,
                marginBottom: "1.5rem",
              }} />

              <blockquote style={{
                margin: "0 0 1.5rem",
                padding: "1rem 1.25rem",
                background: `${book.color}0a`,
                borderLeft: `3px solid ${book.color}60`,
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                color: "rgba(196,181,253,0.75)",
                fontSize: "0.9rem",
                lineHeight: 1.65,
              }}>
                {book.excerpt}
              </blockquote>

              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(240,235,255,0.75)",
                lineHeight: 1.75,
                marginBottom: "1.25rem",
              }}>
                {book.description}
              </p>

              <div style={{
                padding: "1rem 1.25rem",
                background: "rgba(196,181,253,0.04)",
                border: "1px solid rgba(196,181,253,0.08)",
              }}>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: book.color,
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}>
                  Why read this?
                </div>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(240,235,255,0.65)",
                  lineHeight: 1.65,
                }}>
                  {book.why}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ReadingRoom() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Liberal", "Radical", "Socialist", "Intersectional", "Postmodern", "Cultural"];

  const filtered = activeFilter === "All" ? books : books.filter((b) => b.theory === activeFilter);

  return (
    <section
      id="reading"
      style={{
        background: "#0A0414",
        padding: "8rem 2rem",
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(196,181,253,0.3), transparent)",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
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
            ♀ Section IV
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5rem", flexWrap: "wrap" }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "#F5F0EA",
              lineHeight: 0.95,
            }}>
              READING
              <br />
              <span style={{ WebkitTextStroke: "2px rgba(196,181,253,0.5)", color: "transparent" }}>
                ROOM
              </span>
            </h2>
            <BookOpen size={32} color="rgba(196,181,253,0.3)" style={{ marginBottom: "0.5rem" }} />
          </div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1rem",
            color: "rgba(196,181,253,0.6)",
            fontStyle: "italic",
            marginTop: "1rem",
            maxWidth: "480px",
          }}>
            Essential feminist texts — from foundational classics to contemporary theory.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "0.4rem 1rem",
                background: activeFilter === f ? "#7B2FBE" : "transparent",
                border: activeFilter === f ? "1px solid #7B2FBE" : "1px solid rgba(196,181,253,0.2)",
                color: activeFilter === f ? "#F5F0EA" : "rgba(196,181,253,0.5)",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Book list */}
        <motion.div
          layout
          style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(196,181,253,0.06)" }}
        >
          <AnimatePresence>
            {filtered.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
