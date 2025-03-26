import { z } from "zod";

// This schema validates the data for creating a new chapter. It ensures that all required fields are present and meet the specified constraints, such as minimum and maximum lengths for strings.
export const chapterCreateSchema = z.object({
    classId: z.number(),
    title: z.string().min(4, "Title must be at least 4 characters").max(60, "Title must be at most 60 characters"),
    content: z.string().min(4, "Content must be at least 4 characters").max(60, "Content must be at most 60 characters"),
    question: z.string().min(4, "Question must be at least 4 characters").max(60, "Question must be at most 60 characters"),
    optionA: z.string().min(4, "Option A must be at least 4 characters").max(60, "Option A must be at most 60 characters"),
    optionB: z.string().min(4, "Option B must be at least 4 characters").max(60, "Option B must be at most 60 characters"),
    optionC: z.string().min(4, "Option C must be at least 4 characters").max(60, "Option C must be at most 60 characters"),
    optionD: z.string().min(4, "Option D must be at least 4 characters").max(60, "Option D must be at most 60 characters"),
    correctAnswer: z.string().min(4, "Correct answer must be at least 4 characters").max(60, "Correct answer must be at most 60 characters"),
});

// This schema validates the data for updating an existing chapter. All fields are optional, allowing partial updates, but still enforce constraints if provided.
export const chapterUpdateSchema = z.object({
    title: z.string().min(4, "Title must be at least 4 characters").max(60, "Title must be at most 60 characters").optional(),
    content: z.string().min(4, "Content must be at least 4 characters").max(60, "Content must be at most 60 characters").optional(),
    question: z.string().min(4, "Question must be at least 4 characters").max(60, "Question must be at most 60 characters").optional(),
    optionA: z.string().min(4, "Option A must be at least 4 characters").max(60, "Option A must be at most 60 characters").optional(),
    optionB: z.string().min(4, "Option B must be at least 4 characters").max(60, "Option B must be at most 60 characters").optional(),
    optionC: z.string().min(4, "Option C must be at least 4 characters").max(60, "Option C must be at most 60 characters").optional(),
    optionD: z.string().min(4, "Option D must be at least 4 characters").max(60, "Option D must be at most 60 characters").optional(),
    correctAnswer: z.string().min(4, "Correct answer must be at least 4 characters").max(60, "Correct answer must be at most 60 characters").optional(),
});