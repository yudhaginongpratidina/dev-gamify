import { z } from "zod";

export const registerSchema = z.object({
    fullname: z
        .string()
        .min(4, "Full name must be at least 4 characters")
        .max(60, "Full name must be at most 60 characters"),
    email: z
        .string()
        .email(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(60, "Password must be at most 60 characters"),
    confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(60, "Password must be at most 60 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters").max(60, "Password must be at most 60 characters"),
})