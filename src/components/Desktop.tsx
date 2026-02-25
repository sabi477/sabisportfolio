"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import SpotifyWindow from "./SpotifyWindow";
import ErrorPopup from "./ErrorPopup";
import FigmaPopup from "./FigmaPopup";
import HelloWorldWindow from "./HelloWorldWindow";
import TrashPopup from "./TrashPopup";
import NotesWindow from "./NotesWindow";
import PhotosWindow from "./PhotosWindow";
import Dock from "./Dock";
import { projects, Project } from "@/data/projects";

interface OpenWindow {
  project: Project;
  zIndex: number;
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [topZIndex, setTopZIndex] = useState(100);
  const [showSpotify, setShowSpotify] = useState(false);
  const [spotifyZ, setSpotifyZ] = useState(100);
  const [showError, setShowError] = useState(false);
  const [errorZ, setErrorZ] = useState(100);
  const [showTrash, setShowTrash] = useState(false);
  const [trashZ, setTrashZ] = useState(100);
  const [showNotes, setShowNotes] = useState(false);
  const [notesZ, setNotesZ] = useState(100);
  const [showPhotos, setShowPhotos] = useState(false);
  const [photosZ, setPhotosZ] = useState(100);
  const [showFigma, setShowFigma] = useState(false);
  const [figmaZ, setFigmaZ] = useState(100);
  const [showApp, setShowApp] = useState(false);
  const [appZ, setAppZ] = useState(100);

  const handleOpenWindow = useCallback(
    (project: Project) => {
      const existing = openWindows.find((w) => w.project.id === project.id);
      if (existing) {
        setTopZIndex((prev) => prev + 1);
        setOpenWindows((prev) =>
          prev.map((w) =>
            w.project.id === project.id ? { ...w, zIndex: topZIndex + 1 } : w
          )
        );
        return;
      }

      const newZ = topZIndex + 1;
      setTopZIndex(newZ);
      setOpenWindows((prev) => [...prev, { project, zIndex: newZ }]);
    },
    [openWindows, topZIndex]
  );

  const handleCloseWindow = useCallback((projectId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.project.id !== projectId));
  }, []);

  const handleFocusWindow = useCallback(
    (projectId: string) => {
      const newZ = topZIndex + 1;
      setTopZIndex(newZ);
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.project.id === projectId ? { ...w, zIndex: newZ } : w
        )
      );
    },
    [topZIndex]
  );

  const handleDockAction = useCallback(
    (id: string) => {
      if (id === "app") {
        const newZ = topZIndex + 1;
        setTopZIndex(newZ);
        setAppZ(newZ);
        setShowApp(true);
      } else if (id === "spotify") {
        const newZ = topZIndex + 1;
        setTopZIndex(newZ);
        setSpotifyZ(newZ);
        setShowSpotify(true);
      } else if (id === "error") {
        const newZ = topZIndex + 1;
        setTopZIndex(newZ);
        setErrorZ(newZ);
        setShowError(true);
      } else if (id === "trash") {
        const newZ = topZIndex + 1;
        setTopZIndex(newZ);
        setTrashZ(newZ);
        setShowTrash(true);
      } else if (id === "notes") {
        const newZ = topZIndex + 1;
        setTopZIndex(newZ);
        setNotesZ(newZ);
        setShowNotes(true);
      } else if (id === "photos") {
        const newZ = topZIndex + 1;
        setTopZIndex(newZ);
        setPhotosZ(newZ);
        setShowPhotos(true);
      } else if (id === "figma") {
        const newZ = topZIndex + 1;
        setTopZIndex(newZ);
        setFigmaZ(newZ);
        setShowFigma(true);
      }
    },
    [topZIndex]
  );

  const handleFocusSpotify = useCallback(() => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setSpotifyZ(newZ);
  }, [topZIndex]);

  const handleFocusError = useCallback(() => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setErrorZ(newZ);
  }, [topZIndex]);

  const handleFocusTrash = useCallback(() => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setTrashZ(newZ);
  }, [topZIndex]);

  const handleFocusNotes = useCallback(() => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setNotesZ(newZ);
  }, [topZIndex]);

  const handleFocusPhotos = useCallback(() => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setPhotosZ(newZ);
  }, [topZIndex]);

  const handleFocusFigma = useCallback(() => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setFigmaZ(newZ);
  }, [topZIndex]);

  const handleFocusApp = useCallback(() => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setAppZ(newZ);
  }, [topZIndex]);

  return (
    <div className="fixed inset-0 overflow-hidden select-none">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/urban-vintage-78A265wPiO4-unsplash.jpg')`,
          filter: "brightness(0.9)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

      {/* Desktop Icons Area */}
      <div id="desktop-area" className="absolute inset-0 pb-20">
        {projects.map((project) => (
          <DesktopIcon
            key={project.id}
            project={project}
            onSelect={handleOpenWindow}
          />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {openWindows.map((window) => (
          <Window
            key={window.project.id}
            project={window.project}
            zIndex={window.zIndex}
            onClose={() => handleCloseWindow(window.project.id)}
            onFocus={() => handleFocusWindow(window.project.id)}
          />
        ))}
      </AnimatePresence>

      {/* Spotify Window */}
      <AnimatePresence>
        {showSpotify && (
          <SpotifyWindow
            key="spotify"
            zIndex={spotifyZ}
            onClose={() => setShowSpotify(false)}
            onFocus={handleFocusSpotify}
          />
        )}
      </AnimatePresence>

      {/* Error Popup */}
      <AnimatePresence>
        {showError && (
          <ErrorPopup
            key="error"
            zIndex={errorZ}
            onClose={() => setShowError(false)}
            onFocus={handleFocusError}
          />
        )}
        {showFigma && (
          <FigmaPopup
            key="figma"
            zIndex={figmaZ}
            onClose={() => setShowFigma(false)}
            onFocus={handleFocusFigma}
          />
        )}
        {showApp && (
          <HelloWorldWindow
            key="app"
            zIndex={appZ}
            onClose={() => setShowApp(false)}
            onFocus={handleFocusApp}
          />
        )}
      </AnimatePresence>

      {/* Notes Window */}
      <AnimatePresence>
        {showNotes && (
          <NotesWindow
            key="notes"
            zIndex={notesZ}
            onClose={() => setShowNotes(false)}
            onFocus={handleFocusNotes}
          />
        )}
        {showPhotos && (
          <PhotosWindow
            key="photos"
            zIndex={photosZ}
            onClose={() => setShowPhotos(false)}
            onFocus={handleFocusPhotos}
          />
        )}
      </AnimatePresence>

      {/* Trash Popup */}
      <AnimatePresence>
        {showTrash && (
          <TrashPopup
            key="trash"
            zIndex={trashZ}
            onClose={() => setShowTrash(false)}
            onFocus={handleFocusTrash}
          />
        )}
      </AnimatePresence>

      {/* Dock */}
      <Dock onAction={handleDockAction} />
    </div>
  );
}
