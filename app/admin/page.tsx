import AdminDashboard from "@/components/admin/AdminDashboard"
import { isAuthenticated } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

export default async function AdminPage() {

  const isAuth = await isAuthenticated()
  if (!isAuth) {
    redirect("/admin/register")
  }
  return <AdminDashboard />
}