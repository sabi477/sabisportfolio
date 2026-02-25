"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";

interface HelloWorldWindowProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

const TEXT = "hello world";
const TYPING_DELAY_MS = 120;
const CURSOR_BLINK_MS = 530;
const WIDTH = 420;
const HEIGHT = 240;

export default function HelloWorldWindow({ onClose, zIndex, onFocus }: HelloWorldWindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visibleLength, setVisibleLength] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: Math.max(0, (window.innerWidth - WIDTH) / 2),
      y: Math.max(0, (window.innerHeight - HEIGHT) / 2),
    });
  }, []);

  useEffect(() => {
    if (visibleLength >= TEXT.length) return;
    const t = setTimeout(() => setVisibleLength((n) => n + 1), TYPING_DELAY_MS);
    return () => clearTimeout(t);
  }, [visibleLength]);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), CURSOR_BLINK_MS);
    return () => clearInterval(id);
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
      <div className="rounded-xl overflow-hidden bg-[#1e1e1e] text-[#d4d4d4]">
        <div
          className="h-9 bg-[#323233] flex items-center cursor-default border-b border-white/[0.06]"
          style={{ paddingLeft: "16px", paddingRight: "16px" }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2" style={{ marginLeft: "4px", marginRight: "16px" }} onMouseDown={(e) => e.stopPropagation()}>
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
            <span className="text-[12px] font-medium text-white/70">hello_world</span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div className="font-mono text-[14px] min-h-[120px]" style={{ padding: "24px 20px" }}>
          <span>{TEXT.slice(0, visibleLength)}</span>
          <span
            className="inline-block w-[8px] h-4 ml-0.5 align-middle bg-[#aeafad]"
            style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }}
            aria-hidden
          />
        </div>
      </div>
    </motion.div>
  );
}
