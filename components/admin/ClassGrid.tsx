"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, ChevronRight, Layers, Users } from "lucide-react"
import { ClassItem } from "@/types"


export default function ClassGrid({ classes }: { classes: ClassItem[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center rounded-[2rem] border border-dashed border-border bg-card/50">
        <Layers className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-xl font-bold text-foreground">No Classes Found</h3>
        <p className="text-sm text-muted-foreground mt-2">Create a class to get started.</p>
      </div>
    )
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {classes.map((cls) => (
        <motion.div key={cls.id} variants={cardVariants}>
          <Link href={`/admin/manage/${cls.id}`} className="block group h-full">
            <div className="relative h-full flex flex-col rounded-[1.5rem] bg-card border border-border p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50 overflow-hidden">
              
              {/* Subtle background glow on hover */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/0 blur-[50px] transition-all duration-500 group-hover:bg-primary/10 pointer-events-none" />

              {/* Top Row: Course & Arrow Icon */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Layers className="h-6 w-6" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground tracking-tight mb-1 group-hover:text-primary transition-colors">
                  {cls.course}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {cls.semester}
                </p>
              </div>

              {/* Bottom Row: Metadata Badges */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  {cls.section}
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" />
                  {cls._count.Subjects} {cls._count.Subjects === 1 ? "Subject" : "Subjects"}
                </div>
              </div>

            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}