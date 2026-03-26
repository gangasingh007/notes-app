import AdminDetails from "./AdminDetails"
import WelcomeCard from "./WelcomeCard"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
        {/* <WelcomeCard /> */}
        <AdminDetails />
      </div>
    </div>
  )
}
