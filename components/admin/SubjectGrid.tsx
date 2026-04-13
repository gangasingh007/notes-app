"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BookMarked, 
  ChevronRight, 
  Pencil, 
  Trash2, 
  Loader2, 
  AlertCircle, 
  X, 
  FolderOpen 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Subject } from "@/types"
import { getSubjectswithId } from "@/lib/actions/subject"
import SubjectCard from "./SubjectCard"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

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
        const response = await getSubjectswithId(classId)
        
        if (isMounted) {
          if (response.success && response.data) {
            setSubjects(response.data)
          } else {
            setError(response.message || "Failed to load subjects.")
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

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[250px] w-full flex-col items-center justify-center rounded-[2rem] border border-border bg-card/50 shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
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
        <SubjectCard key={subject.id} subject={subject} classId={classId} />
      ))}
    </motion.div>
  )
}