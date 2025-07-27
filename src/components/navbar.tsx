'use server'
import { NotebookIcon } from "lucide-react";
import { ModeToggle } from "./Themechanger";
import { auth } from "@/lib/auth";
import SignInButton from "./signinButton";
import SignOutButton from "./SignOutButton";
import { headers } from "next/headers";

export default async function Navbar() {
    const h =await headers()
    const session = await auth.api.getSession({
        headers: h
    });

    return (
        <header className="flex items-center justify-between px-10 py-5 border-b-2 border-b-gray-500 dark:border-b-gray-700">
            <nav>
                <h1 className="flex gap-1 items-center text-xl font-bold">
                    <NotebookIcon />
                    <span>NoteTaker</span>
                </h1>
            </nav>
            <div className="flex gap-4 items-center">
                <ModeToggle />
                {session != null ? (
                    <SignOutButton />
                ) : (
                    <SignInButton />
                )}
            </div>
        </header>
    );
}
