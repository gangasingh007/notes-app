"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, AlertCircle, FolderOpen, Library } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Subject } from "@/types"
import SubjectCard from "./SubjectCard"
import { getSubjectswithId } from "@/lib/actions/subject"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function SubjectHomeLayout({ classId }: { classId: string }) {
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

  // Helper to render the correct content state
  const renderContent = () => {
    if (isLoading) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border border-border bg-card/30 shadow-sm"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute h-12 w-12 rounded-full border-4 border-blue-500/20" />
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">Loading curriculum...</p>
        </motion.div>
      )
    }

    if (error) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 text-center p-8 shadow-sm"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Failed to load subjects</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">{error}</p>
          <Button 
            variant="default" 
            className="mt-6 shadow-md hover:shadow-lg transition-all"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </motion.div>
      )
    }

    if (subjects.length === 0) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card/30 text-center p-8 shadow-sm"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
            <FolderOpen className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">No Subjects Added</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            This class doesn't have any subjects assigned to it yet.
          </p>
        </motion.div>
      )
    }

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} classId={classId} />
        ))}
      </motion.div>
    )
  }

  return (
    <div className="w-full space-y-8">
      {/* Title & Subheader Section (Always Visible) */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Library className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Class Subjects
          </h2>
        </div>
        <p className="text-base text-muted-foreground max-w-2xl ml-1">
          Browse all subjects assigned to this class. Select a subject to access its modules, assignments, and specific resources.
        </p>
      </motion.div>
      {renderContent()}
    </div>
  )
}