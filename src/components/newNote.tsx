'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

const CreateNewNote = () => {
    return (
        <motion.div
            key="create-new"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="h-full mt-5 w-52 mx-auto flex flex-col items-center justify-center text-center hover:shadow-md hover:scale-[1.01] transition cursor-pointer">
                <CardHeader className="text-xl w-full">
                    <CardTitle > Create New Note</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className='mx-5 w-32' variant={"secondary"}>
                        <Link
                            href="/notes/new"
                            className="text-violet-600 hover:text-violet-800 transition"
                        >
                            Create New Note
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>

    )
}

export default CreateNewNote