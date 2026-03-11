import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import Footer from "../components/Footer";

const content = {
  en: {
    back: "Back",
    title: "Privacy Policy",
    lastUpdated: "Last updated: 2026",
    sections: [
      {
        heading: "Introduction",
        body: "Yeda Solutions respects your privacy and is committed to protecting personal information collected through this website.",
      },
      {
        heading: "Information We Collect",
        body: "When you contact us through this website, we may collect information such as your name, email address, and the content of your message. Additionally, our hosting provider automatically records standard server log data such as IP addresses, browser type, and visit timestamps.",
      },
      {
        heading: "How We Use Information",
        body: "The information provided is used solely to respond to inquiries, provide services, or communicate with visitors regarding professional matters. We do not use your information for marketing purposes without your consent.",
      },
      {
        heading: "Data Sharing",
        body: "We do not sell, trade, or share personal information with third parties except when required by law.",
      },
      {
        heading: "Data Security",
        body: "Reasonable technical and organizational measures are taken to protect personal information submitted through this website.",
      },
      {
        heading: "External Services",
        body: "This website may use standard hosting or analytics services which may collect anonymous technical information such as browser type or visit statistics. These services are governed by their own privacy policies.",
      },
      {
        heading: "Your Rights",
        body: "You may request access to, correction of, or deletion of personal data we hold about you by contacting us at the address below.",
      },
      {
        heading: "Contact",
        body: "For questions regarding this policy, please contact: yair.riffkin@gmail.com",
      },
    ],
  },
  he: {
    back: "חזרה",
    title: "מדיניות פרטיות",
    lastUpdated: "עודכן לאחרונה: 2026",
    sections: [
      {
        heading: "מבוא",
        body: "ידע פתרונות מכבדת את פרטיותכם ומחויבת להגנה על המידע האישי הנאסף באמצעות אתר זה.",
      },
      {
        heading: "המידע שאנו אוספים",
        body: "כאשר אתם פונים אלינו דרך האתר, אנו עשויים לאסוף מידע כגון שמכם, כתובת האימייל שלכם ותוכן הפנייה. בנוסף, ספק האחסון שלנו רושם באופן אוטומטי נתוני לוג שרת סטנדרטיים כגון כתובות IP, סוג הדפדפן וחותמות זמן של ביקורים.",
      },
      {
        heading: "השימוש במידע",
        body: "המידע המסופק משמש אך ורק למענה לפניות, לאספקת שירותים או לתקשורת עם מבקרים בעניינים מקצועיים. אנו לא משתמשים במידע שלכם למטרות שיווק ללא הסכמתכם.",
      },
      {
        heading: "שיתוף מידע",
        body: "אנו לא מוכרים, סוחרים או משתפים מידע אישי עם צדדים שלישיים, אלא כאשר הדבר נדרש על פי חוק.",
      },
      {
        heading: "אבטחת מידע",
        body: "ננקטים אמצעים טכניים וארגוניים סבירים להגנה על המידע האישי המועבר דרך אתר זה.",
      },
      {
        heading: "שירותים חיצוניים",
        body: "אתר זה עשוי להשתמש בשירותי אחסון או אנליטיקה סטנדרטיים שעשויים לאסוף מידע טכני אנונימי כגון סוג הדפדפן או סטטיסטיקות ביקור. שירותים אלה כפופים למדיניות הפרטיות שלהם.",
      },
      {
        heading: "הזכויות שלכם",
        body: "באפשרותכם לבקש גישה, תיקון או מחיקה של מידע אישי שאנו מחזיקים עליכם, על ידי פנייה אלינו בכתובת המופיעה להלן.",
      },
      {
        heading: "יצירת קשר",
        body: "לשאלות בנוגע למדיניות זו, פנו אלינו: yair.riffkin@gmail.com",
      },
    ],
  },
};

const PrivacyPolicy = () => {
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

export default PrivacyPolicy;
