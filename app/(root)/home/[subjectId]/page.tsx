"use client"

import SubjectHomeLayout from '@/components/main/SubjectHomeLayout'
import { useParams } from 'next/navigation'

export default function page() {
  const params = useParams();
  const id = params?.subjectId;
  const classId = Array.isArray(id) ? id[0] : id ?? "";
  return (
    <div className="min-h-screen p-6">
      <SubjectHomeLayout classId={classId}/>
    </div>
  )
}
