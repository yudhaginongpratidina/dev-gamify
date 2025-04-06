import { z } from "zod";

export const authorizationSchema = z.object({
    role: z.enum(["user", "instructor", "admin"]).refine((value) => value === "user" || value === "instructor" || value === "admin" , { message: "Role must be user, instructor, or admin" }),
})