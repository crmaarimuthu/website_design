"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = ["/media/videos/video1.mp4", "/media/videos/video2.mp4", "/media/videos/video3.mp4"];
const poster = "/media/images/banner4.jpg";

export function VideoSlider() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);

  const go = (dir: number) => setIndex((i) => (i + dir + videos.length) % videos.length);

  // Load & attempt play whenever the active clip changes (muted → autoplay allowed).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {
      /* autoplay may be blocked; controls remain available */
    });
  }, [index]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-premium">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={poster}
        muted
        playsInline
        controls
        preload="none"
        onEnded={() => go(1)}
        key={videos[index]}
      >
        <source src={videos[index]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        aria-label="Previous film"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        aria-label="Next film"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            aria-label={`Show film ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
