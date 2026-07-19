import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Admin",
  description: "Studio admin dashboard — coming soon.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <ComingSoon
      title="Admin dashboard coming soon"
      description="Gallery management, bookings, invoicing and analytics will be available here in a later phase."
    />
  );
}
