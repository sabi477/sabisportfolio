"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";

interface PhotosWindowProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

const photos = [
  "/IMG_9444.jpeg",
  "/IMG_7281.jpeg",
  "/IMG_6406.jpeg",
  "/IMG_2267.jpeg",
  "/IMG_7307.jpg",
];

export default function PhotosWindow({ onClose, zIndex, onFocus }: PhotosWindowProps) {
  const [position, setPosition] = useState({
    x: Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - 300),
    y: Math.max(30, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - 260),
  });
  const [selected, setSelected] = useState<number | null>(null);
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
        width: 600,
        height: 520,
        boxShadow: "0 12px 40px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.1)",
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
      onMouseDown={onFocus}
    >
      <div className="w-full h-full flex flex-col bg-[#1e1e1e] rounded-xl overflow-hidden">
        {/* Title Bar */}
        <div
          className="flex items-center h-12 bg-[#2a2a2a] border-b border-white/[0.06] cursor-default shrink-0"
          style={{ padding: "0 20px" }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2" style={{ marginLeft: "4px" }} onMouseDown={(e) => e.stopPropagation()}>
            <button
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onClose(); }}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors shadow-inner flex items-center justify-center group cursor-pointer"
            >
              <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none">
                <path d="M1 1L5 5M5 1L1 5" stroke="#4a0000" strokeWidth="1.2" />
              </svg>
            </button>
            <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-inner" />
          </div>

          <div className="flex-1 flex items-center justify-center">
            <span className="text-[13px] font-medium text-white/60 tracking-tight">
              Photos
            </span>
          </div>

          <div className="w-[52px]" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto" style={{ padding: "20px" }}>
          {selected !== null ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="flex-1 flex items-center justify-center w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos[selected]}
                  alt={`Photo ${selected + 1}`}
                  className="max-w-full max-h-full rounded-lg object-contain"
                  draggable={false}
                />
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-[12px] text-white/50 hover:text-white/80 transition-colors"
                style={{ padding: "6px 16px" }}
              >
                ← Tüm Fotoğraflar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelected(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`Photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
