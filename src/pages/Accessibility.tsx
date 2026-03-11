import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import Footer from "../components/Footer";

const content = {
  en: {
    back: "Back",
    title: "Accessibility Statement",
    lastUpdated: "Last updated: 2026",
    sections: [
      {
        heading: "Our Commitment",
        body: "Yeda Solutions is committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We strive to ensure that our digital services meet the needs of all users.",
      },
      {
        heading: "Accessibility Standards",
        body: "This website strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with disabilities.",
      },
      {
        heading: "Measures Taken",
        body: "We have implemented the following accessibility features: clear and consistent navigation structure; sufficient color contrast between text and background; responsive design that works across desktop and mobile devices; semantic HTML to support screen readers; text alternatives for meaningful images.",
      },
      {
        heading: "Known Limitations",
        body: "While we strive for full accessibility, some content may not yet meet all guidelines. We continuously work to identify and address accessibility barriers.",
      },
      {
        heading: "Feedback and Contact",
        body: "We welcome feedback on the accessibility of this website. If you experience barriers or require content in an accessible format, please contact us at yair.riffkin@gmail.com. We will make every reasonable effort to respond and address your request promptly.",
      },
      {
        heading: "Regulatory Framework",
        body: "This statement is provided in accordance with the Israeli Equal Rights for Persons with Disabilities Law, 5758-1998 and its regulations, as well as European accessibility standards applicable to visitors from the EU.",
      },
    ],
  },
  he: {
    back: "חזרה",
    title: "הצהרת נגישות",
    lastUpdated: "עודכן לאחרונה: 2026",
    sections: [
      {
        heading: "המחויבות שלנו",
        body: "ידע פתרונות מחויבת לספק אתר נגיש לקהל הרחב ביותר האפשרי, ללא תלות בטכנולוגיה או ביכולת. אנו שואפים להבטיח שהשירותים הדיגיטליים שלנו עונים על צרכי כלל המשתמשים.",
      },
      {
        heading: "תקני נגישות",
        body: "אתר זה שואף לעמוד בהנחיות WCAG 2.1 ברמה AA (Web Content Accessibility Guidelines). הנחיות אלו מפרטות כיצד להנגיש תכני אינטרנט לאנשים עם מוגבלויות.",
      },
      {
        heading: "אמצעים שננקטו",
        body: "יישמנו את תכונות הנגישות הבאות: מבנה ניווט ברור ועקבי; ניגודיות צבע מספקת בין טקסט לרקע; עיצוב רספונסיבי המתאים למחשב ולמכשירים ניידים; HTML סמנטי לתמיכה בקוראי מסך; חלופות טקסט לתמונות משמעותיות.",
      },
      {
        heading: "מגבלות ידועות",
        body: "למרות שאנו שואפים לנגישות מלאה, ייתכן שחלק מהתכנים אינם עומדים עדיין בכל ההנחיות. אנו פועלים באופן מתמשך לאיתור וטיפול במחסומי נגישות.",
      },
      {
        heading: "משוב ויצירת קשר",
        body: "אנו מברכים על משוב לגבי נגישות האתר. אם נתקלתם במחסומים או זקוקים לתוכן בפורמט נגיש, פנו אלינו: yair.riffkin@gmail.com. נעשה כל מאמץ סביר להגיב ולטפל בפנייתכם בהקדם.",
      },
      {
        heading: "מסגרת רגולטורית",
        body: "הצהרה זו ניתנת בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ\"ח-1998 ותקנותיו, וכן בהתאם לתקני הנגישות האירופיים החלים על מבקרים מהאיחוד האירופי.",
      },
    ],
  },
};

const Accessibility = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const c = content[lang];

  return (
    <div className="min-h-screen flex flex-col" dir={lang === "he" ? "rtl" : "ltr"}>
      <main className="flex-1 container-main py-8 max-w-2xl mx-auto px-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {c.back}
        </button>

        <h1 className="text-2xl font-bold mb-2">{c.title}</h1>
        <p className="text-xs text-muted-foreground mb-8">{c.lastUpdated}</p>

        <div className="space-y-6">
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-base font-semibold mb-1">{s.heading}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accessibility;
