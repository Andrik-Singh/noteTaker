import NewNote from "@/components/form/newNote"
import { db } from "@/db"
import { NoteTable } from "@/db/schema"
import { eq } from "drizzle-orm"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const events = await db.select().from(NoteTable).where(
    eq(NoteTable.id, id)
  )
  return (
    <div>
      <NewNote event={events[0]}></NewNote>
    </div>
  )
}

export default page