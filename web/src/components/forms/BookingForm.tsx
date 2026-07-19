"use client";

import { useState } from "react";
import { CheckCircle2, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { bookingSchema } from "@/lib/schemas";
import { services } from "@/content/services";
import { Button } from "../ui/Button";
import { fieldClass, labelClass, errorClass } from "./fields";

const empty = { name: "", email: "", phone: "", eventType: services[0].title, date: "", message: "" };
type FieldErrors = Partial<Record<keyof typeof empty, string[]>>;

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    const partial = bookingSchema.pick({ name: true, email: true, phone: true });
    const res = partial.safeParse(form);
    if (!res.success) {
      setErrors(res.error.flatten().fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = bookingSchema.safeParse(form);
    if (!res.success) {
      setErrors(res.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const r = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(r.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-10 text-center shadow-premium">
        <CheckCircle2 className="mx-auto mb-4 text-accent" size={48} />
        <h3 className="font-display text-2xl">Request received</h3>
        <p className="mt-3 text-fg-muted">
          Thank you, {form.name.split(" ")[0]}! We&apos;ll confirm your {form.eventType.toLowerCase()} booking
          shortly over WhatsApp or email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 shadow-premium sm:p-8">
      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-3">
        {[1, 2].map((s) => (
          <div key={s} className="flex flex-1 items-center gap-3">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${
                step >= s ? "bg-accent text-accent-contrast" : "bg-surface text-fg-subtle"
              }`}
            >
              {s}
            </span>
            <span className="text-sm text-fg-muted">{s === 1 ? "Your details" : "Event details"}</span>
            {s === 1 && <span className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className={labelClass}>Full name</label>
            <input id="name" className={fieldClass} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" />
            {errors.name && <p className={errorClass}>{errors.name[0]}</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" type="email" className={fieldClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
              {errors.email && <p className={errorClass}>{errors.email[0]}</p>}
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Phone</label>
              <input id="phone" className={fieldClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 …" />
              {errors.phone && <p className={errorClass}>{errors.phone[0]}</p>}
            </div>
          </div>
          <Button type="button" className="w-full" onClick={() => validateStep1() && setStep(2)}>
            Continue <ArrowRight size={18} />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="eventType" className={labelClass}>Event type</label>
              <select id="eventType" className={fieldClass} value={form.eventType} onChange={(e) => update("eventType", e.target.value)}>
                {services.map((s) => (
                  <option key={s.slug}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className={labelClass}>Preferred date</label>
              <input id="date" type="date" className={fieldClass} value={form.date} onChange={(e) => update("date", e.target.value)} />
              {errors.date && <p className={errorClass}>{errors.date[0]}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="message" className={labelClass}>Anything we should know? (optional)</label>
            <textarea id="message" rows={4} className={fieldClass} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Venue, vision, guest count…" />
          </div>
          {status === "error" && (
            <p className={errorClass}>Something went wrong. Please try again or reach us on WhatsApp.</p>
          )}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft size={18} /> Back
            </Button>
            <Button type="submit" className="flex-1" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending…
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
