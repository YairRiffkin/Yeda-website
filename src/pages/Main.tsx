import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Mail, Linkedin, ArrowLeft, ExternalLink } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";
import LanguageToggle from "../components/LanguageToggle";
import { CASE_STUDIES } from "../content/case-studies/index";
import ReactMarkdown from "react-markdown";
import { X } from "lucide-react";
import { getCaseStudyMarkdown } from "../content/case-studies/markdown";
import { useMemo, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";




type ReadingItem = {
  slug: string;
  title: string;
  author: string;
  category: string;
  oneLiner: string;
  myTake: string;
  publicReviewExcerpt: string;
  publicReviewUrl: string;
};


const Main = () => {
  const { dict, lang } = useI18n();
  const t = dict.main;
  const cs = (v: { en: string; he: string }) => (lang === "he" ? v.he : v.en);

  const readingItems = t.reading.items as ReadingItem[];

  const [openReading, setOpenReading] = useState(false);
  const [activeReading, setActiveReading] = useState<ReadingItem | null>(null);

  const clientLogos = t.industryExperience.logos;

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  const activeMeta = activeSlug
    ? CASE_STUDIES.find((c) => c.slug === activeSlug)
    : null;

  const activeMd = useMemo(() => {
  if (!activeSlug) return null;

  const md = (getCaseStudyMarkdown(activeSlug) ?? "").replace(/\r\n/g, "\n");

    // remove optional frontmatter
    const noFrontmatter = md.replace(/^---\n[\s\S]*?\n---\n+/, "");

    // remove first markdown heading (any level)
    return noFrontmatter.replace(/^\s{0,3}#{1,6}[ \t]+.*\n+/, "");
  }, [activeSlug]);

  const [openEmail, setOpenEmail] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const EMAIL = t.contact.emailAddress;
  const GMAIL_URL = `https://mail.google.com/mail/?view=cm&to=${EMAIL}`;
  const OUTLOOK_URL = `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}`;
  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }, [EMAIL]);

  const [readingCategory, setReadingCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set(readingItems.map((b) => b.category).filter(Boolean));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [readingItems]);

  const [readingAuthor, setReadingAuthor] = useState<string>("all");

  const authors = useMemo(() => {
    const set = new Set(readingItems.map((b) => b.author).filter(Boolean));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [readingItems]);


  const filteredReadings = useMemo(() => {
    return readingItems.filter((b) => {
      const catOk = readingCategory === "all" || b.category === readingCategory;
      const authorOk = readingAuthor === "all" || b.author === readingAuthor;
      return catOk && authorOk;
    });
  }, [readingItems, readingCategory, readingAuthor]);


  return (
    <div className="min-h-screen-safe flex flex-col">
      {/* Main Content */}
      <main className="flex-none pt-5 pb-0 lg:pt-6 lg:pb-0">
        <div className="container-main">
          {!activeSlug && (
            <div className="flex justify-center mb-3 opacity-90">
              <LanguageToggle />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 mb-4 text-center">  
            {/* Left — Back */}
            <div className="flex justify-center sm:justify-start">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                <ArrowLeft size={16} className="rtl:rotate-180" />
                {t.backToHome}
              </Link>
            </div>
            {/* Center — Slogan */}
            <p className="text-sm sm:text-base font-semibold text-foreground/90">
              {t.slogan}
            </p>
            {/* Right — Contact */}
            <div className="flex justify-center sm:justify-end gap-4">
              <button
                type="button"
                onClick={() => setOpenEmail(true)}
                className="link-nav flex items-center gap-2 text-sm hover:opacity-80"
                aria-label={t.contact.emailAria}
              >
                <Mail size={18} />
                <span className="hidden sm:inline">{t.contact.emailText}</span>
              </button>
              <a
                href="https://www.linkedin.com/company/yeda-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="link-nav flex items-center gap-2 text-sm hover:opacity-80"
                aria-label={t.contact.linkedinAria}
              >
                <Linkedin size={18} />
                <span className="hidden sm:inline">
                  {t.contact.linkedinText}
                </span>
              </a>
            </div>
          </div>
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter lg:gap-8">
            {/* Founder / Vision Block */}
            <section className="card-elevated p-4 lg:p-5 lg:h-[480px]">
              <h2 className="text-section-title mb-4">{t.vision.title}</h2>
              <div className="space-y-3 text-[0.95rem] text-muted-foreground">
                <p>{t.vision.p1}</p>
                <p>{t.vision.p2}</p>
                <p>{t.vision.p3}</p>
              </div>
            </section>

            {/* Case Studies Block */}
            <section className="card-elevated p-4 lg:p-5 h-[480px]">
              <div className="h-full flex flex-col min-h-0">
                <h2 className="text-section-title mb-3">{t.caseStudies.title}</h2>
                <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
                  {CASE_STUDIES.map((study) => (
                    <div key={study.slug} className="block">
                      {isDesktop ? (
                        <button
                          type="button"
                          onClick={() => setActiveSlug(study.slug)}
                          className={`w-full ${lang === "he" ? "text-right" : "text-left"}`}
                        >
                          <div className="p-3 bg-secondary/50 rounded-md border border-border/50 hover:border-border transition-colors cursor-pointer group">
                            {/* Row 1 */}
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                {cs(study.title)}
                              </h3>

                              <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded whitespace-nowrap">
                                {cs(study.result)}
                              </span>
                            </div>

                            {/* Row 2 */}
                            <p className="mt-1 text-foreground/85 text-sm leading-relaxed">
                              {cs(study.teaser)}
                            </p>

                            {/* Row 3 */}
                            <p className="mt-2 text-xs text-foreground/65">
                              {cs(study.industry)} • {cs(study.focus)}
                            </p>
                          </div>
                        </button>
                      ) : (
                        <Link to={`/case-studies/${study.slug}`} className="block">
                          <div className="p-3 bg-secondary/50 rounded-md border border-border/50 hover:border-border transition-colors cursor-pointer group">
                            {/* same inner content */}
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                {cs(study.title)}
                              </h3>

                              <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded whitespace-nowrap">
                                {cs(study.result)}
                              </span>
                            </div>

                            <p className="mt-1 text-foreground/85 text-sm leading-relaxed">
                              {cs(study.teaser)}
                            </p>

                            <p className="mt-2 text-xs text-foreground/65">
                              {cs(study.industry)} • {cs(study.focus)}
                            </p>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Reading Recommendations Block */}
            <section className="card-elevated p-4 lg:p-5 h-[480px]">
              <div className="h-full flex flex-col min-h-0">
                <h2 className="text-section-title mb-3">{t.reading.title}</h2>
                  <Select value={readingCategory} onValueChange={setReadingCategory}>
                    <SelectTrigger className="mb-3">
                      <SelectValue placeholder={lang === "he" ? "קטגוריה: הכל" : "Category: All"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {lang === "he" ? `קטגוריה: ${c === "all" ? "הכל" : c}` : `Category: ${c === "all" ? "All" : c}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={readingAuthor} onValueChange={setReadingAuthor}>
                    <SelectTrigger className="mb-3">
                      <SelectValue
                        placeholder={lang === "he" ? "מחבר: הכל" : "Author: All"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((a) => (
                        <SelectItem key={a} value={a}>
                          {lang === "he"
                            ? `מחבר: ${a === "all" ? "הכל" : a}`
                            : `Author: ${a === "all" ? "All" : a}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ul className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
                    {filteredReadings.map((book: ReadingItem, index: number) => (
                      <li key={index}>
                        {isDesktop ? (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveReading(book);
                              setOpenReading(true);
                            }}
                            className={`w-full ${lang === "he" ? "text-right" : "text-left"} flex items-start gap-3 p-3 bg-secondary/50 rounded-md border border-border/50 hover:border-border transition-colors group`}
                          >
                            {/* inner content stays the same */}
                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-medium text-sm flex-shrink-0">
                              {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                {book.title}
                              </h3>

                              <p className="text-muted-foreground text-xs truncate">
                                {book.author} • {book.category}
                              </p>

                              <p className="text-sm font-medium text-foreground mt-1 line-clamp-3">
                                {book.myTake}
                              </p>
                            </div>

                            <ExternalLink
                              size={14}
                              className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1"
                            />
                          </button>
                        ) : (
                          <Link
                            to={`/reading/${book.slug}`}
                            className={`w-full ${lang === "he" ? "text-right" : "text-left"} flex items-start gap-3 p-3 bg-secondary/50 rounded-md border border-border/50 hover:border-border transition-colors group`}
                          >
                            {/* same inner content */}
                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-medium text-sm flex-shrink-0">
                              {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                {book.title}
                              </h3>

                              <p className="text-muted-foreground text-xs truncate">
                                {book.author} • {book.category}
                              </p>

                              <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                                {book.oneLiner}
                              </p>
                            </div>

                            <ExternalLink
                              size={14}
                              className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1"
                            />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Dialog open={openReading} onOpenChange={setOpenReading}>
                    <DialogContent
                      dir={lang === "he" ? "rtl" : "ltr"}
                      className={`max-w-3xl
                        ${lang === "he" ? "text-right [&>button]:left-4 [&>button]:right-auto" : "text-left"}
                      `}
                    >
                      <DialogHeader className={lang === "he" ? "text-right" : "text-left"}>
                        <DialogTitle className={`truncate ${lang === "he" ? "text-right" : "text-left"}`}>
                          {activeReading?.title}
                        </DialogTitle>
                        {activeReading?.author ? (
                          <div className={`text-sm text-muted-foreground truncate ${lang === "he" ? "text-right" : "text-left"}`}>
                            {activeReading.author}
                          </div>
                        ) : null}
                      </DialogHeader>
                      <div className="space-y-4">
                        {activeReading?.category ? (
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              {lang === "he" ? "קטגוריה: " : "Category: "}
                            </span>
                            {activeReading.category}
                          </div>
                        ) : null}
                        {activeReading?.myTake ? (
                          <div className="space-y-1">
                            <div className="text-xs uppercase tracking-wide text-muted-foreground">
                              {lang === "he" ? "התרשמות" : "My take"}
                            </div>
                            <p className="text-sm leading-relaxed">{activeReading.myTake}</p>
                          </div>
                        ) : null}

                        {(activeReading?.publicReviewExcerpt || activeReading?.publicReviewUrl) ? (
                          <div className="space-y-1">
                            <div className="text-xs uppercase tracking-wide text-muted-foreground">
                              {lang === "he" ? "מקור" : "Source"}
                            </div>

                            {activeReading?.publicReviewExcerpt ? (
                              <p className="text-sm leading-relaxed">“{activeReading.publicReviewExcerpt}”</p>
                            ) : null}

                            {activeReading?.publicReviewUrl ? (
                              <a
                                className="text-sm underline underline-offset-4"
                                href={activeReading.publicReviewUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {activeReading.publicReviewUrl}
                              </a>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </DialogContent>
                  </Dialog>
              </div>
            </section>

            {/* Logos / Credibility Block */}
            <section className="lg:col-span-3 border-t border-border/40 pt-3 pb-2 px-4 lg:px-5">
              <div className="flex flex-col items-center gap-2">
                {/* Title */}
                <h2 className="text-xs font-medium tracking-wide text-muted-foreground">
                  {t.industryExperience.titleLine1} {t.industryExperience.titleLine2}
                </h2>

                {/* Logos */}
                <div className="flex flex-wrap justify-center gap-2">
                  {clientLogos.map(
                    (
                      logo: {
                        src: string;
                        company: string;
                        industry: string;
                      },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="w-16 sm:w-20 lg:w-20 rounded-md border border-border/30 bg-muted/30 overflow-hidden"
                      >
                        <div className="flex h-full flex-col">
                          {/* Logo area */}
                          <div className="relative h-10 sm:h-12 lg:h-14">
                            <img
                              src={logo.src}
                              alt={logo.company}
                              className="absolute inset-0 w-full h-full object-contain p-1.5 opacity-90"
                            />
                          </div>

                          {/* Text area (fixed height inside the same tile) */}
                          <div className="flex flex-col items-center text-center leading-tight pb-1">
                            <span className="text-[7px] lg:text-[9px] font-normal text-foreground/90">
                              {logo.company}
                            </span>
                            <span className="text-[6px] lg:text-[8px] text-muted-foreground">
                              {logo.industry}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                </div>
            </section>
          </div>
        </div>
      </main>
        {isDesktop && activeSlug && (
        <div dir={lang === "he" ? "rtl" : "ltr"} className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setActiveSlug(null)}
          />

          <div className="absolute inset-0 flex items-start justify-center p-4 md:p-8">
            <div className="card-elevated w-full max-w-4xl max-h-[85vh] overflow-hidden">
              <div
                className={`flex items-center justify-between px-4 py-3 border-b border-border ${
                  lang === "he" ? "flex-row-reverse text-right" : "text-left"
                }`}
              >
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold truncate">
                    {cs(activeMeta?.title)}
                  </h2>
                  <p className="text-xs text-muted-foreground truncate">
                    {activeMeta ? `${cs(activeMeta.industry)} • ${cs(activeMeta.focus)}` : null}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSlug(null)}
                  className="inline-flex items-center justify-center rounded-md p-2 hover:bg-muted transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div
                className={`p-4 md:p-6 overflow-y-auto max-h-[calc(85vh-56px)]
                  prose max-w-none
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:my-1
                  prose-headings:mt-8 prose-headings:mb-4
                  prose-p:my-3
                  prose-img:my-6 prose-img:mx-auto prose-img:w-full prose-img:max-w-[720px] prose-img:max-w-[720px] prose-img:h-auto
                  text-left`}
                dir="ltr"
              >

                {activeMd ? (
                  <ReactMarkdown
                    components={{
                      h1: () => null,
                      h2: () => null,
                      img({ ...props }) {
                        const src = String(props.src ?? "");
                        const isTable = /\/tbl-\d+/i.test(src) || /tbl-/.test(src);

                        if (isTable) {
                          return (
                            <div className="my-6 overflow-x-auto">
                              <img
                                {...props}
                                alt={props.alt ?? ""}
                                className="h-auto max-w-none w-auto min-w-[680px] md:min-w-[820px]"
                              />
                            </div>
                          );
                        }

                        return (
                          <img
                            {...props}
                            alt={props.alt ?? ""}
                            className="my-6 mx-auto w-full max-w-[720px] h-auto"
                          />
                        );
                      },
                    }}
                  >
                    {activeMd}
                  </ReactMarkdown>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Markdown not found for this case study.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email contact modal */}
      <Dialog open={openEmail} onOpenChange={setOpenEmail}>
        <DialogContent
          dir={lang === "he" ? "rtl" : "ltr"}
          className={lang === "he" ? "text-right" : "text-left"}
        >
          <DialogHeader className={lang === "he" ? "text-right" : "text-left"}>
            <DialogTitle>{t.contact.emailModalTitle}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <p className="font-mono text-sm bg-muted px-3 py-2 rounded select-all">{EMAIL}</p>
            <div className={`flex gap-3 flex-wrap ${lang === "he" ? "flex-row-reverse" : ""}`}>
              <a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {t.contact.openInGmail}
              </a>
              <a
                href={OUTLOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {t.contact.openInOutlook}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {t.contact.openMailApp}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
              >
                {emailCopied ? t.contact.copied : t.contact.copyEmail}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Main;
