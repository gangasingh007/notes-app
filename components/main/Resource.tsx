"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Loader2, 
  AlertCircle, 
  FolderOpen, 
  FileText, 
  Video, 
  Link as LinkIcon,
  ExternalLink
} from "lucide-react"

// Ensure these point to your actual UI components and backend actions
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getResourceById } from "@/lib/actions/resource"
import ResourceCard from "./ResourceCard"
import { Resource, ResourceListProps } from "@/types"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}


export default function ResourceGrid({ subjectId }: ResourceListProps) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchResources() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await getResourceById(subjectId)

        if (isMounted) {
          if (response.success || (response as any).sucess) {
            setResources(response.result || (response as any).data || [])
          } else {
            setError(response.message || "Failed to fetch resources")
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("An error occurred while fetching resources")
          console.error(err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (subjectId) {
      fetchResources()
    }

    return () => {
      isMounted = false
    }
  }, [subjectId])

  const videoResources = resources.filter(r => r.type === "video")
  const documentResources = resources.filter(r => r.type === "document")

  const renderEmptyState = (type: "video" | "document") => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/30 text-center p-8"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
        {type === "video" ? (
          <Video className="h-6 w-6 text-muted-foreground/50" />
        ) : (
          <FileText className="h-6 w-6 text-muted-foreground/50" />
        )}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">
        No {type === "video" ? "Videos" : "Documents"} Available
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        {type === "video" 
          ? "No video lectures have been added to this subject yet."
          : "No document resources have been added to this subject yet."}
      </p>
    </motion.div>
  )

  const renderResourceList = (resourceList: Resource[]) => {
    if (resourceList.length === 0) {
      return renderEmptyState(resourceList === videoResources ? "video" : "document")
    }

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {resourceList.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </motion.div>
    )
  }

  const renderContent = () => {
    if (loading) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border border-border bg-card/30 shadow-sm"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute h-12 w-12 rounded-full border-4 border-blue-500/20" />
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">Loading resources...</p>
        </motion.div>
      )
    }

    if (error) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 text-center p-8 shadow-sm"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Failed to load resources</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">{error}</p>
          <Button 
            variant="default" 
            className="mt-6 shadow-md hover:shadow-lg transition-all"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </motion.div>
      )
    }

    if (resources.length === 0) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card/30 text-center p-8 shadow-sm"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
            <FolderOpen className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">No Resources Available</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            This subject doesn't have any learning resources added yet.
          </p>
        </motion.div>
      )
    }

    return (
      <Tabs defaultValue="all" className="w-full flex flex-col">

        <div className="w-full flex justify-start mb-6">
          <TabsList className="flex h-auto p-1 bg-muted/50 rounded-xl border border-border/50 shadow-sm">
            <TabsTrigger 
              value="all" 
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all font-semibold"
            >
              <LinkIcon className="h-4 w-4" />
              <span>All</span>
              <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs bg-white/70 border-0">
                {resources.length}
              </Badge>
            </TabsTrigger>
            
            <TabsTrigger 
              value="videos"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all font-semibold"
            >
              <Video className="h-4 w-4" />
              <span>Videos</span>
              <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs bg-blue-500/10 text-blue-500 border-0">
                {videoResources.length}
              </Badge>
            </TabsTrigger>
            
            <TabsTrigger 
              value="documents"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all font-semibold"
            >
              <FileText className="h-4 w-4" />
              <span>Docs</span>
              <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs bg-emerald-500/10 text-emerald-500 border-0">
                {documentResources.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TAB CONTENT (FLEX LAYOUT) */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <TabsContent value="all" className="m-0 outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderResourceList(resources)}
              </motion.div>
            </TabsContent>

            <TabsContent value="videos" className="m-0 outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderResourceList(videoResources)}
              </motion.div>
            </TabsContent>

            <TabsContent value="documents" className="m-0 outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderResourceList(documentResources)}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </div>
      </Tabs>
    )
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Title & Subheader Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2 w-full"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
            <LinkIcon className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Learning Resources
          </h2>
          {!loading && resources.length > 0 && (
            <Badge variant="secondary" className="ml-2 text-sm font-bold bg-muted/80 text-foreground">
              {resources.length} items
            </Badge>
          )}
        </div>
        <p className="text-base text-muted-foreground max-w-2xl mt-1">
          Access all study materials, video lectures, and documents for this subject. Click on any resource to open it in a new tab.
        </p>
      </motion.div>
      
      {/* Content Section */}
      <div className="w-full flex flex-col">
        {renderContent()}
      </div>
    </div>
  )
}