'use client'
import { notesSchema, newnotesSchema } from "@/zodSchema/notes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardFooter } from "../ui/card"
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
      if (body?.data?.success) {
        router.push("/notes")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const editEvents = async (value: newnotesSchema) => {
    try {
      const body = await axios.patch(`/api/notes/${event?.id}/edit`, value)

      if (body?.data?.success) {
        router.push("/notes")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Card className="xl:w-1/3 sm:w-2/3 w-screen mx-5 sm:mx-auto my-5">
        <form onSubmit={event ? handleSubmit(editEvents) : handleSubmit(newNotes)}>
          <CardContent>
            <div >
              <Label className="my-2" htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} placeholder="Title of your note"></Input>
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div >
              <Label className="my-2" htmlFor="subtitle">SubTitle</Label>
              <Input id="subtitle" {...register("subtitle")} placeholder="SubTitle of your note"></Input>
              {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}
            </div>
            <div >
              <Label className="my-2" htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} placeholder="Description of your note"></Textarea>
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div >
              <Label className="my-2" htmlFor="tags">Tags</Label>
              <Input id="tags" {...register("tags")} placeholder="Tags for your note"></Input>
              {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex  w-full gap-5 mt-3">
            {event ?
              <Button>
                {isSubmitting ? "Submitting....." : "Edit note"}
              </Button> :
              <Button>
                {isSubmitting ? "Submitting....." : "Create new note"}
              </Button>
            }
            <Button type="reset" variant={"destructive"}>
              Reset
            </Button>
          </CardFooter>
        </form>
      </Card>

    </div>
  )
}

export default NewNote