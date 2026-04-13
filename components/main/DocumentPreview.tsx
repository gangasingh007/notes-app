import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, LoaderCircle, FileText } from "lucide-react";

const DocumentPreview = ({ isOpen, onClose, resourceLink }: { isOpen: boolean; onClose: () => void; resourceLink: string }) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen && resourceLink) {
      setIsLoading(true);
      const match = resourceLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
      const url = match ? `https://drive.google.com/file/d/${match[1]}/preview` : resourceLink;
      setPreviewUrl(url);
    }
  }, [isOpen, resourceLink]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Updated to theme background with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />

          {/* Sliding Pane - Updated to use bg-card and border-border */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full lg:w-[60vw] max-w-4xl bg-background border-l border-border z-150 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="h-16 border-b border-border/60 flex items-center justify-between px-6 bg-card">
               <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <FileText className="text-primary h-5 w-5" />
                  </div>
                  <h2 className="font-bold tracking-tight text-foreground text-lg">Document Preview</h2>
               </div>
               <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
               >{}
                  <X size={20} />
               </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative bg-muted/30">
               {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10">
                     <div className="relative flex items-center justify-center mb-4">
                       <div className="absolute h-12 w-12 rounded-full border-4 border-primary/20" />
                       <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
                     </div>
                     <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading Document...</p>
                  </div>
               )}
               <iframe 
                  src={previewUrl}
                  className="w-full h-full border-none bg-white"
                  onLoad={() => setIsLoading(false)}
                  title="Preview"
               />
            </div>

            {/* Footer */}
            <div className="h-20 border-t border-border/60 bg-card flex items-center justify-end gap-3 px-6">
               <a 
                  href={resourceLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-border bg-background hover:bg-muted text-foreground transition-all rounded-xl shadow-sm"
               >
                  <ExternalLink size={16} /> Open Externally
               </a>
               <a 
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold bg-primary hover:bg-primary/90 text-background transition-all rounded-xl shadow-sm"
               >
                  <Download size={16} /> Download
               </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DocumentPreview;