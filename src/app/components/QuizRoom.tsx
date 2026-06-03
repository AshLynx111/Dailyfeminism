import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { RotateCcw } from "lucide-react";
import cameraRays from "../../imports/collage/camera-rays.jpg";
import { useLanguage } from "../i18n";

type Scores = {
  liberal: number; radical: number; socialist: number; marxist: number;
  cultural: number; postmodern: number; intersectional: number;
};

const questions = [
  {
    q: "What is the primary cause of women's oppression?",
    options: [
      { text: "Legal and institutional barriers that can be reformed through law", scores: { liberal: 3 } },
      { text: "The patriarchal system of male dominance pervading all institutions", scores: { radical: 3, cultural: 1 } },
      { text: "The intersection of capitalism and patriarchy working in tandem", scores: { socialist: 3 } },
      { text: "Private property and the capitalist class structure", scores: { marxist: 3 } },
    ],
  },
  {
    q: "A woman earns significantly less than her male colleague. The solution is...",
    options: [
      { text: "Enforce equal pay legislation and anti-discrimination laws", scores: { liberal: 3 } },
      { text: "Dismantle the patriarchal corporate structure entirely", scores: { radical: 3 } },
      { text: "Unionize and address class-based wage inequality at its root", scores: { socialist: 2, marxist: 2 } },
      { text: "Recognize the devaluation of feminized labor across all identities", scores: { intersectional: 2, cultural: 1 } },
    ],
  },
  {
    q: "How do you understand gender?",
    options: [
      { text: "It is real but should not determine one's rights or opportunities", scores: { liberal: 2, cultural: 1 } },
      { text: "It is a hierarchy — masculine over feminine — that must be overturned", scores: { radical: 3 } },
      { text: "It is a social construction we can and should destabilize", scores: { postmodern: 3 } },
      { text: "It is one axis among many — race, class, disability shape it equally", scores: { intersectional: 3 } },
    ],
  },
  {
    q: "Domestic labor — cooking, cleaning, childcare — is...",
    options: [
      { text: "Work that should be equally shared; policy must support this", scores: { liberal: 2 } },
      { text: "A tool of women's subordination requiring radical reimagining", scores: { radical: 3 } },
      { text: "Unpaid labor that sustains capitalism and should be socialized", scores: { socialist: 3, marxist: 2 } },
      { text: "Care work that embodies feminine values society should honor", scores: { cultural: 3 } },
    ],
  },
  {
    q: "A woman of color faces workplace discrimination. The most complete analysis is...",
    options: [
      { text: "She faces gender discrimination — the same laws should protect her", scores: { liberal: 1 } },
      { text: "Her race and gender create a unique oppression reducible to neither alone", scores: { intersectional: 3 } },
      { text: "She faces patriarchal oppression across all communities", scores: { radical: 2 } },
      { text: "Capitalism exploits race and gender divisions for profit", scores: { socialist: 2, marxist: 2 } },
    ],
  },
  {
    q: "Marriage as an institution is...",
    options: [
      { text: "Reformable — it should be a partnership of equals", scores: { liberal: 3 } },
      { text: "A primary site of women's oppression and should be abolished", scores: { radical: 3 } },
      { text: "An economic arrangement serving capitalist reproduction needs", scores: { marxist: 3, socialist: 1 } },
      { text: "A site of care that honors feminine values of commitment", scores: { cultural: 2 } },
    ],
  },
  {
    q: "Men's role in feminism?",
    options: [
      { text: "Full allies — equal partners in the feminist movement", scores: { liberal: 3 } },
      { text: "Supporters from outside — feminism must remain women-led", scores: { radical: 3, cultural: 1 } },
      { text: "Class allies — working-class solidarity across gender is key", scores: { socialist: 2, marxist: 2 } },
      { text: "Men must deconstruct their own masculinity and privilege", scores: { postmodern: 2, intersectional: 2 } },
    ],
  },
  {
    q: "Which statement resonates most with you?",
    options: [
      { text: "\"Women can achieve equality through access to the same rights as men\"", scores: { liberal: 3 } },
      { text: "\"The master's tools will never dismantle the master's house\"", scores: { radical: 2, postmodern: 1, cultural: 1 } },
      { text: "\"You cannot have feminism without socialism\"", scores: { socialist: 3, marxist: 1 } },
      { text: "\"There is no such thing as a single-issue struggle\"", scores: { intersectional: 3 } },
    ],
  },
  {
    q: "Gender difference — feminine traits like care and empathy...",
    options: [
      { text: "Are irrelevant to questions of rights and equality", scores: { liberal: 2 } },
      { text: "Are genuinely valuable and deeply undervalued by society", scores: { cultural: 3 } },
      { text: "Are social constructions perpetuated through power and discourse", scores: { postmodern: 3 } },
      { text: "Are created by and serve to maintain patriarchal hierarchy", scores: { radical: 2 } },
    ],
  },
  {
    q: "Feminist movements that focus only on middle-class white women are...",
    options: [
      { text: "Still progress — gains eventually lift all women", scores: { liberal: 1 } },
      { text: "Missing the most marginalized — intersectionality must be centered", scores: { intersectional: 3 } },
      { text: "Missing class — working-class women must be in the fight", scores: { socialist: 3 } },
      { text: "Divided by patriarchy's tactic of pitting women against each other", scores: { radical: 2, cultural: 1 } },
    ],
  },
  {
    q: "Reproductive rights are...",
    options: [
      { text: "An individual right to bodily autonomy that must be legally protected", scores: { liberal: 3 } },
      { text: "The central battleground where patriarchy controls women's bodies", scores: { radical: 3 } },
      { text: "Shaped by race and class — Black and poor women most affected", scores: { intersectional: 3 } },
      { text: "Reproductive labor central to capitalism's need for a future workforce", scores: { marxist: 2, socialist: 2 } },
    ],
  },
  {
    q: "Technology and digital spaces in relation to feminism...",
    options: [
      { text: "Are powerful tools — close the gender digital divide for equality", scores: { liberal: 2 } },
      { text: "Replicate patriarchal violence — online harassment is structural", scores: { radical: 2, intersectional: 1 } },
      { text: "Are profit-driven platforms exploiting gendered and racialized labor", scores: { socialist: 2, marxist: 2 } },
      { text: "Destabilize fixed gender categories — a site of queer resistance", scores: { postmodern: 3 } },
    ],
  },
  {
    q: "The category \"woman\" is...",
    options: [
      { text: "A meaningful identity deserving equal rights and recognition", scores: { liberal: 2, cultural: 1 } },
      { text: "Defined by subjection to patriarchal male domination", scores: { radical: 2 } },
      { text: "Complex and contested — shaped by race, class, and other forces", scores: { intersectional: 3 } },
      { text: "A social construct worth questioning and disrupting", scores: { postmodern: 3 } },
    ],
  },
  {
    q: "If you could change one thing in society right now...",
    options: [
      { text: "Equal representation of women in all leadership positions", scores: { liberal: 3 } },
      { text: "Dismantling patriarchal power structures in culture and institutions", scores: { radical: 3 } },
      { text: "A redistribution of wealth and end to exploitative capitalism", scores: { marxist: 2, socialist: 2 } },
      { text: "A culture that values care, empathy, and cooperation over competition", scores: { cultural: 3 } },
    ],
  },
  {
    q: "The most important feminist frontier right now is...",
    options: [
      { text: "Shattering the glass ceiling and achieving political parity", scores: { liberal: 3 } },
      { text: "Eliminating sexual violence and the culture that enables it", scores: { radical: 3 } },
      { text: "Building global solidarity with working women across borders", scores: { socialist: 3 } },
      { text: "Abolishing all fixed categories of identity — including gender itself", scores: { postmodern: 2, intersectional: 1 } },
    ],
  },
];

const questionsZh = [
  {
    q: "你认为女性受压迫的主要原因是什么？",
    options: [
      "可以通过法律改革的法律与制度障碍",
      "贯穿所有制度的父权制男性支配",
      "资本主义与父权制共同作用的交叉结构",
      "私有财产与资本主义阶级结构",
    ],
  },
  {
    q: "一位女性的收入明显低于男性同事。解决办法是……",
    options: [
      "执行同工同酬和反歧视法律",
      "彻底拆解父权制企业结构",
      "组织工会，从根部处理阶级化工资不平等",
      "承认女性化劳动在不同身份中都被贬值",
    ],
  },
  {
    q: "你如何理解性别？",
    options: [
      "性别是真实存在的，但不应决定权利和机会",
      "性别是一种等级制度，即男性气质高于女性气质，必须被推翻",
      "性别是一种社会建构，可以也应该被动摇",
      "性别只是众多轴线之一，种族、阶级、残障同样塑造它",
    ],
  },
  {
    q: "家务劳动，包括做饭、清洁和照护儿童，是……",
    options: [
      "应被平等分担的工作，政策必须支持这一点",
      "使女性从属的工具，需要被激进地重新想象",
      "支撑资本主义的无偿劳动，应该被社会化",
      "体现照护价值的劳动，社会应当尊重",
    ],
  },
  {
    q: "一位有色人种女性遭遇职场歧视，最完整的分析是……",
    options: [
      "她遭遇的是性别歧视，同样的法律应保护她",
      "她的种族与性别形成了不能被化约为单一因素的压迫",
      "她在所有社群中都遭遇父权压迫",
      "资本主义利用种族与性别分化来获利",
    ],
  },
  {
    q: "婚姻作为一种制度是……",
    options: [
      "可以改革的，它应该成为平等伴侣关系",
      "女性受压迫的主要场所，应被废除",
      "服务资本主义再生产需求的经济安排",
      "承载照护与承诺价值的关系场域",
    ],
  },
  {
    q: "男性在女性主义中的角色应该是？",
    options: [
      "完整盟友，作为平等伙伴参与女性主义运动",
      "外部支持者，女性主义必须由女性主导",
      "阶级盟友，跨性别的工人阶级团结是关键",
      "男性必须解构自己的男性气质和特权",
    ],
  },
  {
    q: "哪句话最能与你共鸣？",
    options: [
      "女性可以通过获得与男性同等的权利实现平等",
      "主人的工具永远拆不掉主人的房子",
      "没有社会主义，就没有女性主义",
      "不存在单一议题的斗争",
    ],
  },
  {
    q: "性别差异，比如照护和共情等女性化特质……",
    options: [
      "与权利和平等问题无关",
      "确实有价值，却被社会严重低估",
      "是通过权力和话语维持的社会建构",
      "由父权等级制造，并服务于这种等级",
    ],
  },
  {
    q: "只关注中产白人女性的女性主义运动……",
    options: [
      "仍然是进步，因为成果最终会惠及所有女性",
      "忽略了最边缘者，必须以交叉性为中心",
      "忽略了阶级，工人阶级女性必须进入斗争",
      "被父权制利用，通过让女性彼此对立而分裂",
    ],
  },
  {
    q: "生育权是……",
    options: [
      "身体自主的个人权利，必须受到法律保护",
      "父权控制女性身体的核心战场",
      "被种族和阶级塑造，黑人女性和贫困女性受影响最深",
      "再生产劳动，是资本主义未来劳动力需求的核心",
    ],
  },
  {
    q: "技术与数字空间和女性主义的关系是……",
    options: [
      "强大的工具，弥合性别数字鸿沟有助于平等",
      "会复制父权暴力，线上骚扰是结构性的",
      "逐利平台会剥削性别化和种族化劳动",
      "能够动摇固定性别范畴，是酷儿抵抗的场域",
    ],
  },
  {
    q: "“女人”这个类别是……",
    options: [
      "值得获得平等权利和承认的重要身份",
      "由父权制男性支配关系定义",
      "复杂且充满争议，被种族、阶级等力量塑造",
      "值得追问和扰动的社会建构",
    ],
  },
  {
    q: "如果你现在可以改变社会中的一件事……",
    options: [
      "让女性在所有领导岗位中获得平等代表",
      "拆解文化和制度中的父权权力结构",
      "重新分配财富，终结剥削性的资本主义",
      "建立重视照护、共情和合作而非竞争的文化",
    ],
  },
  {
    q: "当下最重要的女性主义前沿是……",
    options: [
      "打破玻璃天花板，实现政治平等代表",
      "消除性暴力及纵容它的文化",
      "与全球劳动女性建立团结",
      "废除所有固定身份类别，包括性别本身",
    ],
  },
];

const purple = "#6F00FF";
const deepPurple = "#24004D";
const black = "#F7F4FF";
const white = "#111111";
const paperWhite = "#FFFFFF";

const resultInfo: Record<keyof Scores, { name: string; nameZh: string; color: string; paper: string; ink: string; books: string[]; booksZh: string[] }> = {
  liberal: { name: "Liberal Feminism", nameZh: "自由主义女性主义", color: purple, paper: "#FFFFFF", ink: white,
    books: ["A Vindication of the Rights of Woman — Wollstonecraft", "The Feminine Mystique — Betty Friedan", "The Second Sex — Simone de Beauvoir"],
    booksZh: ["《女权辩护》 — 沃斯通克拉夫特", "《女性的奥秘》 — 贝蒂·弗里丹", "《第二性》 — 西蒙娜·德·波伏瓦"] },
  radical: { name: "Radical Feminism", nameZh: "激进女性主义", color: purple, paper: "#FFFFFF", ink: white,
    books: ["Sexual Politics — Kate Millett", "The Dialectic of Sex — Shulamith Firestone", "The Female Eunuch — Germaine Greer"],
    booksZh: ["《性政治》 — 凯特·米利特", "《性的辩证法》 — 舒拉米斯·费尔斯通", "《女太监》 — 杰梅因·格里尔"] },
  socialist: { name: "Socialist Feminism", nameZh: "社会主义女性主义", color: purple, paper: "#FFFFFF", ink: white,
    books: ["Caliban and the Witch — Silvia Federici", "Women, Race & Class — Angela Davis", "The Unhappy Marriage — Heidi Hartmann"],
    booksZh: ["《卡利班与女巫》 — 西尔维娅·费代里奇", "《妇女、种族与阶级》 — 安吉拉·戴维斯", "《不幸的婚姻》 — 海蒂·哈特曼"] },
  marxist: { name: "Marxist Feminism", nameZh: "马克思主义女性主义", color: purple, paper: "#FFFFFF", ink: white,
    books: ["The Origin of the Family — Friedrich Engels", "Women and Socialism — Clara Zetkin", "Social Reproduction Theory — Tithi Bhattacharya"],
    booksZh: ["《家庭、私有制和国家的起源》 — 恩格斯", "《妇女与社会主义》 — 克拉拉·蔡特金", "《社会再生产理论》 — 蒂西·巴塔查里亚"] },
  cultural: { name: "Cultural Feminism", nameZh: "文化女性主义", color: purple, paper: "#FFFFFF", ink: white,
    books: ["In a Different Voice — Carol Gilligan", "Caring — Nel Noddings", "Woman and Nature — Susan Griffin"],
    booksZh: ["《不同的声音》 — 卡罗尔·吉利根", "《关怀》 — 内尔·诺丁斯", "《女人与自然》 — 苏珊·格里芬"] },
  postmodern: { name: "Postmodern Feminism", nameZh: "后现代女性主义", color: purple, paper: "#FFFFFF", ink: white,
    books: ["Gender Trouble — Judith Butler", "A Cyborg Manifesto — Donna Haraway", "Speculum of the Other Woman — Irigaray"],
    booksZh: ["《性别麻烦》 — 朱迪斯·巴特勒", "《赛博格宣言》 — 唐娜·哈拉维", "《另一个女人的窥镜》 — 伊利格瑞"] },
  intersectional: { name: "Intersectional Feminism", nameZh: "交叉性女性主义", color: purple, paper: "#FFFFFF", ink: white,
    books: ["Sister Outsider — Audre Lorde", "Mapping the Margins — Kimberlé Crenshaw", "Black Feminist Thought — Patricia Hill Collins"],
    booksZh: ["《局外姐妹》 — 奥德丽·洛德", "《绘制边缘》 — 金伯利·克伦肖", "《黑人女性主义思想》 — 帕特里夏·希尔·柯林斯"] },
};

function Results({ scores, isZh }: { scores: Scores; isZh: boolean }) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const pcts = Object.fromEntries(
    Object.entries(scores).map(([k, v]) => [k, Math.round((v / total) * 100)])
  ) as Record<keyof Scores, number>;
  const sorted = (Object.entries(pcts) as [keyof Scores, number][]).sort(([, a], [, b]) => b - a);
  const [primary] = sorted;
  const info = resultInfo[primary[0]];

  const radarData = Object.entries(pcts).map(([k, v]) => ({
    subject: isZh ? resultInfo[k as keyof Scores].nameZh.replace("女性主义", "") : resultInfo[k as keyof Scores].name.replace(" Feminism", ""),
    value: v,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      style={{
        background: info.paper,
        padding: "3rem",
        position: "relative",
        clipPath: "polygon(0 1%, 2% 0, 5% 1%, 12% 0, 20% 1.5%, 30% 0, 42% 1%, 57% 0, 72% 1%, 85% 0, 94% 1%, 100% 0, 100% 99%, 97% 100%, 92% 98.5%, 85% 100%, 77% 99%, 68% 100%, 59% 98.5%, 49% 100%, 39% 99%, 29% 100%, 20% 98.5%, 12% 100%, 5% 99%, 1% 100%, 0 99%)",
        boxShadow: "0 16px 36px rgba(17,17,17,0.12)",
      }}
    >
      {/* Stamp header */}
      <div style={{
        borderTop: `3px solid ${info.color}`,
        borderBottom: `1px solid ${info.color}`,
        padding: "0.4rem 0",
        marginBottom: "0.4rem",
      }}>
        <div style={{ borderBottom: `1px solid ${info.color}30`, paddingBottom: "0.3rem", marginBottom: "0.3rem" }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", color: info.color, opacity: 0.7 }}>
            {isZh ? "女性主义档案 — 理论测评 — 结果已归档" : "FEMINIST ARCHIVE — THEORY ASSESSMENT — RESULT CLASSIFIED"}
          </span>
        </div>
      </div>

      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: info.ink, lineHeight: 0.9, marginBottom: "0.4rem" }}>
        {isZh ? "你的倾向：" : "YOUR TENDENCY:"}
      </h3>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        color: info.color,
        lineHeight: 0.9,
        marginBottom: "1.5rem",
      }}>
        {isZh ? info.nameZh : info.name.toUpperCase()}
      </div>

      <div style={{ height: "1px", background: info.color, opacity: 0.2, marginBottom: "1.5rem" }} />

      {/* Radar chart */}
      <div style={{ height: "260px", marginBottom: "1.5rem" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke={`${info.color}25`} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: info.color, fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", opacity: 0.6 }} />
            <Radar dataKey="value" stroke={info.color} fill={info.color} fillOpacity={0.15} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Score bars */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: info.color, opacity: 0.6, marginBottom: "0.75rem" }}>
          {isZh ? "匹配度分布" : "COMPATIBILITY BREAKDOWN"}
        </div>
        {sorted.map(([key, pct]) => (
          <div key={key} style={{ marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
              <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.75rem", color: info.ink, opacity: 0.7 }}>
                {isZh ? resultInfo[key].nameZh : resultInfo[key].name}
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: info.color }}>
                {pct}%
              </span>
            </div>
            <div style={{ height: "2px", background: `${info.color}18` }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ height: "100%", background: info.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recommended reading */}
      <div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: info.color, opacity: 0.6, marginBottom: "0.6rem" }}>
          {isZh ? "推荐阅读" : "ASSIGNED READING"}
        </div>
        {(isZh ? info.booksZh : info.books).map((b, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.4rem", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", color: info.color, opacity: 0.5, flexShrink: 0, marginTop: "0.1rem" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: "'IM Fell English', serif", fontStyle: "italic", fontSize: "0.85rem", color: info.ink, opacity: 0.8, lineHeight: 1.4 }}>
              {b}
            </span>
          </div>
        ))}
      </div>

      {/* Corner stamp */}
      <div style={{
        position: "absolute", bottom: "2.5rem", right: "2rem",
        transform: "rotate(12deg)",
        border: `2px solid ${info.color}40`,
        padding: "0.3rem 0.6rem",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.5rem", color: `${info.color}50`,
        letterSpacing: "0.2em", lineHeight: 1.5,
      }}>
        {isZh ? "女性主义" : "CERTIFIED"}<br />{isZh ? "认证" : "FEMINIST"}<br />♀
      </div>
    </motion.div>
  );
}

export function QuizRoom() {
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [scores, setScores] = useState<Scores>({ liberal: 0, radical: 0, socialist: 0, marxist: 0, cultural: 0, postmodern: 0, intersectional: 0 });
  const [done, setDone] = useState(false);
  const { isZh } = useLanguage();

  const advance = () => {
    if (sel === null) return;
    const opts = questions[qi].options[sel].scores;
    const ns = { ...scores };
    Object.entries(opts).forEach(([k, v]) => { ns[k as keyof Scores] += v as number; });
    setScores(ns);
    if (qi + 1 >= questions.length) setDone(true);
    else { setQi(qi + 1); setSel(null); }
  };

  const reset = () => { setQi(0); setSel(null); setDone(false); setScores({ liberal: 0, radical: 0, socialist: 0, marxist: 0, cultural: 0, postmodern: 0, intersectional: 0 }); };

  const progress = (qi / questions.length) * 100;
  const question = isZh ? questionsZh[qi] : {
    q: questions[qi].q,
    options: questions[qi].options.map((option) => option.text),
  };

  return (
    <section
      id="quiz"
      style={{
        background: black,
        padding: "6rem 3rem 8rem",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px", opacity: 0.5,
      }} />

      {/* Photocopy-style border */}
      <div style={{
        position: "absolute", inset: "2rem",
        border: "1px solid rgba(111,0,255,0.25)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Background archive photo */}
      <div style={{
        position: "absolute", top: "5%", right: "2%",
        width: "30%", zIndex: 0,
        opacity: 0.1, transform: "rotate(1.5deg)",
      }}>
        <img
          src={cameraRays}
          alt=""
          style={{ width: "100%" }}
        />
      </div>

      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(17,17,17,0.12) 1px, transparent 1.5px), repeating-linear-gradient(0deg, transparent 0 15px, rgba(17,17,17,0.035) 15px 16px)",
        backgroundSize: "18px 18px, auto",
        opacity: 0.35,
      }} />

      <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "3rem" }}
        >
          <div style={{ borderTop: `3px solid ${purple}`, borderBottom: `1px solid ${purple}`, padding: "0.35rem 0", marginBottom: "0.3rem" }}>
            <div style={{ borderBottom: "1px solid rgba(111,0,255,0.18)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", letterSpacing: "0.28em", color: purple, opacity: 1 }}>
                {isZh ? "女性主义档案 — 第三展厅 — 理论测评表" : "FEMINIST ARCHIVE — SECTION IV — THEORY ASSESSMENT FORM"}
              </span>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", color: white, lineHeight: 0.88 }}>
            {isZh ? "女性主义" : "FEMINIST"}<br />
            <span style={{ color: "transparent", WebkitTextStroke: `1.5px ${purple}` }}>{isZh ? "理论" : "THEORY"}</span> {isZh ? "测验" : "QUIZ"}
          </h2>
          <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.82rem", color: "rgba(17,17,17,0.68)", fontStyle: "italic", marginTop: "0.75rem" }}>
            {isZh ? "15 道问题，发现你的女性主义传统。" : "15 questions. Discover your feminist tradition."}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Results scores={scores} isZh={isZh} />
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <button
                  onClick={reset}
                  style={{
                    background: "none", border: `1px solid ${purple}`,
                    padding: "0.6rem 1.5rem", cursor: "pointer",
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem",
                    letterSpacing: "0.15em", color: purple,
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  }}
                >
                  <RotateCcw size={12} /> {isZh ? "重做" : "RETAKE"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key={`q${qi}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {/* Progress bar */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.15em", color: "rgba(17,17,17,0.52)" }}>
                    {String(qi + 1).padStart(2, "0")} / {questions.length}
                  </span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: purple }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div style={{ height: "1px", background: "rgba(17,17,17,0.14)" }}>
                  <motion.div animate={{ width: `${progress}%` }} style={{ height: "1px", background: purple }} />
                </div>
              </div>

              {/* Question paper */}
              <div style={{
                background: paperWhite,
                border: `1px solid ${purple}`,
                padding: "2rem",
                marginBottom: "1.5rem",
                position: "relative",
                clipPath: "polygon(0 2%, 2% 0, 5% 1.5%, 10% 0, 17% 1%, 25% 0, 35% 1.5%, 46% 0, 58% 1%, 70% 0, 82% 1.5%, 93% 0, 100% 1%, 100% 99%, 97% 100%, 92% 98.5%, 86% 100%, 78% 99%, 70% 100%, 60% 99%, 50% 100%, 39% 99%, 28% 100%, 18% 99%, 9% 100%, 3% 98.5%, 0 100%)",
                boxShadow: "10px 10px 0 rgba(111,0,255,0.18)",
              }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", color: purple, opacity: 1, marginBottom: "0.75rem" }}>
                  {isZh ? "问题" : "QUESTION"} {String(qi + 1).padStart(2, "0")}
                </div>
                <div style={{ height: "1px", background: "rgba(17,17,17,0.14)", marginBottom: "1rem" }} />
                <p style={{ fontFamily: "'IM Fell English', serif", fontSize: "1.1rem", color: white, lineHeight: 1.55 }}>
                  {question.q}
                </p>
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => setSel(i)}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "0.9rem",
                      padding: "0.9rem 1.1rem",
                      background: sel === i ? purple : "rgba(255,255,255,0.72)",
                      border: `1px solid ${sel === i ? purple : "rgba(111,0,255,0.18)"}`,
                      cursor: "pointer", textAlign: "left",
                      transition: "all 0.15s",
                      fontFamily: "'Special Elite', cursive",
                      fontSize: "0.85rem", color: sel === i ? paperWhite : "rgba(17,17,17,0.76)", lineHeight: 1.5,
                    }}
                    onMouseEnter={(e) => { if (sel !== i) e.currentTarget.style.borderColor = purple; }}
                    onMouseLeave={(e) => { if (sel !== i) e.currentTarget.style.borderColor = "rgba(111,0,255,0.18)"; }}
                  >
                    <span style={{
                      width: "20px", height: "20px", flexShrink: 0,
                      border: `1px solid ${sel === i ? paperWhite : "rgba(17,17,17,0.36)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      color: sel === i ? paperWhite : "rgba(17,17,17,0.58)",
                      background: sel === i ? deepPurple : "transparent",
                      marginTop: "1px",
                    }}>
                      {sel === i ? "✓" : String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              {/* Next */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={advance}
                  disabled={sel === null}
                  style={{
                    padding: "0.65rem 1.75rem",
                    background: sel !== null ? purple : "transparent",
                    border: `1px solid ${sel !== null ? purple : "rgba(111,0,255,0.18)"}`,
                    color: sel !== null ? paperWhite : "rgba(17,17,17,0.28)",
                    cursor: sel !== null ? "pointer" : "not-allowed",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem", letterSpacing: "0.15em",
                    transition: "all 0.2s",
                  }}
                >
                  {qi + 1 === questions.length ? (isZh ? "提交 →" : "SUBMIT →") : (isZh ? "下一题 →" : "NEXT →")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
