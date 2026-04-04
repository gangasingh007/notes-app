"use client"

import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, ShieldCheck, Menu, X , LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { logout } from "@/lib/actions/auth"
import { checkAuth } from "@/store/auth"

export default  function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    let cancelled = false

    checkAuth()
      .then((result) => {
        if (!cancelled) setIsAuth(result)
      })
      .catch(() => {
        if (!cancelled) setIsAuth(false)
      })

    return () => {
      cancelled = true
    }
  }, [])
 
  async function handlelogout(){
    await logout();
    redirect("/")
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const isActive = (path: string) => pathname === path

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-border/60 shadow-sm bg-background/95"
          : "border-border/40"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/home"
          className="group flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-all hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
            <BookOpen className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-rotate-6" />
          </div>
          <span className="hidden sm:inline-block text-lg font-bold">
            Notes App
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className=" sm:flex items-center gap-3 ">
          <Button
            asChild
            size="sm"
            className={`ml-2 text-background font-bold shadow-md active:scale-[0.97] transition-all duration-200 hover:shadow-lg ${
              isActive("/admin")
                ? "ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                : ""
            }`}
          >
            <Link href="/" className="hidden lg:flex md:flex items-center gap-1.5">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          {!isAuth ? (
            <Button variant="outline"
            onClick={handlelogout}
            className="ml-5"
          >
              <LogOut />
          </Button>
          ) : null}
        </nav>
      </div>
    </header>
  )
}