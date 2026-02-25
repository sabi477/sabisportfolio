"use client";

import { motion } from "framer-motion";

interface SpotifyWidgetProps {
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export default function SpotifyWidget({ onClose, zIndex, onFocus }: SpotifyWidgetProps) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={onFocus}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop - tıklanınca kapat, arka koyulaşmasın */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden />

      <motion.div
        className="relative w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/spotify-widget.png"
          alt="Spotify"
          className="w-full h-auto block"
          draggable={false}
        />

        {/* Kapat butonu - Spotify logosunu kapatacak şekilde opak */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black flex items-center justify-center text-white touch-manipulation hover:bg-black/90 transition-colors"
          aria-label="Kapat"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
