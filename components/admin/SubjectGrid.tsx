"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BookMarked, Loader2, AlertCircle, FolderOpen, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getSubjectswithId } from "@/lib/actions/subject"
import { Subject } from "@/types"


export default function SubjectGrid({ classId }: { classId: string }) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    async function fetchSubjects() {
      setIsLoading(true)
      setError("")
      
      try {
        const result = await getSubjectswithId(classId)
        
        if (isMounted) {
          if ((result.sucess || result.success) && result.data) { 
            setSubjects(result.data)
          } else {
            setError(result.message || "Failed to load subjects.")
          }
        }
      } catch (err) {
        if (isMounted) setError("An unexpected error occurred.")
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    if (classId) {
      fetchSubjects()
    }

    return () => {
      isMounted = false
    }
  }, [classId])

  // Framer Motion Variants for a smooth staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-[2rem] border border-border bg-card/50 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-sm font-medium text-muted-foreground">Loading subjects...</p>
      </div>
    )
  }

  // 2. Error State
  if (error) {
    return (
      <div className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-[2rem] border border-destructive/20 bg-destructive/5 text-center p-6 shadow-sm">
        <AlertCircle className="h-10 w-10 text-destructive mb-4" />
        <h3 className="text-lg font-bold text-foreground">Oops! Something went wrong</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">{error}</p>
        <Button 
          variant="outline" 
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    )
  }

  // 3. Empty State
  if (subjects.length === 0) {
    return (
      <div className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-border bg-card/30 text-center p-6 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
          <FolderOpen className="h-8 w-8 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No Subjects Found</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          There are no subjects assigned to this class yet.
        </p>
      </div>
    )
  }

  // 4. Success State (Render Grid)
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {subjects.map((subject) => (
        <motion.div key={subject.id} variants={cardVariants}>
          {/* Assuming you want to navigate to a subject details page when clicked.
            Adjust the href to match your actual routing structure!
          */}
          <Link href={`/subjects/${subject.id}`} className="block group h-full">
            <div className="relative flex h-full flex-col justify-between rounded-[1.5rem] border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/50 overflow-hidden">
              
              {/* Subtle hover glow effect */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/0 blur-[40px] transition-all duration-500 group-hover:bg-primary/10 pointer-events-none" />

              <div>
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <BookMarked className="h-6 w-6" />
                </div>

                {/* Subject Name */}
                <h4 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {subject.name}
                </h4>
              </div>

              {/* Bottom Action Area */}
              <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-4">
                <span className="text-xs font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
                  View Resources
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1">
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>

            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}