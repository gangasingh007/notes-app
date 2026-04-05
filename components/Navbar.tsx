"use client"

import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, ShieldCheck, Menu, X, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { logout } from "@/lib/actions/auth"
import { checkAuth } from "@/store/auth"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background border-b border-border/40"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        
        {/* Logo */}
        <Link
          href="/home"
          className="group flex items-center gap-3 font-bold tracking-tight text-foreground transition-all hover:opacity-90"
        >
          <span className="sm:inline-block text-xl font-extrabold tracking-tight">
            Notes <span className="text-primary">App</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-2">
          <Link
            href="/home"
            className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive("/home")
                ? "text-foreground bg-muted"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          {/* DESKTOP LOGOUT BUTTON */}
          { (
            <div className="ml-2 pl-2 border-l border-border/50">
              <Button 
                variant="ghost"
                onClick={handlelogout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-xl px-4"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground border border-border/50 transition-all hover:text-foreground hover:bg-muted active:scale-95"
          aria-label="Toggle menu"
        >
          <div className="relative h-5 w-5">
            <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`} />
            <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="sm:hidden fixed top-16 left-0 right-0 z-50 bg-card border-b border-border shadow-2xl"
          >
            <nav className="flex flex-col gap-2 p-4">
              <Link
                href="/home"
                className={`flex items-center gap-3 rounded-xl px-4 py-4 text-base font-medium transition-all ${
                  isActive("/home")
                    ? "text-foreground bg-muted border border-border/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${isActive("/home") ? "bg-primary/20 text-primary" : "bg-muted"}`}>
                  <Home className="h-5 w-5" />
                </div>
                Home
              </Link>

              {/* MOBILE LOGOUT BUTTON */}
              {(
                <div className="mt-2 pt-2 border-t border-border/50">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handlelogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-4 text-base font-medium text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
                      <LogOut className="h-5 w-5" />
                    </div>
                    Log Out
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}