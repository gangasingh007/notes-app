import { getAnalytics } from "@/lib/actions/dashboard"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, BookOpen, Layers, AlertCircle } from "lucide-react"

interface StatCardProps {
  title: string
  value: number
  icon: React.ElementType
  description?: string
  trend?: string // E.g., "+12% from last month"
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: StatCardProps) {
  return (
    <Card className="border-border/50 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 bg-primary/10 rounded-md">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tabular-nums tracking-tight">
          {value}
        </div>
        {(description || trend) && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend && <span className="text-emerald-500 font-medium mr-1">{trend}</span>}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default async function AdminDetails() {
  const res = await getAnalytics()

  // Polished Error State
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
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-sm text-muted-foreground">
          High-level metrics and counts across your platform content.
        </p>
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