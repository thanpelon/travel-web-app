import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <p>&copy; 2024 Travel. All rights reserved.</p>
        <nav className="flex items-center gap-6">
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}
