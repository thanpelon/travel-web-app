import Link from "next/link"

export function Header() {
  return (
    <header className="bg-primary/0  text-primary-foreground py-4 px-6">
      <div className="container mx-auto flex items-center justify-between backdrop-blur-md">
        <Link href="#" className="text-xl font-bold" prefetch={false}>
          Travel
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="#" className="hover:underline" prefetch={false}>
            Flights
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Experiences
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Cars & Transfers
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Market Insights
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Hotels
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Itinerary
          </Link>
        </nav>
      </div>
    </header>
  )
}

