import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function WhatsAppFab() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Tamil Digital Studio! I'd like to know more about your packages.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <MessageCircle size={26} />
    </a>
  );
}
