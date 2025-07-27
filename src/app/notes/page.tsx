import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getNotes } from "@/lib/actions/notes"
import { Note } from "@/lib/constants"
import Link from "next/link"
export const revalidate = 0 // Revalidate every 0 seconds
const page = async () => {
    async function fetchNotes() {
        try {
            const response = await getNotes()
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }
    const data = await fetchNotes()
    const notes = data?.data
    console.log(notes)
    if (notes.length === 0) {
        return (
            <div className="flex items-center flex-col gap-4">
                <p>No Notes found</p>
                <Button>
                    <Link href={"/notes/new"}>
                        Create new notes
                    </Link>
                </Button>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-3 gap-5">
            {notes.map((note: Note) => (
                <Card key={note?.id}>
                    <CardHeader>
                        <CardTitle className="text-3xl">{note?.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="font-semibold">{note?.subtitle}</CardTitle>
                        <CardDescription>{note?.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        {note?.tags}
                        <div>
                            <CardAction>
                                <Button>
                                    <Link href={`/notes/${note?.id}/edit`}>
                                        Edit
                                    </Link>
                                </Button>
                            </CardAction>
                        </div>
                    </CardFooter>

                </Card>
            ))}
        </div>
    )
}

export default page