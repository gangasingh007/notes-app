"use client"

import SubjectHomeLayout from '@/components/main/SubjectHomeLayout'
import { useParams } from 'next/navigation'

export default function page() {
  const id = useParams();
  const stringid:string = id?.toString();
  return (
    <div>
        <SubjectHomeLayout classId={stringid} />
    </div>
  )
}
