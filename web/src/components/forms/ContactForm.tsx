"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema } from "@/lib/schemas";
import { Button } from "../ui/Button";
import { fieldClass, labelClass, errorClass } from "./fields";

const empty = { name: "", email: "", subject: "", message: "" };
type FieldErrors = Partial<Record<keyof typeof empty, string[]>>;

export function ContactForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = contactSchema.safeParse(form);
    if (!res.success) {
      setErrors(res.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (r.ok) {
        setStatus("success");
        setForm(empty);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-10 text-center shadow-premium">
        <CheckCircle2 className="mx-auto mb-4 text-accent" size={48} />
        <h3 className="font-display text-2xl">Message sent</h3>
        <p className="mt-3 text-fg-muted">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass space-y-5 rounded-2xl p-6 shadow-premium sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={labelClass}>Name</label>
          <input id="c-name" className={fieldClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
          {errors.name && <p className={errorClass}>{errors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className={labelClass}>Email</label>
          <input id="c-email" type="email" className={fieldClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
          {errors.email && <p className={errorClass}>{errors.email[0]}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="c-subject" className={labelClass}>Subject</label>
        <input id="c-subject" className={fieldClass} value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="How can we help?" />
        {errors.subject && <p className={errorClass}>{errors.subject[0]}</p>}
      </div>
      <div>
        <label htmlFor="c-message" className={labelClass}>Message</label>
        <textarea id="c-message" rows={5} className={fieldClass} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your project…" />
        {errors.message && <p className={errorClass}>{errors.message[0]}</p>}
      </div>
      {status === "error" && <p className={errorClass}>Something went wrong. Please try again.</p>}
      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
