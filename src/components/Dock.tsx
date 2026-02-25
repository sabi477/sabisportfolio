"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";
import type { TranslationKey } from "@/i18n/translations";

interface DockItem {
  id: string;
  labelKey: TranslationKey;
  iconSrc: string;
  imgScale: number;
  href?: string;
}

const dockItems: DockItem[] = [
  { id: "app", labelKey: "dockPortfolio", iconSrc: "/app-icon.png", imgScale: 1.0 },
  { id: "figma", labelKey: "dockFigma", iconSrc: "/figma-icon.webp", imgScale: 1.5 },
  { id: "spotify", labelKey: "dockSpotify", iconSrc: "/spoti-icon.png", imgScale: 1.05 },
  { id: "error", labelKey: "dockAlerts", iconSrc: "/error-icon.webp", imgScale: 1.0 },
  { id: "notes", labelKey: "dockNotes", iconSrc: "/note-icon.webp", imgScale: 1.0 },
  { id: "photos", labelKey: "dockPhotos", iconSrc: "/photos-icon.webp", imgScale: 1.0 },
  { id: "instagram", labelKey: "dockInstagram", iconSrc: "/insta-icon.webp", imgScale: 1.0, href: "https://www.instagram.com/heyiamsabi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { id: "mail", labelKey: "dockMail", iconSrc: "/mail-icon.webp", imgScale: 1.0, href: "mailto:sabihaecemylmaz@gmail.com" },
  { id: "trash", labelKey: "dockTrash", iconSrc: "/bin-icon.webp", imgScale: 0.9 },
];

const SEPARATOR_AFTER = new Set(["spotify", "photos"]);

const BASE = 50;
const MAX = 78;
const BASE_MOBILE = 40;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return isMobile;
}

function DockIcon({
  item,
  mouseX,
  onAction,
  label,
  isMobile,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  onAction?: (id: string) => void;
  label: string;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    if (isMobile) return 300;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 300;
    return val - rect.x - rect.width / 2;
  });

  const size = useSpring(
    useTransform(distance, [-200, 0, 200], [BASE, MAX, BASE]),
    { stiffness: 350, damping: 25, mass: 0.5 }
  );

  const y = useSpring(
    useTransform(distance, [-200, 0, 200], [0, -26, 0]),
    { stiffness: 350, damping: 25, mass: 0.5 }
  );

  const mobileSize = BASE_MOBILE;

  return (
    <motion.div
      ref={ref}
      className="relative group shrink-0"
      style={
        isMobile
          ? { width: mobileSize, height: mobileSize }
          : { width: size, height: size, y }
      }
    >
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10 hidden md:block">
        <div className="bg-black/90 text-white text-[11px] font-medium px-2.5 py-1.5 rounded whitespace-nowrap shadow-lg">
          {label}
        </div>
        <div className="w-2 h-2 bg-black/90 rotate-45 mx-auto -mt-1" />
      </div>

      <motion.div
        className="w-full h-full cursor-pointer overflow-hidden rounded-[11px] touch-manipulation"
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => {
          if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
          else if (onAction) onAction(item.id);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.iconSrc}
          alt={label}
          draggable={false}
          className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${item.imgScale})`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Dock({ onAction }: { onAction?: (id: string) => void }) {
  const { t } = useLocale();
  const mouseX = useMotionValue(Infinity);
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="fixed bottom-2 left-0 right-0 z-[9999] md:left-1/2 md:right-auto md:-translate-x-1/2 px-2 md:px-0 pb-safe"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
    >
      <div
        className={`flex items-end gap-[6px] rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.25)] max-w-full md:max-w-none ${isMobile ? "justify-start overflow-x-auto scrollbar-hide" : "justify-center overflow-visible"}`}
        style={
          isMobile
            ? {
                padding: "6px 14px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }
            : { padding: "8px 20px" }
        }
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockItems.map((item) => (
          <div key={item.id} className="flex items-end gap-[6px] shrink-0">
            <DockIcon item={item} mouseX={mouseX} onAction={onAction} label={t(item.labelKey)} isMobile={isMobile} />
            {SEPARATOR_AFTER.has(item.id) && (
              <div
                className="w-px bg-white/20 rounded-full shrink-0 hidden md:block"
                style={{ height: (isMobile ? BASE_MOBILE : BASE) * 0.65, marginBottom: 3 }}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
