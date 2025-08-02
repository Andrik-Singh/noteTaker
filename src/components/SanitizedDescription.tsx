'use client'
import ReactMarkDown from "react-markdown" 
import remarkGfm from "remark-gfm"
const SanitizedDescription = ({ description }: { description: string }) => {
  return (
    <div>
        <ReactMarkDown remarkPlugins={[remarkGfm]}>
            {description}
        </ReactMarkDown>
    </div>
  )
}

export default SanitizedDescription