import { z } from "zod";

export const classCreateSchema = z.object({
    authorId: z.number(),
    title: z.string().min(4, "Title must be at least 4 characters").max(60, "Title must be at most 60 characters"),
    level: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
});

export const classUpdateSchema = z.object({
    title: z.string().min(4, "Title must be at least 4 characters").max(60, "Title must be at most 60 characters"),
    level: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
});