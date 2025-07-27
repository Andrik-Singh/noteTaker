
import { db } from "@/db";
import { NoteTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { notesSchema } from "@/zodSchema/notes";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, params: { id: string }) {
    const { id } =  params
    console.log(id)
    const body = await req.json()
    const {data,success} =notesSchema.safeParse(body)
    try {
        const h = await headers()
        const sessionResult = await auth.api.getSession({
            headers: h
        })
        if (!sessionResult || !sessionResult.session || !success) {
            return ({
                error: "Unauthorized",
                success: false
            })
        }
        const { session, user } = sessionResult
        const returningData = await db.update(NoteTable).set(
            {
                title: data?.title,
                subtitle: data?.subtitle,
                description: data?.description,
                tags: data?.tags
            }
        ).where(
            eq(NoteTable.id, id)
        ).returning()
        
        return NextResponse.json({
            success: true,
            data: returningData[0]
        })
    }
    catch (error) {
        return NextResponse.json({
            success: false,
            error: error?.message
        })
    }
}