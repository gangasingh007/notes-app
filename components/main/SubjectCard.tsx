"use client"

import { motion } from "framer-motion"
import { BookMarked, ChevronRight, Library } from "lucide-react"
import Link from "next/link"
import { Subject } from "@/types"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  }
}

export default function SubjectCard({ subject, classId }: { subject: Subject, classId: string }) {
  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className="h-full"
    >
      <Link href={`/home/${classId}/${subject.id}`} className="block group h-full focus:outline-none">
        <motion.div 
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          className="relative h-full flex flex-col rounded-[1.5rem] bg-card border border-border/80 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-500/40 group-hover:ring-1 group-hover:ring-blue-500/20 overflow-hidden"
        >
          {/* Top Gradient Accent Bar (Blue/Cyan theme) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-background opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Subtle Background Hover Glow */}
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/0 blur-[60px] transition-all duration-500 group-hover:bg-blue-500/15 pointer-events-none" />

          {/* 1. MAIN CARD BODY */}
          <div className="p-6 flex flex-col flex-1 mt-1 z-10">
            
            {/* Top Row: Icon & Arrow */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <BookMarked className="h-7 w-7" />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border/50 text-muted-foreground transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:translate-x-1 shadow-sm">
                <ChevronRight className="h-4 w-4 stroke-[2.5]" />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col justify-end">
              {/* Category Pill - Anchors the hierarchy */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold tracking-wide uppercase">
                  <Library className="h-3 w-3" />
                  Subject Module
                </span>
              </div>
              
              <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                {subject.name}
              </h3>
            </div>
          </div>

          {/* 2. DISTINCT FOOTER AREA (Action Bar) */}
          <div className="px-6 py-4 bg-muted/30 border-t border-border/50 mt-auto z-10 transition-colors duration-300 group-hover:bg-blue-500/5">
            
          </div>

        </motion.div>
      </Link>
    </motion.div>
  )
}