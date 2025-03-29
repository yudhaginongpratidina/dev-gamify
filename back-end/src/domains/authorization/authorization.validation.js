import { z } from "zod";

export const authorizationSchema = z.object({
    role: z.enum(["user", "admin", "superadmin"]).refine((value) => value === "user" || value === "admin" || value === "superadmin", { message: "Role must be user, admin, or superadmin" }),
})