"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, ChevronRight, Layers, Users, CalendarDays } from "lucide-react"
import { ClassItem } from "@/types"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  }
}

export default function ClassCard({ cls }: { cls: ClassItem }) {
  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link href={`/home/${cls.id}`} className="block group h-full focus:outline-none">
        <motion.div 
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          className="relative h-full flex flex-col rounded-[1.5rem] bg-card border border-border/80 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:border-primary/40 group-hover:ring-1 group-hover:ring-primary/20 overflow-hidden"
        >
          {/* Top Gradient Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary/80 to-secondary/500 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Subtle Background Hover Glow */}
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary/0 blur-[60px] transition-all duration-500 group-hover:bg-primary/15 pointer-events-none" />

          {/* 1. MAIN CARD BODY */}
          <div className="p-6 flex flex-col flex-1 mt-1 z-10">
            
            {/* Top Row: Icon & Arrow */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/20 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Layers className="h-7 w-7" />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border/50 text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:translate-x-1 shadow-sm">
                <ChevronRight className="h-4 w-4 stroke-[2.5]" />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col justify-end">
              {/* Semester Pill - Placed above title for structural flow */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-wide uppercase">
                  <CalendarDays className="h-3 w-3" />
                  {cls.semester}
                </span>
              </div>
              
              <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {cls.course}
              </h3>
            </div>
          </div>

          {/* 2. DISTINCT FOOTER AREA (Visual Separation) */}
          <div className="px-6 py-4 bg-muted/30 border-t border-border/50 mt-auto z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              
              {/* Stats Container */}
              <div className="flex items-center gap-3">
                {/* Section Badge */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  <div className="p-1 rounded-md bg-background border border-border/50 shadow-sm">
                    <Users className="h-3.5 w-3.5 text-primary/80" />
                  </div>
                  {cls.section}
                </div>
                
                {/* Visual Divider */}
                <div className="h-4 w-[1px] bg-border/80" />
                
                {/* Subject Count */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  <div className="p-1 rounded-md bg-background border border-border/50 shadow-sm">
                    <BookOpen className="h-3.5 w-3.5 text-primary/80" />
                  </div>
                  {/* {cls._count.Subjects} {cls._count.Subjects === 1 ? "Subject" : "Subjects"} */}
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      </Link>
    </motion.div>
  )
}