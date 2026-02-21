import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en.json";
import he from "./locales/he.json";

type Lang = "en" | "he";
type Dict = typeof en;

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  dict: Dict;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    localStorage.getItem("lang") === "he" ? "he" : "en"
  );

  useEffect(() => {
   localStorage.setItem("lang", lang);
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<I18nValue>(() => {
    const dict = (lang === "he" ? he : en) as Dict;
    const dir: "ltr" | "rtl" = lang === "he" ? "rtl" : "ltr";
    return {
      lang,
      setLang: setLangState,
      dict,
      dir,
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
