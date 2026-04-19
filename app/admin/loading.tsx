import { Loader2 } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className="loading flex justify-center italic h-screen items-center">
        <Loader2 className="animate-spin" size={40} />
    </div>
  )
}
    