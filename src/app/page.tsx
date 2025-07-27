import SignInButton from "@/components/signinButton";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen w-full relative">
        {/* Radial Gradient Background */}
        <div
          className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_10%,_#fff_40%,_#6366f1_100%)] 
          dark:bg-[radial-gradient(circle_at_50%_100%,rgba(70,85,110,0.5)_0%,transparent_60%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.4)_0%,transparent_70%),radial-gradient(circle_at_50%_100%,rgba(181,184,208,0.3)_0%,transparent_80%)]"
        >
          <div className="flex flex-col items-center   h-full ">
            <h1 className="text-center text-4xl font-bold mt-5">Welcome to NoteTaker</h1>
            <p className="text-center text-2xl mt-5">Efficient note-taking made easy.</p>
            <SignInButton className="mt-5 w-40 items-center" />
          </div>
        </div>
      </div>
      <div></div>
    </main>
  )
}