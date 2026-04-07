"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Plus, AlertCircle, CheckCircle2, GraduationCap, Layers, Hash, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { addClass } from "@/lib/actions/class"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Data for dropdowns
const COURSES = [
  { value: "btech-cse", label: "B.Tech Computer Science" },
  { value: "btech-ece", label: "B.Tech Electronics" },
  { value: "btech-me", label: "B.Tech Mechanical" },
  { value: "btech-ce", label: "B.Tech Civil" },
  { value: "btech-ee", label: "B.Tech Electrical" },
  { value: "bba", label: "Bachelor of Business Administration" },
  { value: "bca", label: "Bachelor of Computer Applications" },
  { value: "mba", label: "Master of Business Administration" },
  { value: "mca", label: "Master of Computer Applications" },
  { value: "other", label: "Other" },
]

const SEMESTERS = [
  { value: "1", label: "1st Semester" },
  { value: "2", label: "2nd Semester" },
  { value: "3", label: "3rd Semester" },
  { value: "4", label: "4th Semester" },
  { value: "5", label: "5th Semester" },
  { value: "6", label: "6th Semester" },
  { value: "7", label: "7th Semester" },
  { value: "8", label: "8th Semester" },
]

const SECTIONS = [
  { value: "A", label: "Section A" },
  { value: "B", label: "Section B" },
  { value: "C", label: "Section C" },
  { value: "D", label: "Section D" },
  { value: "E", label: "Section E" },
]

export default function AddClassForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showCustomCourse, setShowCustomCourse] = useState(false)

  const [formData, setFormData] = useState({
    course: "",
    section: "",
    semester: "",
    customCourse: ""
  })

  const handleSelectChange = (field: string, value: string) => {
    if (field === "course" && value === "other") {
      setShowCustomCourse(true)
    } else if (field === "course") {
      setShowCustomCourse(false)
    }
    setFormData({ ...formData, [field]: value })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const courseValue = formData.course === "other" 
        ? formData.customCourse 
        : COURSES.find(c => c.value === formData.course)?.label || formData.course

      const semesterValue = SEMESTERS.find(s => s.value === formData.semester)?.label || formData.semester
      const sectionValue = SECTIONS.find(s => s.value === formData.section)?.label || formData.section

      const result = await addClass({
        course: courseValue,
        semester: semesterValue,
        section: sectionValue
      })

      if (!result.success) {
        setError(result.message || "Failed to add class.")
        return
      }

      setSuccess("Class successfully added!")
      setFormData({ course: "", section: "", semester: "", customCourse: "" })
      setShowCustomCourse(false)
      
      router.refresh()

      setTimeout(() => {
        setOpen(false)
        if (onSuccess) onSuccess()
      }, 1200)

    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }

  const glowVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: [0.8, 1.2, 1],
      opacity: [0, 0.5, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded font-bold px-6 text-background">
          <Plus className="mr-2 h-4 w-4" />
          Add New Class
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-2xl border-0 bg-transparent p-0 shadow-none ring-0"
        showCloseButton={false}
      >
        <motion.div 
          className="w-full max-w-md mx-auto rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/95 p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
      {/* Animated Background Glows */}
      <div 
        className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/20 blur-[80px] pointer-events-none"
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
      />

      {/* Header */}
      <motion.div className="mb-8 relative z-10" variants={itemVariants}>
        <div className="flex items-center gap-3 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-primary tracking-tight">Add New Class</h2>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Create a new class grouping for subjects and resources. All fields are required.
        </p>
      </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        {/* Course Field */}
        <motion.div className="space-y-2.5" variants={itemVariants}>
          <Label htmlFor="course" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5" />
            Course Name
          </Label>
          <Select 
            value={formData.course} 
            onValueChange={(value) => handleSelectChange("course", value)}
            disabled={loading}
          >
            <SelectTrigger className="w-full h-12 rounded-xl bg-background/50 border-border hover:bg-muted/50 focus:bg-background transition-all group">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <SelectValue placeholder="Select a course" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {COURSES.map((course) => (
                <SelectItem 
                  key={course.value} 
                  value={course.value}
                  className="rounded-lg cursor-pointer"
                >
                  {course.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Custom Course Input */}
          <AnimatePresence>
            {showCustomCourse && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  id="customCourse"
                  placeholder="Enter custom course name"
                  required={showCustomCourse}
                  value={formData.customCourse}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-2 bg-background/50 border-border hover:bg-muted/50 focus-visible:bg-background transition-colors h-11 rounded-xl"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Semester Field */}
        <motion.div className="space-y-2.5" variants={itemVariants}>
          <Label htmlFor="semester" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
            <Layers className="h-3.5 w-3.5" />
            Semester
          </Label>
          <Select 
            value={formData.semester} 
            onValueChange={(value) => handleSelectChange("semester", value)}
            disabled={loading}
          >
            <SelectTrigger className="w-full h-12 rounded-xl bg-background/50 border-border hover:bg-muted/50 focus:bg-background transition-all group">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <SelectValue placeholder="Select semester" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {SEMESTERS.map((semester) => (
                <SelectItem 
                  key={semester.value} 
                  value={semester.value}
                  className="rounded-lg cursor-pointer"
                >
                  {semester.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Section Field */}
        <motion.div className="space-y-2.5" variants={itemVariants}>
          <Label htmlFor="section" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
            <Hash className="h-3.5 w-3.5" />
            Section
          </Label>
          <Select 
            value={formData.section} 
            onValueChange={(value) => handleSelectChange("section", value)}
            disabled={loading}
          >
            <SelectTrigger className="w-full h-12 rounded-xl bg-background/50 border-border hover:bg-muted/50 focus:bg-background transition-all group">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <SelectValue placeholder="Select section" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {SECTIONS.map((section) => (
                <SelectItem 
                  key={section.value} 
                  value={section.value}
                  className="rounded-lg cursor-pointer"
                >
                  {section.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Feedback Messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0, scale: 0.9 }} 
              animate={{ opacity: 1, height: "auto", scale: 1 }} 
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 text-sm font-medium text-destructive bg-destructive/10 p-4 rounded-xl border border-destructive/20 backdrop-blur-sm"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="flex-1">{error}</p>
            </motion.div>
          )}
          {success && (
            <motion.div 
              initial={{ opacity: 0, height: 0, scale: 0.9 }} 
              animate={{ opacity: 1, height: "auto", scale: 1 }} 
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 backdrop-blur-sm"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="flex-1">{success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            disabled={loading || !formData.course || !formData.semester || !formData.section || (showCustomCourse && !formData.customCourse)}
            className="w-full h-12 mt-2 text-background rounded-xl font-bold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/25 to-primary/0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Class...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                  Add Class
                </>
              )}
            </span>
          </Button>
        </motion.div>

        {/* Helper Text */}
        <motion.p 
          className="text-xs text-center text-muted-foreground/70 mt-4"
          variants={itemVariants}
        >
          Make sure all information is accurate before submitting
        </motion.p>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}