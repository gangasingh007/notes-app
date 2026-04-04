import { getAnalytics } from "@/lib/actions/dashboard"
import AdminDetails from "./AdminDetails"
import GraphicalDetail from "./GraphicalDetail"
import WelcomeCard from "./WelcomeCard"
import Navbar from "../Navbar"

export default async function AdminDashboard() {
  const res = await getAnalytics()
  const chartData =
    res.success && res.data && Array.isArray(res.data.chartData)
      ? res.data.chartData
      : []

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl  p-4 md:p-8">
        {/* <WelcomeCard /> */}
        <AdminDetails />
        <GraphicalDetail data={chartData} />
      </div>
    </div>
  )
}
