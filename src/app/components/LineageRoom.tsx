import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "../i18n";
import { ReflectionTrigger, type TheoryId } from "../reflections";

type TheoryId =
  | "liberal"
  | "radical"
  | "marxist"
  | "socialist"
  | "intersectional"
  | "postmodern";

type TheoryFilter = TheoryId | "all";

type LocalizedText = {
  en: string;
  zh: string;
};

type TheoryProfile = {
  id: TheoryId;
  label: LocalizedText;
  accent: string;
};

type TheoryStage = {
  id: string;
  period: LocalizedText;
  sortYear: number;
  title: LocalizedText;
  coreQuestion: LocalizedText;
  mainTheories: TheoryId[];
  keywords: LocalizedText[];
  keyTextsOrEvents: LocalizedText[];
  theoreticalBreakthrough: LocalizedText;
  limitations: LocalizedText;
  relatedSchools: TheoryId[];
  sources: {
    label: LocalizedText;
    url: string;
  }[];
  accent: string;
};

const purple = "#6F00FF";
const deepPurple = "#24004D";
const paper = "#F7F4FF";
const ink = "#111111";
const softInk = "rgba(17,17,17,0.66)";

const t = (en: string, zh: string): LocalizedText => ({ en, zh });

const profiles: Record<TheoryId, TheoryProfile> = {
  liberal: { id: "liberal", label: t("Liberal Feminism", "自由主义女性主义"), accent: "#6F00FF" },
  radical: { id: "radical", label: t("Radical Feminism", "激进女性主义"), accent: "#E11D48" },
  marxist: { id: "marxist", label: t("Marxist Feminism", "马克思主义女性主义"), accent: "#DC2626" },
  socialist: { id: "socialist", label: t("Socialist Feminism", "社会主义女性主义"), accent: "#F97316" },
  intersectional: { id: "intersectional", label: t("Intersectional Feminism", "交叉性女性主义"), accent: "#0891B2" },
  postmodern: { id: "postmodern", label: t("Postmodern Feminism", "后现代女性主义"), accent: "#8B5CF6" },
};

const profileOrder: TheoryId[] = [
  "liberal",
  "radical",
  "marxist",
  "socialist",
  "intersectional",
  "postmodern",
];

const theoryStages: TheoryStage[] = [
  {
    id: "rights-and-citizenship",
    period: t("1792—1940s", "1792—1940年代"),
    sortYear: 1792,
    title: t("Equal Rights and Citizenship", "权利平等与公民身份"),
    coreQuestion: t(
      "Why can women not have the same educational, legal, and political rights as men?",
      "女性为什么不能拥有与男性相同的教育、法律与政治权利？",
    ),
    mainTheories: ["liberal"],
    keywords: [
      t("Education", "教育权"),
      t("Suffrage", "参政权"),
      t("Legal equality", "法律平等"),
      t("Citizenship", "公民身份"),
    ],
    keyTextsOrEvents: [
      t("A Vindication of the Rights of Woman", "《女权辩护》"),
      t("Women's suffrage movements", "妇女参政运动"),
    ],
    theoreticalBreakthrough: t(
      "Established women as rational political subjects and treated education, suffrage, and legal equality as foundations of liberation.",
      "把女性确认为理性的政治主体；把教育权、参政权和法律平等视为女性解放的基础。",
    ),
    limitations: t(
      "It placed too much faith in reforming existing institutions and often overlooked inequalities produced by class, race, colonialism, and family structures.",
      "过于相信既有制度改革，容易忽略阶级、种族、殖民和家庭结构中的不平等。",
    ),
    relatedSchools: [],
    sources: [
      {
        label: t("British Library: A Vindication of the Rights of Woman", "英国图书馆：《女权辩护》"),
        url: "https://www.bl.uk/collection-items/mary-wollstonecraft-a-vindication-of-the-rights-of-woman",
      },
      {
        label: t("Encyclopaedia Britannica: Woman Suffrage", "《大英百科全书》：妇女参政权"),
        url: "https://www.britannica.com/topic/woman-suffrage",
      },
    ],
    accent: profiles.liberal.accent,
  },
  {
    id: "patriarchy-and-private-life",
    period: t("1949—1970s", "1949—1970年代"),
    sortYear: 1949,
    title: t("Private Life and the Critique of Patriarchy", "私人生活与父权制批判"),
    coreQuestion: t(
      "Even with legal rights, why are women still not free?",
      "即使拥有法律权利，为什么女性仍然不自由？",
    ),
    mainTheories: ["radical"],
    keywords: [
      t("Patriarchy", "父权制"),
      t("The personal is political", "私人即政治"),
      t("Body politics", "身体政治"),
      t("Sexual violence", "性暴力"),
    ],
    keyTextsOrEvents: [
      t("The Second Sex", "《第二性》"),
      t("Consciousness-raising groups", "意识提升小组"),
      t("\"The Personal is Political\"", "“The Personal is Political”"),
    ],
    theoreticalBreakthrough: t(
      "Argued that women are socially made rather than naturally given, and brought marriage, family, sexuality, the body, and violence into political analysis.",
      "指出女性不是天生的，而是在社会关系中被塑造的；把婚姻、家庭、性、身体和暴力纳入政治分析。",
    ),
    limitations: t(
      "Some accounts imagined women's experience as unified, generating continuing disputes about essentialism, sexual politics, and trans inclusion.",
      "部分论述容易把“女性经验”想象成统一经验，并引发本质主义、性政治与跨性别包容争议。",
    ),
    relatedSchools: ["postmodern"],
    sources: [
      {
        label: t("Encyclopaedia Britannica: The Second Sex", "《大英百科全书》：《第二性》"),
        url: "https://www.britannica.com/topic/The-Second-Sex",
      },
      {
        label: t("Carol Hanisch: The Personal is Political", "卡罗尔·哈尼什：《私人即政治》"),
        url: "https://www.carolhanisch.org/CHwritings/PersonalIsPol.pdf",
      },
    ],
    accent: profiles.radical.accent,
  },
  {
    id: "labor-and-social-reproduction",
    period: t("1970s—1990s", "1970—1990年代"),
    sortYear: 1970,
    title: t("Labor, Housework, and Social Reproduction", "劳动、家务与社会再生产"),
    coreQuestion: t(
      "Why do housework, care, and emotional labor sustain society while remaining unrecognized as labor?",
      "为什么家务、照护和情感劳动支撑社会，却长期不被承认为劳动？",
    ),
    mainTheories: ["marxist", "socialist"],
    keywords: [
      t("Domestic labor", "家务劳动"),
      t("Class", "阶级"),
      t("Capitalism", "资本主义"),
      t("Social reproduction", "社会再生产"),
      t("Care", "照护"),
    ],
    keyTextsOrEvents: [
      t("The Origin of the Family, Private Property and the State", "《家庭、私有制和国家的起源》"),
      t("Wages for Housework", "家务劳动工资运动"),
      t("Social reproduction theory", "社会再生产理论"),
    ],
    theoreticalBreakthrough: t(
      "Connected family, labor, capitalism, and women's oppression, showing that unpaid housework and care are foundations of social and economic life.",
      "把家庭、劳动、资本主义和女性压迫联系起来；指出无偿家务和照护劳动是社会与经济运行的基础。",
    ),
    limitations: t(
      "Gender oppression cannot be reduced entirely to class, and theory must also explain patriarchy's independent force.",
      "需要避免把性别压迫完全化约为阶级问题，也需要解释父权制自身的独立力量。",
    ),
    relatedSchools: [],
    sources: [
      {
        label: t("Marxists Internet Archive: The Origin of the Family", "马克思主义文库：《家庭、私有制和国家的起源》"),
        url: "https://www.marxists.org/archive/marx/works/1884/origin-family/",
      },
      {
        label: t("Wages Against Housework", "《反对家务劳动》"),
        url: "https://files.libcom.org/files/Federici-Silvia-Wages-Against-Housework.pdf",
      },
    ],
    accent: profiles.socialist.accent,
  },
  {
    id: "difference-identity-intersectionality",
    period: t("1980s—2000s", "1980—2000年代"),
    sortYear: 1980,
    title: t("Difference, Identity, and Intersectionality", "差异、身份与交叉性"),
    coreQuestion: t(
      "Who is included in the category \"women,\" and who is excluded?",
      "谁被包括在“女性”这个概念里？谁又被排除在外？",
    ),
    mainTheories: ["intersectional", "postmodern"],
    keywords: [
      t("Intersectionality", "交叉性"),
      t("Difference", "差异"),
      t("Identity", "身份"),
      t("Discourse", "话语"),
      t("Performativity", "表演性"),
    ],
    keyTextsOrEvents: [
      t("Audre Lorde's politics of difference", "Audre Lorde 的差异政治"),
      t("Kimberlé Crenshaw's theory of intersectionality", "Kimberlé Crenshaw 的交叉性理论"),
      t("Judith Butler's theory of gender performativity", "Judith Butler 的性别表演理论"),
    ],
    theoreticalBreakthrough: t(
      "Challenged the idea of a universal woman, showed that gender is intertwined with race, class, sexuality, disability, colonialism, caste, and other power structures, and questioned stable, singular gender identities.",
      "挑战“普遍女性”的想象；指出性别总是与种族、阶级、性取向、残障、殖民、种姓等权力结构交织；同时质疑稳定、单一的性别身份。",
    ),
    limitations: t(
      "When identities are understood as fluid and multiple, how political alliances can be formed remains a continuing dispute.",
      "当身份被理解为流动和多重时，政治联盟如何形成，仍然是一个持续争议。",
    ),
    relatedSchools: ["radical"],
    sources: [
      {
        label: t("University of Chicago Legal Forum: Crenshaw on Intersectionality", "芝加哥大学法律论坛：克伦肖的交叉性理论"),
        url: "https://chicagounbound.uchicago.edu/uclf/vol1989/iss1/8/",
      },
      {
        label: t("Routledge: Gender Trouble", "Routledge：《性别麻烦》"),
        url: "https://www.routledge.com/Gender-Trouble/Butler/p/book/9780415389556",
      },
      {
        label: t("Poetry Foundation: Audre Lorde", "诗歌基金会：奥德丽·洛德"),
        url: "https://www.poetryfoundation.org/poets/audre-lorde",
      },
    ],
    accent: profiles.intersectional.accent,
  },
  {
    id: "transnational-and-local-translation",
    period: t("1995—2010s", "1995—2010年代"),
    sortYear: 1995,
    title: t("Global Governance, Transnational Alliances, and Local Translation", "全球治理、跨国联盟与地方转译"),
    coreQuestion: t(
      "How does feminism move among global institutions, local movements, and different cultural contexts?",
      "女性主义如何在全球制度、地方运动和不同文化语境之间流动？",
    ),
    mainTheories: ["intersectional"],
    keywords: [
      t("Transnational alliances", "跨国联盟"),
      t("Global South", "全球南方"),
      t("Local translation", "地方转译"),
      t("Institutionalization", "制度化"),
      t("NGOs", "非政府组织"),
    ],
    keyTextsOrEvents: [
      t("Beijing World Conference on Women", "北京世界妇女大会"),
      t("Latin American and Caribbean Feminist Encuentros", "拉美与加勒比女性主义大会"),
      t("Dalit feminist organizing", "达利特女性主义组织"),
      t("African feminist movements", "非洲女性主义运动"),
    ],
    theoreticalBreakthrough: t(
      "Moved feminism beyond a Euro-American-centered narrative, treated Latin America, Africa, South Asia, East Asia, and other local movements as sites of theory production, and centered colonialism, development, debt, caste, nation-states, and global capital.",
      "把女性主义从欧美中心叙事中拉出来，强调理论也会在拉美、非洲、南亚、东亚等地方运动中生产；关注殖民、发展、债务、种姓、民族国家与全球资本。",
    ),
    limitations: t(
      "Globalized language can bring resources, but it can also NGO-ize and professionalize movements while weakening local autonomy.",
      "全球化语言可能带来资源，也可能让运动被 NGO 化、专业化，并削弱地方自主性。",
    ),
    relatedSchools: ["socialist"],
    sources: [
      {
        label: t("United Nations: Beijing 1995", "联合国：1995 年北京世界妇女大会"),
        url: "https://www.un.org/en/conferences/women/beijing1995",
      },
      {
        label: t("Smith College Libraries: Feminist Encuentros", "史密斯学院图书馆：女性主义大会档案"),
        url: "https://findingaids.smith.edu/repositories/2/resources/1256",
      },
      {
        label: t("UN Women: Dalit Women's Organizing", "联合国妇女署：达利特女性组织"),
        url: "https://www.unwomen.org/en/news/stories/2018/7/take-five-beena-pallical",
      },
    ],
    accent: "#0F766E",
  },
  {
    id: "digital-feminism-and-refusal",
    period: t("2010s—Present", "2010年代—至今"),
    sortYear: 2010,
    title: t("Digital Feminism and Practices of Refusing Patriarchy", "数字女性主义与拒绝父权制实践"),
    coreQuestion: t(
      "How can women reorganize resistance within platforms, algorithms, online violence, and institutions of intimacy?",
      "在平台、算法、网络暴力和亲密关系制度中，女性如何重新组织抵抗？",
    ),
    mainTheories: ["radical"],
    keywords: [
      t("Online misogyny", "网络厌女"),
      t("Platform violence", "平台暴力"),
      t("Algorithmic governance", "算法治理"),
      t("Refusing marriage and childbirth", "拒绝婚育"),
      t("Women's communities", "女性共同体"),
    ],
    keyTextsOrEvents: [
      t("Korean digital feminism", "韩国数字女性主义"),
      t("#MeToo", "#MeToo"),
      t("Ni Una Menos", "Ni Una Menos"),
      t("6B4T", "6B4T"),
    ],
    theoreticalBreakthrough: t(
      "Treated the internet, platforms, and algorithms as new sites of gendered power, and understood refusing marriage, childbirth, restrictive beauty practices, and misogynistic consumer culture as everyday refusals of patriarchal institutions.",
      "把互联网、平台和算法视为新的性别权力现场；把不婚、不育、脱束身衣、反消费厌女文化等实践理解为对父权制度的日常拒绝。",
    ),
    limitations: t(
      "Whether individual exit strategies can transform structures remains disputed, while some practices may reproduce essentialism, exclusion, and conflicts over trans inclusion.",
      "个人退出策略能否改变结构仍有争议；部分实践也可能引发本质主义、排他性和跨性别包容问题。",
    ),
    relatedSchools: ["intersectional"],
    sources: [
      {
        label: t("Journal of Korean Studies: Digital Feminism", "《韩国研究期刊》：数字女性主义"),
        url: "https://read.dukeupress.edu/journal-of-korean-studies/article/26/2/175/174296",
      },
      {
        label: t("UN Women: Ni Una Menos", "联合国妇女署：Ni Una Menos"),
        url: "https://www.unwomen.org/en/news/stories/2017/11/op-ed-ed-phumzile-16days-day5",
      },
      {
        label: t("Wikipedia: #MeToo", "维基百科：＃MeToo"),
        url: "https://zh.wikipedia.org/w/index.php?title=%EF%BC%83MeToo",
      },
      {
        label: t(
          "Initium Media: South Korea's Radical Feminism and Gender Politics",
          "端传媒：韩国激进女权的进击与政界的性别之战",
        ),
        url: "https://theinitium.com/20210511-opinion-korean-radical-feminism-zh-hans/",
      },
      {
        label: t(
          "Gender & Education: What Is '6B4T' in China?",
          "《性别与教育》：中国的“6B4T”是什么？",
        ),
        url: "https://www.tandfonline.com/doi/full/10.1080/09589236.2025.2521682",
      },
      {
        label: t(
          "Oxfam: #MeToo with Chinese Characteristics",
          "乐施会：中国特色的 #MeToo",
        ),
        url: "https://policy-practice.oxfam.org/resources/metoo-with-chinese-characteristics-analysis-through-a-lens-of-chinese-feminism-621506/",
      },
    ],
    accent: "#C026D3",
  },
].sort((a, b) => a.sortYear - b.sortYear);

function localized(value: LocalizedText, isZh: boolean) {
  return isZh ? value.zh : value.en;
}

function shortTheoryLabel(profile: TheoryProfile, isZh: boolean) {
  return localized(profile.label, isZh).replace(isZh ? "女性主义" : " Feminism", "");
}

export function LineageRoom() {
  const { isZh } = useLanguage();
  const [activeTheory, setActiveTheory] = useState<TheoryFilter>("all");
  const [activeStageId, setActiveStageId] = useState(theoryStages[0].id);
  const [profileFocusRequest, setProfileFocusRequest] = useState(0);
  const profileCardRef = useRef<HTMLElement | null>(null);

  const shownStages = useMemo(
    () =>
      theoryStages.filter(
        (stage) =>
          activeTheory === "all" ||
          stage.mainTheories.includes(activeTheory) ||
          stage.relatedSchools.includes(activeTheory),
      ),
    [activeTheory],
  );

  useEffect(() => {
    if (shownStages.length === 0) return;
    if (!shownStages.some((stage) => stage.id === activeStageId)) {
      setActiveStageId(shownStages[0].id);
    }
  }, [activeStageId, shownStages]);

  useEffect(() => {
    if (profileFocusRequest === 0) return;
    if (!window.matchMedia("(max-width: 920px)").matches) return;
    const handle = window.setTimeout(() => {
      profileCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }, 60);
    return () => window.clearTimeout(handle);
  }, [activeStageId, profileFocusRequest]);

  const activeStage = shownStages.find((stage) => stage.id === activeStageId) ?? shownStages[0] ?? null;

  const selectStage = (stageId: string) => {
    setActiveStageId(stageId);
    setProfileFocusRequest((request) => request + 1);
  };

  const resetFilters = () => {
    setActiveTheory("all");
    setActiveStageId(theoryStages[0].id);
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
      <style>{`
        @media (max-width: 920px) {
          .lineage-room-section { padding: 4.5rem 1rem 6rem !important; }
          .lineage-room-kicker { font-size: 0.46rem !important; letter-spacing: 0.16em !important; line-height: 1.7 !important; }
          .lineage-room-layout { display: flex !important; flex-direction: column !important; gap: 1.25rem !important; }
          .lineage-timeline-shell { width: 100% !important; max-width: 100% !important; min-width: 0 !important; box-sizing: border-box !important; overflow-x: scroll !important; overflow-y: hidden !important; touch-action: pan-x pan-y !important; overscroll-behavior-x: contain !important; -webkit-overflow-scrolling: touch !important; scrollbar-width: thin !important; scrollbar-color: ${purple} rgba(111,0,255,0.12) !important; padding-bottom: 0.75rem !important; }
          .lineage-timeline-shell::-webkit-scrollbar { height: 8px; }
          .lineage-timeline-shell::-webkit-scrollbar-track { background: rgba(111,0,255,0.12); }
          .lineage-timeline-shell::-webkit-scrollbar-thumb { background: ${purple}; border-radius: 999px; }
          .lineage-timeline-track { width: max-content !important; min-width: 980px !important; max-width: none !important; }
          .lineage-profile-card { position: relative !important; top: auto !important; }
          .lineage-filter-row { flex-wrap: nowrap !important; overflow-x: auto !important; scrollbar-width: none !important; padding-bottom: 0.4rem !important; }
          .lineage-filter-row::-webkit-scrollbar { display: none !important; }
          .lineage-filter-button { flex: 0 0 auto !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lineage-room-section *, .lineage-room-section *::before, .lineage-room-section *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(17,17,17,0.13) 1px, transparent 1.5px)", backgroundSize: "18px 18px", opacity: 0.16 }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent 0 14px, rgba(17,17,17,0.035) 14px 15px)", opacity: 0.36 }} />
      <div aria-hidden="true" style={{ position: "absolute", right: "-12rem", top: "4rem", width: "24rem", height: "24rem", border: `1px solid ${purple}35`, borderRadius: "50%", opacity: 0.55 }} />
      <div aria-hidden="true" style={{ position: "absolute", left: "-8rem", bottom: "7rem", width: "17rem", height: "17rem", border: `1px solid ${deepPurple}24`, transform: "rotate(-8deg)" }} />

      <div style={{ maxWidth: "1220px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "2.2rem" }}>
          <div style={{ borderTop: `3px solid ${purple}`, borderBottom: "1px solid rgba(111,0,255,0.28)", padding: "0.4rem 0", marginBottom: "0.35rem" }}>
            <div style={{ borderBottom: "1px solid rgba(111,0,255,0.16)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
              <span className="lineage-room-kicker" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.28em", color: purple }}>
                {isZh ? "女性主义档案 — 第四展厅 — 全球理论年轮" : "FEMINIST ARCHIVE — SECTION IV — GLOBAL LINEAGES"}
              </span>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.2rem, 8vw, 6.8rem)", color: ink, lineHeight: 0.86, letterSpacing: 0 }}>
            {isZh ? "理论" : "GLOBAL"}<br />
            <span style={{ color: "transparent", WebkitTextStroke: `1.5px ${purple}` }}>
              {isZh ? "全球年轮" : "GENEALOGIES"}
            </span>
          </h2>
          <p style={{ margin: "0.9rem 0 0", maxWidth: "700px", fontFamily: "'Special Elite', cursive", fontSize: "0.84rem", lineHeight: 1.65, fontStyle: "italic", color: softInk }}>
            {isZh
              ? "沿六个理论阶段，看女性主义如何从争取权利走向理解结构、差异、跨国联盟与数字时代的抵抗。"
              : "Follow six theoretical stages from equal rights to structural analysis, difference, transnational alliances, and resistance in the digital age."}
          </p>
        </motion.div>

        <div style={{ marginBottom: "0.8rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.18em", color: purple }}>
          {isZh ? "按理论流派筛选" : "FILTER BY THEORY"}
        </div>
        <div className="lineage-filter-row" style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <FilterButton label={isZh ? "全部阶段" : "ALL STAGES"} selected={activeTheory === "all"} color={purple} onClick={() => setActiveTheory("all")} />
          {profileOrder.map((id) => (
            <FilterButton
              key={id}
              label={shortTheoryLabel(profiles[id], isZh)}
              selected={activeTheory === id}
              color={profiles[id].accent}
              onClick={() => setActiveTheory(id)}
            />
          ))}
          <span aria-live="polite" style={{ alignSelf: "center", marginLeft: "0.35rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", color: softInk }}>
            {isZh ? `${shownStages.length} 个理论阶段` : `${shownStages.length} theory stages`}
          </span>
        </div>

        <div className="lineage-room-layout" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: "2rem", alignItems: "start" }}>
          <div className="lineage-timeline-shell" style={{ border: "1px solid rgba(111,0,255,0.28)", background: "rgba(255,255,255,0.58)", boxShadow: "10px 10px 0 rgba(111,0,255,0.12)", overflowX: "auto" }}>
            {shownStages.length > 0 ? (
              <div className="lineage-timeline-track" style={{ position: "relative", minHeight: "570px", width: "max-content", minWidth: "100%", padding: "2.2rem 1.8rem 2rem", whiteSpace: "nowrap" }}>
                <div aria-hidden="true" style={{ position: "absolute", left: "2rem", right: "2rem", top: "50%", height: "2px", background: `linear-gradient(90deg, ${purple}55, ${deepPurple}22, ${purple}55)` }} />
                <AnimatePresence mode="popLayout">
                  {shownStages.map((stage, index) => {
                    const active = stage.id === activeStage?.id;
                    return (
                      <motion.button
                        layout
                        key={stage.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ delay: index * 0.018 }}
                        onClick={() => selectStage(stage.id)}
                        aria-pressed={active}
                        aria-label={`${localized(stage.period, isZh)}, ${localized(stage.title, isZh)}, ${localized(stage.coreQuestion, isZh)}`}
                        style={{
                          position: "relative",
                          display: "inline-flex",
                          verticalAlign: "top",
                          flexDirection: "column",
                          whiteSpace: "normal",
                          width: "215px",
                          minHeight: "225px",
                          marginRight: "1rem",
                          marginTop: index % 2 === 0 ? "4rem" : "19rem",
                          padding: "1rem",
                          background: active ? "#FFFFFF" : "rgba(255,255,255,0.76)",
                          border: `1px solid ${active ? stage.accent : "rgba(111,0,255,0.22)"}`,
                          color: ink,
                          cursor: "pointer",
                          textAlign: "left",
                          boxShadow: active ? `8px 8px 0 ${stage.accent}26` : "0 4px 12px rgba(17,17,17,0.08)",
                          clipPath: "polygon(0 2%, 3% 0, 9% 1%, 17% 0, 30% 1.2%, 46% 0, 60% 1%, 75% 0, 91% 1.5%, 100% 0, 100% 98%, 97% 100%, 88% 99%, 78% 100%, 65% 99%, 50% 100%, 36% 99%, 23% 100%, 12% 98.7%, 3% 100%, 0 98%)",
                        }}
                      >
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.65rem", lineHeight: 0.95, color: stage.accent }}>{localized(stage.period, isZh)}</span>
                        <span style={{ marginTop: "0.45rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.48rem", letterSpacing: "0.1em", color: stage.accent }}>
                          {isZh ? "理论阶段" : "THEORY STAGE"} / {stage.mainTheories.map((id) => shortTheoryLabel(profiles[id], isZh)).join(" · ")}
                        </span>
                        <span style={{ display: "block", marginTop: "0.68rem", fontFamily: "'IM Fell English', serif", fontSize: "1rem", lineHeight: 1.25, color: ink }}>
                          {localized(stage.title, isZh)}
                        </span>
                        <span style={{ display: "block", marginTop: "0.65rem", fontFamily: "'Special Elite', cursive", fontSize: "0.63rem", lineHeight: 1.48, color: softInk }}>
                          {localized(stage.coreQuestion, isZh)}
                        </span>
                        <span style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginTop: "auto", paddingTop: "0.7rem" }}>
                          {stage.keywords.slice(0, 2).map((keyword) => (
                            <span key={keyword.en} style={{ padding: "0.2rem 0.36rem", background: `${stage.accent}12`, border: `1px solid ${stage.accent}35`, color: stage.accent, fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.46rem" }}>
                              {localized(keyword, isZh)}
                            </span>
                          ))}
                        </span>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div role="status" style={{ minHeight: "570px", display: "grid", placeItems: "center", padding: "2rem" }}>
                <div style={{ maxWidth: "430px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.7rem", color: purple }}>
                    {isZh ? "暂无匹配阶段" : "NO MATCHING STAGES"}
                  </div>
                  <p style={{ color: softInk, fontFamily: "'Special Elite', cursive", lineHeight: 1.65 }}>
                    {isZh ? "当前筛选没有对应的理论阶段，可以回到完整理论年轮。" : "No theory stage matches this filter. Return to the complete theoretical lineage."}
                  </p>
                  <button onClick={resetFilters} style={{ ...emptyButtonStyle, background: purple, color: "#fff" }}>{isZh ? "查看全部" : "VIEW ALL"}</button>
                </div>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeStage && (
              <motion.aside
                key={activeStage.id}
                ref={profileCardRef}
                className="lineage-profile-card"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                style={{
                  position: "sticky",
                  top: "5.25rem",
                  maxHeight: "calc(100vh - 6.5rem)",
                  overflowY: "auto",
                  background: "#FFFFFF",
                  border: `1px solid ${activeStage.accent}66`,
                  padding: "1.35rem",
                  boxShadow: `10px 10px 0 ${activeStage.accent}22`,
                }}
              >
                <div style={{ marginBottom: "0.9rem" }}>
                  <div style={eyebrowStyle(activeStage.accent)}>{isZh ? "理论阶段卡" : "THEORY STAGE ARCHIVE"}</div>
                  <div style={{ marginTop: "0.4rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: activeStage.accent, lineHeight: 0.9 }}>
                    {localized(activeStage.period, isZh)}
                  </div>
                  <h3 style={{ margin: "0.55rem 0 0", fontFamily: "'IM Fell English', serif", fontSize: "1.42rem", lineHeight: 1.16, color: ink }}>
                    {localized(activeStage.title, isZh)}
                  </h3>
                </div>

                <div style={{ padding: "0.9rem", background: `${activeStage.accent}0D`, borderLeft: `4px solid ${activeStage.accent}` }}>
                  <div style={eyebrowStyle(activeStage.accent)}>{isZh ? "核心问题" : "CORE QUESTION"}</div>
                  <p style={{ ...cardParagraphStyle, marginTop: "0.5rem", color: ink, fontSize: "0.78rem" }}>
                    {localized(activeStage.coreQuestion, isZh)}
                  </p>
                </div>

                <CardSection title={isZh ? "代表理论" : "MAIN THEORIES"} color={activeStage.accent}>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {activeStage.mainTheories.map((id) => (
                      <span key={id} style={{ ...tagStyle(profiles[id].accent), background: `${profiles[id].accent}18`, fontWeight: 700 }}>
                        {localized(profiles[id].label, isZh)}
                      </span>
                    ))}
                  </div>
                  {activeStage.relatedSchools.length > 0 && (
                    <>
                      <div style={{ ...eyebrowStyle(activeStage.accent), marginTop: "0.8rem" }}>{isZh ? "相关流派" : "RELATED SCHOOLS"}</div>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.45rem" }}>
                        {activeStage.relatedSchools.map((id) => (
                          <span key={id} style={tagStyle(profiles[id].accent)}>{localized(profiles[id].label, isZh)}</span>
                        ))}
                      </div>
                    </>
                  )}
                </CardSection>

                <CardSection title={isZh ? "理论关键词" : "THEORY KEYWORDS"} color={activeStage.accent}>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                    {activeStage.keywords.map((keyword) => (
                      <span key={keyword.en} style={tagStyle(activeStage.accent)}>{localized(keyword, isZh)}</span>
                    ))}
                  </div>
                </CardSection>

                <CardSection title={isZh ? "理论突破" : "THEORETICAL BREAKTHROUGH"} color={activeStage.accent}>
                  <p style={cardParagraphStyle}>{localized(activeStage.theoreticalBreakthrough, isZh)}</p>
                </CardSection>

                <CardSection title={isZh ? "理论局限" : "LIMITATIONS"} color={activeStage.accent}>
                  <p style={cardParagraphStyle}>{localized(activeStage.limitations, isZh)}</p>
                </CardSection>

                <CardSection title={isZh ? "关键文本 / 事件" : "KEY TEXTS / EVENTS"} color={activeStage.accent}>
                  {activeStage.keyTextsOrEvents.map((item, index) => (
                    <NumberedRow key={item.en} index={index} text={localized(item, isZh)} color={activeStage.accent} />
                  ))}
                </CardSection>

                <div style={{ borderTop: `1px solid ${activeStage.accent}33`, paddingTop: "0.8rem", marginTop: "1rem" }}>
                  <div style={eyebrowStyle(activeStage.accent)}>{isZh ? "资料入口" : "SOURCES"}</div>
                  <div style={{ display: "grid", gap: "0.55rem", marginTop: "0.6rem" }}>
                    {activeStage.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", lineHeight: 1.45, letterSpacing: "0.05em", color: activeStage.accent }}
                      >
                        {localized(source.label, isZh)} ↗
                      </a>
                    ))}
                  </div>
                </div>
                <div style={{ borderTop: `1px solid ${activeStage.accent}33`, paddingTop: "1rem", marginTop: "1rem" }}>
                  <p style={{ margin: "0 0 0.7rem", fontFamily: "'Special Elite', cursive", fontSize: "0.7rem", lineHeight: 1.5, color: softInk }}>
                    {isZh ? "这段历史与理论，让你重新看见了生活中的什么？" : "What in your life becomes visible again through this history and theory?"}
                  </p>
                  <ReflectionTrigger
                    compact
                    source={{
                      type: "lineage",
                      id: activeStage.id,
                      title: localized(activeStage.title, isZh),
                      theoryIds: [...activeStage.mainTheories, ...activeStage.relatedSchools] as TheoryId[],
                      snapshot: `${localized(activeStage.period, isZh)} · ${localized(activeStage.coreQuestion, isZh)}`,
                    }}
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function FilterButton({
  label,
  selected,
  color,
  onClick,
}: {
  label: string;
  selected: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      className="lineage-filter-button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        padding: "0.42rem 0.82rem",
        background: selected ? color : "rgba(255,255,255,0.64)",
        border: `1px solid ${selected ? color : "rgba(111,0,255,0.18)"}`,
        color: selected ? "#FFFFFF" : "rgba(17,17,17,0.62)",
        cursor: "pointer",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.56rem",
        letterSpacing: "0.1em",
      }}
    >
      {label}
    </button>
  );
}

function CardSection({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: `1px solid ${color}33`, paddingTop: "0.8rem", marginTop: "0.9rem" }}>
      <div style={eyebrowStyle(color)}>{title}</div>
      <div style={{ marginTop: "0.55rem" }}>{children}</div>
    </div>
  );
}

function NumberedRow({ index, text, color }: { index: number; text: string; color: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5rem 1fr", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "start" }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.54rem", color }}>{String(index + 1).padStart(2, "0")}</span>
      <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.72rem", color: softInk, lineHeight: 1.55 }}>{text}</span>
    </div>
  );
}

const emptyButtonStyle = {
  border: `1px solid ${purple}`,
  background: "#fff",
  color: purple,
  padding: "0.55rem 0.8rem",
  cursor: "pointer",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "0.55rem",
  letterSpacing: "0.08em",
};

const cardParagraphStyle = {
  margin: 0,
  fontFamily: "'Special Elite', cursive",
  fontSize: "0.72rem",
  lineHeight: 1.6,
  color: softInk,
};

function eyebrowStyle(color: string) {
  return {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.5rem",
    letterSpacing: "0.16em",
    color,
  };
}

function tagStyle(color: string) {
  return {
    border: `1px solid ${color}55`,
    color,
    padding: "0.25rem 0.45rem",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.5rem",
    background: `${color}08`,
  };
}
