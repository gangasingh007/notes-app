"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, ChevronRight, Layers, Users, FolderOpen } from "lucide-react"
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
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative h-full flex flex-col rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/40 overflow-hidden"
        >
          {/* Top Gradient Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/80 via-primary to-secondary-500/80 opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Background Glow */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/0 blur-[60px] transition-all duration-500 group-hover:bg-primary/10 pointer-events-none" />

          <div className="p-6 flex flex-col h-full mt-1">
            {/* Top Row: Icon & Arrow */}
            <div className="flex justify-between items-start mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/10 group-hover:scale-110 transition-transform duration-300">
                <Layers className="h-6 w-6" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1 shadow-sm">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground tracking-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                {cls.course}
              </h3>
              <p className="text-sm font-medium text-muted-foreground/80 flex items-center gap-1.5">
                <FolderOpen className="h-3.5 w-3.5" />
                {cls.semester}
              </p>
            </div>

            {/* Bottom Row: Metadata Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-border/50">
              <div className="flex items-center gap-1.5 rounded-lg bg-secondary/70 px-3 py-1.5 text-xs font-bold text-secondary-foreground transition-colors group-hover:bg-secondary">
                <Users className="h-3.5 w-3.5 text-primary" />
                Section {cls.section}
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-secondary/70 px-3 py-1.5 text-xs font-bold text-secondary-foreground transition-colors group-hover:bg-secondary">
                <BookOpen className="h-3.5 w-3.5 text-primary/70" />
                {cls._count.Subjects} {cls._count.Subjects === 1 ? "Subject" : "Subjects"}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}