import { z } from "zod";

const urlSchema = z
  .string()
  .url()
  .regex(/^(ftp|http|https):\/\/[^ "]+$/);

export const validateCreateTeam = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),
    designation: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),
    image: z
      .string(urlSchema)
      .nonempty("At least one image is required")
      .min(1, "At least one image is required"),
  
  })
  .strict();
