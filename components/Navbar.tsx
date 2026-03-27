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
    redirect("/admin")
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
        <nav className="hidden sm:flex items-center gap-1.5">
          <Link
            href="/home"
            className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
              isActive("/home")
                ? "text-foreground bg-muted"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <Home className="h-4 w-4" />
            Home
            {isActive("/home") && (
              <span className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full bg-primary transition-all" />
            )}
          </Link>

          <Button
            asChild
            size="sm"
            className={`ml-2 font-semibold shadow-md active:scale-[0.97] transition-all duration-200 hover:shadow-lg ${
              isActive("/admin")
                ? "ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                : ""
            }`}
          >
            <Link href="/admin" className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Link>
          </Button>
          {!isAuth ? (
            <Button variant="outline"
            onClick={handlelogout}
          >
              <LogOut />
          </Button>
          ) : null}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden bg-black/70 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-foreground hover:bg-muted active:scale-95"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className="relative h-5 w-5">
            <Menu
              className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </div>
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`sm:hidden fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`sm:hidden fixed top-16 left-0 right-0 z-50 bg-background border-b border-border shadow-xl transition-all duration-300 ease-out ${
          mobileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1 p-4">
          <Link
            href="/home"
            className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200 active:scale-[0.98] ${
              isActive("/home")
                ? "text-foreground bg-muted shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                isActive("/home") ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <Home className={`h-4.5 w-4.5 ${isActive("/home") ? "text-primary" : ""}`} />
            </div>
            Home
            {isActive("/home") && (
              <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </Link>

          <Link
            href="/admin"
            className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200 active:scale-[0.98] ${
              isActive("/admin")
                ? "text-foreground bg-muted shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                isActive("/admin") ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <ShieldCheck className={`h-4.5 w-4.5 ${isActive("/admin") ? "text-primary" : ""}`} />
            </div>
            Admin Portal
            {isActive("/admin") && (
              <span className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}