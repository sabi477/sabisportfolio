"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";

export default function MenuBar() {
  const { locale, t } = useLocale();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const localeTag = locale === "tr" ? "tr-TR" : "en-US";

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(localeTag, {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setDate(
        now.toLocaleDateString(localeTag, {
          day: "numeric",
          month: "short",
          weekday: "short",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [localeTag]);

  const leftItems = [
    { label: "", isApple: true },
    { label: "Safari", bold: true },
    { label: t("menuFile") },
    { label: t("menuEdit") },
    { label: t("menuView") },
    { label: t("menuHistory") },
    { label: t("menuBookmarks") },
    { label: t("menuDevelopment") },
    { label: t("menuWindow") },
    { label: t("menuHelp") },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-[25px] bg-black/40 backdrop-blur-2xl z-[10000] flex items-center justify-between px-4 text-white/90 text-[13px] select-none">
      <div className="flex items-center gap-5">
        {leftItems.map((item, i) => (
          <span
            key={i}
            className={`cursor-default hover:bg-white/10 px-1.5 py-0.5 rounded-[3px] transition-colors leading-none ${
              item.bold ? "font-semibold" : "font-normal"
            }`}
          >
            {item.isApple ? (
              <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            ) : (
              item.label
            )}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* System tray icons */}
        <div className="flex items-center gap-2.5 text-white/80">
          <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
          </svg>
          <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v3h2V4h16v16H4v-3H2v3c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16l-1.41-1.41L15.17 14H2v-4h13.17l-2.58-2.59L14 6l5 6-5 6z" />
          </svg>
        </div>

        <span className="text-[13px] font-normal cursor-default">
          {date} {time}
        </span>
      </div>
    </div>
  );
}
