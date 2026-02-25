"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { useLocale } from "@/i18n/useLocale";
import type { TranslationKey } from "@/i18n/translations";

interface SpotifyWindowProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

const playlists: { name?: string; nameKey?: TranslationKey; bg: string; hasImg: boolean }[] = [
  { name: "Deadbeat", bg: "linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%)", hasImg: true },
  { name: "Daily Mix 3", bg: "linear-gradient(135deg, #8b3a3a 0%, #c45c3a 100%)", hasImg: true },
  { name: "Hamilton (Original...)", bg: "linear-gradient(135deg, #2a1a0a 0%, #4a3a1a 100%)", hasImg: true },
  { nameKey: "spotifyLikedSongs", bg: "linear-gradient(135deg, #5b4a9e 0%, #3a7bd5 100%)", hasImg: true },
  { name: "Daily Mix 1", bg: "linear-gradient(135deg, #1a3a1a 0%, #2a5a2a 100%)", hasImg: true },
  { nameKey: "spotifyTurkishPop", bg: "linear-gradient(135deg, #5a2a4a 0%, #8a3a5a 100%)", hasImg: true },
  { nameKey: "spotifySpringInDesert", bg: "linear-gradient(135deg, #4a3a2a 0%, #6a5a3a 100%)", hasImg: true },
  { nameKey: "spotifyCanozan", bg: "linear-gradient(135deg, #6a2a1a 0%, #9a4a2a 100%)", hasImg: true },
];

const sidebarAlbums = [
  { bg: "linear-gradient(135deg, #3a2a1a, #5a4a2a)" },
  { bg: "linear-gradient(135deg, #1a2a1a, #3a4a2a)" },
  { bg: "linear-gradient(135deg, #2a1a2a, #4a2a4a)" },
  { bg: "linear-gradient(135deg, #1a1a3a, #3a2a5a)" },
  { bg: "linear-gradient(135deg, #3a1a1a, #5a2a1a)" },
  { bg: "linear-gradient(135deg, #2a2a1a, #4a4a2a)" },
  { bg: "linear-gradient(135deg, #1a2a3a, #2a4a5a)" },
  { bg: "linear-gradient(135deg, #3a2a2a, #5a3a3a)" },
];

export default function SpotifyWindow({
  onClose,
  zIndex,
  onFocus,
}: SpotifyWindowProps) {
  const { t } = useLocale();
  const [position, setPosition] = useState({
    x: Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - 400),
    y: Math.max(30, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - 300),
  });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      onFocus();
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        setPosition({
          x: e.clientX - dragStart.current.x,
          y: Math.max(0, e.clientY - dragStart.current.y),
        });
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
        width: 820,
        height: 580,
        boxShadow: "0 16px 50px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.2)",
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.8 }}
      onMouseDown={onFocus}
    >
      <div className="w-full h-full flex flex-col bg-[#121212] rounded-xl overflow-hidden text-white">
        {/* Title Bar */}
        <div
          className="flex items-center h-[46px] bg-[#1a1a1a] shrink-0 cursor-default"
          style={{ padding: "0 20px" }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2" style={{ marginLeft: "4px" }} onMouseDown={(e) => e.stopPropagation()}>
            <button
              onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); onClose(); }}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors group flex items-center justify-center"
            >
              <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none">
                <path d="M1 1L5 5M5 1L1 5" stroke="#4a0000" strokeWidth="1.2" />
              </svg>
            </button>
            <button className="w-3 h-3 rounded-full bg-[#febc2e] transition-colors" />
            <button className="w-3 h-3 rounded-full bg-[#28c840] transition-colors" />
          </div>

          <div className="flex items-center gap-2 ml-5">
            <svg className="w-[14px] h-[14px] text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <svg className="w-[14px] h-[14px] text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>

            <div className="flex items-center gap-1.5 ml-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg className="w-[18px] h-[18px] text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center">
                <svg className="w-[18px] h-[18px] text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2.5">
            <svg className="w-[18px] h-[18px] text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <svg className="w-[18px] h-[18px] text-white/50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <div className="w-7 h-7 rounded-full bg-[#b08968] flex items-center justify-center text-[11px] font-bold text-white">
              S
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-[72px] bg-[#070707] flex flex-col items-center py-3 gap-2 shrink-0">
            <div className="w-10 h-10 flex items-center justify-center text-white/60 mb-0.5">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </div>
            <div className="w-10 h-10 flex items-center justify-center text-white/40 mb-0.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="w-11 h-11 rounded-lg overflow-hidden" style={{ background: "linear-gradient(135deg, #7b4fc4, #4a9bd9)" }}>
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-[#1db954] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
            </div>
            <div className="w-full h-px bg-white/[0.06] my-1" />
            {sidebarAlbums.map((album, i) => (
              <div key={i} className="w-11 h-11 rounded-lg overflow-hidden">
                <div className="w-full h-full" style={{ background: album.bg }} />
              </div>
            ))}
          </div>

          {/* Center Content */}
          <div className="flex-1 overflow-auto" style={{ padding: "20px 24px" }}>
            {/* Filter Tabs */}
            <div className="flex gap-2.5 mb-5">
              <div className="px-4 py-1.5 rounded-full bg-white text-black text-[13px] font-semibold">{t("spotifyAll")}</div>
              <div className="px-4 py-1.5 rounded-full bg-white/[0.07] text-white/80 text-[13px] font-medium hover:bg-white/10 transition-colors">{t("spotifyMusic")}</div>
              <div className="px-4 py-1.5 rounded-full bg-white/[0.07] text-white/80 text-[13px] font-medium hover:bg-white/10 transition-colors">{t("spotifyPodcasts")}</div>
            </div>

            {/* Playlist Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {playlists.map((pl, i) => (
                <div key={pl.nameKey ?? pl.name ?? i} className="flex items-center bg-white/[0.05] hover:bg-white/[0.1] rounded-[4px] transition-colors h-[52px] overflow-hidden cursor-pointer">
                  <div className="w-[52px] h-[52px] shrink-0 rounded-l-[4px] overflow-hidden" style={{ background: pl.bg }} />
                  <span className="text-[13px] font-semibold text-white/90 truncate px-4">{pl.nameKey ? t(pl.nameKey) : pl.name}</span>
                </div>
              ))}
            </div>

            {/* Section */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-bold tracking-tight">{t("spotifyMadeFor")}</h2>
              <span className="text-[12px] text-white/50 font-semibold hover:underline cursor-pointer">{t("spotifyShowAll")}</span>
            </div>
            <div className="flex gap-4">
              {[
                { bg: "linear-gradient(135deg, #c44536, #e8836a)", hasLogo: true },
                { bg: "linear-gradient(135deg, #2a3a2a, #4a5a4a)", hasLogo: true },
                { bg: "linear-gradient(135deg, #3a2a4a, #5a3a6a)", hasLogo: false },
              ].map((card, i) => (
                <div key={i} className="w-[160px] shrink-0 cursor-pointer group">
                  <div className="w-full aspect-square rounded-md overflow-hidden mb-2 relative" style={{ background: card.bg }}>
                    {card.hasLogo && (
                      <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-[#1db954] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-end p-2">
                      <div className="w-full">
                        <div className="h-2 w-2/3 bg-white/10 rounded mb-1" />
                        <div className="h-2 w-1/3 bg-white/5 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Now Playing */}
          <div className="w-[240px] bg-[#181818] flex flex-col shrink-0 border-l border-white/[0.04]" style={{ padding: "20px 20px" }}>
            <div className="text-[12px] font-semibold text-white/50 mb-4">Hamilton (Original</div>
            <div className="w-full aspect-square rounded-lg overflow-hidden mb-5">
              <div className="w-full h-full flex items-center justify-center relative" style={{ background: "linear-gradient(160deg, #4a3a1a 0%, #2a1a05 40%, #1a0a00 100%)" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[32px] font-bold text-white/[0.12] tracking-[0.15em] select-none" style={{ fontFamily: "serif" }}>HAMILTON</span>
                </div>
                {/* Star decorations */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-white/[0.08]"
                    style={{
                      fontSize: `${6 + Math.random() * 10}px`,
                      left: `${15 + Math.random() * 70}%`,
                      top: `${10 + Math.random() * 70}%`,
                    }}
                  >
                    ★
                  </div>
                ))}
                {/* Silhouette hint */}
                <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[40%] h-[55%] bg-black/20 rounded-t-full" />
              </div>
            </div>
            <div className="flex items-start justify-between mb-0.5">
              <h3 className="text-[15px] font-bold leading-tight">Farmer Refuted</h3>
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-0.5 ml-2">
                <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <p className="text-[12px] text-white/50 mb-6 leading-relaxed">Thayne Jasperson, Lin-Manuel Miran...</p>
            <div className="border-t border-white/[0.06] pt-4">
              <span className="text-[13px] font-semibold text-white/40">{t("spotifyAboutArtist")}</span>
            </div>
          </div>
        </div>

        {/* Bottom Player Bar */}
        <div className="h-[80px] bg-[#181818] border-t border-white/[0.04] flex items-center shrink-0" style={{ padding: "0 24px" }}>
          {/* Track Info */}
          <div className="flex items-center gap-3 w-[230px]">
            <div className="w-12 h-12 rounded shrink-0 overflow-hidden" style={{ background: "linear-gradient(135deg, #3a2a0a, #1a0a00)" }}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[6px] font-bold text-white/10 tracking-wider" style={{ fontFamily: "serif" }}>HAMILTON</span>
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-medium truncate">Farmer Refuted</div>
              <div className="text-[10px] text-white/40 truncate">Thayne Jasperson, Li...</div>
            </div>
            <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0 ml-1">
              <svg className="w-2.5 h-2.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-6">
              <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
              </svg>
              <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
                <svg className="w-[18px] h-[18px] text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
              <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
              </svg>
            </div>
            <div className="flex items-center gap-2 w-full max-w-[400px]">
              <span className="text-[10px] text-white/40 w-8 text-right tabular-nums">0:22</span>
              <div className="flex-1 h-1 bg-white/[0.08] rounded-full overflow-hidden group cursor-pointer">
                <div className="h-full w-[19%] bg-white/60 rounded-full group-hover:bg-[#1db954] transition-colors" />
              </div>
              <span className="text-[10px] text-white/40 w-8 tabular-nums">1:53</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3.5 text-white/40 w-[230px] justify-end">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z" />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            <div className="w-[70px] h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-white/40 rounded-full" />
            </div>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v2H5z" />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
