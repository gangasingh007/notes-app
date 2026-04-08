"use client"

import SubjectGrid from '@/components/admin/SubjectGrid'
import { useParams } from 'next/navigation'

function page() {
    const params = useParams()
    const rawId = params?.id
    const classId = Array.isArray(rawId) ? rawId[0] : rawId ?? ""
    
  return (
    <div className="mx-auto w-full max-w-6xl  p-2 md:p-6">
        <SubjectGrid classId={classId}/>
    </div>
  )
}

export default page