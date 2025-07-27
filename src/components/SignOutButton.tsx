"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const SignOutButton = () => {
    const router=useRouter()
    const SignOut = async () => {
        try {
            const { error } = await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/")
                    }
                }
            })
        } catch (error) {
            
        }
    }
    return (
        <Button variant={"destructive"} onClick={SignOut}>
            Sign Out
        </Button>
    )
}

export default SignOutButton