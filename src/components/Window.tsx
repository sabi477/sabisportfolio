"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import { useState, useRef, useCallback, useEffect } from "react";
import { useLocale } from "@/i18n/useLocale";

interface WindowProps {
  project: Project;
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export default function Window({
  project,
  onClose,
  zIndex,
  onFocus,
}: WindowProps) {
  const { locale, t } = useLocale();
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 620, height: 560 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const clampPosition = useCallback(
    (x: number, y: number) => {
      const padding = 8;
      const maxX = Math.max(0, window.innerWidth - size.width - padding);
      const maxY = Math.max(0, window.innerHeight - size.height - padding);
      return {
        x: Math.max(padding, Math.min(maxX, x)),
        y: Math.max(padding, Math.min(maxY, y)),
      };
    },
    [size.width, size.height]
  );

  useEffect(() => {
    const updateSize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const w = Math.min(window.innerWidth - 16, 620);
        const h = Math.min(window.innerHeight * 0.85, 560);
        setSize({ width: w, height: h });
      } else {
        setSize({ width: 620, height: 560 });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const syncBounds = () => {
      setPosition((prev) => clampPosition(prev.x, prev.y));
    };
    window.addEventListener("resize", syncBounds);
    return () => window.removeEventListener("resize", syncBounds);
  }, [clampPosition]);

  useEffect(() => {
    const x = Math.max(0, (window.innerWidth - size.width) / 2);
    const y = Math.max(0, (window.innerHeight - size.height) / 2);
    setPosition({ x, y });
  }, [size.width, size.height]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return;
      isDragging.current = true;
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      onFocus();

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const next = clampPosition(
          e.clientX - dragStart.current.x,
          e.clientY - dragStart.current.y
        );
        setPosition(next);
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [isMaximized, position, onFocus, clampPosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isMaximized) return;
      const touch = e.touches[0];
      if (!touch) return;
      isDragging.current = true;
      dragStart.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      };
      onFocus();

      const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging.current || !e.touches[0]) return;
        e.preventDefault();
        const t = e.touches[0];
        const next = clampPosition(
          t.clientX - dragStart.current.x,
          t.clientY - dragStart.current.y
        );
        setPosition(next);
      };

      const handleTouchEnd = () => {
        isDragging.current = false;
        window.removeEventListener("touchmove", handleTouchMove, { capture: true });
        window.removeEventListener("touchend", handleTouchEnd);
      };

      window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
      window.addEventListener("touchend", handleTouchEnd);
    },
    [isMaximized, position, onFocus, clampPosition]
  );

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const handleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMinimized(true);
    setTimeout(() => setIsMinimized(false), 500);
  }, []);

  const handleMaximize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMaximized((prev) => !prev);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !isMinimized && (
        <motion.div
          className="absolute rounded-xl overflow-hidden"
          style={{
            zIndex,
            left: isMaximized ? 0 : position.x,
            top: isMaximized ? 0 : position.y,
            width: isMaximized ? "100vw" : size.width,
            height: isMaximized ? "100vh" : size.height,
            boxShadow: "0 12px 40px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.1)",
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.8,
          }}
          onMouseDown={onFocus}
        >
          <div className="w-full h-full flex flex-col bg-[#f5f0eb]/95 backdrop-blur-xl border border-black/10 rounded-xl overflow-hidden">
            {/* Title Bar */}
            <div
              className="flex items-center h-12 bg-[#e8e0d8]/80 border-b border-black/5 cursor-default shrink-0 min-h-12 touch-none"
              style={{ paddingLeft: "12px", paddingRight: "12px" }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* Traffic Lights */}
              <div className="flex items-center gap-2 shrink-0 md:ml-1 md:mr-4" onMouseDown={(e) => e.stopPropagation()}>
                <button
                  onMouseDown={handleClose}
                  className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors shadow-inner flex items-center justify-center group cursor-pointer touch-manipulation"
                >
                  <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none">
                    <path d="M1 1L5 5M5 1L1 5" stroke="#4a0000" strokeWidth="1.2" />
                  </svg>
                </button>
                <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-inner" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-inner" />
              </div>

              <div className="flex-1 flex items-center justify-center gap-2 min-w-0 px-1">
                <span className="text-[12px] md:text-[13px] font-medium text-[#3d3329]/80 tracking-tight truncate">
                  {t("informationAbout")} {locale === "tr" && project.nameTr ? project.nameTr : project.name}
                </span>
              </div>

              <div className="w-2 md:w-[52px] shrink-0" />
            </div>

            {/* Window Content */}
            <div
              className="flex-1 overflow-auto"
              style={{ padding: "clamp(16px, 4vw, 32px) clamp(20px, 5vw, 40px)" }}
            >
              <div className="flex flex-col" style={{ gap: "24px" }}>
                {/* Project Header */}
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-xl shrink-0 shadow-md overflow-hidden"
                    style={{ backgroundColor: project.iconImage ? "transparent" : project.previewColor }}
                  >
                    {project.iconImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={project.iconImage} alt={project.name} className="w-full h-full object-cover" draggable={false} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-7 h-7 rounded bg-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="pt-1">
                    <h2 className="text-[16px] font-semibold text-[#2c2419] leading-tight">
                      {locale === "tr" && project.nameTr ? project.nameTr : project.name}
                    </h2>
                    <p className="text-[13px] text-[#6b5d4f] mt-1">
                      Sabiha
                    </p>
                  </div>
                </div>

                <p className="text-[14px] text-[#4a3f34] leading-relaxed">
                  {locale === "tr" && project.descriptionTr ? project.descriptionTr : project.description}
                </p>

                <div>
                  <h3 className="text-[11px] font-bold text-[#6b5d4f] uppercase tracking-wider mb-2">
                    {t("details")}
                  </h3>
                  <p className="text-[14px] text-[#4a3f34]">
                    {t("typeLabel")} {project.type} &gt; {project.category}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-medium text-[#3478f6] hover:underline"
                    >
                      {project.link.startsWith("mailto:") ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {t("sayHi")}
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {t("visitSite")}
                        </>
                      )}
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-[#6b5d4f] uppercase tracking-wider mb-3">
                    {project.folderItems ? t("content") : t("preview")}
                  </h3>
                  {project.folderItems && project.folderItems.length > 0 ? (
                    <div className="rounded-lg border border-black/8 bg-[#f0ebe4]/60 overflow-hidden">
                      <div className="flex flex-col">
                        {project.folderItems.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 px-3 py-2.5 border-b border-black/5 last:border-b-0 hover:bg-[#e8e0d8]/50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 bg-[#6b5d4f]/15">
                              <svg className="w-4 h-4 text-[#6b5d4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                              </svg>
                            </div>
                            <span className="text-[13px] font-medium text-[#3d3329] font-mono">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : project.gallery && project.gallery.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {project.gallery.map((img, i) => (
                        <div key={i} className="relative w-full rounded-lg overflow-hidden shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={`${project.name} - ${i + 1}`}
                            className="w-full rounded-lg"
                            style={{ filter: project.comingSoon ? "blur(12px)" : "none" }}
                            draggable={false}
                          />
                          {project.comingSoon && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                              <span className="text-white text-[18px] font-bold tracking-wide drop-shadow-lg">
                                {t("comingSoon")}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="w-full h-52 rounded-lg overflow-hidden shadow-inner"
                      style={{ backgroundColor: project.iconImage ? "transparent" : project.previewColor }}
                    >
                      {project.iconImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={project.iconImage}
                          alt={project.name}
                          className="w-full h-full object-contain"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="flex flex-col items-center gap-3 text-white/30">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-xs font-medium">{project.name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
