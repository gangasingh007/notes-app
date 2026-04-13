"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, ChevronLeft } from 'lucide-react'

import AddResourceModal from '@/components/admin/AddResourceModal'
import ResourceGrid from '@/components/admin/ResourceGrid'

export default function SubjectResourcesPage() {
  const params = useParams()
  const router = useRouter()
  
  // Safely extract the ID from params based on your routing structure
  // We map it to 'subjectId' for clarity, since it represents the subject's resources
  const rawId = params?.resourceId || params?.id
  const subjectId = Array.isArray(rawId) ? rawId[0] : rawId ?? ""
  
  // State to control the Modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-7xl p-4 md:p-8 space-y-8"
    >
      {/* 1. TOP COMMAND HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 rounded-[2rem] border border-border shadow-sm relative overflow-hidden">
        
        {/* Subtle background glow for premium feel (Purple to match Resources theme) */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full  blur-[50px] pointer-events-none" />
        
        {/* Left Side: Navigation & Title */}
        <div className="flex items-center gap-4 relative z-10">
          <button 
            onClick={() => router.back()}
            className="flex shrink-0 items-center justify-center h-11 w-11 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/50 shadow-sm"
            title="Back to Subjects"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Subject Materials
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage all documents, videos, and links for this subject.
            </p>
          </div>
        </div>

        {/* Right Side: Primary Action */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-background font-bold shadow-md hover:shadow-lg transition-all sm:w-auto w-full"
        >
          <Plus className="h-5 w-5 stroke-[2.5]" />
          Add Material
        </motion.button>
      </div>

      {/* 2. MAIN GRID CONTENT */}
      <div className="w-full">
        <ResourceGrid subjectId={subjectId} />
      </div>

      {/* 3. MODAL COMPONENT */}
      <AddResourceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        subjectId={subjectId}
        onSuccess={() => window.location.reload()} // Refreshes page on success
      />
    </motion.div>
  )
}