"use client";

import { motion } from "framer-motion";
import { useRef, useCallback, useState } from "react";

interface ErrorPopupProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export default function ErrorPopup({ onClose, zIndex, onFocus }: ErrorPopupProps) {
  const [position, setPosition] = useState({
    x: Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - 230),
    y: Math.max(50, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - 100),
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
        {/* Title Bar */}
        <div
          className="h-9 bg-[#3a3a3a] flex items-center justify-center cursor-default border-b border-white/[0.06]"
          onMouseDown={handleMouseDown}
        >
          <span className="text-[13px] font-medium text-white/70">Error</span>
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
              Sabi just lost her mind.<br />
              Shame she didn&apos;t have a hard drive copy.
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
            Give up and go cry
          </button>
        </div>
      </div>
    </motion.div>
  );
}
