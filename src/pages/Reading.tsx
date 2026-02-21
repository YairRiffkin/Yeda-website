import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Footer from "../components/Footer";
import LanguageToggle from "../components/LanguageToggle";
import { useI18n } from "../i18n/I18nProvider";

type ReadingItem = {
  slug: string;
  title: string;
  author: string;
  category: string;
  oneLiner: string;
  myTake: string;
  publicReviewExcerpt: string;
  publicReviewSource: string;
  publicReviewUrl: string;
};

export default function Reading() {
  const { dict, lang } = useI18n();
  const t = dict.main;

  const { slug } = useParams<{ slug: string }>();

  const items = t.reading.items as ReadingItem[];
  const book = items.find((b) => b.slug === slug) ?? null;

  return (
    <div dir={lang === "he" ? "rtl" : "ltr"} className="min-h-screen-safe flex flex-col">
      <LanguageToggle />

      <main className="flex-none pt-5 pb-0 lg:pt-6 lg:pb-0">
        <div className="container-main">
          <Link
            to="/main"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            {lang === "he" ? "חזרה" : "Back"}
          </Link>

          <div className="card-elevated p-4 lg:p-6">
            {book ? (
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-semibold leading-snug">{book.title}</h1>
                  <div className="text-sm text-muted-foreground">{book.author}</div>
                  <div className="text-xs text-muted-foreground mt-1">{book.category}</div>
                </div>

                {book.oneLiner ? (
                  <p className="text-sm text-foreground/90">{book.oneLiner}</p>
                ) : null}

                {book.myTake ? (
                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      {lang === "he" ? "התרשמות" : "My take"}
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{book.myTake}</p>
                  </div>
                ) : null}

                {(book.publicReviewExcerpt || book.publicReviewUrl) ? (
                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      {lang === "he" ? "מקור" : "Source"}
                    </div>

                    {book.publicReviewExcerpt ? (
                      <p className="text-sm leading-relaxed">“{book.publicReviewExcerpt}”</p>
                    ) : null}

                    {book.publicReviewUrl ? (
                      <a
                        className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
                        href={book.publicReviewUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={14} />
                        {book.publicReviewSource || book.publicReviewUrl}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {lang === "he" ? "הספר לא נמצא." : "Book not found."}
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
