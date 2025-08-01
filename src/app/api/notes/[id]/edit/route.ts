
import { editNotes } from "@/lib/actions/notes";
import { notesSchema } from "@/zodSchema/notes";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, params: { params: Promise<{ id: string }> }) {
    const { id } = await params.params;
    console.log(id)
    const body = await req.json()
    const { data, success } = notesSchema.safeParse(body)
    console.log(data)
    try {
        if (!success) {
            return NextResponse.json({
                success: false,
                error: "Invalid data"
            }, { status: 400 })
        }
        const returnedData = await editNotes({
            id: id,
            title: data.title,
            subtitle: data.subtitle !== undefined ? data.subtitle : null,
            description: data.description,
            tags: data.tags
        })
        return NextResponse.json({
            error: "none",
            success: true,
            data: returnedData?.data
        })
    }
    catch (error) {
        return NextResponse.json({
            success: false,
            error: error?.message
        })
    }
}