'use client'

import React, { useState, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion, AnimatePresence } from 'framer-motion' // Corrected import
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2Icon, Loader2Icon, EyeIcon } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Note } from '@/lib/constants'
import { formatStringToArray } from '@/lib/formatter'
import CreateNewNote from './newNote'

interface DeleteNoteButtonProps {
  id: string
}

interface SortableNoteListProps {
  notes: Note[]
}
export const revalidate = 0
function DeleteNoteButton({ id }: DeleteNoteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      if (isDeleting) return
      try {
        setIsDeleting(true)
        console.log('Initiating delete request for note ID:', id) 
        const res = await axios.delete(`/api/notes/${id}/delete`)
        if (res.data?.success) {
          console.log('Delete successful, refreshing page') 
          router.refresh()
        } else {
          console.error('Delete failed:', res.data?.error || 'Unknown error') 
          alert('Delete failed: ' + (res.data?.error || 'Unknown error'))
        }
      } catch (error) {
        console.error('Error deleting note:', error) 
        alert('Error deleting note')
      } finally {
        setIsDeleting(false)
        console.log('Delete operation completed, isDeleting:', false) 
      }
    },
    [id, isDeleting, router]
  )

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center gap-2"
    >
      {isDeleting ? (
        <>
          <Loader2Icon className="animate-spin h-4 w-4" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2Icon className="h-4 w-4" />
          Delete
        </>
      )}
    </Button>
  )
}

function SortableNote({ note, children }: { note: Note; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: note.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.2 }}
      {...attributes}
      {...listeners}
    >
      {children}
    </motion.div>
  )
}

export default function SortableNoteList({ notes: initialNotes }: SortableNoteListProps) {
  const [notes, setNotes] = useState(initialNotes)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200, // Require 200ms hold to activate drag, allowing clicks to pass through
        tolerance: 5, // Allow small movements without triggering drag
      },
    })
  )

  const handleDragEnd = useCallback((event: import('@dnd-kit/core').DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setNotes((notes) => {
        const oldIndex = notes.findIndex((n) => n.id === active.id)
        const newIndex = notes.findIndex((n) => n.id === over.id)
        return arrayMove(notes, oldIndex, newIndex)
      })
    }
  }, [])

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={notes.map((n) => n.id)} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {notes.map((note) => (
              <SortableNote key={note.id} note={note}>
                <Card className="h-full flex flex-col justify-between">
                  <div>
                    <CardHeader>
                      <CardTitle className="text-2xl">{note.title}</CardTitle>
                      <CardDescription>{note.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2 text-sm">
                        {note.description.slice(0, 100)}
                        {note.description.length > 100 && '...'}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formatStringToArray(note.tags).map((tag, i) => (
                          <span
                            key={i}
                            className="bg-violet-100 text-violet-800 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                  <CardFooter>
                    <CardAction className="flex w-full justify-between">
                      <div className='flex gap-2 items-center'>
                        <Button asChild variant="secondary">
                          <Link href={`/notes/${note.id}/edit`}>Edit</Link>
                        </Button>
                        <Button asChild variant="secondary">
                          <Link href={`/notes/${note.id}/preview`}><EyeIcon></EyeIcon>Preview</Link>
                        </Button>
                      </div>
                      <DeleteNoteButton id={note.id} />
                    </CardAction>
                  </CardFooter>
                </Card>
              </SortableNote>
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
      <CreateNewNote />
    </DndContext>
  )
}