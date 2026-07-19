"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterProps {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
}

export function BeforeAfter({ before, after, altBefore = "Before", altAfter = "After" }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl shadow-premium"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
    >
      {/* After (base) */}
      <Image src={after} alt={altAfter} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={altBefore} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
      </div>
      {/* Labels */}
      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-wider text-white">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-wider text-white">
        After
      </span>
      {/* Handle */}
      <div className="absolute inset-y-0 w-0.5 bg-white/90" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-premium">
          <MoveHorizontal size={20} />
        </span>
      </div>
    </div>
  );
}
