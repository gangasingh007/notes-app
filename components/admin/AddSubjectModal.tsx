"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, BookMarked, Loader2, AlertCircle } from "lucide-react"
import { addSubject } from "@/lib/actions/subject"

interface AddSubjectModalProps {
  isOpen: boolean
  onClose: () => void
  classId: string
  onSuccess?: () => void // Optional callback to refresh data in parent
}

export default function AddSubjectModal({ isOpen, onClose, classId, onSuccess }: AddSubjectModalProps) {
  const [name, setName] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError("Subject name is required.")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Replace with your actual server action!
      const result = await addSubject({ classId, name })
      
     
      if (result.success) {
        setName("") // Reset form
        if (onSuccess) onSuccess() // Trigger refresh in parent
        onClose() // Close modal
      } else {
        setError(result.message || "Failed to add subject.")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset state when closing via backdrop or X button
  const handleClose = () => {
    if (!isSubmitting) {
      setError("")
      setName("")
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md bg-card border border-border/80 shadow-2xl rounded-2xl overflow-hidden z-10"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500" />

            <div className="p-6 mt-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <BookMarked className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    Add New Subject
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50"
                >{}
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Error Message */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl mb-4"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="subjectName" className="text-sm font-semibold text-foreground">
                    Subject Name
                  </label>
                  <input
                    id="subjectName"
                    type="text"
                    placeholder="e.g., Advanced Mathematics"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all disabled:opacity-50"
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground pl-1">
                    This subject will be added to the current class curriculum.
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 pt-4 border-t border-border/50">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2.5 text-sm font-medium border border-border text-foreground hover:bg-muted rounded-xl transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add Subject"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}