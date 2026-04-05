"use client"

import { Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ComingSoon() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex max-w-md flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-background border border-border p-10 text-center shadow-2xl"
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[15rem] w-[15rem] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

        {/* Icon with a gentle pulse */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-inner"
        >
          <Calendar className="h-8 w-8" />
        </motion.div>

        {/* Text Content */}
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground">
          Coming Soon
        </h2>
        <p className="mb-8 text-sm font-medium text-muted-foreground leading-relaxed">
          Soon to be uploaded when released by the university
        </p>

        {/* Optional Action Button */}
        <Button 
          variant="outline" 
          className="w-full rounded-xl border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </motion.div>
    </div>
  )
}