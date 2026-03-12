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

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.28 }}
        className="relative w-[95vw] h-[90vh] md:w-[85vw] md:h-[90vh] max-w-[1200px] max-h-[96vh] p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full rounded-3xl bg-[#050505] group glass-card-hover text-white px-5 py-6 md:px-8 md:py-8 overflow-hidden">
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col h-full gap-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pr-10">
              <div className="text-left">
                <h3 className="text-2xl font-semibold leading-tight">{project.name}</h3>
                {project.desc && (
                  <p className="mt-2 text-sm text-white/70 max-w-2xl leading-relaxed">{project.desc}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-start">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-white/10 border border-white/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center rounded-2xl  p-3">
              <div className="w-full h-full rounded-2xl overflow-hidden ">
                <ImageZoom src={project.img} alt={project.name} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
