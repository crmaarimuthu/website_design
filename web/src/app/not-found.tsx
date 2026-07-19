import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-px mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center py-32 text-center">
      <p className="font-display text-7xl text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl sm:text-4xl">This page has left the frame</h1>
      <p className="mt-4 text-fg-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/portfolio" variant="outline">View portfolio</ButtonLink>
      </div>
    </section>
  );
}
