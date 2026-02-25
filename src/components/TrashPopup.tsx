"use client";

import { motion } from "framer-motion";
import { useRef, useCallback, useState } from "react";
import { useLocale } from "@/i18n/useLocale";

interface TrashPopupProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export default function TrashPopup({ onClose, zIndex, onFocus }: TrashPopupProps) {
  const { t } = useLocale();
  const [position, setPosition] = useState({
    x: Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - 190),
    y: Math.max(50, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - 120),
  });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
      onFocus();
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        setPosition({ x: e.clientX - dragStart.current.x, y: Math.max(0, e.clientY - dragStart.current.y) });
      };
      const handleMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [position, onFocus]
  );

  return (
    <motion.div
      className="absolute rounded-xl overflow-hidden"
      style={{
        zIndex,
        left: position.x,
        top: position.y,
        width: 380,
        boxShadow: "0 16px 50px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.3)",
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.7 }}
      onMouseDown={onFocus}
    >
      <div className="rounded-xl overflow-hidden bg-[#2d2d2d] text-white">
        <div
          className="h-9 bg-[#3a3a3a] flex items-center justify-center cursor-default border-b border-white/[0.06]"
          onMouseDown={handleMouseDown}
        >
          <span className="text-[13px] font-medium text-white/70">{t("trash")}</span>
        </div>

        <div className="flex items-start gap-5" style={{ padding: "24px 28px 20px" }}>
          <div className="shrink-0 text-3xl">🗑️</div>
          <div className="flex-1">
            <p className="text-[15px] leading-relaxed text-white/90">
              {t("trashMessage1")}<br />
              {t("trashMessage2")}
            </p>
          </div>
        </div>

        <div className="flex justify-end" style={{ padding: "0 28px 22px" }}>
          <button
            onClick={onClose}
            className="bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white text-[13px] font-medium rounded-md transition-colors"
            style={{ padding: "10px 24px" }}
          >
            {t("trashButton")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
