"use client"

import SubjectGrid from '@/components/admin/SubjectGrid'
import { useParams } from 'next/navigation'

function page() {
    const id = useParams()
    const stringId :string= id.toString();
    
  return (
    <div>
        <SubjectGrid classId={stringId}/>
    </div>
  )
}

export default page