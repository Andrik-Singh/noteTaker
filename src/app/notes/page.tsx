
import Input from "@/components/search"
import SortableNoteList from "@/components/SortableNotes"
import { Button } from "@/components/ui/button"
import { getNotes } from "@/lib/actions/notes"
import Link from "next/link"
export const revalidate = 0 // Revalidate every 0 seconds
const page = async ({ searchParams }: { searchParams: { query: string } }) => {
    const query = await searchParams.query || ''

    async function fetchNotes() {
        try {
            const response = await getNotes()
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    }
    const data = await fetchNotes()
    if(data?.error && data?.error != "none"){
        return (
            <div className="flex items-center flex-col gap-4">
                <Input></Input>
                <p>Error fetching notes: {data.error}</p>
                <Button>
                    <Link href={"/notes/new"}>
                        Create new notes
                    </Link>
                </Button>
            </div>
        )
    }
    let notes
    const unfilteredNotes = data?.data
    if (query) {
        console.log(unfilteredNotes)
        notes = unfilteredNotes.filter((note) => {
            if (note.title.includes(query) || note.subtitle.includes(query) || note.tags.includes(query)) {
                return false
            }
        })
    }
    else notes = unfilteredNotes || []
    if (notes.length === 0) {
        return (
            <div className="flex items-center flex-col gap-4">
                <Input></Input>
                <p>{query ? "Searched note is not there" : "No notes found"}</p>
                <Button>
                    <Link href={"/notes/new"}>
                        Create new notes
                    </Link>
                </Button>

            </div>
        )
    }
    return (
        <div className="px-6 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">My Notes</h1>
            <Input></Input>
            <SortableNoteList notes={notes} />
        </div>
    )
}

export default page