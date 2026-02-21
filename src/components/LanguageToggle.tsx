import { useI18n } from "../i18n/I18nProvider";

export default function LanguageToggle({ floating = false }: { floating?: boolean }) {
  const { lang, setLang } = useI18n();

  return (
    <div
      className={[
        "pointer-events-auto",
        floating ? "fixed top-4 left-1/2 -translate-x-1/2 z-[9999]" : ""
      ].join(" ")}
    >
      <div dir="ltr" className="flex items-center rounded-full bg-black/40 backdrop-blur px-2 py-1">
        <button
          type="button"
          onClick={() => setLang("en")}
          aria-label="English"
          className={[
            "h-4 px-2 rounded-full text-sm grid place-items-center transition text-white",
            lang === "en" ? "bg-white/30" : "bg-black/30 hover:bg-black/50",
            ].join(" ")}
        >
          <span className="font-semibold tracking-wide">ENG</span>
        </button>

        <span className="px-1 text-white/60 select-none">
        <div className="mx-1 h-6 w-[2px] bg-white self-center" />
        </span>

        <button
          type="button"
          onClick={() => setLang("he")}
          aria-label="Hebrew"
          className={[
            "h-4 px-2 rounded-full text-sm grid place-items-center transition text-white",
            lang === "he" ? "bg-white/30" : "bg-black/30 hover:bg-black/50",
            ].join(" ")}
        >
          <span className="font-semibold tracking-wide">עבר</span>
        </button>
      </div>
    </div>
  );
}
