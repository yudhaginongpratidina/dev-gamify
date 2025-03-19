import { z } from "zod";

export const accountUpdateSchema = z.object({
    fullname: z
        .string()
        .min(4, "Full name must be at least 4 characters")
        .max(60, "Full name must be at most 60 characters")
        .optional(),
    email: z
        .string()
        .email()
        .optional(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(60, "Password must be at most 60 characters")
        .optional(),
    confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(60, "Password must be at most 60 characters")
        .optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})


export const accountDeleteSchema = z.object({
    areYouSure: z.boolean().refine((value) => value === true, { message: "Are you sure you want to delete your account?" }),
})