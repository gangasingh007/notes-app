import Navbar from "@/components/Navbar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "E-Notes - Admin Dashboard",
  description: "E-Notes - Admin Dashboard",
}

export default function adminlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Navbar />
      {children}
    </>
  )
}
