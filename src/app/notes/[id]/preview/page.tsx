import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/db"
import { NoteTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { notFound } from "next/navigation"
import SanitizedDescription from "@/components/SanitizedDescription"
import { DeleteDialogModal } from "@/components/deleteButton"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { CopyButton } from "@/components/CopyButton"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    let  currentUser
    try {
        const { session, user } = await auth.api.getSession({
            headers: await headers()
        })
        currentUser = user
    } catch (error) {
        console.log(error)
    }
    if (!id) return notFound()
    const res = await db.select().from(NoteTable).where(
        eq(NoteTable?.id, id)
    )
    if (res.length == 0) return notFound()
    const note = res[0]
    if (!note) return notFound()
    return (
        <Card className="min-h-screen m-5 shadow-sm shadow-amber-400">
            <CardHeader>
                <CardTitle className="md:text-5xl text-3xl">
                    {note?.title && note?.title}
                </CardTitle>
                <CardTitle className="text-xl md:text-3xl mt-5">
                    {note?.subtitle && note?.subtitle}
                </CardTitle>
            </CardHeader>
            <CardContent className="md:text-xl text-md">
                <SanitizedDescription description={note?.description}></SanitizedDescription>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
                {currentUser?.id == note?.userId &&
                    <>
                        <Button>
                            <Link
                                href={`/notes/${id}/edit`}
                            >
                                Edit
                            </Link>
                        </Button>
                        <DeleteDialogModal id={id}></DeleteDialogModal>
                    </>
                }
                <Button variant={"ghost"}>
                    <Link
                        href={`/notes`}
                    >
                        Go back
                    </Link>
                </Button>
                <CopyButton></CopyButton>
            </CardFooter>
        </Card>
    )
}

export default page