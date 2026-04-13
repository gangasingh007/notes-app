"use client"

import { LayoutDashboard, ChevronLeft, ChevronRight, Zap, Calendar, Book, Home, BookA, BookOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <aside 
      className={`relative flex h-screen flex-col bg-background border-r border-border py-8 transition-all duration-300 ease-in-out font-sans ${
        isCollapsed ? "w-20 px-3" : "w-64 px-4"
      }`}
    >

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 z-30 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border text-muted-foreground shadow-sm hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`mb-10 flex items-center ${isCollapsed ? "justify-center" : "px-2"}`}>
        {isCollapsed ? (
          <div className="flex h-10 w-10 items-center justify-center text-xl font-bold rounded-xl bg-primary/10 ">
            <Book className="text-primary" />
          </div>
        ) : (
          <Link href="/home" className="flex flex-col overflow-hidden whitespace-nowrap group">
            <h1 className="text-3xl font-extrabold tracking-tight transition-colors ">
              Notes <span className="text-primary">App</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Academic Hub
            </p>
          </Link>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        <Link
          href="/home"
          title="Home"
          className={`flex items-center rounded-xl py-3 text-sm font-medium transition-colors overflow-hidden whitespace-nowrap ${
            isActive("/home") 
              ? "bg-accent text-accent-foreground font-semibold shadow-sm" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          } ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"}`}
        >
          <Home className={`h-5 w-5 min-w-[20px] ${isActive("/dashboard") ? "text-primary" : ""}`} />
          {!isCollapsed && <span>Home</span>}
        </Link>

        <Link
          href="/syllabus"
          title="Syllabus"
          className={`flex items-center rounded-xl py-3 text-sm font-medium transition-colors overflow-hidden whitespace-nowrap ${
            isActive("/syllabus") 
              ? "bg-accent text-accent-foreground font-semibold shadow-sm" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          } ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"}`}
        >
          <BookOpen className={`h-5 w-5 min-w-[20px] ${isActive("/subjects") ? "text-primary" : ""}`} />
          {!isCollapsed && <span>Syllabus</span>}
        </Link>

        <Link
          href="/datesheet"
          title="DateSheet"
          className={`flex items-center rounded-xl py-3 text-sm font-medium transition-colors overflow-hidden whitespace-nowrap ${
            isActive("/datesheet") 
              ? "bg-accent text-accent-foreground font-semibold shadow-sm" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          } ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"}`}
        >
          <Calendar className={`h-5 w-5 min-w-[20px] ${isActive("/profile") ? "text-primary" : ""}`} />
          {!isCollapsed && <span>Datesheet</span>}
        </Link>
      </nav>

      <div className={`mt-auto border-t border-border pt-6 ${isCollapsed ? "px-0" : "px-2"}`}>
        <Link
          href="/admin"
          title="Admin Portal"
          className={`flex items-center rounded-xl py-3 text-sm font-bold transition-all shadow-sm ${
            isActive("/admin")
              ? "bg-primary text-background ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
              : "bg-primary text-background hover:bg-primary/90"
          } ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"}`}
        >
          <LayoutDashboard className="h-5 w-5 min-w-[20px]" />
          {!isCollapsed && <span>Admin Portal</span>}
        </Link>
      </div>
      
    </aside>
  )
}