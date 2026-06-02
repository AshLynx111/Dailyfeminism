import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import img1 from "figma:asset/9b362052e5b7524cc56549a710bbf89c-1.jpg";

const books = [
  {
    num: "001",
    title: "A Vindication of the Rights of Woman",
    author: "Mary Wollstonecraft",
    year: "1792",
    theory: "LIBERAL",
    quote: "\"I do not wish women to have power over men — but over themselves.\"",
    body: "The foundational text of liberal feminism. Wollstonecraft argues that women appear inferior only from lack of education. She demands equal educational opportunity as the bedrock of political equality.",
    rot: "-1.2deg",
    offset: "0px",
    paperBg: "#F0E8D2",
  },
  {
    num: "002",
    title: "Gender Trouble",
    author: "Judith Butler",
    year: "1990",
    theory: "POSTMODERN",
    quote: "\"There is no gender identity behind the expressions of gender; that identity is performatively constituted.\"",
    body: "Butler's revolutionary thesis: gender is not something you are — it is something you do. Acts, gestures, and desire create the illusion of a stable gender self. This detonated feminist theory.",
    rot: "2.5deg",
    offset: "12px",
    paperBg: "#E8E4F0",
  },
  {
    num: "003",
    title: "Sister Outsider",
    author: "Audre Lorde",
    year: "1984",
    theory: "INTERSECTIONAL",
    quote: "\"It is not our differences that divide us. It is our inability to recognize, accept, and celebrate those differences.\"",
    body: "Essays and speeches by the visionary Black lesbian feminist. Lorde maps the intersections of race, gender, class, and sexuality with extraordinary force — essential reading.",
    rot: "-3deg",
    offset: "5px",
    paperBg: "#E0ECF0",
  },
  {
    num: "004",
    title: "Caliban and the Witch",
    author: "Silvia Federici",
    year: "2004",
    theory: "SOCIALIST",
    quote: "\"The witch-hunt was a war against women — an attempt to destroy the control women had exercised over their reproductive function.\"",
    body: "Federici traces how the transition to capitalism required destroying women's communal power. The witch hunts were deliberate attacks on female autonomy. A paradigm-shifting materialist analysis.",
    rot: "1.5deg",
    offset: "-8px",
    paperBg: "#EDE8DC",
  },
  {
    num: "005",
    title: "Sexual Politics",
    author: "Kate Millett",
    year: "1970",
    theory: "RADICAL",
    quote: "\"Coitus is set deeply within the larger context of human affairs that it serves as a charged microcosm of the variety of attitudes and values to which culture subscribes.\"",
    body: "The radical feminist breakthrough. Millett analyses literature to show how patriarchy pervades culture — not just law. The personal is political. Sex is power.",
    rot: "-2deg",
    offset: "18px",
    paperBg: "#F0E4E0",
  },
  {
    num: "006",
    title: "Women, Race & Class",
    author: "Angela Y. Davis",
    year: "1981",
    theory: "INTERSECTIONAL",
    quote: "\"Racism and sexism are not simply analogous — they are deeply interconnected.\"",
    body: "Davis traces the inseparable history of race, class, and gender in American life. The suffrage movement's racism undermined its own goals. Liberation requires solidarity across all these axes.",
    rot: "3deg",
    offset: "0px",
    paperBg: "#E8F0EC",
  },
  {
    num: "007",
    title: "The Origin of the Family",
    author: "Friedrich Engels",
    year: "1884",
    theory: "MARXIST",
    quote: "\"The first class antagonism which appears in history coincides with the development of the antagonism between man and woman.\"",
    body: "Engels locates the origin of women's oppression in the emergence of private property and the patriarchal family — the world historical defeat of the female sex.",
    rot: "-1.5deg",
    offset: "8px",
    paperBg: "#ECE8E4",
  },
  {
    num: "008",
    title: "In a Different Voice",
    author: "Carol Gilligan",
    year: "1982",
    theory: "CULTURAL",
    quote: "\"The different voice I describe is characterized not by gender but by theme — its association with women is empirical, not necessary.\"",
    body: "Gilligan challenges male-centered developmental psychology. Women's ethics of care and relational moral reasoning are not inferior — they are different. The first major work of cultural feminism.",
    rot: "2deg",
    offset: "-5px",
    paperBg: "#E4ECE8",
  },
];

export function ReadingArchive() {
  const [open, setOpen] = useState<typeof books[0] | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const filters = ["ALL", "LIBERAL", "RADICAL", "SOCIALIST", "MARXIST", "CULTURAL", "POSTMODERN", "INTERSECTIONAL"];

  const shown = filter === "ALL" ? books : books.filter((b) => b.theory === filter);

  return (
    <section
      id="reading"
      style={{
        background: "#0D0D0D",
        position: "relative",
        padding: "6rem 3rem 10rem",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Halftone dots */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(circle, rgba(220,210,190,0.05) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }} />

      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px", opacity: 0.5,
      }} />

      {/* Archive image - big right side */}
      <div style={{
        position: "absolute", right: "-5%", top: "10%",
        width: "28%", zIndex: 1,
        opacity: 0.07, mixBlendMode: "luminosity",
        transform: "rotate(1deg)",
      }}>
        <img src={img1} alt="" style={{ width: "100%", filter: "grayscale(1) contrast(1.2)", mixBlendMode: "screen" }} />
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3.5rem" }}>
          <div style={{ borderTop: "3px solid #EDE8D8", borderBottom: "1px solid rgba(237,232,216,0.2)", padding: "0.4rem 0", marginBottom: "0.35rem" }}>
            <div style={{ borderBottom: "1px solid rgba(237,232,216,0.1)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.28em", color: "#EDE8D8", opacity: 0.3 }}>
                FEMINIST ARCHIVE — SECTION V — READING ROOM
              </span>
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            color: "#EDE8D8", lineHeight: 0.88, letterSpacing: "0.01em",
          }}>
            READING<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(237,232,216,0.35)" }}>
              ARCHIVE
            </span>
          </h2>

          <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", color: "rgba(212,200,168,0.45)", fontStyle: "italic", marginTop: "0.75rem" }}>
            Eight essential texts. The feminist library.
          </p>
        </motion.div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "0.3rem 0.8rem",
                background: filter === f ? "rgba(237,232,216,0.12)" : "transparent",
                border: filter === f ? "1px solid rgba(237,232,216,0.4)" : "1px solid rgba(237,232,216,0.1)",
                color: filter === f ? "#EDE8D8" : "rgba(237,232,216,0.3)",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.58rem", letterSpacing: "0.12em",
                transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Book scatter layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem 2rem" }}>
          <AnimatePresence>
            {shown.map((book, i) => (
              <motion.div
                key={book.num}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                style={{ transform: `rotate(${book.rot}) translateY(${book.offset})` }}
              >
                <motion.button
                  whileHover={{ y: -5, rotate: "0deg", scale: 1.02 }}
                  onClick={() => setOpen(book)}
                  style={{
                    width: "100%",
                    background: book.paperBg,
                    border: "none",
                    cursor: "pointer",
                    padding: "1.5rem",
                    textAlign: "left",
                    position: "relative",
                    clipPath: "polygon(0 2%, 1.5% 0, 4% 1.5%, 8% 0.5%, 14% 2%, 20% 0, 27% 1.5%, 36% 0.5%, 46% 1.5%, 57% 0, 68% 1%, 79% 0.5%, 89% 1.5%, 96% 0, 100% 1%, 100% 98%, 98% 100%, 94% 98.5%, 89% 100%, 83% 98%, 76% 100%, 69% 98.5%, 61% 100%, 52% 98%, 43% 100%, 34% 99%, 25% 100%, 16% 98.5%, 8% 100%, 3% 98.5%, 0 100%)",
                    filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.3))",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "filter 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "drop-shadow(0 8px 24px rgba(0,0,0,0.45))")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "drop-shadow(0 3px 10px rgba(0,0,0,0.3))")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", color: "rgba(13,13,13,0.4)", letterSpacing: "0.15em" }}>
                      {book.num}
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", color: "rgba(13,13,13,0.35)", letterSpacing: "0.1em" }}>
                      {book.theory}
                    </span>
                  </div>

                  <div style={{ height: "1px", background: "rgba(13,13,13,0.12)", marginBottom: "0.75rem" }} />

                  <h3 style={{ fontFamily: "'IM Fell English', serif", fontSize: "1rem", color: "#0D0D0D", lineHeight: 1.25, marginBottom: "0.4rem" }}>
                    {book.title}
                  </h3>

                  <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.72rem", color: "rgba(13,13,13,0.5)", fontStyle: "italic" }}>
                    {book.author}, {book.year}
                  </p>

                  <div style={{ height: "1px", background: "rgba(13,13,13,0.08)", margin: "0.75rem 0" }} />

                  <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.7rem", color: "rgba(13,13,13,0.45)", fontStyle: "italic", lineHeight: 1.5, flex: 1 }}>
                    {book.quote.length > 90 ? book.quote.slice(0, 87) + "…\"" : book.quote}
                  </p>

                  <div style={{ marginTop: "0.75rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", color: "rgba(13,13,13,0.3)", letterSpacing: "0.1em" }}>
                    ↗ OPEN FILE
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Book detail modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 2000,
              background: "rgba(13,13,13,0.82)",
              backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, rotate: "2deg", y: 20 }}
              animate={{ scale: 1, rotate: "0.3deg", y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: open.paperBg,
                maxWidth: "560px", width: "100%",
                padding: "3rem",
                position: "relative",
                clipPath: "polygon(0 1%, 2% 0, 5% 1.5%, 11% 0, 20% 1%, 32% 0, 46% 1.5%, 61% 0, 75% 1%, 88% 0, 96% 1.5%, 100% 0, 100% 99%, 97% 100%, 91% 98.5%, 83% 100%, 73% 99%, 62% 100%, 50% 98.5%, 38% 100%, 27% 99%, 17% 100%, 8% 98.5%, 2% 100%, 0 99%)",
                filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
                maxHeight: "85vh", overflowY: "auto",
              }}
            >
              <button
                onClick={() => setOpen(null)}
                style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "rgba(13,13,13,0.4)", fontSize: "1.1rem" }}
              >
                ×
              </button>

              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.25em", color: "rgba(13,13,13,0.4)", marginBottom: "0.4rem" }}>
                FILE {open.num} — {open.theory} — {open.year}
              </div>
              <h2 style={{ fontFamily: "'IM Fell English', serif", fontSize: "1.6rem", color: "#0D0D0D", lineHeight: 1.15, marginBottom: "0.3rem" }}>
                {open.title}
              </h2>
              <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", color: "rgba(13,13,13,0.55)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                — {open.author}
              </p>

              <div style={{ height: "2px", background: "rgba(13,13,13,0.12)", marginBottom: "1.5rem" }} />

              <blockquote style={{ margin: "0 0 1.25rem", padding: "0.8rem 1rem", borderLeft: "2px solid rgba(13,13,13,0.25)" }}>
                <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.92rem", color: "#0D0D0D", lineHeight: 1.6, opacity: 0.75 }}>
                  {open.quote}
                </p>
              </blockquote>

              <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.88rem", color: "#0D0D0D", lineHeight: 1.7, opacity: 0.75 }}>
                {open.body}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div style={{ maxWidth: "1100px", margin: "6rem auto 0", position: "relative", zIndex: 2 }}>
        <div style={{ height: "1px", background: "rgba(237,232,216,0.1)", marginBottom: "2rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#EDE8D8", lineHeight: 1, opacity: 0.3 }}>
              DAILY FEMINISM
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(237,232,216,0.2)", letterSpacing: "0.2em", marginTop: "0.3rem" }}>
              A LIVING COLLAGE EXHIBITION — FOR EDUCATION & SOLIDARITY
            </div>
          </div>
          <blockquote style={{ maxWidth: "300px", textAlign: "right" }}>
            <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.78rem", color: "rgba(212,200,168,0.25)", lineHeight: 1.6 }}>
              "Feminism is not simply a struggle to end male chauvinism — it is a commitment to eradicating the ideology of domination."
            </p>
            <cite style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(212,200,168,0.18)", letterSpacing: "0.1em" }}>
              — bell hooks
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
