import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/db"
import { NoteTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { notFound } from "next/navigation"
import SanitizedDescription from "@/components/SanitizedDescription"
import { DeleteDialogModal } from "@/components/deleteButton"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    if(!id) return notFound()
    const res =await db.select().from(NoteTable).where(
        eq(NoteTable?.id,id)
    )
    if(res.length == 0) return notFound()
    const note=res[0]
    if(!note) return notFound()
    return (
        <Card className="min-h-screen m-5 shadow-sm shadow-amber-400">
            <CardHeader>
                <CardTitle className="md:text-5xl text-3xl">
                    {note?.title}
                </CardTitle>
                <CardTitle className="text-xl md:text-3xl mt-5">
                    {note?.subtitle}
                </CardTitle>
            </CardHeader>
            <CardContent className="md:text-xl text-md">
                <SanitizedDescription description={note?.description}></SanitizedDescription>
            </CardContent>
            <CardFooter className="flex gap-3">
                <Button>
                    <Link 
                    href={`/notes/${id}/edit`}
                    >
                        Edit
                    </Link>
                </Button>
                <Button variant={"ghost"}>
                    <Link
                        href={`/notes`}
                    >
                        Go back
                    </Link>
                </Button>
                <DeleteDialogModal id={id}></DeleteDialogModal>
            </CardFooter>
        </Card>
    )
}

export default page