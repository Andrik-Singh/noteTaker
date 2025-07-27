
import z from "zod/v3";

export const signUpSchema = z.object({
    name:z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid Email" }).min(1, { message: "Email is required" }),
    password: z.string().min(8, { message: "Password must atleast be 8 character's long" }),
    confirmPassword: z.string().min(8, { message: "Password must atleast be 8 character's long" })
}).refine(({ password, confirmPassword }) => {
    return (password === confirmPassword)
}, { message: "The password doesn't match", path: ["password"] }
)
export type SignUpType=z.infer<typeof signUpSchema>