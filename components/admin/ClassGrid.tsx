"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, ChevronRight, Layers, Users, Pencil, Trash2, Loader2, AlertCircle, X } from "lucide-react"
import { ClassItem } from "@/types"
import { deleteClass, updateClass } from "@/lib/actions/class"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
}

function ClassCard({ cls }: { cls: ClassItem }) {
  const router = useRouter()
  
  // --- MODAL STATES ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  // --- ACTION STATES ---
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState("")

  // Edit Form State
  const [editForm, setEditForm] = useState({
    course: cls.course,
    semester: cls.semester,
    section: cls.section
  })

  // --- HANDLERS ---
  
  // 1. Opens the Delete Modal
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault() 
    e.stopPropagation()
    setError("") // clear any previous errors
    setIsDeleteModalOpen(true)
  }

  // 2. Executes the actual delete operation
  const confirmDelete = async () => {
    setIsDeleting(true)
    setError("")
    
    const result = await deleteClass(cls.id)
    
    if (result.success) {
      setIsDeleteModalOpen(false)
      router.refresh() // Refresh the data
    } else {
      setError(result.message || "Failed to delete class")
      setIsDeleting(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setError("")

    const result = await updateClass(cls.id, editForm)

    if (result.success) {
      setIsEditModalOpen(false)
      router.refresh()
    } else {
      setError(result.message || "Failed to update class")
    }
    setIsUpdating(false)
  }

  return (
    <>
      <motion.div variants={cardVariants} className="h-full relative group">
        {/* The Link overlay - covers the whole card but stays behind the action buttons */}
        <Link href={`/admin/manage/${cls.id}`}  aria-label={`Manage ${cls.course}`} >

        <div className="relative z-10 h-full flex flex-col rounded-[1.5rem] bg-card border border-border p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50 overflow-hidden pointer-events-none group-hover:pointer-events-auto">
          
          {/* Subtle background glow on hover */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/0 blur-[50px] transition-all duration-500 group-hover:bg-primary/10 pointer-events-none" />

          {/* Top Row: Icon & Action Buttons */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary pointer-events-auto">
              <Layers className="h-6 w-6" />
            </div>
            
            {/* ACTION BUTTONS (Edit / Delete) */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setError(""); setIsEditModalOpen(true); }}
                className="p-2 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                title="Edit Class"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button 
                onClick={handleDeleteClick}
                className="p-2 bg-muted/50 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                title="Delete Class"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 pointer-events-auto">
            <h3 className="text-xl font-bold text-foreground tracking-tight mb-1 group-hover:text-primary transition-colors">
              {cls.course}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">
              {cls.semester}
            </p>
          </div>

          {/* Bottom Row: Metadata Badges */}
          <div className="mt-6 flex items-center justify-between pointer-events-auto border-t border-border/50 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {cls.section}
              </div>
              <div className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5" />
                {cls._count?.Subjects || 0}
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1">
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
                <Pencil className="h-5 w-5 text-primary" /> Edit Class
              </h2>

              {error && (
                <div className="mb-4 flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
                  <AlertCircle className="h-4 w-4" /> {error}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Course</label>
                  <input 
                    placeholder="Course name"
                    required
                    type="text"
                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                    value={editForm.course}
                    onChange={(e) => setEditForm({...editForm, course: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Semester</label>
                    <input
                      placeholder="e.g. Fall 2026"
                      required
                      type="text"
                      className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={editForm.semester}
                      onChange={(e) => setEditForm({...editForm, semester: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Section</label>
                    <input 
                      required
                      placeholder="e.g. A"
                      type="text"
                      className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={editForm.section}
                      onChange={(e) => setEditForm({...editForm, section: e.target.value})}
                    />
                  </div>
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
                    className="px-4 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
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
                Delete Class?
              </h2>
              
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to delete <span className="font-semibold text-foreground">{cls.course}</span>? This action cannot be undone and will permanently remove this class.
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
export default function ClassGrid({ classes }: { classes: ClassItem[] }) {
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
        <ClassCard key={cls.id} cls={cls} />
      ))}
    </motion.div>
  )
}