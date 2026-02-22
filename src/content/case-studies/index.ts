export type CaseStudyMeta = {
  slug: string;
  title: { en: string; he: string };
  industry: { en: string; he: string };
  focus: { en: string; he: string };
  teaser: { en: string; he: string };
  result: { en: string; he: string };
};

export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    slug: "automation-using-existing-equipment",
    title: {
      en: "Effective Automation Using Existing Equipment",
      he: "אוטומציה אפקטיבית באמצעות ציוד קיים",
    },
    industry: {
      en: "Agrifood Processing",
      he: "עיבוד מזון חקלאי",
    },
    focus: {
      en: "Throughput Optimization with Legacy Systems",
      he: "שיפור תפוקות במערכות ותיקות",
    },
    teaser: {
      en: "Closed-loop control using only existing hardware where sensors/vendor options were not viable.",
      he: "בקרה סגורה תוך שימוש בציוד קיים בלבד, במצבים בהם חיישנים או פתרונות ספק לא היו ישימים.",
    },
    result: {
      en: "+6% daily throughput",
      he: "+6% תפוקה יומית",
    },
  },
  {
    slug: "chemical-plant-turnaround",
    title: {
      en: "Chemical Plant Turnaround",
      he: "הבראת מפעל כימי",
    },
    industry: {
      en: "Chemical Manufacturing",
      he: "תעשייה כימית",
    },
    focus: {
      en: "Capacity Recovery and System Synchronization",
      he: "שיקום קיבולת וסנכרון המערכת",
    },
    teaser: {
      en: "Recovered capacity after a forced shutdown of one parallel line by synchronizing the system and removing hidden constraints.",
      he: "שיקום קיבולת לאחר השבתה כפויה של אחד הקווים המקבילים באמצעות סנכרון המערכת והסרת מגבלות נסתרות.",
    },
    result: {
      en: "400 → 750 tons/day (~$150K)",
      he: "400 → 750 טון/יום (~$150K)",
    },
  },
  {
    slug: "power-of-data-case-study-yeda",
    title: {
      en: "The Power of Data",
      he: "כוחו של המידע",
    },
    industry: {
      en: "Agri-food Manufacturing",
      he: "תעשיית מזון חקלאי",
    },
    focus: {
      en: "Steam System Efficiency and Operational Planning",
      he: "יעילות מערכת קיטור ותכנון תפעולי",
    },
    teaser: {
      en: "Measurement and planning enabled energy optimization, supported by SCADA/MES visibility and execution discipline.",
      he: "מדידה ותכנון אפשרו אופטימיזציה אנרגטית, בתמיכת נראות SCADA/MES ומשמעת ביצוע.",
    },
    result: {
      en: "15% fuel reduction per ton",
      he: "15% הפחתת דלק לטון",
    },
  },
  {
    slug: "refining-system-case-study-yeda",
    title: {
      en: "Refining System Redesign",
      he: "תכנון מחדש של מערכת רפיינינג",
    },
    industry: {
      en: "Paper Manufacturing",
      he: "ייצור נייר",
    },
    focus: {
      en: "Mechanical Pulp Processing Optimization",
      he: "אופטימיזציה לעיבוד עיסת נייר מכנית",
    },
    teaser: {
      en: "Fiber-science-driven reconfiguration corrected a silent process misalignment and unlocked quality/cost flexibility.",
      he: "תצורה מחדש בהובלת מדע הסיבים תיקנה חוסר התאמה תהליכי סמוי ופתחה גמישות באיכות/עלות.",
    },
    result: {
      en: "Quality + cost platform shift",
      he: "קפיצת מדרגה באיכות ובעלות",
    },
  },
];
