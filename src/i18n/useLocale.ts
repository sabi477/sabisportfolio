"use client";

import { useState, useEffect, useMemo } from "react";
import { translations, type Locale, type TranslationKey } from "./translations";

function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const lang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
  return lang.startsWith("tr") ? "tr" : "en";
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  const t = useMemo(() => (key: TranslationKey) => translations[locale][key], [locale]);
  return { locale, t };
}
