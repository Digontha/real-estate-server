import { z } from "zod";

// Helper for URL validation
const urlSchema = z.string().url().regex(/^(ftp|http|https):\/\/[^ "]+$/);

// Detail item validation
const detailItemSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const validateCreateProperty = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .optional(),
  
  location: z.string()
    .min(3, "Price must be at least 3 characters")
    .max(200, "Price cannot exceed 200 characters"),

  price: z.string()
    .min(3, "Location must be at least 3 characters")
    .max(200, "Location cannot exceed 200 characters"),
  
  image: z.array(urlSchema)
    .nonempty("At least one image is required")
    .min(1, "At least one image is required"),
  
  description: z.string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description cannot exceed 2000 characters"),
  
  details: z.array(detailItemSchema)
    .nonempty("At least one detail is required")
    .min(1, "At least one detail is required"),
  
  video: urlSchema
    .min(1, "Video URL is required"),
    type: z.enum(['house', 'apartment', 'condo', 'townhouse']).optional(),
    sale: z.enum(['rent', 'buy']).optional(),
}).strict();