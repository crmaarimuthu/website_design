import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Client Login",
  description: "Secure client galleries and downloads — coming soon.",
};

export default function ClientLoginPage() {
  return (
    <ComingSoon
      title="Client area coming soon"
      description="Private galleries, downloads and invoices will live here. For now, reach us directly and we'll share your gallery link."
    />
  );
}
