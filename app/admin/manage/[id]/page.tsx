"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, ChevronLeft } from 'lucide-react'

import AddSubjectModal from '@/components/admin/AddSubjectModal'
import SubjectGrid from '@/components/admin/SubjectGrid'

export default function ClassDashboardPage() {
  const params = useParams()
  const router = useRouter()
  
  // Safely extract classId from params
  const rawId = params?.id
  const classId = Array.isArray(rawId) ? rawId[0] : rawId ?? ""
  
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
        
        {/* Subtle background glow for premium feel */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-[50px] pointer-events-none" />
        
        {/* Left Side: Navigation & Title */}
        <div className="flex items-center gap-4 relative z-10">
          <button 
            onClick={() => router.back()}
            className="flex shrink-0 items-center justify-center h-11 w-11 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/50 shadow-sm"
            title="Back to Classes"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Class Curriculum
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage all subjects and modules for this specific class.
            </p>
          </div>
        </div>

        {/* Right Side: Primary Action */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md hover:shadow-lg transition-all sm:w-auto w-full"
        >
          <Plus className="h-5 w-5 stroke-[2.5]" />
          Add Subject
        </motion.button>
      </div>

      {/* 2. MAIN GRID CONTENT */}
      <div className="w-full">
        <SubjectGrid classId={classId} />
      </div>

      {/* 3. MODAL COMPONENT */}
      <AddSubjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        classId={classId} 
        onSuccess={() => window.location.reload()}
      />
    </motion.div>
  )
}