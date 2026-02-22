
import { useI18n } from "../i18n/I18nProvider";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import LanguageToggle from "../components/LanguageToggle";



const Landing = () => {
  const { dict } = useI18n();
  const t = dict.landing;

  return (
    <div className="min-h-screen-safe flex flex-col">
      <LanguageToggle floating />
      {/* Hero Section */}
      <main 
        className="flex-1 flex items-center relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/hero-bg.jpeg)" }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-main w-full py-section relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-gutter lg:gap-12 items-center">
            {/* LEFT ZONE - Logo & Descriptor */}
            <div
              className="flex flex-col items-center text-center animate-fade-in-left"
              style={{ animationDelay: "0.1s" }}
            >
              <Logo size="hero" showText={false} variant="light" />
              <div className="mt-3">
                <div className="text-xl lg:text-2xl font-semibold text-white leading-tight">
                  {t.descriptorPrimary}
                </div>
                <div className="mt-1 text-sm text-white/70">
                  {t.descriptorSecondary}
                </div>
              </div>
            </div>
            {/* CENTER ZONE - Value Statement & CTA */}
            <div
              className="flex flex-col items-center text-center py-8 lg:py-0 lg:px-8 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-hero-title lg:text-[3.3rem] tracking-tight font-semibold text-white text-balance max-w-xl">

                {t.headline}
              </h2>
              <p className="mt-5 text-body-lg text-white/70 max-w-md text-balance">
                {t.subline}
              </p>
              <Link to="/main" className="btn-primary mt-7 text-base">
                {t.cta}
              </Link>
            </div>

            {/* RIGHT ZONE - Founder Block */}
            <div
              className="flex flex-col items-center text-center animate-fade-in-right"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-20 h-28 rounded-full border border-white/40 overflow-hidden">
                <img
                  src="/founder.jpg"
                  alt="Founder"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="mt-3 font-medium text-white text-base">
                {t.founder.name}
              </h3>
              <p className="text-sm text-white/60">
                {t.founder.title}
              </p>
              <p className="mt-3 text-sm text-white/70 max-w-[260px] leading-relaxed">
                {t.founder.bio}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
