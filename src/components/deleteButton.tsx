'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Delete, Loader, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export function DeleteDialogModal({ id }: { id: string }) {
  const router = useRouter()
  const [isDeleting, startDeleting] = useTransition()
  const handleDelete = async () => {
    const res = await axios.delete(`/api/notes/${id}/delete`)
    if (res?.data?.success) {
      console.log(res)
      router.push("/notes")
    }
    else {
      console.log(res?.data?.error)
    }
  }
  return (
    <div className={`${isDeleting ? "opacity-30":"opacity-100"}`}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              startDeleting(async () => {
                await handleDelete()
              })
            }}>{!isDeleting ? <Trash></Trash> : <div><Loader className="animate-spin"></Loader></div>}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
