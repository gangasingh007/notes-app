import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface StatCardProps {
  title: string
  value: number
  icon: React.ElementType
  description?: string
  trend?: string
}

export default function StatCard({
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