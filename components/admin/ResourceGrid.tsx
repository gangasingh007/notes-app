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
  ExternalLink,
  ChevronRight,
  Pencil,
  Trash2,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getResourceById, deleteResource, updateResource } from "@/lib/actions/resource"
import DocumentPreview from "../main/DocumentPreview"

// --- TYPES ---
export type ResourceType = "video" | "document"

export interface Resource {
  id: string
  name: string
  link: string
  type: ResourceType
  subjectId: string
  createdAt: string
  updatedAt: string
}

export interface ResourceListProps {
  subjectId: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
}


function ResourceCard({ 
  resource, 
  onPreview, 
  onRefresh 
}: { 
  resource: Resource, 
  onPreview: () => void, 
  onRefresh: () => void 
}) {
  const isVideo = resource.type === "video"
  
  // --- MODAL STATES ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState("")

  // Edit Form State
  const [editForm, setEditForm] = useState({
    name: resource.name,
    link: resource.link,
    type: resource.type,
    subjectId : resource.subjectId
  })
  
  // Dynamic color themes
  const theme = {
    gradient: isVideo ? "from-blue-600 to-cyan-500" : "from-emerald-500 to-teal-400",
    iconBg: isVideo ? "from-blue-500/10 to-cyan-500/5" : "from-emerald-500/10 to-teal-500/5",
    iconBorder: isVideo ? "border-blue-500/20" : "border-emerald-500/20",
    textHover: isVideo ? "group-hover:text-blue-500" : "group-hover:text-emerald-500",
    badgeBg: isVideo ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    buttonHoverBg: isVideo ? "group-hover:bg-blue-600" : "group-hover:bg-emerald-600",
    modalAccent: isVideo ? "text-blue-500" : "text-emerald-500",
    modalButton: isVideo ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700"
  }

  // --- HANDLERS ---
  const handleOpenExternally = () => {
    window.open(resource.link, '_blank')
  }

  const confirmDelete = async () => {
    setIsDeleting(true)
    setError("")
    try {
      const result = await deleteResource(resource.id)
      if (result.success) {
        setIsDeleteModalOpen(false)
        onRefresh()
      } else {
        setError(result.message || "Failed to delete resource")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setError("")
    try {
      const result = await updateResource(resource.id, editForm)
      if (result.success) {
        setIsEditModalOpen(false)
        onRefresh()
      } else {
        setError(result.message || "Failed to update resource")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <motion.div variants={itemVariants} className="w-full">
        <motion.div 
          whileHover={{ y: -2 }}
          className="relative flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl bg-card border border-border/60 shadow-sm transition-all duration-300 group-hover:shadow-md overflow-hidden group-hover:border-transparent group"
        >
          {/* Left Edge Color Indicator */}
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${theme.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

          {/* Icon Area */}
          <div className="flex items-center gap-4 flex-1">
            <div className={`shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${theme.iconBg} border ${theme.iconBorder} transition-transform duration-500 group-hover:scale-110 ml-2`}>
              {isVideo ? (
                <Video className="h-6 w-6 text-blue-500" />
              ) : (
                <FileText className="h-6 w-6 text-emerald-500" />
              )}
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0 py-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className={`text-base font-bold text-foreground truncate transition-colors ${theme.textHover}`}>
                  {resource.name}
                </h3>
                <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${theme.badgeBg}`}>
                  {resource.type}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground/80">
                Added {new Date(resource.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Hidden Admin Actions (Edit/Delete) - Appears on Hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 absolute top-4 right-4 md:static md:top-auto md:right-auto md:mr-2">
            <button 
              onClick={() => { setError(""); setIsEditModalOpen(true); }}
              className="p-2 bg-muted/50 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
              title="Edit Resource"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button 
              onClick={() => { setError(""); setIsDeleteModalOpen(true); }}
              className="p-2 bg-muted/50 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
              title="Delete Resource"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Action Buttons Area */}
          <div className="shrink-0 flex items-center gap-2 mt-4 md:mt-0 border-t border-border/50 md:border-none pt-4 md:pt-0 w-full md:w-auto">
            {isVideo ? (
              <Button
                onClick={handleOpenExternally}
                className={`w-full md:w-auto transition-all duration-300 ${theme.buttonHoverBg} group-hover:text-white group-hover:border-transparent shadow-sm hover:shadow-md`}
                variant="outline"
              >
                <Video className="mr-2 h-4 w-4" />
                Watch Video
                <ChevronRight className="ml-2 h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            ) : (
              <div className="flex w-full md:w-auto gap-2">
                <Button
                  onClick={onPreview}
                  className={`flex-1 md:flex-initial transition-all duration-300 ${theme.buttonHoverBg} group-hover:text-white group-hover:border-transparent shadow-sm hover:shadow-md`}
                  variant="outline"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Preview
                </Button>

                <Button
                  onClick={handleOpenExternally}
                  className="shrink-0 px-3 transition-all duration-300 bg-background hover:bg-muted text-muted-foreground hover:text-foreground shadow-sm hover:shadow-md"
                  variant="outline"
                  title="Open externally in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* MODALS */}
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
                <Pencil className={`h-5 w-5 ${theme.modalAccent}`} /> Edit Resource
              </h2>

              {error && (
                <div className="mb-4 flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Resource Name</label>
                  <input 
                    required
                    placeholder={``}
                    type="text"
                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">URL Link</label>
                  <input 
                    required
                    placeholder={``}
                    type="url"
                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                    value={editForm.link}
                    onChange={(e) => setEditForm({...editForm, link: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Type</label>
                  <select
                    title="Resource Type"
                    className="w-full p-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                    value={editForm.type}
                    onChange={(e) => setEditForm({...editForm, type: e.target.value as ResourceType})}
                  >
                    <option value="document">Document (PDF/Drive)</option>
                    <option value="video">Video Lecture</option>
                  </select>
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
                    className={`px-4 py-2 text-sm font-bold text-white rounded-lg transition-colors flex items-center gap-2 ${theme.modalButton}`}
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
                Delete Resource?
              </h2>
              
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to delete <span className="font-semibold text-foreground">{resource.name}</span>?
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

export default function ResourceGrid({ subjectId }: ResourceListProps) {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // State to manage Modal and Refreshing
  const [previewLink, setPreviewLink] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0) // Used to re-fetch data without reloading the page

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
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (subjectId) fetchResources()

    return () => {
      isMounted = false
    }
  }, [subjectId, refreshTrigger])

  const videoResources = resources.filter(r => r.type === "video")
  const documentResources = resources.filter(r => r.type === "document")

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

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
        className="flex flex-col gap-4"
      >
        {resourceList.map((resource) => (
          <ResourceCard 
            key={resource.id} 
            resource={resource} 
            onPreview={() => setPreviewLink(resource.link)} 
            onRefresh={handleRefresh} // Passes the refresh trigger down
          />
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
            onClick={() => handleRefresh()}
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
        {/* TABS HEADER */}
        <div className="w-full flex justify-start mb-6">
          <TabsList className="flex h-auto p-1 bg-muted/50 rounded-xl border border-border/50 shadow-sm">
            <TabsTrigger 
              value="all" 
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all font-semibold"
            >
              <LinkIcon className="h-4 w-4" />
              <span>All</span>
              <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-xs bg-foreground/10 border-0">
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

        {/* TAB CONTENT */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <TabsContent value="all" className="m-0 outline-none">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {renderResourceList(resources)}
              </motion.div>
            </TabsContent>

            <TabsContent value="videos" className="m-0 outline-none">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {renderResourceList(videoResources)}
              </motion.div>
            </TabsContent>

            <TabsContent value="documents" className="m-0 outline-none">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
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
      {/* Title Section */}
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
          Access all study materials, video lectures, and documents for this subject.
        </p>
      </motion.div>
      
      <div className="w-full flex flex-col">
        {renderContent()}
      </div>

      <DocumentPreview 
        isOpen={!!previewLink} 
        resourceLink={previewLink || ""} 
        onClose={() => setPreviewLink(null)} 
      />
    </div>
  )
}