"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/home"
            className="flex items-center gap-2 font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <span className="hidden sm:inline-block text-lg">
              Notes App
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/home"
            className="font-semibold sm:inline-block text-sm  text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Button asChild size="sm" className="font-semibold sm:inline-flex shadow-md active:scale-95 transition-transform">
            <Link href="/admin">
              Admin
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}