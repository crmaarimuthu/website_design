/**
 * Full-screen film-grain overlay for a subtle cinematic texture. Purely
 * decorative (aria-hidden, pointer-events none). The animated drift is defined
 * in globals.css and is frozen under prefers-reduced-motion.
 */
export function FilmGrain() {
  return <div aria-hidden className="film-grain" />;
}
