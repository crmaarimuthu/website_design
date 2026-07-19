import Image from "next/image";

/** Static poster used as the 3D loading state and the mobile / reduced-motion fallback. */
export function HeroFallback() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/media/images/banner4.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-accent/10" />
    </div>
  );
}
