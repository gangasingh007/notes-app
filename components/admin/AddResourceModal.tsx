"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, AlertCircle, Video, FileText, FilePlus2 } from "lucide-react"
import { ResourceType } from "@/types" // Ensure this matches your types file
import { addResource } from "@/lib/actions/resource"

interface AddResourceModalProps {
  isOpen: boolean
  onClose: () => void
  subjectId: string
  onSuccess?: () => void
}

export default function AddResourceModal({ isOpen, onClose, subjectId, onSuccess }: AddResourceModalProps) {
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [type, setType] = useState<ResourceType>("document")
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !link.trim()) {
      setError("Please fill in all required fields.")
      return
    }

    // Basic URL validation
    try {
      new URL(link)
    } catch (_) {
      setError("Please enter a valid URL (e.g., https://...)")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const result = await addResource({ subjectId, name, link, type })
      if (result.success) {
        setName("")
        setLink("")
        setType("document")
        
        if (onSuccess) onSuccess() // Trigger refresh in parent
        onClose() // Close modal
      } else {
        setError(result.message || "Failed to add resource.")
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
      setLink("")
      setType("document")
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
            className="relative w-full max-w-lg bg-card border border-border/80 shadow-2xl rounded-2xl overflow-hidden z-10"
          >
            {/* Top Accent Line (Purple theme for Resources) */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary/10" />

            <div className="p-6 mt-1">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                    <FilePlus2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">
                      Add New Material
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Upload a document link or video lecture.
                    </p>
                  </div>
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
                    className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl overflow-hidden mb-4"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Custom Type Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Resource Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Document Option */}
                    <div 
                      onClick={() => setType("document")}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        type === "document" 
                          ? "border-emerald-500 bg-emerald-500/5 shadow-sm" 
                          : "border-border/50 bg-background hover:border-emerald-500/30 hover:bg-muted/50"
                      }`}
                    >
                      <FileText className={`h-6 w-6 ${type === "document" ? "text-emerald-500" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-bold ${type === "document" ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
                        Document / PDF
                      </span>
                    </div>

                    {/* Video Option */}
                    <div 
                      onClick={() => setType("video")}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        type === "video" 
                          ? "border-blue-500 bg-blue-500/5 shadow-sm" 
                          : "border-border/50 bg-background hover:border-blue-500/30 hover:bg-muted/50"
                      }`}
                    >
                      <Video className={`h-6 w-6 ${type === "video" ? "text-blue-500" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-bold ${type === "video" ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}`}>
                        Video Lecture
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="resourceName" className="text-sm font-semibold text-foreground">
                    Material Title
                  </label>
                  <input
                    id="resourceName"
                    type="text"
                    placeholder="e.g., Chapter 4: Data Structures"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="resourceLink" className="text-sm font-semibold text-foreground">
                    URL Link
                  </label>
                  <input
                    id="resourceLink"
                    type="url"
                    placeholder="https://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all disabled:opacity-50"
                  />
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
                    disabled={isSubmitting || !name.trim() || !link.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold bg-primary hover:bg-primary/90 text-background rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Add Material"
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