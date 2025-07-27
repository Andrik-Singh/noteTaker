
import Link from 'next/link'
import { Button } from './ui/button'

const SignInButton = ({className} : {className?: string}) => {
  return (
    <Button asChild className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${className}`}>
        <Link href="/signin">
            Get Started For Free
        </Link>
    </Button>
  )
}

export default SignInButton