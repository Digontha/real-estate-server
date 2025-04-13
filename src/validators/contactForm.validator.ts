import { z } from "zod";

export const validateContactForm = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().min(1),
  message: z.string().min(1),
});

