"use client"

import { LayoutDashboard, BookOpen, User, ChevronLeft, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside 
      className={`relative flex h-screen flex-col bg-[#0b0e14] border-r border-white/5 py-8 transition-all duration-300 ease-in-out font-sans ${
        isCollapsed ? "w-20 px-3" : "w-64 px-4"
      }`}
    >
      
      {/* Collapse/Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-[#1e293b] border border-white/10 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Section */}
      <div className={`mb-10 flex items-center ${isCollapsed ? "justify-center" : "px-2"}`}>
        {isCollapsed ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-[#c084fc]">
            <Zap className="h-6 w-6 fill-current" />
          </div>
        ) : (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#c084fc]">
              StudySync
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-medium text-slate-400">
              Academic Hub
            </p>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        <Link
          href="/dashboard"
          title="Dashboard"
          className={`flex items-center rounded-xl bg-white/5 py-3 text-sm font-semibold text-white transition-colors border border-white/5 shadow-sm overflow-hidden whitespace-nowrap ${
            isCollapsed ? "justify-center px-0" : "gap-3 px-4"
          }`}
        >
          <LayoutDashboard className="h-5 w-5 min-w-[20px] text-[#c084fc]" />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>

        <Link
          href="/subjects"
          title="Subjects"
          className={`flex items-center rounded-xl py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors overflow-hidden whitespace-nowrap ${
            isCollapsed ? "justify-center px-0" : "gap-3 px-4"
          }`}
        >
          <BookOpen className="h-5 w-5 min-w-[20px]" />
          {!isCollapsed && <span>Subjects</span>}
        </Link>

        <Link
          href="/profile"
          title="Profile"
          className={`flex items-center rounded-xl py-3 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors overflow-hidden whitespace-nowrap ${
            isCollapsed ? "justify-center px-0" : "gap-3 px-4"
          }`}
        >
          <User className="h-5 w-5 min-w-[20px]" />
          {!isCollapsed && <span>Profile</span>}
        </Link>
      </nav>

      {/* Bottom User Profile Section */}
      <div className={`mt-auto border-t border-white/10 pt-6 ${isCollapsed ? "px-0" : "px-2"}`}>
        <div 
          className={`flex items-center cursor-pointer hover:opacity-80 transition-opacity ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          {/* Avatar */}
          <div className="relative h-10 w-10 min-w-[40px] overflow-hidden rounded-full border border-white/10 bg-[#1e293b] flex-shrink-0">
            <Image 
              src="/placeholder-avatar.jpg" 
              alt="Alex Rivera" 
              fill
              className="object-cover"
              unoptimized
            />
            {/* Fallback initials if image fails */}
            <div className="flex h-full w-full items-center justify-center bg-sky-500/20 text-sky-200 text-xs font-bold absolute inset-0 -z-10">
              AR
            </div>
          </div>
          
          {/* User Info (Hidden when collapsed) */}
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden whitespace-nowrap">
              <span className="text-sm font-bold text-white tracking-wide truncate">Alex Rivera</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5 truncate">B.Tech Engineering</span>
            </div>
          )}
        </div>
      </div>
      
    </aside>
  )
}