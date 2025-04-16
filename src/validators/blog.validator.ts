import { z } from "zod";

const urlSchema = z
  .string()
  .url()
  .regex(/^(ftp|http|https):\/\/[^ "]+$/);

export const validateCreateBlog = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters")
      .optional(),
    displayText: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters")
      .optional(),

    image: z
      .array(urlSchema)
      .nonempty("At least one image is required")
      .min(1, "At least one image is required"),
    keyword: z
      .array(z.string())
      .nonempty("At least one keyword is required")
      .min(1, "At least one keyword is required"),

    description: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(2000, "Description cannot exceed 2000 characters"),

    seoDescription: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(2000, "Description cannot exceed 2000 characters"),
  })
  .strict();
