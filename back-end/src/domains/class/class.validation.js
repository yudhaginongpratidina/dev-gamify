import { z } from "zod";

// Schema for validating the creation of a class. It ensures that the authorId is a number,
// the title is a string with a minimum of 4 and a maximum of 60 characters, and the level
// is one of the predefined values: "beginner", "intermediate", or "advanced".
export const classCreateSchema = z.object({
    authorId: z.number(),
    title: z.string().min(4, "Title must be at least 4 characters").max(60, "Title must be at most 60 characters"),
    level: z.enum(["beginner", "intermediate", "advanced"]).refine((value) => value === "beginner" || value === "intermediate" || value === "advanced", { message: "Level must be beginner, intermediate, or advanced" }),
});

// Schema for validating the update of a class. It ensures that the title is a string with
// a minimum of 4 and a maximum of 60 characters, and the level is one of the predefined
// values: "beginner", "intermediate", or "advanced".
export const classUpdateSchema = z.object({
    title: z.string().min(4, "Title must be at least 4 characters").max(60, "Title must be at most 60 characters"),
    level: z.enum(["beginner", "intermediate", "advanced"]).refine((value) => value === "beginner" || value === "intermediate" || value === "advanced", { message: "Level must be beginner, intermediate, or advanced" }),
});