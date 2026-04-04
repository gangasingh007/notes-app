"use client"

import { motion } from "framer-motion"

export default function WelcomeCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // Updated the background to a deep, rich dark tone that fits the StudySync sidebar
      className="relative w-full overflow-hidden rounded-[2rem] bg-[#0b0e14] p-8 md:p-12 border border-white/5 shadow-2xl group"
    >
      {/* Enhanced Animated Background Glows */}
      {/* Top right purple glow */}
      <div className="absolute -top-32 -right-32 h-[35rem] w-[35rem] rounded-full bg-primary/15 blur-[120px] pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
      
      {/* Bottom left blue glow */}
      <div className="absolute -bottom-32 -left-32 h-[25rem] w-[25rem] rounded-full bg-primary/10 blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

      {/* Header Content */}
      <div className="relative z-10 flex flex-col justify-center h-full">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight"
        >
          Welcome back, <span className="text-transparent bg-clip-text bg-primary">Alex Rivera</span>!
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-slate-400 font-medium text-base md:text-lg max-w-xl"
        >
          Let's get to studying. You're on a 5-day streak!
        </motion.p>
      </div>
    </motion.div>
  )
}