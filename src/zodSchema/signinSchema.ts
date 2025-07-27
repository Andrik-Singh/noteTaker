import z from "zod/v3";

export const signinSchema = z.object({
    email: z.string().email({message:"Invalid Email"}),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})
export type SigninSchema = z.infer<typeof signinSchema>;