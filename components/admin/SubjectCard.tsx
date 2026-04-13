import { deleteSubject, updateSubject } from "@/lib/actions/subject"
import { Subject } from "@/types"
import { AlertCircle, BookMarked, ChevronRight, Loader2, Pencil, Trash2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
}

export default function SubjectCard({ subject, classId }: { subject: Subject, classId: string }) {
  const router = useRouter()
  
  // --- MODAL STATES ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  // --- ACTION STATES ---
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState("")

  // Edit Form State (Assuming Subject only has a 'name' field to edit based on your types)
  const [editForm, setEditForm] = useState({
    name: subject.name,
    classId: subject.classId
  })

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault() 
    e.stopPropagation()
    setError("")
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    setIsDeleting(true)
    setError("")
    
    try {
      const result = await deleteSubject(subject.id)
      if (result.success) {
        setIsDeleteModalOpen(false)
        router.refresh()
      } else {
        setError(result.message || "Failed to delete subject")
        setIsDeleting(false)
      }
    } catch (err) {
      setError("An unexpected error occurred.")
      setIsDeleting(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setError("")

    try {
      const result = await updateSubject(subject.id, editForm)
      if (result.success) {
        setIsEditModalOpen(false)
        router.refresh()
      } else {
        setError(result.message || "Failed to update subject")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <motion.div variants={cardVariants} className="h-full relative group">
        {/* Absolute Link Overlay: Covers card but stays behind buttons */}
        <Link 
          href={`/admin/manage/${classId}/${subject.id}`} 
          aria-label={`Manage ${subject.name}`} 
        >

        <div className="relative z-10 h-full flex flex-col justify-between rounded-[1.5rem] bg-card border border-border p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-500/40 overflow-hidden pointer-events-none group-hover:pointer-events-auto">
          
          {/* Top Gradient Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500/80 via-cyan-500/80 to-blue-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Subtle background glow on hover */}
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/0 blur-[50px] transition-all duration-500 group-hover:bg-blue-500/10 pointer-events-none" />

          <div>
            {/* Top Row: Icon & Action Buttons */}
            <div className="flex justify-between items-start mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10 transition-transform duration-300 group-hover:scale-110 pointer-events-auto">
                <BookMarked className="h-6 w-6" />
              </div>

              {/* ACTION BUTTONS (Edit / Delete) */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setError(""); setIsEditModalOpen(true); }}
                  className="p-2 bg-muted/50 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                  title="Edit Subject"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleDeleteClick}
                  className="p-2 bg-muted/50 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                  title="Delete Subject"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Subject Name */}
            <h4 className="text-xl font-bold text-foreground leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 pointer-events-auto">
              {subject.name}
            </h4>
          </div>

          {/* Bottom Action Area */}
          <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-4 pointer-events-auto">
            <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
              View Resources
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1 shadow-sm">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
        </Link>
      </motion.div>

      {/* MODALS OVERLAY */}
      <AnimatePresence>
        
        {/* EDIT MODAL */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-card border border-border shadow-2xl rounded-2xl p-6"
            >
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              >{}
                <X className="h-4 w-4" />
              </button>
              
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Pencil className="h-5 w-5 text-blue-500" /> Edit Subject
              </h2>

              {error && (
                <div className="mb-4 flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
                  <AlertCircle className="h-4 w-4" /> {error}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Subject Name</label>
                  <input 
                    placeholder="e.g. Data Structures"
                    required
                    type="text"
                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                
                <div className="mt-6 flex gap-3 justify-end pt-4 border-t border-border">
                  <button 
                    type="button" 
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isUpdating}
                    className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-card border border-border shadow-2xl rounded-2xl p-6 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-6">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              
              <h2 className="text-xl font-bold mb-2 text-foreground">
                Delete Subject?
              </h2>
              
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to delete <span className="font-semibold text-foreground">{subject.name}</span>? This action cannot be undone.
              </p>

              {error && (
                <div className="mb-4 flex items-center gap-2 p-3 text-sm text-left text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}

              <div className="flex gap-3 w-full">
                <button 
                  type="button" 
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 text-sm font-medium border text-muted-foreground hover:bg-muted rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 text-sm font-bold bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Yes, Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </AnimatePresence>
    </>
  )
}
