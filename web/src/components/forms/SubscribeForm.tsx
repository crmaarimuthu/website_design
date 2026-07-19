"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { subscribeSchema } from "@/lib/schemas";
import { Button } from "../ui/Button";
import { fieldClass, errorClass } from "./fields";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = subscribeSchema.safeParse({ email });
    if (!res.success) {
      setError(res.error.flatten().fieldErrors.email?.[0] ?? "Invalid email");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (r.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("idle");
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <p className="inline-flex items-center gap-2 text-accent">
        <Check size={18} /> You&apos;re subscribed — watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={fieldClass}
        />
        <Button type="submit" disabled={status === "submitting"} className="shrink-0">
          {status === "submitting" ? <Loader2 size={18} className="animate-spin" /> : "Subscribe"}
        </Button>
      </div>
      {error && <p className={errorClass}>{error}</p>}
    </form>
  );
}
