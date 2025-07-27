
import z from "zod/v3";
export const notesSchema=z.object({
    title:z.string().min(1,{message:"Required title"}),
    subtitle:z.string(),
    description:z.string().min(1,{message:"Required description"}),
    tags:z.string().min(1,{message:"Tags are required"})
})
export type newnotesSchema =z.infer<typeof notesSchema>