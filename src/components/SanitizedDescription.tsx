'use client'
import ReactMarkDown from "react-markdown" 
import { parseMarkdown } from '@/lib/formatter'
const SanitizedDescription = ({ description }: { description: string }) => {
  return (
    <div>
        <ReactMarkDown>
            {description}
        </ReactMarkDown>
    </div>
  )
}

export default SanitizedDescription