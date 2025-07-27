// app/api/notes/newNotes/route.ts
import { createNewNote } from "@/lib/actions/notes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const returnedData = await createNewNote(body);

    if (!returnedData?.success) {
      return NextResponse.json(
        {
          success: false, error: returnedData?.error
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Note created successfully" });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      {
        success: false, error: "Server error"
      },
      { status: 500 }
    );
  }
}
