import { z } from "zod";

const jwtPattern = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

export const validateSignUp = z.object({
  token: z
    .string()
    .min(10, { message: "Token must be at least 10 characters long" })
    .regex(jwtPattern, { message: "Invalid JWT token format" }),
});
export const validateUserUpdate = z.object({
  name: z.string().optional(),
});

export const validateUpdateBody = z.object({
  name: z.string().min(1).optional(),
  password: z.string().min(8).optional(),
  designation: z.string().optional(),
});

export const validateFilterUsers = z.object({
  count: z.number().optional(),
  designation: z.string().optional(),
});