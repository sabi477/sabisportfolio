"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { useRef, useState, useCallback } from "react";

interface DesktopIconProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function DesktopIcon({
  project,
  onSelect,
}: DesktopIconProps) {
  const constraintsRef = useRef<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getConstraintsRef = useCallback((node: HTMLElement | null) => {
    if (!node) {
      constraintsRef.current = document.getElementById("desktop-area");
    }
  }, []);

  return (
    <motion.div
      ref={getConstraintsRef}
      className="absolute flex flex-col items-center gap-1 cursor-pointer select-none group"
      style={{
        left: `${project.position.x}%`,
        top: `${project.position.y}%`,
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      onClick={() => {
        if (!isDragging) onSelect(project);
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hover highlight background */}
      <div className="absolute -inset-2 rounded-xl bg-white/0 group-hover:bg-white/15 transition-colors duration-200 pointer-events-none" />

      <div
        className="relative w-[60px] h-[60px] rounded-lg overflow-hidden shadow-lg border border-white/10 transition-all duration-200 group-hover:shadow-xl group-hover:border-white/25"
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
            <div className="w-8 h-8 rounded bg-white/10 backdrop-blur-sm" />
          </div>
        )}
      </div>

      <span className="relative text-[10px] font-medium text-white text-center max-w-[90px] leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] group-hover:bg-[#3478f6] group-hover:text-white px-1.5 py-0.5 rounded transition-colors duration-200">
        {project.name}
      </span>
    </motion.div>
  );
}
