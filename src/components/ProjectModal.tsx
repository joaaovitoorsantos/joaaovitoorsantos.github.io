import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ImageZoom from "./ui/ImageZoom";

type Project = {
  name: string;
  img: string;
  tags: string[];
  desc?: string;
};

type Props = {
  open: boolean;
  project?: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ open, project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal
      role="dialog"
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Animated content: responsive size, padding and max dimensions to avoid filling entire mobile screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.28 }}
        className={"relative bg-transparent w-[95vw] h-[90vh] md:w-[85vw] md:h-[90vh] max-w-[1200px] max-h-[96vh] p-4 md:p-6 rounded-md md:rounded-lg overflow-hidden"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button top-right: use dark solid bg so it remains visible on white images */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-50 p-2 rounded-md bg-black/80 backdrop-blur-md border border-white/30 text-white shadow-lg hover:bg-black/75"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: dark background to remain visible on any project image */}
        <header className="absolute left-4 top-4 z-40 text-white rounded-md px-3 py-2 bg-black/80 backdrop-blur-md border border-white/30" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-md bg-black/60 border border-white/20 text-white">{t}</span>
            ))}
          </div>
        </header>

        {/* Main area - ImageZoom: keep the ImageZoom unchanged and allow it to occupy the inner area; add a wrapper to ensure it doesn't collide with header/button */}
        <main className="w-full h-full pt-0">
          <div className="w-full h-full rounded-sm overflow-hidden">
            <ImageZoom src={project.img} alt={project.name} />
          </div>
        </main>
      </motion.div>
    </div>
  );
}
