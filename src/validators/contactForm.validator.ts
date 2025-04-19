import { z } from "zod";

export const validateContactForm = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name can't be longer than 100 characters"),
  
  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(/^(\+?\d{7,15})$/, {
      message: "Phone number must be valid (7-15 digits, optional +)",
    })
    .optional(),

  city: z
    .string()
    .min(1, "City is required"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters long"),
});
