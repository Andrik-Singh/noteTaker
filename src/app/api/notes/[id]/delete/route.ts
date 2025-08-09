import { deleteNote } from "@/lib/actions/notes";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, params: { params: Promise<{ id: string }> } ) {
    try {
        const { id } = await params.params
        const returnedData = await deleteNote(id)
        if (!returnedData?.success) {
            return NextResponse.json({
                error: returnedData?.error,
                success: false
            })
        }
        return NextResponse.json({
            error: "None",
            success: true,
            data: returnedData
        })
    } catch (error) {
        return NextResponse.json({
            error: (error as Error)?.message || "Internal Sever error occured",
            success: false
        })
    }

}