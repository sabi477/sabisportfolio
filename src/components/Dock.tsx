"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";

interface DockItem {
  id: string;
  label: string;
  iconSrc: string;
  imgScale: number;
  href?: string;
}

const dockItems: DockItem[] = [
  { id: "app", label: "Portfolio", iconSrc: "/app-icon.png", imgScale: 1.0 },
  { id: "figma", label: "Figma", iconSrc: "/figma-icon.webp", imgScale: 1.5 },
  { id: "spotify", label: "Spotify", iconSrc: "/spoti-icon.png", imgScale: 1.05 },
  { id: "error", label: "Alerts", iconSrc: "/error-icon.webp", imgScale: 1.0 },
  { id: "notes", label: "Notes", iconSrc: "/note-icon.webp", imgScale: 1.0 },
  { id: "photos", label: "Photos", iconSrc: "/photos-icon.webp", imgScale: 1.0 },
  { id: "instagram", label: "Instagram", iconSrc: "/insta-icon.webp", imgScale: 1.0, href: "https://www.instagram.com/heyiamsabi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { id: "mail", label: "Mail", iconSrc: "/mail-icon.webp", imgScale: 1.0, href: "mailto:sabihaecemylmaz@gmail.com" },
  { id: "trash", label: "Trash", iconSrc: "/bin-icon.webp", imgScale: 0.9 },
];

const SEPARATOR_AFTER = new Set(["spotify", "photos"]);

const BASE = 50;
const MAX = 78;

function DockIcon({
  item,
  mouseX,
  onAction,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  onAction?: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 300;
    return val - rect.x - rect.width / 2;
  });

  const size = useSpring(
    useTransform(distance, [-200, 0, 200], [BASE, MAX, BASE]),
    { stiffness: 350, damping: 25, mass: 0.5 }
  );

  const y = useSpring(
    useTransform(distance, [-200, 0, 200], [0, -20, 0]),
    { stiffness: 350, damping: 25, mass: 0.5 }
  );

  return (
    <motion.div
      ref={ref}
      className="relative group"
      style={{ width: size, height: size, y }}
    >
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
        <div className="bg-black/70 text-white text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap backdrop-blur-xl">
          {item.label}
        </div>
        <div className="w-2 h-2 bg-black/70 rotate-45 mx-auto -mt-1" />
      </div>

      <motion.div
        className="w-full h-full cursor-pointer overflow-hidden rounded-[11px]"
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
          alt={item.label}
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
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[9999]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
    >
      <div
        className="flex items-end gap-[6px] rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.25)]"
        style={{ padding: "8px 12px" }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockItems.map((item) => (
          <div key={item.id} className="flex items-end gap-[6px]">
            <DockIcon item={item} mouseX={mouseX} onAction={onAction} />
            {SEPARATOR_AFTER.has(item.id) && (
              <div
                className="w-px bg-white/20 rounded-full"
                style={{ height: BASE * 0.65, marginBottom: 3 }}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
