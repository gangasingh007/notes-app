"use client"

import { motion } from "framer-motion"
import { Layers } from "lucide-react"
import { ClassItem } from "@/types"
import ClassCard from "./ClassCard"


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function ClassHomeLayout({ classes }: { classes: ClassItem[] }) {
  return (
    <div className="w-full space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          Academic Classes
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl">
          Access all the resources and class materials on the single go
        </p>
      </motion.div>

      {/* Grid or Empty State */}
      {!classes || classes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border-2 border-dashed border-border bg-card/30"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
            <Layers className="h-10 w-10 text-muted-foreground/60" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">No Classes Found</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Your workspace is currently empty. Add a new class to start organizing your subjects.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {classes.map((cls) => (
            <ClassCard key={cls.id} cls={cls} />
          ))}
        </motion.div>
      )}
    </div>
  )
}