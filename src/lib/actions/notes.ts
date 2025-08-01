'use server'
import { headers } from "next/headers"
import { auth } from "../auth"
import { NextResponse } from "next/server"
import { NoteTable } from "@/db/schema"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { newnotesSchema, notesSchema } from "@/zodSchema/notes"
import { v4 as uuidv4 } from "uuid"
import { Note } from "../constants"
import { error } from "console"
import { success } from "better-auth"

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
        const id = uuidv4()
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
            id: id,
            title: data.title,
            subtitle: data.subtitle,
            userId: user?.id,
            description: data.description,
            tags: data.tags
        })
        return ({
            error: "none",
            success: true
        })
    } catch (error) {
        return ({
            error: error.message,
            success: false
        })
    }
}
export async function editNotes(notes: {
    id: string;
    title: string | undefined;
    subtitle: string | null;
    description: string | undefined;
    tags: string | undefined;
}) {
    try {
        const h = await headers()
        const { session, user } = await auth.api.getSession({
            headers: h
        })
        if (!session) {
            return ({
                error: "Unauthorized",
                success: false
            })
        }
        const existingNote = await db.select().from(NoteTable).where(eq(NoteTable.id, notes.id));
        console.log("Existing note:", existingNote);

        const returningData = await db.update(NoteTable).set({
            title: notes.title,
            subtitle: notes.subtitle,
            description: notes.description,
            tags: notes.tags
        }).where(
            eq(NoteTable.id, notes.id)
        ).returning()
        return ({
            error: "No error Occured",
            success: true,
            data: existingNote
        })
    } catch (error) {
        return ({
            error: error.message,
            success: false
        })
    }
}
export async function deleteNote(id: string) {
    try {
        console.log("Id:", id)
        const h = await headers()
        const { session, user } = await auth.api.getSession({
            headers: h
        })
        if (!session || !user) {
            return {
                error: "Unauthorized",
                success: false
            }
        }
        const notes=await db.select().from(NoteTable).where(
            eq(NoteTable.id,id)
        )
        console.log("Notes:",notes)
        const returningData = await db.delete(NoteTable).where(
            eq(NoteTable.id, id)
        ).returning()
        if (returningData.length == 0) {
            return {
                error: "Error while deleting occured",
                success: false,
            }
        }
        return {
            error: "None",
            success: true,
            data: returningData[0]
        }
    } catch (error) {
        return {
            error: error.message || "Internal Server Error",
            success: false
        }
    }
}