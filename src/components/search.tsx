'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Input() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [input, setInput] = useState(searchParams.get('query'))
  const [submitting,setIsSubmitting] =useState(false)
  useEffect(() => {
    const existingQuery = searchParams.get('query') || ''
    setInput(existingQuery)
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    setIsSubmitting(true)
    if (input) {
      params.set('query', input)
    } else {
      params.delete('query')
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Search Page</h1>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input || ""}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search something..."
          className="border border-gray-300 px-4 py-2 rounded-md md:w-1/2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <p className="text-gray-700">
        Showing results for: <strong>{searchParams.get('query') || 'Nothing yet'}</strong>
      </p>
    </div>
  )
}
