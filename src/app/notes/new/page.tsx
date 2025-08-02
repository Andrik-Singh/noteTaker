import NewNote from "@/components/form/newNote"
import MarkdownHelper from "@/components/MarkdownHelper"

const page = () => {
  return (
    <div className="flex items-center gap-10 w-screen h-screen flex-col">
        <NewNote></NewNote>
        <MarkdownHelper></MarkdownHelper>
    </div>
  )
}

export default page