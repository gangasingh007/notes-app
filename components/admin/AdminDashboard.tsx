import { getAnalytics } from "@/lib/actions/dashboard"
import AdminDetails from "./AdminDetails"
import GraphicalDetail from "./GraphicalDetail"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function AdminDashboard() {
  const res = await getAnalytics()
  const chartData =
    res.success && res.data && Array.isArray(res.data.chartData)
      ? res.data.chartData
      : []

  return (
    <div className="min-h-screen bg-background">
  
      <div className="mx-auto w-full max-w-6xl  p-4 md:p-8">
        <AdminDetails />
        <GraphicalDetail data={chartData} />
        <Link
          href="/admin/manage"
          className="flex  font-bold mt-8 justify-between items-center w-[290px] bg-primary text-background rounded-xl px-4 py-2 text-sm transition-colors overflow-hidden whitespace-nowrap"
        >
          <Plus className="h-4 w-4 mr-2" />
         Manage the classes and the resources
        </Link>
      </div>
    </div>
  )
}
