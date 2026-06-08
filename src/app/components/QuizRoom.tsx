import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, RotateCcw } from "lucide-react";
import cameraRays from "../../imports/collage/camera-rays.jpg";
import { useLanguage } from "../i18n";

type TensionKey =
  | "reformStructure"
  | "genderClass"
  | "singleCombined"
  | "cultureLabor"
  | "universalDifference"
  | "stableFluid"
  | "discourseMaterial";

type SchoolKey =
  | "liberal"
  | "radical"
  | "marxist"
  | "socialist"
  | "cultural"
  | "postmodern"
  | "intersectional";

type TensionScores = Record<TensionKey, number>;
type SchoolScores = Record<SchoolKey, number>;

type TensionQuestion = {
  id: number;
  zh: string;
  en: string;
  tension: TensionKey;
  direction: 1 | -1;
};

type SchoolInfo = {
  name: string;
  nameZh: string;
  short: string;
  shortZh: string;
  target: Partial<TensionScores>;
  weights: Partial<Record<TensionKey, number>>;
};

type ProfileResult = {
  tensions: TensionScores;
  schools: SchoolScores;
  ranking: [SchoolKey, number][];
  summary: string;
  tags: string[];
  views: string[];
};

const purple = "#6F00FF";
const deepPurple = "#24004D";
const roomPaper = "#F7F4FF";
const ink = "#111111";
const paperWhite = "#FFFFFF";

const tensionLabels: Record<
  TensionKey,
  { left: string; right: string; leftZh: string; rightZh: string }
> = {
  reformStructure: {
    left: "Institutional reform",
    right: "Structural transformation",
    leftZh: "制度改革",
    rightZh: "结构重塑",
  },
  genderClass: {
    left: "Class oppression",
    right: "Gender oppression",
    leftZh: "阶级压迫",
    rightZh: "性别压迫",
  },
  singleCombined: {
    left: "Single-root explanation",
    right: "Co-constitution",
    leftZh: "单一根源",
    rightZh: "共同塑造",
  },
  cultureLabor: {
    left: "Cultural value",
    right: "Labor analysis",
    leftZh: "文化价值",
    rightZh: "劳动分析",
  },
  universalDifference: {
    left: "Universal experience",
    right: "Differentiated experience",
    leftZh: "普遍经验",
    rightZh: "差异经验",
  },
  stableFluid: {
    left: "Stable identity",
    right: "Fluid identity",
    leftZh: "稳定身份",
    rightZh: "身份流动",
  },
  discourseMaterial: {
    left: "Discursive construction",
    right: "Material structure",
    leftZh: "话语建构",
    rightZh: "物质结构",
  },
};

const likertLabels = [
  { value: 1, en: "Strongly disagree", zh: "非常不同意" },
  { value: 2, en: "Disagree", zh: "不同意" },
  { value: 3, en: "Neutral", zh: "中立" },
  { value: 4, en: "Agree", zh: "同意" },
  { value: 5, en: "Strongly agree", zh: "非常同意" },
];

const questions: TensionQuestion[] = [
  {
    id: 1,
    zh: "相比增加女性进入现有机构的机会，改变这些机构本身的权力关系更重要。",
    en: "Changing the power relations within existing institutions matters more than increasing women's access to them.",
    tension: "reformStructure",
    direction: 1,
  },
  {
    id: 2,
    zh: "与其等待家庭、职场和社会观念发生深层变化，不如优先争取能够立即执行的法律与政策保障。",
    en: "Rather than wait for deep changes in family, work, and social attitudes, we should prioritize enforceable laws and policies.",
    tension: "reformStructure",
    direction: -1,
  },
  {
    id: 3,
    zh: "如果家庭和亲密关系中的性别权力没有改变，仅提高女性的教育和就业机会仍然不够。",
    en: "Better education and employment opportunities are not enough if gendered power within families and intimate relationships remains unchanged.",
    tension: "reformStructure",
    direction: 1,
  },
  {
    id: 4,
    zh: "相比收入和劳动条件，男性对女性身体、安全与亲密关系的控制更能解释女性受压迫的核心。",
    en: "Control over women's bodies, safety, and intimate relationships explains women's oppression more fundamentally than income and working conditions.",
    tension: "genderClass",
    direction: 1,
  },
  {
    id: 5,
    zh: "如果经济剥削和阶级差距得到根本改变，许多性别不平等也会随之明显减弱。",
    en: "If economic exploitation and class inequality were fundamentally changed, many gender inequalities would also decline substantially.",
    tension: "genderClass",
    direction: -1,
  },
  {
    id: 6,
    zh: "即使不同阶层的女性处境差异很大，她们仍共同面对一种不能被阶级问题取代的男性支配关系。",
    en: "Despite major class differences, women still face male domination that cannot be reduced to class.",
    tension: "genderClass",
    direction: 1,
  },
  {
    id: 7,
    zh: "相比把男性支配视为女性受压迫的首要根源，我更认为性别权力必须和劳动、收入及阶级关系一起解释。",
    en: "Rather than treating male domination as the primary root, gendered power should be explained together with labor, income, and class relations.",
    tension: "singleCombined",
    direction: 1,
  },
  {
    id: 8,
    zh: "相比把经济制度视为女性受压迫的首要根源，我更认为劳动关系本身也会被家庭分工和性别权力重新塑造。",
    en: "Rather than treating the economy as the primary root, labor relations should be understood as reshaped by family roles and gendered power.",
    tension: "singleCombined",
    direction: 1,
  },
  {
    id: 9,
    zh: "要解释家务和育儿为何主要由女性承担，分析工资、财产和劳动制度已经足够，不必再引入独立的性别权力分析。",
    en: "Wages, property, and labor systems are sufficient to explain why women perform most housework and childcare; a separate gender-power analysis is unnecessary.",
    tension: "singleCombined",
    direction: -1,
  },
  {
    id: 10,
    zh: "要解释女性遭遇的身体控制和亲密关系暴力，分析男性支配已经足够，经济依赖和劳动分工只是次要因素。",
    en: "Male domination is sufficient to explain bodily control and intimate violence; economic dependence and labor division are secondary.",
    tension: "singleCombined",
    direction: -1,
  },
  {
    id: 11,
    zh: "相比赞美照护与共情的价值，我更关心谁在无偿或低薪地承担照护劳动。",
    en: "I care more about who performs unpaid or underpaid care work than about celebrating care and empathy as values.",
    tension: "cultureLabor",
    direction: 1,
  },
  {
    id: 12,
    zh: "护理、育儿和情绪支持的问题，首先是这些能力没有得到文化尊重，而不只是劳动报酬不足。",
    en: "The primary problem with nursing, childcare, and emotional support is cultural disrespect for these capacities, not only inadequate pay.",
    tension: "cultureLabor",
    direction: -1,
  },
  {
    id: 13,
    zh: "即使照护劳动获得合理报酬，如果竞争和效率仍被视为更高级的价值，女性经验依然会被贬低。",
    en: "Even if care work is fairly paid, women's experience remains devalued while competition and efficiency are treated as superior values.",
    tension: "cultureLabor",
    direction: -1,
  },
  {
    id: 14,
    zh: "相比强调女性之间的差异，女性运动更需要先建立一种共同经验来形成团结。",
    en: "A women's movement needs a shared experience as a basis for solidarity more than it needs to emphasize differences among women.",
    tension: "universalDifference",
    direction: -1,
  },
  {
    id: 15,
    zh: "一项对大多数女性有帮助的政策，如果加剧了部分边缘女性的困难，就不能算真正成功。",
    en: "A policy that helps most women cannot be considered successful if it worsens conditions for some marginalized women.",
    tension: "universalDifference",
    direction: 1,
  },
  {
    id: 16,
    zh: "过度强调阶层、族群、性取向和身体差异，可能会削弱女性作为整体反抗性别压迫的能力。",
    en: "Overemphasizing class, ethnicity, sexuality, and bodily differences may weaken women's collective capacity to resist gender oppression.",
    tension: "universalDifference",
    direction: -1,
  },
  {
    id: 17,
    zh: "为了组织女性政治行动，“女性”必须保留一个相对清晰而稳定的定义。",
    en: "Organizing women's political action requires a relatively clear and stable definition of 'woman.'",
    tension: "stableFluid",
    direction: -1,
  },
  {
    id: 18,
    zh: "与其寻找所有女性共有的特征，不如让每个人根据自己的经验重新定义性别身份。",
    en: "Rather than seek traits shared by all women, people should be free to redefine gender identity through their own experience.",
    tension: "stableFluid",
    direction: 1,
  },
  {
    id: 19,
    zh: "相比改变媒体形象和性别语言，改变工资、财产和劳动制度更能从根本上改善女性处境。",
    en: "Changing wages, property, and labor systems improves women's lives more fundamentally than changing media images and gendered language.",
    tension: "discourseMaterial",
    direction: 1,
  },
  {
    id: 20,
    zh: "即使资源分配没有立即改变，重新定义性别语言和身份分类也能产生真实的政治改变。",
    en: "Redefining gendered language and identity categories can create real political change even before resource distribution changes.",
    tension: "discourseMaterial",
    direction: -1,
  },
];

const schoolInfo: Record<SchoolKey, SchoolInfo> = {
  liberal: {
    name: "Liberal Feminism",
    nameZh: "自由主义女权主义",
    short: "Liberal",
    shortZh: "自由",
    target: { reformStructure: -1 },
    weights: { reformStructure: 2 },
  },
  radical: {
    name: "Radical Feminism",
    nameZh: "激进女权主义",
    short: "Radical",
    shortZh: "激进",
    target: {
      reformStructure: 0.85,
      genderClass: 1,
      singleCombined: -0.75,
      universalDifference: -0.35,
      stableFluid: -0.45,
    },
    weights: {
      reformStructure: 1.1,
      genderClass: 1.6,
      singleCombined: 1.2,
      universalDifference: 0.45,
      stableFluid: 0.45,
    },
  },
  marxist: {
    name: "Marxist Feminism",
    nameZh: "马克思主义女权主义",
    short: "Marxist",
    shortZh: "马克思",
    target: {
      reformStructure: 0.65,
      genderClass: -1,
      singleCombined: -0.75,
      cultureLabor: 1,
      discourseMaterial: 1,
    },
    weights: {
      reformStructure: 0.55,
      genderClass: 1.3,
      singleCombined: 1.1,
      cultureLabor: 1.2,
      discourseMaterial: 1.2,
    },
  },
  socialist: {
    name: "Socialist Feminism",
    nameZh: "社会主义女权主义",
    short: "Socialist",
    shortZh: "社会主义",
    target: {
      reformStructure: 0.85,
      genderClass: 0,
      singleCombined: 1,
      cultureLabor: 0.55,
      universalDifference: 0.3,
      discourseMaterial: 0.55,
    },
    weights: {
      reformStructure: 0.9,
      genderClass: 0.5,
      singleCombined: 2,
      cultureLabor: 0.7,
      universalDifference: 0.45,
      discourseMaterial: 0.55,
    },
  },
  cultural: {
    name: "Cultural Feminism",
    nameZh: "文化女权主义",
    short: "Cultural",
    shortZh: "文化",
    target: {
      cultureLabor: -1,
      universalDifference: -0.8,
      stableFluid: -0.85,
    },
    weights: {
      cultureLabor: 1.4,
      universalDifference: 1,
      stableFluid: 1.2,
    },
  },
  postmodern: {
    name: "Postmodern Feminism",
    nameZh: "后现代女权主义",
    short: "Postmodern",
    shortZh: "后现代",
    target: {
      stableFluid: 1,
      discourseMaterial: -1,
      universalDifference: 0.55,
    },
    weights: {
      stableFluid: 1.6,
      discourseMaterial: 1.5,
      universalDifference: 0.6,
    },
  },
  intersectional: {
    name: "Intersectional Feminism",
    nameZh: "交叉性女权主义",
    short: "Intersectional",
    shortZh: "交叉性",
    target: {
      reformStructure: 0.5,
      singleCombined: 0.45,
      universalDifference: 1,
      stableFluid: 0.35,
    },
    weights: {
      reformStructure: 0.55,
      singleCombined: 0.65,
      universalDifference: 1.8,
      stableFluid: 0.45,
    },
  },
};

const tensionNarratives: Record<
  TensionKey,
  {
    leftTag: string;
    rightTag: string;
    leftTagZh: string;
    rightTagZh: string;
    leftView: string;
    rightView: string;
    leftViewZh: string;
    rightViewZh: string;
    leftSummary: string;
    rightSummary: string;
    leftSummaryZh: string;
    rightSummaryZh: string;
  }
> = {
  reformStructure: {
    leftTag: "Legal and institutional reform",
    rightTag: "Structural transformation",
    leftTagZh: "法律与制度改革",
    rightTagZh: "结构重塑",
    leftView: "Concrete rights, representation, and enforceable policy are the most reliable routes to change.",
    rightView: "Equal access is insufficient when the underlying power relations remain unchanged.",
    leftViewZh: "具体权利、代表性和可执行政策，是推动改变最可靠的路径。",
    rightViewZh: "如果底层权力关系不变，仅仅获得平等进入的机会仍然不够。",
    leftSummary: "you place greater trust in legal rights, representation, and gradual institutional reform",
    rightSummary: "you believe equality requires changing the power relations built into institutions and intimate life",
    leftSummaryZh: "你更信任法律权利、代表性和渐进式制度改革",
    rightSummaryZh: "你认为平等需要改变机构和亲密生活中的权力关系",
  },
  genderClass: {
    leftTag: "Class and economic relations",
    rightTag: "Patriarchal gender power",
    leftTagZh: "阶级与经济关系",
    rightTagZh: "父权制性别权力",
    leftView: "Economic dependence and labor relations are central to explaining women's oppression.",
    rightView: "Male domination over bodies, safety, and intimacy cannot be reduced to class.",
    leftViewZh: "经济依赖和劳动关系是解释女性受压迫的核心。",
    rightViewZh: "男性对身体、安全和亲密关系的支配，不能被化约为阶级问题。",
    leftSummary: "you give greater explanatory weight to class, labor, and economic dependence",
    rightSummary: "you give greater explanatory weight to patriarchal control over bodies, safety, and intimacy",
    leftSummaryZh: "你更重视阶级、劳动和经济依赖的解释力",
    rightSummaryZh: "你更重视父权制对身体、安全和亲密关系的控制",
  },
  singleCombined: {
    leftTag: "Primary-root explanation",
    rightTag: "Gender-class co-constitution",
    leftTagZh: "首要根源解释",
    rightTagZh: "性别与阶级共同塑造",
    leftView: "A primary system of domination can provide the clearest explanation of women's oppression.",
    rightView: "Gendered power and economic structure reinforce one another and must be analyzed together.",
    leftViewZh: "确定一种首要支配系统，可以更清楚地解释女性受压迫。",
    rightViewZh: "性别权力与经济结构相互强化，必须被放在一起分析。",
    leftSummary: "you are more willing to identify a primary root of oppression",
    rightSummary: "you resist single-root explanations and focus on how gendered power and economic structure reinforce each other",
    leftSummaryZh: "你更愿意确定一种首要的压迫根源",
    rightSummaryZh: "你拒绝单一根源解释，更关注性别权力与经济结构如何相互强化",
  },
  cultureLabor: {
    leftTag: "Care and cultural value",
    rightTag: "Labor and distribution",
    leftTagZh: "照护与文化价值",
    rightTagZh: "劳动与资源分配",
    leftView: "Care, empathy, and relational values must be culturally revalued.",
    rightView: "Who performs unpaid or underpaid work matters more than symbolic praise for care.",
    leftViewZh: "照护、共情和关系性价值需要获得文化上的重新评价。",
    rightViewZh: "谁承担无偿或低薪劳动，比对照护的象征性赞美更重要。",
    leftSummary: "you emphasize restoring value to care, empathy, and relational experience",
    rightSummary: "you emphasize the distribution, compensation, and control of labor",
    leftSummaryZh: "你强调重新肯定照护、共情与关系性经验的价值",
    rightSummaryZh: "你强调劳动如何分配、补偿和被控制",
  },
  universalDifference: {
    leftTag: "Shared women's experience",
    rightTag: "Differentiated experience",
    leftTagZh: "共同女性经验",
    rightTagZh: "差异化处境",
    leftView: "A shared women's experience remains necessary for political solidarity.",
    rightView: "Marginalized experiences should be able to change the movement's overall analysis and priorities.",
    leftViewZh: "共同女性经验仍然是政治团结的重要基础。",
    rightViewZh: "边缘女性的经验应该能够改变运动的整体分析和优先次序。",
    leftSummary: "you value a shared women's experience as a basis for collective action",
    rightSummary: "you believe differences of class, ethnicity, sexuality, and embodiment must reshape the overall analysis",
    leftSummaryZh: "你重视共同女性经验作为集体行动的基础",
    rightSummaryZh: "你认为阶层、族群、性取向和身体差异必须改变整体分析",
  },
  stableFluid: {
    leftTag: "Stable political identity",
    rightTag: "Fluid gender identity",
    leftTagZh: "稳定政治身份",
    rightTagZh: "流动性别身份",
    leftView: "Political action requires a relatively stable category of women.",
    rightView: "Gender categories should remain open to self-definition and revision.",
    leftViewZh: "女性政治行动需要一个相对稳定的女性范畴。",
    rightViewZh: "性别范畴应该对自我定义和重新解释保持开放。",
    leftSummary: "you see a relatively stable category of women as important for political organization",
    rightSummary: "you prefer open, revisable gender categories and greater space for self-definition",
    leftSummaryZh: "你认为相对稳定的女性范畴对政治组织很重要",
    rightSummaryZh: "你倾向于开放、可修订的性别范畴，并重视自我定义",
  },
  discourseMaterial: {
    leftTag: "Language and discourse",
    rightTag: "Material institutions",
    leftTagZh: "语言与话语",
    rightTagZh: "物质制度",
    leftView: "Changing language and identity categories can produce independent political effects.",
    rightView: "Lasting change depends primarily on wages, property, resources, and labor institutions.",
    leftViewZh: "改变语言和身份分类本身就能产生独立的政治效果。",
    rightViewZh: "持久改变主要取决于工资、财产、资源和劳动制度。",
    leftSummary: "you treat language, representation, and identity categories as active political forces",
    rightSummary: "you give priority to material relations such as wages, property, resources, and labor control",
    leftSummaryZh: "你把语言、再现和身份分类视为主动塑造政治现实的力量",
    rightSummaryZh: "你优先关注工资、财产、资源和劳动控制等物质关系",
  },
};

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function calculateTensions(answers: number[]): TensionScores {
  const keys = Object.keys(tensionLabels) as TensionKey[];
  const totals = Object.fromEntries(keys.map((key) => [key, 0])) as TensionScores;
  const counts = Object.fromEntries(keys.map((key) => [key, 0])) as TensionScores;

  questions.forEach((question, index) => {
    const centeredAnswer = ((answers[index] ?? 3) - 3) / 2;
    totals[question.tension] += centeredAnswer * question.direction;
    counts[question.tension] += 1;
  });

  return Object.fromEntries(
    keys.map((key) => [key, totals[key] / Math.max(counts[key], 1)])
  ) as TensionScores;
}

function calculateSchools(tensions: TensionScores): SchoolScores {
  return Object.fromEntries(
    (Object.entries(schoolInfo) as [SchoolKey, SchoolInfo][]).map(([school, info]) => {
      const entries = Object.entries(info.weights) as [TensionKey, number][];
      const weightTotal = entries.reduce((sum, [, weight]) => sum + weight, 0) || 1;
      const distance = entries.reduce((sum, [key, weight]) => {
        const target = info.target[key] ?? 0;
        return sum + Math.abs(tensions[key] - target) * weight;
      }, 0) / weightTotal;
      const activation = entries.reduce(
        (sum, [key, weight]) => sum + Math.abs(tensions[key]) * weight,
        0
      ) / weightTotal;
      const fit = clamp(1 - distance / 2, 0, 1);
      return [school, Math.round(clamp(35 + fit * 45 + activation * 20))];
    })
  ) as SchoolScores;
}

function buildProfile(answers: number[], isZh: boolean): ProfileResult {
  const tensions = calculateTensions(answers);
  const schools = calculateSchools(tensions);
  const ranking = (Object.entries(schools) as [SchoolKey, number][]).sort(
    ([, a], [, b]) => b - a
  );
  const [primary, secondary] = ranking;
  const strongest = (Object.entries(tensions) as [TensionKey, number][])
    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a));
  const distinct = strongest.filter(([, value]) => Math.abs(value) >= 0.28);
  const isBalanced = distinct.length < 2;

  let summary: string;
  if (isBalanced) {
    summary = isZh
      ? `你的观点呈现出较强的复合性，目前没有被某一种解释框架明显主导。你会在${schoolInfo[primary[0]].nameZh}与${schoolInfo[secondary[0]].nameZh}之间吸收不同视角，更倾向于根据具体议题判断改革路径、压迫来源和政治主体。`
      : `Your profile is notably mixed, without one explanatory framework clearly dominating. You draw from both ${schoolInfo[primary[0]].name} and ${schoolInfo[secondary[0]].name}, tending to judge change strategies, sources of oppression, and political identity in context.`;
  } else {
    const clauses = distinct.slice(0, 3).map(([key, value]) => {
      const narrative = tensionNarratives[key];
      if (isZh) return value < 0 ? narrative.leftSummaryZh : narrative.rightSummaryZh;
      return value < 0 ? narrative.leftSummary : narrative.rightSummary;
    });

    summary = isZh
      ? `你的倾向以${schoolInfo[primary[0]].nameZh}为主，同时受到${schoolInfo[secondary[0]].nameZh}影响。${clauses[0]}；${clauses[1]}${clauses[2] ? `；同时，${clauses[2]}` : ""}。`
      : `Your profile leans primarily toward ${schoolInfo[primary[0]].name}, with an influence from ${schoolInfo[secondary[0]].name}. ${clauses[0]}; ${clauses[1]}${clauses[2] ? `; at the same time, ${clauses[2]}` : ""}.`;
  }

  const selectedSignals = (distinct.length ? distinct : strongest)
    .slice(0, 5)
    .map(([key, value]) => {
      const narrative = tensionNarratives[key];
      return {
        tag: isZh
          ? value < 0
            ? narrative.leftTagZh
            : narrative.rightTagZh
          : value < 0
            ? narrative.leftTag
            : narrative.rightTag,
        view: isZh
          ? value < 0
            ? narrative.leftViewZh
            : narrative.rightViewZh
          : value < 0
            ? narrative.leftView
            : narrative.rightView,
      };
    });

  return {
    tensions,
    schools,
    ranking,
    summary,
    tags: selectedSignals.map((signal) => signal.tag),
    views: selectedSignals.map((signal) => signal.view),
  };
}

function Results({ answers, isZh }: { answers: number[]; isZh: boolean }) {
  const profile = buildProfile(answers, isZh);
  const [primary, secondary, influence] = profile.ranking;
  const radarData = profile.ranking.map(([key, value]) => ({
    subject: isZh ? schoolInfo[key].shortZh : schoolInfo[key].short,
    value,
  }));

  const tierLabel = (index: number) => {
    if (index === 0) return isZh ? "主导流派" : "PRIMARY AFFINITY";
    if (index === 1) return isZh ? "次级流派" : "SECONDARY AFFINITY";
    return isZh ? "影响流派" : "INFLUENCE";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: paperWhite,
        padding: "clamp(1.5rem, 4vw, 3rem)",
        position: "relative",
        clipPath:
          "polygon(0 1%, 2% 0, 5% 1%, 12% 0, 20% 1.5%, 30% 0, 42% 1%, 57% 0, 72% 1%, 85% 0, 94% 1%, 100% 0, 100% 99%, 97% 100%, 92% 98.5%, 85% 100%, 77% 99%, 68% 100%, 59% 98.5%, 49% 100%, 39% 99%, 29% 100%, 20% 98.5%, 12% 100%, 5% 99%, 1% 100%, 0 99%)",
        boxShadow: "0 16px 36px rgba(17,17,17,0.12)",
      }}
    >
      <div
        style={{
          borderTop: `3px solid ${purple}`,
          borderBottom: `1px solid ${purple}`,
          padding: "0.4rem 0",
          marginBottom: "1.4rem",
        }}
      >
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: purple,
            opacity: 0.75,
          }}
        >
          {isZh
            ? "女性主义档案 — 理论张力画像 — 结果已生成"
            : "FEMINIST ARCHIVE — THEORY-TENSION PROFILE — RESULT GENERATED"}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2.8rem, 8vw, 4.4rem)",
          color: ink,
          lineHeight: 0.9,
          marginBottom: "0.8rem",
        }}
      >
        {isZh ? "你的女权主义画像" : "YOUR FEMINIST PROFILE"}
      </h3>

      <p
        style={{
          fontFamily: "'IM Fell English', serif",
          fontSize: "1.08rem",
          color: "rgba(17,17,17,0.82)",
          lineHeight: 1.8,
          marginBottom: "1.7rem",
        }}
      >
        {profile.summary}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "0.75rem",
          marginBottom: "1.75rem",
        }}
      >
        {[primary, secondary, influence].map(([key, pct], index) => (
          <div
            key={key}
            style={{
              border: `1px solid ${index === 0 ? purple : "rgba(111,0,255,0.22)"}`,
              padding: "0.9rem",
              background:
                index === 0
                  ? "rgba(111,0,255,0.06)"
                  : "rgba(111,0,255,0.025)",
              minHeight: "118px",
            }}
          >
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.16em",
                color: purple,
                opacity: 0.7,
                marginBottom: "0.45rem",
              }}
            >
              {tierLabel(index)}
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.65rem",
                color: ink,
                lineHeight: 0.95,
                marginBottom: "0.45rem",
              }}
            >
              {isZh ? schoolInfo[key].nameZh : schoolInfo[key].name}
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.9rem",
                color: purple,
              }}
            >
              {pct}%
            </div>
          </div>
        ))}
      </div>

      <ResultHeading zh="核心关注" en="CORE FOCUS" isZh={isZh} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1.75rem",
        }}
      >
        {profile.tags.map((tag) => (
          <span
            key={tag}
            style={{
              border: "1px solid rgba(111,0,255,0.22)",
              background: "rgba(111,0,255,0.06)",
              color: ink,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.64rem",
              padding: "0.42rem 0.58rem",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <ResultHeading zh="你可能认同的观点" en="VIEWS YOU MAY SHARE" isZh={isZh} />
      <div style={{ display: "grid", gap: "0.55rem", marginBottom: "1.75rem" }}>
        {profile.views.map((view, index) => (
          <div
            key={view}
            style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.62rem",
                color: purple,
                opacity: 0.6,
                flexShrink: 0,
                marginTop: "0.16rem",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: "0.84rem",
                color: "rgba(17,17,17,0.76)",
                lineHeight: 1.55,
              }}
            >
              {view}
            </span>
          </div>
        ))}
      </div>

      <ResultHeading zh="流派匹配度" en="SCHOOL AFFINITIES" isZh={isZh} />
      <div
        style={{
          height: "250px",
          border: "1px solid rgba(111,0,255,0.12)",
          background: "rgba(111,0,255,0.025)",
          marginBottom: "1rem",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke={`${purple}24`} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: purple,
                fontSize: 9,
                fontFamily: "'IBM Plex Mono', monospace",
                opacity: 0.68,
              }}
            />
            <Radar
              dataKey="value"
              stroke={purple}
              fill={purple}
              fillOpacity={0.15}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        {profile.ranking.map(([key, pct]) => (
          <div key={key} style={{ marginBottom: "0.58rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "0.22rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Special Elite', cursive",
                  fontSize: "0.78rem",
                  color: "rgba(17,17,17,0.76)",
                }}
              >
                {isZh ? schoolInfo[key].nameZh : schoolInfo[key].name}
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.66rem",
                  color: purple,
                }}
              >
                {pct}%
              </span>
            </div>
            <div style={{ height: "3px", background: "rgba(111,0,255,0.12)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, delay: 0.05 }}
                style={{ height: "100%", background: purple }}
              />
            </div>
          </div>
        ))}
      </div>

      <ResultHeading zh="七组理论张力" en="SEVEN THEORY TENSIONS" isZh={isZh} />
      {(Object.entries(profile.tensions) as [TensionKey, number][]).map(
        ([key, value]) => {
          const position = (value + 1) * 50;
          return (
            <div key={key} style={{ marginBottom: "0.7rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  marginBottom: "0.24rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.58rem",
                    color: "rgba(17,17,17,0.58)",
                  }}
                >
                  {isZh ? tensionLabels[key].leftZh : tensionLabels[key].left}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.58rem",
                    color: "rgba(17,17,17,0.58)",
                    textAlign: "right",
                  }}
                >
                  {isZh ? tensionLabels[key].rightZh : tensionLabels[key].right}
                </span>
              </div>
              <div
                style={{
                  height: "4px",
                  background: "rgba(111,0,255,0.12)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    height: "100%",
                    width: "1px",
                    background: "rgba(17,17,17,0.2)",
                  }}
                />
                <motion.div
                  initial={{ left: "50%" }}
                  animate={{ left: `${position}%` }}
                  transition={{ duration: 0.7 }}
                  style={{
                    position: "absolute",
                    top: "-4px",
                    width: "3px",
                    height: "12px",
                    background: purple,
                  }}
                />
              </div>
            </div>
          );
        }
      )}
    </motion.div>
  );
}

function ResultHeading({
  zh,
  en,
  isZh,
}: {
  zh: string;
  en: string;
  isZh: boolean;
}) {
  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.58rem",
        letterSpacing: "0.2em",
        color: purple,
        opacity: 0.65,
        marginBottom: "0.75rem",
      }}
    >
      {isZh ? zh : en}
    </div>
  );
}

export function QuizRoom() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const { isZh } = useLanguage();

  const question = questions[questionIndex];
  const progress = done ? 100 : (questionIndex / questions.length) * 100;

  const saveCurrentAnswer = () => {
    const nextAnswers = [...answers];
    if (selected !== null) nextAnswers[questionIndex] = selected;
    return nextAnswers;
  };

  const advance = () => {
    if (selected === null) return;
    const nextAnswers = saveCurrentAnswer();
    setAnswers(nextAnswers);
    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    setSelected(nextAnswers[nextIndex] ?? null);
  };

  const selectAnswer = (value: number) => {
    setSelected(value);
    if (questionIndex !== questions.length - 1) return;

    const nextAnswers = [...answers];
    nextAnswers[questionIndex] = value;
    setAnswers(nextAnswers);
    setDone(true);
  };

  const goBack = () => {
    if (questionIndex === 0) return;
    const nextAnswers = saveCurrentAnswer();
    const previousIndex = questionIndex - 1;
    setAnswers(nextAnswers);
    setQuestionIndex(previousIndex);
    setSelected(nextAnswers[previousIndex] ?? null);
  };

  const reset = () => {
    setQuestionIndex(0);
    setSelected(null);
    setDone(false);
    setAnswers([]);
  };

  const exploreMore = () => {
    document.querySelector("#lineage")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="quiz"
      style={{
        background: roomPaper,
        padding: "6rem clamp(1.25rem, 4vw, 3rem) 8rem",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "2rem",
          border: "1px solid rgba(111,0,255,0.25)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "2%",
          width: "30%",
          zIndex: 0,
          opacity: 0.1,
          transform: "rotate(1.5deg)",
        }}
      >
        <img src={cameraRays} alt="" style={{ width: "100%" }} />
      </div>

      <div
        style={{
          maxWidth: done ? "820px" : "700px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "3rem" }}
        >
          <div
            style={{
              borderTop: `3px solid ${purple}`,
              borderBottom: `1px solid ${purple}`,
              padding: "0.35rem 0",
              marginBottom: "0.3rem",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.52rem",
                letterSpacing: "0.24em",
                color: purple,
              }}
            >
              {isZh
                ? "女性主义档案 — 第三展厅 — 理论张力测评表"
                : "FEMINIST ARCHIVE — SECTION III — THEORY-TENSION FORM"}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              color: ink,
              lineHeight: 0.88,
            }}
          >
            {isZh ? "女性主义" : "FEMINIST"}
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: `1.5px ${purple}`,
              }}
            >
              {isZh ? "理论" : "THEORY"}
            </span>{" "}
            {isZh ? "测验" : "QUIZ"}
          </h2>
          <p
            style={{
              fontFamily: "'Special Elite', cursive",
              fontSize: "0.82rem",
              color: "rgba(17,17,17,0.68)",
              fontStyle: "italic",
              marginTop: "0.75rem",
            }}
          >
            {isZh
              ? "20 个理论冲突，生成你的女权主义倾向画像。"
              : "20 theoretical tensions. Generate your feminist profile."}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Results answers={answers} isZh={isZh} />
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <button onClick={reset} style={secondaryButtonStyle}>
                  <RotateCcw size={13} /> {isZh ? "重新作答" : "RETAKE"}
                </button>
                <button
                  onClick={exploreMore}
                  style={{
                    ...secondaryButtonStyle,
                    background: purple,
                    color: paperWhite,
                  }}
                >
                  {isZh ? "继续探索" : "EXPLORE MORE"} -&gt;
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`question-${questionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{ marginBottom: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.4rem",
                  }}
                >
                  <span style={progressTextStyle}>
                    {String(questionIndex + 1).padStart(2, "0")} / {questions.length}
                  </span>
                  <span style={{ ...progressTextStyle, color: purple }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div style={{ height: "1px", background: "rgba(17,17,17,0.14)" }}>
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    style={{ height: "1px", background: purple }}
                  />
                </div>
              </div>

              <div
                style={{
                  background: paperWhite,
                  border: `1px solid ${purple}`,
                  padding: "clamp(1.35rem, 4vw, 2rem)",
                  marginBottom: "1.5rem",
                  boxShadow: "10px 10px 0 rgba(111,0,255,0.18)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.25em",
                    color: purple,
                    marginBottom: "0.75rem",
                  }}
                >
                  {isZh ? "理论张力" : "THEORY TENSION"}{" "}
                  {String(questionIndex + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    height: "1px",
                    background: "rgba(17,17,17,0.14)",
                    marginBottom: "1rem",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'IM Fell English', serif",
                    fontSize: "1.12rem",
                    color: ink,
                    lineHeight: 1.65,
                  }}
                >
                  {isZh ? question.zh : question.en}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(108px, 1fr))",
                  gap: "0.55rem",
                  marginBottom: "1.5rem",
                }}
              >
                {likertLabels.map((option) => {
                  const active = selected === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => selectAnswer(option.value)}
                      style={{
                        minHeight: "86px",
                        padding: "0.75rem 0.55rem",
                        background: active ? purple : "rgba(255,255,255,0.72)",
                        border: `1px solid ${
                          active ? purple : "rgba(111,0,255,0.18)"
                        }`,
                        cursor: "pointer",
                        color: active ? paperWhite : "rgba(17,17,17,0.76)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.38rem",
                      }}
                    >
                      <span
                        style={{
                          width: "24px",
                          height: "24px",
                          border: `1px solid ${
                            active ? paperWhite : "rgba(17,17,17,0.36)"
                          }`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "0.68rem",
                          background: active ? deepPurple : "transparent",
                        }}
                      >
                        {option.value}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Special Elite', cursive",
                          fontSize: "0.72rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {isZh ? option.zh : option.en}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: questionIndex === 0 ? "flex-end" : "space-between",
                  gap: "0.75rem",
                }}
              >
                {questionIndex > 0 && (
                  <button onClick={goBack} style={secondaryButtonStyle}>
                    <ArrowLeft size={14} />
                    {isZh ? "上一题" : "PREVIOUS"}
                  </button>
                )}
                {questionIndex + 1 < questions.length && (
                  <button
                    onClick={advance}
                    disabled={selected === null}
                    style={{
                      padding: "0.68rem 1.4rem",
                      background: selected !== null ? purple : "transparent",
                      border: `1px solid ${
                        selected !== null ? purple : "rgba(111,0,255,0.18)"
                      }`,
                      color:
                        selected !== null ? paperWhite : "rgba(17,17,17,0.28)",
                      cursor: selected !== null ? "pointer" : "not-allowed",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {isZh ? "下一题 ->" : "NEXT ->"}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

const progressTextStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "0.58rem",
  letterSpacing: "0.15em",
  color: "rgba(17,17,17,0.52)",
};

const secondaryButtonStyle = {
  background: "rgba(255,255,255,0.5)",
  border: `1px solid ${purple}`,
  padding: "0.65rem 1rem",
  cursor: "pointer",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  color: purple,
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
};
