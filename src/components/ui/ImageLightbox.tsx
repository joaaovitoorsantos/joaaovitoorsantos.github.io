import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomIn, ZoomOut, Maximize, X } from "lucide-react";

type Props = {
  src: string;
  alt?: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

const clamp = (v: number, a = 0.5, b = 4) => Math.min(b, Math.max(a, v));

export default function ImageLightbox({ src, alt = "Preview", open, onOpenChange }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!open) {
      // reset
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    }
  }, [open]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const step = delta > 0 ? 0.1 : -0.1;
    setScale((s) => {
      const next = clamp(s + step);
      return next;
    });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    const el = containerRef.current;
    if (!el) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    draggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !lastPosRef.current) return;
    const last = lastPosRef.current;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    lastPosRef.current = null;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const zoomTo = (next: number) => {
    setScale((s) => clamp(next));
    setTranslate({ x: 0, y: 0 });
  };

  const zoomIn = () => setScale((s) => clamp(s + 0.25));
  const zoomOut = () => setScale((s) => clamp(s - 0.25));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full h-[85vh] sm:h-[80vh] p-0 bg-black/90 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center bg-black" onWheel={onWheel}>
          {/* Controls */}
          <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
            <button
              aria-label="Zoom out"
              onClick={zoomOut}
              className="p-2 rounded-md bg-background/60 hover:bg-background/80 text-foreground"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              aria-label="Zoom in"
              onClick={zoomIn}
              className="p-2 rounded-md bg-background/60 hover:bg-background/80 text-foreground"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              aria-label="Fit"
              onClick={() => zoomTo(1)}
              className="p-2 rounded-md bg-background/60 hover:bg-background/80 text-foreground"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>

          {/* Close in top-right is already provided by DialogContent, but we add an extra optional button for smaller screens */}
          <div className="absolute top-4 right-4 z-50 sm:hidden">
            <button onClick={() => onOpenChange(false)} className="p-2 rounded-md bg-background/60 text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center touch-none overflow-hidden"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={() => zoomTo(1)}
          >
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              draggable={false}
              style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`, transition: draggingRef.current ? "none" : "transform 150ms ease-out" }}
              className="max-w-none w-auto max-h-full h-auto object-contain"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
