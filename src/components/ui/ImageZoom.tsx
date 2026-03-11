import React, { useCallback, useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";

type Props = {
  src: string;
  alt?: string;
  min?: number; // fraction, 0.5
  max?: number; // fraction, 2
};

const clamp = (v: number, a = 0.5, b = 2) => Math.min(b, Math.max(a, v));

export default function ImageZoom({ src, alt = "Preview", min = 0.5, max = 2 }: Props) {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      // reset if unmounted
      setZoom(1);
    };
  }, []);

  const change = useCallback((delta: number) => {
    setZoom((z) => clamp(Math.round((z + delta) * 100) / 100, min, max));
  }, [min, max]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = -Math.sign(e.deltaY) * 0.1;
      change(delta);
    }
    // otherwise, allow default to scroll the image vertically
  }, [change]);

  const zoomTo = (v: number) => setZoom(clamp(v, min, max));

  return (
    <div className="relative w-full h-full bg-transparent flex flex-col">
      {/* Controls */}
      <div className="absolute z-40 left-1/2 -translate-x-1/2 top-6 flex items-center gap-2 backdrop-blur-sm bg-white/10 border border-white/20 text-white rounded-md px-2 py-1">
        <button
          aria-label="Zoom out"
          onClick={() => change(-0.1)}
          className="p-1 hover:bg-white/20 rounded-sm"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="px-3 text-sm font-medium">{Math.round(zoom * 100)}%</div>
        <button
          aria-label="Zoom in"
          onClick={() => change(0.1)}
          className="p-1 hover:bg-white/20 rounded-sm"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          aria-label="Reset zoom"
          onClick={() => zoomTo(1)}
          className="p-1 hover:bg-white/20 rounded-sm"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable image area */}
      <div
        ref={containerRef}
        onWheel={onWheel}
        className="w-full h-full overflow-y-auto overflow-x-hidden touch-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="w-full flex justify-center">
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{ transform: `scale(${zoom})`, transformOrigin: "top center", cursor: zoom < max ? "zoom-in" : "zoom-out" }}
            className="w-full max-w-none object-contain select-none"
          />
        </div>
      </div>

      {/* Scrollbar styling for dark theme (Webkit) */}
      <style>{`
        .${""}::-webkit-scrollbar { width: 10px; }
        .${""}::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .${""}::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }
      `}</style>
    </div>
  );
}
