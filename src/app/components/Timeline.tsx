import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const events = [
  {
    year: "1792",
    wave: "Proto-Feminist",
    color: "#F59E0B",
    title: "A Vindication of the Rights of Woman",
    desc: "Mary Wollstonecraft publishes the founding document of liberal feminism, arguing for women's equal education and rights.",
    category: "Publication",
  },
  {
    year: "1848",
    wave: "First Wave",
    color: "#EC4899",
    title: "Seneca Falls Convention",
    desc: "The first women's rights convention in the US, producing the Declaration of Sentiments. Begins the organized suffrage movement.",
    category: "Movement",
  },
  {
    year: "1869",
    wave: "First Wave",
    color: "#EC4899",
    title: "First Women's Suffrage Law",
    desc: "Wyoming Territory grants women the right to vote — the first such law in the US.",
    category: "Legal",
  },
  {
    year: "1884",
    wave: "First Wave",
    color: "#EC4899",
    title: "The Origin of the Family",
    desc: "Friedrich Engels connects women's oppression to private property and the emergence of class society — foundational for Marxist feminism.",
    category: "Publication",
  },
  {
    year: "1920",
    wave: "First Wave",
    color: "#EC4899",
    title: "19th Amendment (US)",
    desc: "American women gain the constitutional right to vote after decades of suffrage activism.",
    category: "Legal",
  },
  {
    year: "1949",
    wave: "Second Wave",
    color: "#7B2FBE",
    title: "The Second Sex",
    desc: "Simone de Beauvoir's existentialist feminist analysis: 'One is not born, but rather becomes, a woman.'",
    category: "Publication",
  },
  {
    year: "1963",
    wave: "Second Wave",
    color: "#7B2FBE",
    title: "The Feminine Mystique",
    desc: "Betty Friedan names 'the problem that has no name' — sparking second-wave feminism in America.",
    category: "Publication",
  },
  {
    year: "1966",
    wave: "Second Wave",
    color: "#7B2FBE",
    title: "NOW Founded",
    desc: "The National Organization for Women is founded, institutionalizing liberal feminist advocacy in the US.",
    category: "Organization",
  },
  {
    year: "1968",
    wave: "Second Wave",
    color: "#7B2FBE",
    title: "Miss America Protest",
    desc: "Radical feminists protest the Miss America pageant, coining 'consciousness-raising' as a political method.",
    category: "Movement",
  },
  {
    year: "1970",
    wave: "Second Wave",
    color: "#7B2FBE",
    title: "Sexual Politics",
    desc: "Kate Millett's radical feminist analysis shows how patriarchy operates through literature and culture.",
    category: "Publication",
  },
  {
    year: "1970",
    wave: "Second Wave",
    color: "#7B2FBE",
    title: "The Dialectic of Sex",
    desc: "Shulamith Firestone calls for the abolition of the biological family and artificial reproduction as feminist liberation.",
    category: "Publication",
  },
  {
    year: "1974",
    wave: "Second Wave",
    color: "#7B2FBE",
    title: "Wages for Housework Campaign",
    desc: "Silvia Federici and others launch the international campaign demanding pay for domestic labor — pioneering socialist feminism.",
    category: "Movement",
  },
  {
    year: "1981",
    wave: "Third Wave",
    color: "#06B6D4",
    title: "Women, Race & Class",
    desc: "Angela Davis insists that race and class cannot be separated from gender in feminist analysis.",
    category: "Publication",
  },
  {
    year: "1982",
    wave: "Third Wave",
    color: "#06B6D4",
    title: "In a Different Voice",
    desc: "Carol Gilligan establishes cultural feminism's 'ethics of care' — arguing women's moral reasoning has been undervalued.",
    category: "Publication",
  },
  {
    year: "1984",
    wave: "Third Wave",
    color: "#06B6D4",
    title: "Sister Outsider",
    desc: "Audre Lorde's essays establish intersectional feminism's moral vision: differences must be embraced, not tolerated.",
    category: "Publication",
  },
  {
    year: "1985",
    wave: "Third Wave",
    color: "#06B6D4",
    title: "Guerrilla Girls Founded",
    desc: "Anonymous feminist artist collective exposes sexism and racism in the art world.",
    category: "Organization",
  },
  {
    year: "1987",
    wave: "Third Wave",
    color: "#06B6D4",
    title: "A Cyborg Manifesto",
    desc: "Donna Haraway's postmodern feminist manifesto deconstructs gender, science, and the boundaries of the human.",
    category: "Publication",
  },
  {
    year: "1989",
    wave: "Third Wave",
    color: "#06B6D4",
    title: "Intersectionality Coined",
    desc: "Kimberlé Crenshaw coins 'intersectionality' to describe how Black women's experiences are shaped by multiple overlapping oppressions.",
    category: "Theory",
  },
  {
    year: "1990",
    wave: "Third Wave",
    color: "#06B6D4",
    title: "Gender Trouble",
    desc: "Judith Butler's radical postmodern thesis: gender is not something you are but something you perform.",
    category: "Publication",
  },
  {
    year: "1992",
    wave: "Third Wave",
    color: "#06B6D4",
    title: "Riot Grrrl Movement",
    desc: "Feminist punk movement emerges from Olympia and DC, fusing music, zines, and radical politics.",
    category: "Movement",
  },
  {
    year: "2004",
    wave: "Third Wave",
    color: "#06B6D4",
    title: "Caliban and the Witch",
    desc: "Silvia Federici's historical materialist analysis shows how capitalism was built on the destruction of women's communal power.",
    category: "Publication",
  },
  {
    year: "2012",
    wave: "Fourth Wave",
    color: "#10B981",
    title: "#MeToo Origins",
    desc: "Tarana Burke's #MeToo phrase from 2006 goes viral, beginning the fourth wave's digital mobilization against sexual harassment.",
    category: "Movement",
  },
  {
    year: "2017",
    wave: "Fourth Wave",
    color: "#10B981",
    title: "Women's March",
    desc: "The largest single-day protest in American history — over 3.5 million march globally on January 21.",
    category: "Movement",
  },
  {
    year: "2020",
    wave: "Fourth Wave",
    color: "#10B981",
    title: "Feminist Resurgence & Intersectionality",
    desc: "Black Lives Matter, #MeToo, and global feminist strikes intersect, centering race, class, and gender in new coalitions.",
    category: "Movement",
  },
];

const categoryColors: Record<string, string> = {
  Publication: "#C4B5FD",
  Movement: "#F97316",
  Legal: "#34D399",
  Organization: "#60A5FA",
  Theory: "#F472B6",
};

const waves = ["All", "Proto-Feminist", "First Wave", "Second Wave", "Third Wave", "Fourth Wave"];

export function Timeline() {
  const [activeWave, setActiveWave] = useState("All");
  const [selected, setSelected] = useState<typeof events[0] | null>(null);

  const filtered = activeWave === "All" ? events : events.filter((e) => e.wave === activeWave);

  return (
    <section
      id="timeline"
      style={{
        background: "linear-gradient(180deg, #0A0414 0%, #0D0620 100%)",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
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

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
            ♀ Section V
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
              TIMELINE
            </span>
          </h2>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1rem",
            color: "rgba(196,181,253,0.6)",
            fontStyle: "italic",
            marginTop: "1rem",
            maxWidth: "480px",
          }}>
            Centuries of feminist waves, publications, movements, and theoretical breakthroughs.
          </p>
        </motion.div>

        {/* Wave filters */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {waves.map((w) => (
            <button
              key={w}
              onClick={() => setActiveWave(w)}
              style={{
                padding: "0.4rem 1rem",
                background: activeWave === w ? "#7B2FBE" : "transparent",
                border: activeWave === w ? "1px solid #7B2FBE" : "1px solid rgba(196,181,253,0.2)",
                color: activeWave === w ? "#F5F0EA" : "rgba(196,181,253,0.5)",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                transition: "all 0.2s",
              }}
            >
              {w}
            </button>
          ))}
        </div>

        {/* Category legend */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {Object.entries(categoryColors).map(([cat, col]) => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: col }} />
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(196,181,253,0.4)",
                letterSpacing: "0.08em",
              }}>
                {cat}
              </span>
            </div>
          ))}
        </div>

        {/* Timeline — alternating layout */}
        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div style={{
            position: "absolute",
            left: "28px",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "linear-gradient(180deg, transparent, rgba(196,181,253,0.2) 5%, rgba(196,181,253,0.2) 95%, transparent)",
          }} />

          <AnimatePresence>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {filtered.map((event, i) => (
                <motion.div
                  key={`${event.year}-${event.title}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
                >
                  {/* Dot */}
                  <div style={{
                    flexShrink: 0,
                    width: "57px",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "1.1rem",
                  }}>
                    <div style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: event.color,
                      border: `2px solid ${event.color}60`,
                      boxShadow: `0 0 12px ${event.color}60`,
                    }} />
                  </div>

                  {/* Card */}
                  <button
                    onClick={() => setSelected(selected?.title === event.title ? null : event)}
                    style={{
                      flex: 1,
                      background: selected?.title === event.title ? `${event.color}12` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${selected?.title === event.title ? event.color + "50" : "rgba(196,181,253,0.1)"}`,
                      padding: "1rem 1.25rem",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      borderLeft: `3px solid ${event.color}60`,
                    }}
                    onMouseEnter={(e) => {
                      if (selected?.title !== event.title) {
                        e.currentTarget.style.borderColor = event.color + "40";
                        e.currentTarget.style.background = `${event.color}08`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selected?.title !== event.title) {
                        e.currentTarget.style.borderColor = "rgba(196,181,253,0.1)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      }
                    }}
                  >
                    <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "1.4rem",
                        color: event.color,
                        lineHeight: 1,
                      }}>
                        {event.year}
                      </span>
                      <span style={{
                        padding: "0.15rem 0.5rem",
                        background: `${categoryColors[event.category] || "#C4B5FD"}18`,
                        color: categoryColors[event.category] || "#C4B5FD",
                        fontSize: "0.58rem",
                        fontFamily: "'IBM Plex Mono', monospace",
                        letterSpacing: "0.08em",
                      }}>
                        {event.category}
                      </span>
                      <span style={{
                        fontSize: "0.58rem",
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "rgba(196,181,253,0.3)",
                        letterSpacing: "0.06em",
                      }}>
                        {event.wave}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "0.95rem",
                      color: "#F5F0EA",
                      lineHeight: 1.3,
                    }}>
                      {event.title}
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Selected event detail — inline */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                marginTop: "2rem",
                padding: "1.75rem",
                background: "#100822",
                border: `1px solid ${selected.color}50`,
                boxShadow: `0 0 40px ${selected.color}10`,
                position: "sticky",
                bottom: "2rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2rem",
                    color: selected.color,
                    lineHeight: 1,
                    display: "block",
                  }}>
                    {selected.year}
                  </span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: selected.color,
                    letterSpacing: "0.15em",
                    opacity: 0.7,
                  }}>
                    {selected.wave} · {selected.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(196,181,253,0.4)",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.05rem",
                color: "#F5F0EA",
                marginBottom: "0.75rem",
                lineHeight: 1.3,
              }}>
                {selected.title}
              </div>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.88rem",
                color: "rgba(240,235,255,0.7)",
                lineHeight: 1.7,
              }}>
                {selected.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
