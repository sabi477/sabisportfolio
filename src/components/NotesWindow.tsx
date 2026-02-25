"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";

const MAX_WIDTH = 640;
const MAX_HEIGHT = 520;
const PADDING = 24;

interface NotesWindowProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

function getNotesSize() {
  if (typeof window === "undefined") return { width: MAX_WIDTH, height: MAX_HEIGHT };
  const w = Math.min(MAX_WIDTH, window.innerWidth - PADDING);
  const h = Math.min(MAX_HEIGHT, window.innerHeight - PADDING);
  return { width: w, height: h };
}

const skills = [
  "AI & Data Engineering",
  "Software Pipeline Architecture",
  "Web Development (Next.js, React, TypeScript)",
  "Data Analysis & Visualization",
  "Python, SQL, Machine Learning",
  "API Development & Integration",
  "Mobile App Design",
  "Prototyping & Wireframing",
  "UI/UX Design",
  "Visual Storytelling",
  "Marketplace Visuals (App Store & Google Play)",
  "Brand Identity Design",
  "Social Media Design",
  "Photography",
];

export default function NotesWindow({ onClose, zIndex, onFocus }: NotesWindowProps) {
  const { t } = useLocale();
  const [size, setSize] = useState(getNotesSize);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<"about" | "skills" | "contact">("about");
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      const s = getNotesSize();
      setSize(s);
      setPosition({
        x: Math.max(0, (window.innerWidth - s.width) / 2),
        y: Math.max(0, (window.innerHeight - s.height) / 2),
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
        width: size.width,
        height: size.height,
        boxShadow: "0 12px 40px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.1)",
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
      onMouseDown={onFocus}
    >
      <div className="w-full h-full flex flex-col bg-[#f5f0eb]/95 backdrop-blur-xl border border-black/10 rounded-xl overflow-hidden">
        {/* Title Bar */}
        <div
          className="flex items-center h-12 bg-[#e8e0d8]/80 border-b border-black/5 cursor-default shrink-0"
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
            <span className="text-[13px] font-medium text-[#3d3329]/80 tracking-tight">
              {t("notesTitle")}
            </span>
          </div>

          <div className="w-[52px]" />
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-[130px] bg-[#ebe5de]/60 border-r border-black/5 shrink-0" style={{ padding: "16px 0" }}>
            {[
              { id: "about" as const, labelKey: "aboutMe" as const },
              { id: "skills" as const, labelKey: "skills" as const },
              { id: "contact" as const, labelKey: "contact" as const },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left text-[13px] font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#d4cbc2]/60 text-[#2c2419]"
                    : "text-[#6b5d4f] hover:bg-[#d4cbc2]/30"
                }`}
                style={{ padding: "10px 20px" }}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto" style={{ padding: "32px 36px" }}>
            {activeTab === "about" && (
              <div className="flex flex-col" style={{ gap: "20px" }}>
                <p className="text-[15px] text-[#4a3f34] leading-[1.8]">
                  {t("aboutText")}
                </p>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="flex flex-col" style={{ gap: "16px" }}>
                <h3 className="text-[13px] font-bold text-[#6b5d4f] uppercase tracking-wider">
                  {t("iCanDo")}
                </h3>
                <div className="flex flex-col" style={{ gap: "10px" }}>
                  {skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f5a623] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[14px] text-[#4a3f34]">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="flex flex-col" style={{ gap: "20px" }}>
                <h3 className="text-[13px] font-bold text-[#6b5d4f] uppercase tracking-wider">
                  {t("getInTouch")}
                </h3>
                <div className="flex flex-col" style={{ gap: "14px" }}>
                  <a
                    href="mailto:sabihaecemylmaz@gmail.com"
                    className="flex items-center gap-3 text-[14px] text-[#3478f6] hover:underline"
                  >
                    <span className="text-[16px]">📧</span>
                    sabihaecemylmaz@gmail.com
                  </a>
                  <a
                    href="https://www.instagram.com/heyiamsabi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[14px] text-[#3478f6] hover:underline"
                  >
                    <span className="text-[16px]">📸</span>
                    @heyiamsabi
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
