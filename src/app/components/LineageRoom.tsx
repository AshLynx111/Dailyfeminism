import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../i18n";

type TheoryId =
  | "liberal"
  | "radical"
  | "socialist"
  | "marxist"
  | "cultural"
  | "postmodern"
  | "intersectional";

type LineageNode = {
  id: string;
  year: string;
  theory: TheoryId;
  title: string;
  titleZh: string;
  summary: string;
  summaryZh: string;
  keyword: string;
  keywordZh: string;
};

type TheoryProfile = {
  id: TheoryId;
  label: string;
  labelZh: string;
  short: string;
  shortZh: string;
  accent: string;
  path: string[];
  pathZh: string[];
  turning: string[];
  turningZh: string[];
  debate: string;
  debateZh: string;
};

const purple = "#6F00FF";
const deepPurple = "#24004D";
const paper = "#F7F4FF";
const ink = "#111111";
const softInk = "rgba(17,17,17,0.66)";

const profiles: Record<TheoryId, TheoryProfile> = {
  liberal: {
    id: "liberal",
    label: "Liberal Feminism",
    labelZh: "自由主义女性主义",
    short: "Equality through rights, education, law, and institutional reform.",
    shortZh: "通过权利、教育、法律和制度改革争取平等。",
    accent: "#6F00FF",
    path: ["Education", "Suffrage", "Workplace equality", "Legal reform", "Representation"],
    pathZh: ["教育权", "参政权", "职场平等", "法律改革", "代表性"],
    turning: [
      "Women are treated as rational subjects, not decorative dependents.",
      "Equality becomes a public political demand.",
      "The home and workplace become reform targets.",
    ],
    turningZh: [
      "女性被视为理性主体，而不是依附性的装饰。",
      "平等从个人愿望变成公共政治诉求。",
      "家庭和职场都成为制度改革对象。",
    ],
    debate: "Often criticized for trusting existing institutions too much and overlooking race, class, sexuality, and colonial histories.",
    debateZh: "常被批评过于信任既有制度，也容易忽略种族、阶级、性取向和殖民历史。",
  },
  radical: {
    id: "radical",
    label: "Radical Feminism",
    labelZh: "激进女性主义",
    short: "Patriarchy is the root structure, not a side problem.",
    shortZh: "父权制是根结构，而不是附带问题。",
    accent: "#E11D48",
    path: ["Private life", "Patriarchy", "Body politics", "Sexual violence", "Power"],
    pathZh: ["私人生活", "父权制", "身体政治", "性暴力", "权力"],
    turning: [
      "Private pain is reframed as political evidence.",
      "Culture, language, sexuality, and intimacy become sites of power.",
      "The goal shifts from equal treatment to dismantling domination.",
    ],
    turningZh: [
      "私人痛苦被重新理解为政治证据。",
      "文化、语言、性和亲密关系都成为权力现场。",
      "目标从待遇平等转向拆解支配结构。",
    ],
    debate: "Its hardest debates concern gender essentialism, sexuality, trans inclusion, and who gets to define women's experience.",
    debateZh: "它最困难的争议围绕性别本质主义、性、跨性别包容，以及谁有权定义女性经验。",
  },
  socialist: {
    id: "socialist",
    label: "Socialist Feminism",
    labelZh: "社会主义女性主义",
    short: "Capitalism and patriarchy work together in daily life.",
    shortZh: "资本主义与父权制在日常生活中共同运作。",
    accent: "#F97316",
    path: ["Waged labor", "Domestic labor", "Reproduction", "Care", "Solidarity"],
    pathZh: ["有偿劳动", "家务劳动", "再生产", "照护", "团结"],
    turning: [
      "Housework is named as labor, not natural feminine duty.",
      "The economy is shown to depend on unpaid care.",
      "Liberation requires changing both class and gender relations.",
    ],
    turningZh: [
      "家务被命名为劳动，而不是女性天职。",
      "经济运行被揭示为依赖无偿照护。",
      "解放必须同时改变阶级关系和性别关系。",
    ],
    debate: "Its central tension is how to analyze capitalism and patriarchy together without reducing one to the other.",
    debateZh: "它的核心张力是如何同时分析资本主义与父权制，而不把其中一个化约成另一个。",
  },
  marxist: {
    id: "marxist",
    label: "Marxist Feminism",
    labelZh: "马克思主义女性主义",
    short: "Women's oppression is tied to property, class, labor, and production.",
    shortZh: "女性压迫与财产、阶级、劳动和生产关系相连。",
    accent: "#DC2626",
    path: ["Private property", "Class", "Family", "Labor", "Social reproduction"],
    pathZh: ["私有财产", "阶级", "家庭", "劳动", "社会再生产"],
    turning: [
      "The family is read as an economic institution.",
      "Women workers become central political actors.",
      "Reproduction is connected to the survival of capitalism.",
    ],
    turningZh: [
      "家庭被理解为一种经济制度。",
      "劳动女性成为核心政治行动者。",
      "再生产被连接到资本主义的延续。",
    ],
    debate: "Its recurring question is whether ending capitalism is enough, or whether gender domination has its own force.",
    debateZh: "它反复面对的问题是：终结资本主义是否足够，还是性别支配也有自身力量。",
  },
  cultural: {
    id: "cultural",
    label: "Cultural Feminism",
    labelZh: "文化女性主义",
    short: "Care, relation, and cooperation are undervalued cultural strengths.",
    shortZh: "照护、关系和合作是被低估的文化力量。",
    accent: "#059669",
    path: ["Difference", "Care", "Relation", "Value", "Culture"],
    pathZh: ["差异", "照护", "关系", "价值", "文化"],
    turning: [
      "Care is described as an ethic, not a weakness.",
      "Feminine-coded values are reclaimed from contempt.",
      "Culture itself becomes a field of feminist repair.",
    ],
    turningZh: [
      "照护被描述为伦理，而不是软弱。",
      "被编码为女性化的价值从轻蔑中被夺回。",
      "文化本身成为女性主义修复的场域。",
    ],
    debate: "Its risk is turning valued difference into a new rule about what women should be.",
    debateZh: "它的风险是把被珍视的差异重新变成“女性应该如何”的规则。",
  },
  postmodern: {
    id: "postmodern",
    label: "Postmodern Feminism",
    labelZh: "后现代女性主义",
    short: "Gender is produced through language, repetition, power, and performance.",
    shortZh: "性别在语言、重复、权力和表演中被制造。",
    accent: "#8B5CF6",
    path: ["Identity", "Discourse", "Performance", "Deconstruction", "Plurality"],
    pathZh: ["身份", "话语", "表演", "解构", "复数性"],
    turning: [
      "The stable category of 'woman' is questioned.",
      "Gender is treated as something repeatedly done.",
      "Politics must work with unstable and plural identities.",
    ],
    turningZh: [
      "稳定的“女人”类别被追问。",
      "性别被理解为一种反复做出来的东西。",
      "政治必须面对不稳定而复数的身份。",
    ],
    debate: "The practical question is how to organize politically when identity is fluid and contested.",
    debateZh: "现实问题是：当身份流动且充满争议时，政治行动如何组织。",
  },
  intersectional: {
    id: "intersectional",
    label: "Intersectional Feminism",
    labelZh: "交叉性女性主义",
    short: "Gender is always shaped by race, class, sexuality, disability, and nation.",
    shortZh: "性别总是被种族、阶级、性取向、残障和国籍共同塑造。",
    accent: "#0891B2",
    path: ["Difference", "Race and class", "Intersectionality", "Coalition", "Representation"],
    pathZh: ["差异", "种族与阶级", "交叉性", "联盟", "代表性"],
    turning: [
      "No single issue can explain women's lives.",
      "The most marginalized experiences become analytic starting points.",
      "Feminist politics is tested by who it leaves out.",
    ],
    turningZh: [
      "没有任何单一议题能解释女性生活。",
      "最边缘的经验成为分析起点。",
      "女性主义政治要接受“遗漏了谁”的检验。",
    ],
    debate: "Its challenge is building shared action without flattening difference or turning identity into a checklist.",
    debateZh: "它的挑战是在不抹平差异、不把身份变成清单的情况下建立共同行动。",
  },
};

const nodes: LineageNode[] = [
  {
    id: "wollstonecraft-1792",
    year: "1792",
    theory: "liberal",
    title: "Women should be treated as rational people",
    titleZh: "女性也该被当作理性的人",
    summary: "Mary Wollstonecraft argues that women appear inferior because they are denied education.",
    summaryZh: "沃斯通克拉夫特认为，女性显得低下只是因为长期被剥夺教育。",
    keyword: "Education",
    keywordZh: "教育权",
  },
  {
    id: "seneca-1848",
    year: "1848",
    theory: "liberal",
    title: "Equality becomes a public demand",
    titleZh: "把平等写成公开诉求",
    summary: "The Seneca Falls Convention turns voting, property, and legal status into organized demands.",
    summaryZh: "塞内卡福尔斯大会把参政、财产权和法律地位变成集体政治议题。",
    keyword: "Suffrage",
    keywordZh: "参政权",
  },
  {
    id: "engels-1884",
    year: "1884",
    theory: "marxist",
    title: "Oppression is tied to property",
    titleZh: "女性压迫和私有财产有关",
    summary: "Engels links family, property, class society, and women's subordination.",
    summaryZh: "恩格斯把家庭、财产、阶级社会和女性从属联系起来。",
    keyword: "Private property",
    keywordZh: "私有制",
  },
  {
    id: "zetkin-1910s",
    year: "1910s",
    theory: "marxist",
    title: "Working women become political actors",
    titleZh: "劳动女性进入政治中心",
    summary: "Marxist feminists insist that women's liberation cannot be separated from labor struggles.",
    summaryZh: "马克思主义女性主义者强调，女性解放不能离开劳动解放。",
    keyword: "Class",
    keywordZh: "阶级",
  },
  {
    id: "beauvoir-1949",
    year: "1949",
    theory: "postmodern",
    title: "Woman is made, not simply born",
    titleZh: "女人不是天生的，而是被塑造的",
    summary: "Simone de Beauvoir opens a path for thinking gender as historical and social formation.",
    summaryZh: "波伏瓦开启了一种理解性别的方式：性别是在历史和社会中被塑造的。",
    keyword: "Becoming",
    keywordZh: "成为",
  },
  {
    id: "friedan-1963",
    year: "1963",
    theory: "liberal",
    title: "Domestic unhappiness is not personal failure",
    titleZh: "家庭主妇的不快乐不是个人失败",
    summary: "Betty Friedan names how educated women were confined to wife and mother roles.",
    summaryZh: "贝蒂·弗里丹指出，许多受教育女性被困在妻子和母亲角色中。",
    keyword: "Opportunity",
    keywordZh: "机会平等",
  },
  {
    id: "personal-political-1960s",
    year: "1960s",
    theory: "radical",
    title: "Private life is political",
    titleZh: "私人生活也是政治现场",
    summary: "Radical feminists use consciousness-raising to connect intimate pain with social power.",
    summaryZh: "激进女性主义者通过意识提升，把亲密生活里的痛苦和社会权力连接起来。",
    keyword: "Consciousness",
    keywordZh: "意识提升",
  },
  {
    id: "millett-1970",
    year: "1970",
    theory: "radical",
    title: "Patriarchy lives in culture too",
    titleZh: "父权制不只在法律里，也在文化里",
    summary: "Kate Millett shows how literature, sexuality, and intimacy carry power relations.",
    summaryZh: "凯特·米利特展示文学、性和亲密关系如何承载权力关系。",
    keyword: "Sexual politics",
    keywordZh: "性政治",
  },
  {
    id: "housework-1974",
    year: "1974",
    theory: "socialist",
    title: "Housework is labor",
    titleZh: "家务不是爱的本能，也是劳动",
    summary: "Wages for Housework makes unpaid care visible as work that sustains the economy.",
    summaryZh: "“家务工资”运动让无偿照护被看见：它是支撑经济的劳动。",
    keyword: "Domestic labor",
    keywordZh: "家务劳动",
  },
  {
    id: "davis-1981",
    year: "1981",
    theory: "intersectional",
    title: "Race, class, and gender cannot be separated",
    titleZh: "种族、阶级和性别不能分开看",
    summary: "Angela Davis shows that feminist history changes when race and class are centered.",
    summaryZh: "安吉拉·戴维斯展示，当种族和阶级进入中心，女性主义历史会被重新理解。",
    keyword: "Race + class",
    keywordZh: "种族与阶级",
  },
  {
    id: "gilligan-1982",
    year: "1982",
    theory: "cultural",
    title: "Care is not weakness",
    titleZh: "照护不是软弱，而是一种伦理",
    summary: "Carol Gilligan argues that care and relational reasoning have been undervalued.",
    summaryZh: "卡罗尔·吉利根指出，照护和关系性道德推理长期被低估。",
    keyword: "Care ethics",
    keywordZh: "照护伦理",
  },
  {
    id: "lorde-1984",
    year: "1984",
    theory: "intersectional",
    title: "There is no single-issue struggle",
    titleZh: "不存在单一议题的女性主义",
    summary: "Audre Lorde insists that difference must be recognized, not smoothed away.",
    summaryZh: "奥德丽·洛德强调，差异必须被承认，而不是被抹平。",
    keyword: "Difference",
    keywordZh: "差异",
  },
  {
    id: "crenshaw-1989",
    year: "1989",
    theory: "intersectional",
    title: "Oppressions interlock",
    titleZh: "有些压迫不是相加，而是交织",
    summary: "Kimberlé Crenshaw names intersectionality to describe overlapping structures of harm.",
    summaryZh: "金伯利·克伦肖提出交叉性，用来描述彼此叠合的压迫结构。",
    keyword: "Intersectionality",
    keywordZh: "交叉性",
  },
  {
    id: "butler-1990",
    year: "1990",
    theory: "postmodern",
    title: "Gender is repeatedly performed",
    titleZh: "性别是一种反复表演",
    summary: "Judith Butler challenges fixed gender identity and asks how norms produce gender.",
    summaryZh: "朱迪斯·巴特勒挑战固定性别身份，追问规范如何制造性别。",
    keyword: "Performance",
    keywordZh: "表演性",
  },
  {
    id: "federici-2004",
    year: "2004",
    theory: "socialist",
    title: "Capitalism was built through gendered violence",
    titleZh: "资本主义也建立在性别化暴力上",
    summary: "Silvia Federici traces how capitalism depended on controlling women's bodies and reproduction.",
    summaryZh: "西尔维娅·费代里奇追踪资本主义如何依赖对女性身体与再生产的控制。",
    keyword: "Reproduction",
    keywordZh: "再生产",
  },
  {
    id: "fourth-wave-now",
    year: "Now",
    theory: "intersectional",
    title: "Who is represented, and who is left out?",
    titleZh: "谁被代表，谁又被遗漏？",
    summary: "Contemporary feminism keeps testing movements, platforms, and policies by their exclusions.",
    summaryZh: "当代女性主义持续用“遗漏了谁”来检验运动、平台和政策。",
    keyword: "Representation",
    keywordZh: "代表性",
  },
];

const profileOrder: TheoryId[] = ["liberal", "radical", "socialist", "marxist", "cultural", "postmodern", "intersectional"];

function getNodeLabel(node: LineageNode, isZh: boolean) {
  return isZh ? node.titleZh : node.title;
}

export function LineageRoom() {
  const { isZh } = useLanguage();
  const [activeNodeId, setActiveNodeId] = useState(nodes[0].id);
  const [activeTheory, setActiveTheory] = useState<TheoryId | "all">("all");
  const [profileFocusRequest, setProfileFocusRequest] = useState(0);
  const profileCardRef = useRef<HTMLElement | null>(null);

  const activeNode = nodes.find((node) => node.id === activeNodeId) ?? nodes[0];
  const activeProfile = profiles[activeNode.theory];

  const shownNodes = useMemo(
    () => (activeTheory === "all" ? nodes : nodes.filter((node) => node.theory === activeTheory)),
    [activeTheory],
  );

  const chooseTheory = (theory: TheoryId | "all") => {
    setActiveTheory(theory);
    const first = theory === "all" ? nodes[0] : nodes.find((node) => node.theory === theory);
    if (first) setActiveNodeId(first.id);
  };

  useEffect(() => {
    if (profileFocusRequest === 0) return;
    const handle = window.setTimeout(() => {
      profileCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }, 60);

    return () => window.clearTimeout(handle);
  }, [activeNodeId, profileFocusRequest]);

  const selectNode = (nodeId: string) => {
    setActiveNodeId(nodeId);
    setProfileFocusRequest((request) => request + 1);
  };

  return (
    <section
      id="lineage"
      className="lineage-room-section"
      style={{
        background: `linear-gradient(90deg, rgba(111,0,255,0.12) 1px, transparent 1px), linear-gradient(0deg, rgba(17,17,17,0.055) 1px, transparent 1px), ${paper}`,
        backgroundSize: "72px 72px",
        position: "relative",
        padding: "6rem 3rem 8rem",
        overflow: "hidden",
        color: ink,
      }}
    >
      <style>
        {`
          @media (max-width: 920px) {
            .lineage-room-section {
              padding: 4.5rem 1rem 6rem !important;
            }

            .lineage-room-kicker {
              font-size: 0.46rem !important;
              letter-spacing: 0.16em !important;
              line-height: 1.7 !important;
            }

            .lineage-room-layout {
              display: flex !important;
              flex-direction: column !important;
              gap: 1.25rem !important;
            }

            .lineage-timeline-shell {
              overflow-x: auto !important;
              -webkit-overflow-scrolling: touch !important;
              padding-bottom: 0.5rem !important;
            }

            .lineage-timeline-track {
              width: 980px !important;
              max-width: none !important;
            }

            .lineage-profile-card {
              position: relative !important;
              top: auto !important;
            }

            .lineage-filter-row {
              flex-wrap: nowrap !important;
              overflow-x: auto !important;
              scrollbar-width: none !important;
              padding-bottom: 0.4rem !important;
            }

            .lineage-filter-row::-webkit-scrollbar {
              display: none !important;
            }

            .lineage-filter-button {
              flex: 0 0 auto !important;
            }
          }
        `}
      </style>

      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(17,17,17,0.13) 1px, transparent 1.5px)", backgroundSize: "18px 18px", opacity: 0.16 }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent 0 14px, rgba(17,17,17,0.035) 14px 15px)", opacity: 0.36 }} />
      <div aria-hidden="true" style={{ position: "absolute", right: "-12rem", top: "4rem", width: "24rem", height: "24rem", border: `1px solid ${purple}35`, borderRadius: "50%", opacity: 0.55 }} />
      <div aria-hidden="true" style={{ position: "absolute", left: "-8rem", bottom: "7rem", width: "17rem", height: "17rem", border: `1px solid ${deepPurple}24`, transform: "rotate(-8deg)" }} />

      <div style={{ maxWidth: "1180px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "2.5rem" }}>
          <div style={{ borderTop: `3px solid ${purple}`, borderBottom: "1px solid rgba(111,0,255,0.28)", padding: "0.4rem 0", marginBottom: "0.35rem" }}>
            <div style={{ borderBottom: "1px solid rgba(111,0,255,0.16)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
              <span className="lineage-room-kicker" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.28em", color: purple }}>
                {isZh ? "女性主义档案 — 第三展厅 — 流派年轮" : "FEMINIST ARCHIVE — SECTION III — LINEAGE ROOM"}
              </span>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.2rem, 8vw, 6.8rem)", color: ink, lineHeight: 0.86, letterSpacing: 0 }}>
            {isZh ? "流派" : "THEORY"}<br />
            <span style={{ color: "transparent", WebkitTextStroke: `1.5px ${purple}` }}>
              {isZh ? "发展历程" : "GENEALOGIES"}
            </span>
          </h2>
          <p style={{ margin: "0.9rem 0 0", maxWidth: "560px", fontFamily: "'Special Elite', cursive", fontSize: "0.84rem", lineHeight: 1.65, fontStyle: "italic", color: softInk }}>
            {isZh
              ? "先看整体时间，再点击一个节点，把它放回某个流派自己的生命史里。"
              : "Read the shared timeline first, then tap a node to place it inside one tradition's own life story."}
          </p>
        </motion.div>

        <div className="lineage-filter-row" style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <button
            className="lineage-filter-button"
            onClick={() => chooseTheory("all")}
            style={{
              padding: "0.42rem 0.82rem",
              background: activeTheory === "all" ? purple : "rgba(255,255,255,0.64)",
              border: activeTheory === "all" ? `1px solid ${purple}` : "1px solid rgba(111,0,255,0.18)",
              color: activeTheory === "all" ? "#FFFFFF" : "rgba(17,17,17,0.58)",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.12em",
            }}
          >
            {isZh ? "整体时间线" : "ALL"}
          </button>

          {profileOrder.map((id) => {
            const profile = profiles[id];
            const selected = activeTheory === id;
            return (
              <button
                className="lineage-filter-button"
                key={id}
                onClick={() => chooseTheory(id)}
                style={{
                  padding: "0.42rem 0.82rem",
                  background: selected ? profile.accent : "rgba(255,255,255,0.64)",
                  border: selected ? `1px solid ${profile.accent}` : "1px solid rgba(111,0,255,0.18)",
                  color: selected ? "#FFFFFF" : "rgba(17,17,17,0.58)",
                  cursor: "pointer",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.56rem",
                  letterSpacing: "0.12em",
                }}
              >
                {isZh ? profile.labelZh.replace("女性主义", "") : profile.label.replace(" Feminism", "")}
              </button>
            );
          })}
        </div>

        <div className="lineage-room-layout" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 340px", gap: "2rem", alignItems: "start" }}>
          <div className="lineage-timeline-shell" style={{ border: "1px solid rgba(111,0,255,0.28)", background: "rgba(255,255,255,0.58)", boxShadow: "10px 10px 0 rgba(111,0,255,0.12)" }}>
            <div className="lineage-timeline-track" style={{ position: "relative", minHeight: "570px", padding: "2.2rem 1.8rem 2rem" }}>
              <div aria-hidden="true" style={{ position: "absolute", left: "2rem", right: "2rem", top: "50%", height: "2px", background: `linear-gradient(90deg, ${purple}55, ${deepPurple}22, ${purple}55)` }} />

              <AnimatePresence mode="popLayout">
                {shownNodes.map((node, index) => {
                  const profile = profiles[node.theory];
                  const active = node.id === activeNode.id;
                  const top = index % 2 === 0 ? "4.5rem" : "18.5rem";

                  return (
                    <motion.button
                      layout
                      key={node.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ delay: index * 0.025 }}
                      onClick={() => {
                        selectNode(node.id);
                      }}
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        verticalAlign: "top",
                        flexDirection: "column",
                        width: "min(210px, 18vw)",
                        minWidth: "176px",
                        minHeight: "180px",
                        marginRight: "1.05rem",
                        marginTop: top,
                        padding: "1rem",
                        background: active ? "#FFFFFF" : "rgba(255,255,255,0.72)",
                        border: `1px solid ${active ? profile.accent : "rgba(111,0,255,0.22)"}`,
                        color: ink,
                        cursor: "pointer",
                        textAlign: "left",
                        boxShadow: active ? `8px 8px 0 ${profile.accent}26` : "0 4px 12px rgba(17,17,17,0.08)",
                        clipPath: "polygon(0 2%, 3% 0, 9% 1%, 17% 0, 30% 1.2%, 46% 0, 60% 1%, 75% 0, 91% 1.5%, 100% 0, 100% 98%, 97% 100%, 88% 99%, 78% 100%, 65% 99%, 50% 100%, 36% 99%, 23% 100%, 12% 98.7%, 3% 100%, 0 98%)",
                      }}
                    >
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", lineHeight: 0.9, color: profile.accent }}>
                        {node.year}
                      </span>
                      <span style={{ marginTop: "0.45rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.12em", color: profile.accent }}>
                        {isZh ? profile.labelZh : profile.label.toUpperCase()}
                      </span>
                      <span style={{ display: "block", marginTop: "0.7rem", fontFamily: "'IM Fell English', serif", fontSize: "0.98rem", lineHeight: 1.22, color: ink }}>
                        {getNodeLabel(node, isZh)}
                      </span>
                      <span style={{ display: "block", marginTop: "auto", paddingTop: "0.8rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.1em", color: softInk }}>
                        {isZh ? node.keywordZh : node.keyword}
                      </span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.aside
              key={activeNode.id}
              ref={profileCardRef}
              className="lineage-profile-card"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              style={{
                position: "sticky",
                top: "5.25rem",
                background: "#FFFFFF",
                border: `1px solid ${activeProfile.accent}66`,
                padding: "1.35rem",
                boxShadow: `10px 10px 0 ${activeProfile.accent}22`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.2em", color: activeProfile.accent, marginBottom: "0.35rem" }}>
                    {isZh ? "流派发展卡" : "LINEAGE CARD"}
                  </div>
                  <h3 style={{ margin: 0, fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", lineHeight: 0.9, color: ink }}>
                    {isZh ? activeProfile.labelZh : activeProfile.label.toUpperCase()}
                  </h3>
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.4rem", color: activeProfile.accent, lineHeight: 0.85 }}>
                  {activeNode.year}
                </div>
              </div>

              <p style={{ margin: "0 0 1rem", fontFamily: "'Special Elite', cursive", fontSize: "0.78rem", lineHeight: 1.6, color: softInk, fontStyle: "italic" }}>
                {isZh ? activeProfile.shortZh : activeProfile.short}
              </p>

              <motion.div
                key={`${activeNode.id}-current`}
                initial={{ boxShadow: `0 0 0 0 ${activeProfile.accent}00` }}
                animate={{ boxShadow: [`0 0 0 0 ${activeProfile.accent}00`, `0 0 0 5px ${activeProfile.accent}1f`, `0 0 0 0 ${activeProfile.accent}00`] }}
                transition={{ duration: 0.7 }}
                style={{ padding: "0.9rem", background: `${activeProfile.accent}12`, borderLeft: `4px solid ${activeProfile.accent}`, marginBottom: "1rem" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: "0.8rem", alignItems: "center", marginBottom: "0.4rem" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.15em", color: activeProfile.accent }}>
                    {isZh ? "当前节点" : "CURRENT NODE"}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.12em", color: activeProfile.accent }}>
                    {activeNode.year} / {isZh ? activeNode.keywordZh : activeNode.keyword}
                  </div>
                </div>
                <div style={{ fontFamily: "'IM Fell English', serif", fontSize: "1rem", color: ink, lineHeight: 1.35, marginBottom: "0.4rem" }}>
                  {isZh ? activeNode.titleZh : activeNode.title}
                </div>
                <p style={{ margin: 0, fontFamily: "'Special Elite', cursive", fontSize: "0.75rem", lineHeight: 1.55, color: softInk }}>
                  {isZh ? activeNode.summaryZh : activeNode.summary}
                </p>
              </motion.div>

              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em", color: activeProfile.accent, marginBottom: "0.6rem" }}>
                  {isZh ? "主线" : "MAIN PATH"}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.42rem" }}>
                  {(isZh ? activeProfile.pathZh : activeProfile.path).map((step, index) => (
                    <span key={step} style={{ border: `1px solid ${activeProfile.accent}55`, color: activeProfile.accent, padding: "0.28rem 0.52rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", background: index === 0 ? `${activeProfile.accent}10` : "transparent" }}>
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em", color: activeProfile.accent, marginBottom: "0.6rem" }}>
                  {isZh ? "关键转折" : "TURNING POINTS"}
                </div>
                {(isZh ? activeProfile.turningZh : activeProfile.turning).map((item, index) => (
                  <div key={item} style={{ display: "grid", gridTemplateColumns: "1.5rem 1fr", gap: "0.5rem", marginBottom: "0.55rem", alignItems: "start" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.56rem", color: activeProfile.accent }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.74rem", color: softInk, lineHeight: 1.55 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${activeProfile.accent}33`, paddingTop: "0.8rem" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em", color: activeProfile.accent, marginBottom: "0.45rem" }}>
                  {isZh ? "争议" : "DEBATE"}
                </div>
                <p style={{ margin: 0, fontFamily: "'Special Elite', cursive", fontSize: "0.74rem", color: softInk, lineHeight: 1.6 }}>
                  {isZh ? activeProfile.debateZh : activeProfile.debate}
                </p>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
