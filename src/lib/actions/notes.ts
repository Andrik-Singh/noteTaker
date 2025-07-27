'use server'
import { headers } from "next/headers"
import { auth } from "../auth"
import { NextResponse } from "next/server"
import { NoteTable } from "@/db/schema"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { newnotesSchema, notesSchema } from "@/zodSchema/notes"
import { v4 as uuidv4} from "uuid"

export async function getNotes() {
    const h = await headers()
    const { session, user } = await auth.api.getSession({
        headers: h
    })
    if (!session) {
        return NextResponse.json({
            error: "Unauthorized",
            success: "false"
        })
    }
    const notes = await db.select().from(NoteTable).where(
        eq(NoteTable.userId, user.id)
    )
    return NextResponse.json({
        error: "none",
        success: true,
        data: notes
    })
}
export async function createNewNote(value: newnotesSchema) {
    const { data, success } = notesSchema.safeParse(value)
    console.log(data)
    try {
        const id=uuidv4()
        const h = await headers()
        const { session, user } = await auth.api.getSession({
            headers: h
        })
        if (!session || !success) {
            return ({
                error: "Unauthorized",
                success: false
            })
        }
        await db.insert(NoteTable).values({
            id:id,
            title: data.title,
            subtitle: data.subtitle,
            userId:user?.id,
            description: data.description,
            tags: data.tags
        })
        return ({
            error:"none",
            success:true
        })
    } catch (error) {
        return ({
            error:error.message,
            success:false
        })
    }
}
export async function editNotes(id:string) {
    
}