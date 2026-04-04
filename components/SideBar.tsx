"use client"

import { LayoutDashboard, BookOpen, User, ChevronLeft, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  // Helper function to determine if a path is active
  const isActive = (path: string) => pathname === path

  return (
    <aside 
      className={`relative flex h-screen flex-col bg-background border-r border-border py-8 transition-all duration-300 ease-in-out font-sans ${
        isCollapsed ? "w-20 px-3" : "w-64 px-4"
      }`}
    >
      
      {/* Collapse/Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border text-muted-foreground shadow-sm hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Section */}
      <div className={`mb-10 flex items-center ${isCollapsed ? "justify-center" : "px-2"}`}>
        {isCollapsed ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-6 w-6 fill-current" />
          </div>
        ) : (
          <Link href="/dashboard" className="flex flex-col overflow-hidden whitespace-nowrap group">
            <h1 className="text-2xl font-extrabold tracking-tight text-primary transition-colors group-hover:text-primary/80">
              StudySync
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Academic Hub
            </p>
          </Link>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        <Link
          href="/dashboard"
          title="Dashboard"
          className={`flex items-center rounded-xl py-3 text-sm font-medium transition-colors overflow-hidden whitespace-nowrap ${
            isActive("/dashboard") 
              ? "bg-accent text-accent-foreground font-semibold shadow-sm" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          } ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"}`}
        >
          <LayoutDashboard className={`h-5 w-5 min-w-[20px] ${isActive("/dashboard") ? "text-primary" : ""}`} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>

        <Link
          href="/subjects"
          title="Subjects"
          className={`flex items-center rounded-xl py-3 text-sm font-medium transition-colors overflow-hidden whitespace-nowrap ${
            isActive("/subjects") 
              ? "bg-accent text-accent-foreground font-semibold shadow-sm" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          } ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"}`}
        >
          <BookOpen className={`h-5 w-5 min-w-[20px] ${isActive("/subjects") ? "text-primary" : ""}`} />
          {!isCollapsed && <span>Subjects</span>}
        </Link>

        <Link
          href="/profile"
          title="Profile"
          className={`flex items-center rounded-xl py-3 text-sm font-medium transition-colors overflow-hidden whitespace-nowrap ${
            isActive("/profile") 
              ? "bg-accent text-accent-foreground font-semibold shadow-sm" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          } ${isCollapsed ? "justify-center px-0" : "gap-3 px-4"}`}
        >
          <User className={`h-5 w-5 min-w-[20px] ${isActive("/profile") ? "text-primary" : ""}`} />
          {!isCollapsed && <span>Profile</span>}
        </Link>
      </nav>

      {/* Bottom User Profile Section */}
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