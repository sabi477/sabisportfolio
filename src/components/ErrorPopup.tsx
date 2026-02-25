"use client";

import { motion } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";

const WIDTH = 380;
const HEIGHT = 200;

interface ErrorPopupProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export default function ErrorPopup({ onClose, zIndex, onFocus }: ErrorPopupProps) {
  const { t } = useLocale();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: Math.max(0, (window.innerWidth - WIDTH) / 2),
      y: Math.max(0, (window.innerHeight - HEIGHT) / 2),
    });
  }, []);

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
        width: WIDTH,
        boxShadow: "0 16px 50px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.3)",
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.7 }}
      onMouseDown={onFocus}
    >
      <div className="rounded-xl overflow-hidden bg-[#2d2d2d] text-white">
        {/* Title Bar */}
        <div
          className="h-9 bg-[#3a3a3a] flex items-center justify-center cursor-default border-b border-white/[0.06]"
          onMouseDown={handleMouseDown}
        >
          <span className="text-[13px] font-medium text-white/70">{t("error")}</span>
        </div>

        {/* Content */}
        <div className="flex items-start gap-5" style={{ padding: "20px 24px 16px" }}>
          {/* Warning Icon */}
          <div className="shrink-0 mt-0.5">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="w-11 h-11" viewBox="0 0 48 48" fill="none">
                <path d="M24 4L2 44h44L24 4z" fill="#f5c518" stroke="#d4a800" strokeWidth="1" />
                <text x="24" y="36" textAnchor="middle" fill="#1a1a1a" fontSize="22" fontWeight="bold">!</text>
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[15px] leading-relaxed text-white/90">
              {t("errorMessage1")}<br />
              {t("errorMessage2")}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end" style={{ padding: "0 24px 20px" }}>
          <button
            onClick={onClose}
            className="bg-[#4a5ebd] hover:bg-[#5a6ecd] text-white text-[13px] font-medium rounded-md transition-colors"
            style={{ padding: "10px 24px" }}
          >
            {t("errorButton")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
