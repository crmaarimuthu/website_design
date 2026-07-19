import { Construction } from "lucide-react";
import { ButtonLink } from "./ui/Button";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <section className="container-px mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center py-32 text-center">
      <span className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-accent/15 text-accent">
        <Construction size={30} />
      </span>
      <h1 className="font-display text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-4 text-fg-muted">{description}</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/contact" variant="outline">Contact us</ButtonLink>
      </div>
    </section>
  );
}
