"use client";

import { useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";

export default function SetLocaleLang() {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
