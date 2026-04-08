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

export default function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link href={`/subjects/${subject.id}`} className="block group h-full focus:outline-none">
        <motion.div 
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="relative flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 group-hover:border-blue-500/40 group-hover:shadow-xl overflow-hidden"
        >
          {/* Top Gradient Accent Line (Blue/Cyan theme to differentiate from Classes) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500/80 via-cyan-500/80 to-blue-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Background Glow */}
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/0 blur-[50px] transition-all duration-500 group-hover:bg-blue-500/10 pointer-events-none" />

          <div>
            {/* Icon */}
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/10 transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <BookMarked className="h-6 w-6" />
            </div>

            {/* Subject Name */}
            <h4 className="text-xl font-bold text-foreground leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {subject.name}
            </h4>
          </div>

          {/* Bottom Action Area */}
          <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-4">
            <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground flex items-center gap-2">
              <Library className="h-4 w-4" />
              View Resources
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1 shadow-sm">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

