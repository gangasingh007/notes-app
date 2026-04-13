import { getAnalytics } from "@/lib/actions/dashboard"
import { Users, BookOpen, Layers, AlertCircle, Plus, ArrowBigLeft, LucideSquareChevronRight, ChevronsRightIcon } from "lucide-react"
import StatCard from "./StatCard"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"


export default async function AdminDetails() {
  const res = await getAnalytics()
  // error state response
  if (!res?.success || !res?.data) {
    return (
      <Card className="border-destructive/20 bg-destructive/5 shadow-sm mt-6">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 bg-destructive/10 rounded-full">
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-lg text-destructive">Analytics Unavailable</CardTitle>
            <CardDescription className="text-destructive/80">
              We couldn't load the dashboard overview at this time.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    )
  }

  const { classCount, subjectCount, resourceCount } = res.data

  return (
    <section className="w-full space-y-6">
      <div className="flex justify-between items-center ">
        <div className="">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="text-sm text-muted-foreground">
            High-level metrics and counts across your platform content.
          </p>
        </div>
        <Link
          href="/admin/manage"
          className="flex mb-2 font-bold mt-8 justify-between items-center w-[290px] bg-primary text-background rounded-xl px-4 py-2 text-sm transition-colors overflow-hidden whitespace-nowrap"
        >
          <ChevronsRightIcon className="h-4 w-4 mr-2" />
         Manage the classes and the resources
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Classes" 
          value={classCount} 
          icon={Users} 
          trend="+4%" 
          description="from last month"
        />
        <StatCard 
          title="Active Subjects" 
          value={subjectCount} 
          icon={BookOpen} 
          trend="+12" 
          description="new this week"
        />
        <StatCard 
          title="Learning Resources" 
          value={resourceCount} 
          icon={Layers} 
          description="Total uploaded materials"
        />
      </div>
    </section>
  )
}