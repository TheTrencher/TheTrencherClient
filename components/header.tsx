import Link from "next/link"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <span className="font-bold text-xl">TheTrencher</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
          Dashboard
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/profile">
          Profile
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/events">
          Events
        </Link>
      </nav>
    </header>
  )
}

