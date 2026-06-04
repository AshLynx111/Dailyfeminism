import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import img1 from "figma:asset/9b362052e5b7524cc56549a710bbf89c-1.jpg";
import woolfWaves from "../../imports/collage/woolf-waves.jpg";
import { useLanguage } from "../i18n";

const books = [
  {
    num: "001",
    title: "A Vindication of the Rights of Woman",
    titleZh: "女权辩护",
    author: "Mary Wollstonecraft",
    year: "1792",
    theory: "LIBERAL",
    quote: "\"I do not wish women to have power over men — but over themselves.\"",
    body: "The foundational text of liberal feminism. Wollstonecraft argues that women appear inferior only from lack of education. She demands equal educational opportunity as the bedrock of political equality.",
    bodyZh: "自由主义女性主义的奠基文本。沃斯通克拉夫特认为，女性显得低下只是因为缺乏教育；平等教育机会是政治平等的基础。",
    rot: "-1.2deg",
    offset: "0px",
    paperBg: "#FFFFFF",
  },
  {
    num: "002",
    title: "Gender Trouble",
    titleZh: "性别麻烦",
    author: "Judith Butler",
    year: "1990",
    theory: "POSTMODERN",
    quote: "\"There is no gender identity behind the expressions of gender; that identity is performatively constituted.\"",
    body: "Butler's revolutionary thesis: gender is not something you are — it is something you do. Acts, gestures, and desire create the illusion of a stable gender self. This detonated feminist theory.",
    bodyZh: "巴特勒的革命性命题：性别不是你是什么，而是你做什么。行为、姿态与欲望制造出稳定性别自我的幻象，并重塑了女性主义理论。",
    rot: "2.5deg",
    offset: "12px",
    paperBg: "#F1EBFF",
  },
  {
    num: "003",
    title: "Sister Outsider",
    titleZh: "局外姐妹",
    author: "Audre Lorde",
    year: "1984",
    theory: "INTERSECTIONAL",
    quote: "\"It is not our differences that divide us. It is our inability to recognize, accept, and celebrate those differences.\"",
    body: "Essays and speeches by the visionary Black lesbian feminist. Lorde maps the intersections of race, gender, class, and sexuality with extraordinary force — essential reading.",
    bodyZh: "这是一位黑人女同性恋女性主义者的论文与演讲集。洛德以强大的语言勾勒种族、性别、阶级与性取向的交叉，是必读文本。",
    rot: "-3deg",
    offset: "5px",
    paperBg: "#FFFFFF",
  },
  {
    num: "004",
    title: "Caliban and the Witch",
    titleZh: "卡利班与女巫",
    author: "Silvia Federici",
    year: "2004",
    theory: "SOCIALIST",
    quote: "\"The witch-hunt was a war against women — an attempt to destroy the control women had exercised over their reproductive function.\"",
    body: "Federici traces how the transition to capitalism required destroying women's communal power. The witch hunts were deliberate attacks on female autonomy. A paradigm-shifting materialist analysis.",
    bodyZh: "费代里奇追踪资本主义转型如何需要摧毁女性的共同体力量。猎巫是对女性自主性的蓄意攻击，也是一种范式转换式的唯物主义分析。",
    rot: "1.5deg",
    offset: "-8px",
    paperBg: "#F4F0FF",
  },
  {
    num: "005",
    title: "Sexual Politics",
    titleZh: "性政治",
    author: "Kate Millett",
    year: "1970",
    theory: "RADICAL",
    quote: "\"Coitus is set deeply within the larger context of human affairs that it serves as a charged microcosm of the variety of attitudes and values to which culture subscribes.\"",
    body: "The radical feminist breakthrough. Millett analyses literature to show how patriarchy pervades culture — not just law. The personal is political. Sex is power.",
    bodyZh: "激进女性主义的突破性文本。米利特通过文学分析展示父权制如何渗透文化，而不只是法律。个人的即政治的，性也是权力。",
    rot: "-2deg",
    offset: "18px",
    paperBg: "#FFFFFF",
  },
  {
    num: "006",
    title: "Women, Race & Class",
    titleZh: "妇女、种族与阶级",
    author: "Angela Y. Davis",
    year: "1981",
    theory: "INTERSECTIONAL",
    quote: "\"Racism and sexism are not simply analogous — they are deeply interconnected.\"",
    body: "Davis traces the inseparable history of race, class, and gender in American life. The suffrage movement's racism undermined its own goals. Liberation requires solidarity across all these axes.",
    bodyZh: "戴维斯追踪美国生活中种族、阶级与性别不可分割的历史。选举权运动中的种族主义削弱了自身目标；解放需要跨越这些轴线的团结。",
    rot: "3deg",
    offset: "0px",
    paperBg: "#F2ECFF",
  },
  {
    num: "007",
    title: "The Origin of the Family",
    titleZh: "家庭、私有制和国家的起源",
    author: "Friedrich Engels",
    year: "1884",
    theory: "MARXIST",
    quote: "\"The first class antagonism which appears in history coincides with the development of the antagonism between man and woman.\"",
    body: "Engels locates the origin of women's oppression in the emergence of private property and the patriarchal family — the world historical defeat of the female sex.",
    bodyZh: "恩格斯将女性压迫的起源定位在私有财产和父权家庭的出现之中，称之为女性的世界历史性失败。",
    rot: "-1.5deg",
    offset: "8px",
    paperBg: "#FFFFFF",
  },
  {
    num: "008",
    title: "In a Different Voice",
    titleZh: "不同的声音",
    author: "Carol Gilligan",
    year: "1982",
    theory: "CULTURAL",
    quote: "\"The different voice I describe is characterized not by gender but by theme — its association with women is empirical, not necessary.\"",
    body: "Gilligan challenges male-centered developmental psychology. Women's ethics of care and relational moral reasoning are not inferior — they are different. The first major work of cultural feminism.",
    bodyZh: "吉利根挑战以男性为中心的发展心理学。女性的照护伦理与关系性道德推理并不低劣，而是不同。这是文化女性主义的重要文本。",
    rot: "2deg",
    offset: "-5px",
    paperBg: "#F3EFFF",
  },
];

export function ReadingArchive() {
  const [open, setOpen] = useState<typeof books[0] | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const { isZh } = useLanguage();
  const filters = ["ALL", "LIBERAL", "RADICAL", "SOCIALIST", "MARXIST", "CULTURAL", "POSTMODERN", "INTERSECTIONAL"];
  const filterLabels: Record<string, string> = {
    ALL: "全部",
    LIBERAL: "自由主义",
    RADICAL: "激进",
    SOCIALIST: "社会主义",
    MARXIST: "马克思",
    CULTURAL: "文化",
    POSTMODERN: "后现代",
    INTERSECTIONAL: "交叉性",
  };

  const shown = filter === "ALL" ? books : books.filter((b) => b.theory === filter);

  useEffect(() => {
    const handler = (event: Event) => {
      const theory = (event as CustomEvent<{ theory?: string }>).detail?.theory;
      if (!theory) return;
      setFilter(theory);
      window.setTimeout(() => {
        document.querySelector(`[data-reading-theory="${theory}"]`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 120);
    };

    window.addEventListener("dailyfeminism:read-mode", handler);
    return () => window.removeEventListener("dailyfeminism:read-mode", handler);
  }, []);

  return (
    <section
      id="reading"
      className="reading-archive-section"
      style={{
        background: "#F7F4FF",
        position: "relative",
        padding: "6rem 3rem 10rem",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <style>
        {`
          @media (max-width: 720px) {
            .reading-archive-section {
              padding: 4.5rem 1rem 6rem !important;
              overflow: hidden !important;
            }

            .reading-archive-inner {
              max-width: 100% !important;
            }

            .reading-archive-header {
              margin-bottom: 2rem !important;
            }

            .reading-archive-kicker {
              display: block !important;
              font-size: 0.46rem !important;
              letter-spacing: 0.16em !important;
              line-height: 1.7 !important;
            }

            .reading-archive-filters {
              gap: 0.45rem !important;
              margin-bottom: 1.75rem !important;
              overflow-x: auto !important;
              flex-wrap: nowrap !important;
              padding-bottom: 0.35rem !important;
              scrollbar-width: none !important;
            }

            .reading-archive-filters::-webkit-scrollbar {
              display: none !important;
            }

            .reading-archive-filter {
              flex: 0 0 auto !important;
              min-height: 2rem !important;
              padding: 0.42rem 0.68rem !important;
              white-space: nowrap !important;
            }

            .reading-book-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }

            .reading-book-shell {
              transform: none !important;
            }

            .reading-book-button {
              min-height: 0 !important;
              padding: 1.15rem !important;
              clip-path: none !important;
              box-shadow: 0 5px 16px rgba(17,17,17,0.09) !important;
            }

            .reading-book-title {
              font-size: 1.04rem !important;
              overflow-wrap: anywhere !important;
            }

            .reading-book-theory {
              max-width: 52% !important;
              text-align: right !important;
              overflow-wrap: anywhere !important;
            }

            .reading-open-file {
              margin-top: 1rem !important;
              padding-top: 0.65rem !important;
              border-top: 1px solid rgba(111,0,255,0.2) !important;
              font-size: 0.56rem !important;
              line-height: 1.35 !important;
            }

            .reading-detail-card {
              padding: 2.4rem 1.2rem 1.4rem !important;
              clip-path: none !important;
            }

            .reading-footer-row {
              align-items: flex-start !important;
            }

            .reading-footer-quote {
              max-width: 100% !important;
              text-align: left !important;
            }
          }
        `}
      </style>
      {/* Halftone dots */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.12) 1px, transparent 1.5px), repeating-linear-gradient(0deg, transparent 0 15px, rgba(17,17,17,0.035) 15px 16px)",
        backgroundSize: "18px 18px, auto",
        opacity: 0.35,
      }} />

      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px", opacity: 0.5,
      }} />

      {/* Archive image - big right side */}
      <div style={{
        position: "absolute", right: "-4%", top: "8%",
        width: "min(36vw, 480px)", zIndex: 1,
        opacity: 0.08,
        transform: "rotate(2deg)",
      }}>
        <img src={woolfWaves} alt="" style={{ width: "100%" }} />
      </div>

      <div style={{
        position: "absolute", left: "-8%", bottom: "4%",
        width: "min(30vw, 360px)", zIndex: 1,
        opacity: 0.05,
        transform: "rotate(-4deg)",
      }}>
        <img src={img1} alt="" style={{ width: "100%" }} />
      </div>

      <div className="reading-archive-inner" style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <motion.div className="reading-archive-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3.5rem" }}>
          <div style={{ borderTop: "3px solid #6F00FF", borderBottom: "1px solid rgba(111,0,255,0.28)", padding: "0.4rem 0", marginBottom: "0.35rem" }}>
            <div style={{ borderBottom: "1px solid rgba(111,0,255,0.16)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
            <span className="reading-archive-kicker" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.28em", color: "#6F00FF", opacity: 1 }}>
                {isZh ? "女性主义档案 — 第五展厅 — 阅读室" : "FEMINIST ARCHIVE — SECTION V — READING ROOM"}
              </span>
            </div>
          </div>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            color: "#111111", lineHeight: 0.88, letterSpacing: "0.01em",
          }}>
            {isZh ? "阅读" : "READING"}<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.5px #6F00FF" }}>
              {isZh ? "档案" : "ARCHIVE"}
            </span>
          </h2>

          <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", color: "rgba(17,17,17,0.68)", fontStyle: "italic", marginTop: "0.75rem" }}>
            {isZh ? "八本重要文本，一座女性主义图书馆。" : "Eight essential texts. The feminist library."}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="reading-archive-filters" style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {filters.map((f) => (
            <button
              className="reading-archive-filter"
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "0.3rem 0.8rem",
                background: filter === f ? "#6F00FF" : "transparent",
                border: filter === f ? "1px solid #6F00FF" : "1px solid rgba(111,0,255,0.18)",
                color: filter === f ? "#FFFFFF" : "rgba(17,17,17,0.52)",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.58rem", letterSpacing: "0.12em",
                transition: "all 0.2s",
              }}
            >
              {isZh ? filterLabels[f] : f}
            </button>
          ))}
        </div>

        {/* Book scatter layout */}
        <div className="reading-book-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem 2rem" }}>
          <AnimatePresence>
            {shown.map((book, i) => (
              <motion.div
                className="reading-book-shell"
                key={book.num}
                id={`reading-${book.theory.toLowerCase()}-${book.num}`}
                data-reading-theory={book.theory}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                style={{ transform: `rotate(${book.rot}) translateY(${book.offset})` }}
              >
                <motion.button
                  className="reading-book-button"
                  whileHover={{ y: -5, rotate: "0deg", scale: 1.02 }}
                  onClick={() => setOpen(book)}
                  style={{
                    width: "100%",
                    background: `linear-gradient(180deg, ${book.paperBg}, #F7F4FF)`,
                    border: "1px solid rgba(111,0,255,0.55)",
                    cursor: "pointer",
                    padding: "1.5rem",
                    textAlign: "left",
                    position: "relative",
                    clipPath: "polygon(0 2%, 1.5% 0, 4% 1.5%, 8% 0.5%, 14% 2%, 20% 0, 27% 1.5%, 36% 0.5%, 46% 1.5%, 57% 0, 68% 1%, 79% 0.5%, 89% 1.5%, 96% 0, 100% 1%, 100% 98%, 98% 100%, 94% 98.5%, 89% 100%, 83% 98%, 76% 100%, 69% 98.5%, 61% 100%, 52% 98%, 43% 100%, 34% 99%, 25% 100%, 16% 98.5%, 8% 100%, 3% 98.5%, 0 100%)",
                    boxShadow: filter === book.theory ? "10px 10px 0 rgba(111,0,255,0.18), 0 3px 10px rgba(17,17,17,0.1)" : "0 3px 10px rgba(17,17,17,0.1)",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 22px rgba(17,17,17,0.14)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = filter === book.theory ? "10px 10px 0 rgba(111,0,255,0.18), 0 3px 10px rgba(17,17,17,0.1)" : "0 3px 10px rgba(17,17,17,0.1)")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", color: "#6F00FF", letterSpacing: "0.15em" }}>
                      {book.num}
                    </span>
                    <span className="reading-book-theory" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", color: "rgba(17,17,17,0.52)", letterSpacing: "0.1em" }}>
                      {book.theory}
                    </span>
                  </div>

                  <div style={{ height: "1px", background: "rgba(111,0,255,0.75)", marginBottom: "0.75rem" }} />

                  <h3 className="reading-book-title" style={{ fontFamily: "'IM Fell English', serif", fontSize: "1rem", color: "#111111", lineHeight: 1.25, marginBottom: "0.4rem" }}>
                    {isZh ? book.titleZh : book.title}
                  </h3>

                  <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.72rem", color: "rgba(17,17,17,0.58)", fontStyle: "italic" }}>
                    {book.author}, {book.year}
                  </p>

                  <div style={{ height: "1px", background: "rgba(111,0,255,0.35)", margin: "0.75rem 0" }} />

                  <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.7rem", color: "rgba(17,17,17,0.56)", fontStyle: "italic", lineHeight: 1.5, flex: 1 }}>
                    {book.quote.length > 90 ? book.quote.slice(0, 87) + "…\"" : book.quote}
                  </p>

                  <div className="reading-open-file" style={{ marginTop: "0.75rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", color: "#6F00FF", letterSpacing: "0.1em" }}>
                    ↗ {isZh ? "打开文件" : "OPEN FILE"}
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
              background: "rgba(17,17,17,0.42)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              className="reading-detail-card"
              initial={{ scale: 0.9, rotate: "2deg", y: 20 }}
              animate={{ scale: 1, rotate: "0.3deg", y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: `linear-gradient(180deg, ${open.paperBg}, #F7F4FF)`,
                border: "1px solid rgba(111,0,255,0.65)",
                maxWidth: "560px", width: "100%",
                padding: "3rem",
                position: "relative",
                clipPath: "polygon(0 1%, 2% 0, 5% 1.5%, 11% 0, 20% 1%, 32% 0, 46% 1.5%, 61% 0, 75% 1%, 88% 0, 96% 1.5%, 100% 0, 100% 99%, 97% 100%, 91% 98.5%, 83% 100%, 73% 99%, 62% 100%, 50% 98.5%, 38% 100%, 27% 99%, 17% 100%, 8% 98.5%, 2% 100%, 0 99%)",
                boxShadow: "0 20px 60px rgba(17,17,17,0.18)",
                maxHeight: "85vh", overflowY: "auto",
              }}
            >
              <button
                onClick={() => setOpen(null)}
                style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: "#6F00FF", fontSize: "1.1rem" }}
              >
                ×
              </button>

              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.25em", color: "#6F00FF", marginBottom: "0.4rem" }}>
                {isZh ? "文件" : "FILE"} {open.num} — {isZh ? filterLabels[open.theory] : open.theory} — {open.year}
              </div>
              <h2 style={{ fontFamily: "'IM Fell English', serif", fontSize: "1.6rem", color: "#111111", lineHeight: 1.15, marginBottom: "0.3rem" }}>
                {isZh ? open.titleZh : open.title}
              </h2>
              <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", color: "rgba(17,17,17,0.66)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                — {open.author}
              </p>

              <div style={{ height: "2px", background: "rgba(111,0,255,0.55)", marginBottom: "1.5rem" }} />

              <blockquote style={{ margin: "0 0 1.25rem", padding: "0.8rem 1rem", borderLeft: "5px solid #6F00FF", background: "rgba(111,0,255,0.16)" }}>
                <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.92rem", color: "#111111", lineHeight: 1.6, opacity: 0.78 }}>
                  {open.quote}
                </p>
              </blockquote>

              <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.88rem", color: "#111111", lineHeight: 1.7, opacity: 0.7 }}>
                {isZh ? open.bodyZh : open.body}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div style={{ maxWidth: "1100px", margin: "6rem auto 0", position: "relative", zIndex: 2 }}>
        <div style={{ height: "1px", background: "rgba(111,0,255,0.22)", marginBottom: "2rem" }} />
        <div className="reading-footer-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#6F00FF", lineHeight: 1, opacity: 0.36 }}>
              {isZh ? "日常女性主义" : "DAILY FEMINISM"}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(17,17,17,0.34)", letterSpacing: "0.2em", marginTop: "0.3rem" }}>
              {isZh ? "一场活的拼贴展览 — 为了教育与团结" : "A LIVING COLLAGE EXHIBITION — FOR EDUCATION & SOLIDARITY"}
            </div>
          </div>
          <blockquote className="reading-footer-quote" style={{ maxWidth: "300px", textAlign: "right" }}>
            <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.78rem", color: "rgba(17,17,17,0.42)", lineHeight: 1.6 }}>
              "Feminism is not simply a struggle to end male chauvinism — it is a commitment to eradicating the ideology of domination."
            </p>
            <cite style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", color: "rgba(111,0,255,0.42)", letterSpacing: "0.1em" }}>
              — bell hooks
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
