import { Badge, Calendar, ChevronRight, ExternalLink, FileText, Video } from "lucide-react"
import {motion} from "framer-motion"
import { Resource } from "@/types"
import { Button } from "../ui/button"

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  }
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  const isVideo = resource.type === "video"
  const Icon = isVideo ? Video : FileText
  const gradientFrom = isVideo ? "from-blue-500/10" : "from-green-500/10"
  const gradientTo = isVideo ? "to-cyan-500/5" : "to-emerald-500/5"
  const iconColor = isVideo ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"
  const borderColor = isVideo ? "border-blue-500/20" : "border-green-500/20"
  const hoverBorderColor = isVideo ? "group-hover:border-blue-500/40" : "group-hover:border-green-500/40"
  const hoverRingColor = isVideo ? "group-hover:ring-blue-500/20" : "group-hover:ring-green-500/20"
  const hoverTitleColor = isVideo ? "group-hover:text-blue-600 dark:group-hover:text-blue-400" : "group-hover:text-green-600 dark:group-hover:text-green-400"
  const hoverBgGlow = isVideo ? "group-hover:bg-blue-500/15" : "group-hover:bg-green-500/15"
  const badgeBg = isVideo ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-green-500/10 text-green-600 dark:text-green-400"
  const buttonHoverBg = isVideo ? "group-hover:bg-blue-600" : "group-hover:bg-green-600"
  const topGradient = isVideo ? "from-blue-600 via-blue-400" : "from-green-600 via-green-400"

  const handleOpenResource = () => {
    window.open(resource.link, "_blank", "noopener,noreferrer")
  }

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className="h-full"
    >
      <div className="block group h-full focus:outline-none">
        <motion.div 
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          className={`relative h-full flex flex-col rounded-[1.5rem] bg-card border border-border/80 shadow-sm transition-all duration-300 group-hover:shadow-2xl ${hoverBorderColor} group-hover:ring-1 ${hoverRingColor} overflow-hidden`}
        >
          {/* Top Gradient Accent Bar */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${topGradient} to-background opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Subtle Background Hover Glow */}
          <div className={`absolute -right-24 -top-24 h-48 w-48 rounded-full ${isVideo ? 'bg-blue-500/0' : 'bg-green-500/0'} blur-[60px] transition-all duration-500 ${hoverBgGlow} pointer-events-none`} />

          {/* MAIN CARD BODY */}
          <div className="p-6 flex flex-col flex-1 mt-1 z-10">
            
            {/* Top Row: Icon & Type Badge */}
            <div className="flex justify-between items-start mb-6">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} ${iconColor} border ${borderColor} shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                <Icon className="h-7 w-7" />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col justify-end">
              <h3 className={`text-xl font-extrabold text-foreground tracking-tight mb-3 ${hoverTitleColor} transition-colors line-clamp-2 leading-snug`}>
                {resource.name}
              </h3>
              
              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(resource.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`px-6 py-4 bg-muted/30 border-t border-border/50 mt-auto z-10 transition-colors duration-300 ${isVideo ? 'group-hover:bg-blue-500/5' : 'group-hover:bg-green-500/5'}`}>
            <Button
              onClick={handleOpenResource}
              className={`w-full transition-all duration-300 ${buttonHoverBg} group-hover:text-white group-hover:border-transparent shadow-sm hover:shadow-md`}
              variant="outline"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Resource
              <ChevronRight className="ml-auto h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

        </motion.div>
      </div>
    </motion.div>
  )
}
