import { motion } from "motion/react";

export function Footer() {
  return (
    <footer style={{
      background: "#F7F4FF",
      padding: "6rem 2rem 3rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, #6F00FF, transparent)",
      }} />

      {/* Background text */}
      <div style={{
        position: "absolute",
        bottom: "-2rem",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(6rem, 18vw, 14rem)",
        color: "rgba(111,0,255,0.1)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
      }}>
        FEMINISM
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem", marginBottom: "4rem" }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2.5rem",
              color: "#111111",
              lineHeight: 1,
              marginBottom: "1rem",
            }}>
              DAILY<br />
              <span style={{ WebkitTextStroke: "1px #6F00FF", color: "transparent" }}>FEMINISM</span>
            </div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              color: "rgba(17,17,17,0.62)",
              fontSize: "0.9rem",
              lineHeight: 1.65,
            }}>
              A digital collage museum exploring feminist theories through art, storytelling, and self-discovery.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#6F00FF",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}>
              Explore
            </div>
            {["Theory Atlas", "Quiz", "Spectrum Map", "Reading Room", "Timeline"].map((item, i) => (
              <div key={item} style={{ marginBottom: "0.6rem" }}>
                <button
                  onClick={() => {
                    const ids = ["#atlas", "#quiz", "#spectrum", "#reading", "#timeline"];
                    document.querySelector(ids[i])?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(17,17,17,0.56)",
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.85rem",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#6F00FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(17,17,17,0.56)")}
                >
                  {item}
                </button>
              </div>
            ))}
          </div>

          {/* Theories */}
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#6F00FF",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}>
              Theories
            </div>
            {["Liberal", "Radical", "Socialist", "Marxist", "Cultural", "Postmodern", "Intersectional"].map((t) => (
              <div key={t} style={{ marginBottom: "0.4rem" }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(17,17,17,0.5)",
                }}>
                  {t} Feminism
                </span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#6F00FF",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}>
              Words
            </div>
            <blockquote style={{
              margin: 0,
              padding: "1rem 1.25rem",
              borderLeft: "5px solid #6F00FF",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              color: "rgba(17,17,17,0.58)",
              fontSize: "0.9rem",
              lineHeight: 1.65,
            }}>
              "Feminism is not simply a struggle to end male chauvinism or a movement to ensure that women will have equal rights with men; it is a commitment to eradicating the ideology of domination."
              <footer style={{ marginTop: "0.5rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", fontStyle: "normal", color: "#6F00FF", letterSpacing: "0.1em" }}>
                — bell hooks
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: "2rem",
          borderTop: "1px solid rgba(111,0,255,0.35)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(17,17,17,0.44)",
            letterSpacing: "0.1em",
          }}>
            ♀ Daily Feminism — A Digital Museum Experience
          </span>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            color: "rgba(17,17,17,0.38)",
          }}>
            For education, reflection, and solidarity.
          </span>
        </div>
      </div>
    </footer>
  );
}
