'use client'
import { notesSchema, newnotesSchema } from "@/zodSchema/notes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import axios from "axios"
import { Note } from "@/lib/constants"
import { useRouter } from "next/navigation"

const NewNote = ({ event }: { event?: Note }) => {
  const router = useRouter()
  const { register, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm<newnotesSchema>({
    resolver: zodResolver(notesSchema),
    defaultValues: {
      title: event?.title ?? undefined,
      description: event?.description ?? undefined,
      subtitle: event?.subtitle ?? undefined,
      tags: event?.tags ?? undefined
    }
  })
  const newNotes = async (value: newnotesSchema) => {
    try {
      const body = await axios.post('/api/notes/newNotes', value)
      console.log(body)
      if (body?.success) {
        router.push("/notes")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const editEvents = async (value: newnotesSchema) => {
    try {
      const body = await axios.patch(`/api/notes/${event?.id}/edit`, value)
      console.log(body)
      if (body?.success) {
        router.push("/notes")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={event ? handleSubmit(editEvents) : handleSubmit(newNotes)}>
        <Card className="xl:w-1/3 sm:w-2/3 w-screen mx-5 sm:mx-auto my-5">
          <CardContent>
            <CardDescription >
              <Label className="my-2" htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} placeholder="Title of your note"></Input>
            </CardDescription>
            <CardDescription >
              <Label className="my-2" htmlFor="subtitle">SubTitle</Label>
              <Input id="subtitle" {...register("subtitle")} placeholder="SubTitle of your note"></Input>
            </CardDescription>
            <CardDescription >
              <Label className="my-2" htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} placeholder="Description of your note"></Textarea>
            </CardDescription>
            <CardDescription >
              <Label className="my-2" htmlFor="tags">Tags</Label>
              <Input id="tags" {...register("tags")} placeholder="Tags for your note"></Input>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex ml-auto gap-5">
            {event ?
              <Button>
                {isSubmitting ? "Submitting....." : "Edit note"}
              </Button> :
              <Button>
                {isSubmitting ? "Submitting....." : "Create new note"}
              </Button>
            }
            <Button type="reset">
              Reset
            </Button>
          </CardFooter>
        </Card>

      </form>
    </div>
  )
}

export default NewNote