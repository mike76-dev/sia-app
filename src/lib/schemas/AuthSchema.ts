import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email().max(64),
    password: z.string().min(8).max(255),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email().max(64),
  password: z.string().min(8).max(255),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8).max(255),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
