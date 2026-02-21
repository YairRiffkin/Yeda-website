import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import { CASE_STUDIES } from "../content/case-studies";
import ReactMarkdown from "react-markdown";
import { getCaseStudyMarkdown } from "../content/case-studies/markdown";
import { X } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const meta = CASE_STUDIES.find((c) => c.slug === slug);
  const md = slug ? getCaseStudyMarkdown(slug) : null;
  const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
  const { lang } = useI18n();
  const cs = (v: { en: string; he: string }) => (lang === "he" ? v.he : v.en);

  if (!meta) {
    return (
        <div dir={lang === "he" ? "rtl" : "ltr"} className="min-h-screen-safe flex flex-col">
        <main className="flex-none pt-5 pb-0 lg:pt-6 lg:pb-0">
          <div className="container-main">
            <Link
              to="/main"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <div className="card-elevated p-4 lg:p-5">
              <h1 className="text-section-title">Case study not found</h1>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen-safe flex flex-col">
      <main className="flex-none pt-5 pb-0 lg:pt-6 lg:pb-0">
        <div className="container-main">
          <Link
            to="/main"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          {isDesktop ? (
            <>
              {/* Modal overlay */}
              <div dir={lang === "he" ? "rtl" : "ltr"} className="fixed inset-0 z-50">
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-start justify-center p-4 md:p-8">
                  <div className="card-elevated w-full max-w-4xl max-h-[85vh] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                      <div className="min-w-0">
                        <h1 className="text-lg font-semibold truncate">{cs(meta.title)}</h1>
                        <p className="text-xs text-muted-foreground truncate">
                          {cs(meta.industry)} • {cs(meta.focus)}
                        </p>
                      </div>

                      <Link
                        to="/main"
                        className="inline-flex items-center justify-center rounded-md p-2 hover:bg-muted transition-colors"
                        aria-label="Close"
                      >
                        <X size={18} />
                      </Link>
                    </div>
                    <div
                      dir="ltr"
                      className={`p-4 md:p-6 overflow-y-auto max-h-[calc(85vh-56px)]
                        prose max-w-none
                        prose-ul:list-disc prose-ol:list-decimal
                        prose-li:my-1
                        prose-headings:mt-8 prose-headings:mb-4
                        prose-p:my-3
                        prose-img:my-6 prose-img:mx-auto prose-img:w-full prose-img:max-w-[720px] prose-img:h-auto
                        text-left`}
                    >
                      {md ? (
                        <ReactMarkdown
                          components={{
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
                          {md}
                        </ReactMarkdown>

                      ) : (
                        <p className="text-sm text-muted-foreground">Markdown not found for this case study.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Mobile normal page */
            <section className="card-elevated p-4 lg:p-6">
              <h1 className="text-2xl font-semibold tracking-tight">{cs(meta.title)}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {cs(meta.industry)} • {cs(meta.focus)}
              </p>

              <div 
                  dir="ltr"
                  className="mt-6 
                            prose max-w-none
                            prose-ul:list-disc prose-ol:list-decimal
                            prose-li:my-1
                            prose-headings:mt-8 prose-headings:mb-4
                            prose-p:my-3
                            prose-img:my-6 prose-img:mx-auto prose-img:w-full prose-img:max-w-[720px] prose-img:h-auto"
              >
                {md ? (
                  <ReactMarkdown>{md}</ReactMarkdown>
                ) : (
                  <p className="text-sm text-muted-foreground">Markdown not found for this case study.</p>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
