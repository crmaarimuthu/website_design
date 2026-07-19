import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  eventType: z.string().min(1, "Choose an event type"),
  date: z.string().min(1, "Pick a date"),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Add a subject"),
  message: z.string().min(10, "Tell us a little more"),
});

export const subscribeSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SubscribeInput = z.infer<typeof subscribeSchema>;
