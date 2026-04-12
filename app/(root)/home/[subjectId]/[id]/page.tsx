"use client"

import ResourceGrid from "@/components/main/Resource";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams()
  const rawId = params?.id
  const resourceId = Array.isArray(rawId) ? rawId[0] : rawId ?? ""
  return (
    <div className="min-h-screen p-6">
       <ResourceGrid subjectId={resourceId} />
    </div>
  )
}
