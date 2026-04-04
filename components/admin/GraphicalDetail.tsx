"use client"

import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts"

type ChartRow = { month: string; resources: number; subjects: number }

export default function GraphicalDetail({ data }: { data: ChartRow[] }) {
  return (
    <div className="w-full rounded-[2rem] mt-9 bg-card border border-white/5 p-6 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground tracking-tight">Growth Trends</h3>
        <p className="text-sm text-slate-400 font-medium">Resources added over the last 6 months</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data }
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* Background Grid */}
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            
            {/* Axes */}
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            
            {/* Tooltip */}
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'card', 
                border: '1px solid border',
                borderRadius: '12px',
                color: 'foreground'
              }}
              itemStyle={{ color: 'foreground' }}
            />
            <defs>
              <linearGradient id="colorResources" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="primary" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="primary" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSubjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="primary" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="primary" stopOpacity={0}/>
              </linearGradient>
            </defs>

            {/* The actual data lines/areas */}
            <Area 
              type="monotone" 
              dataKey="resources" 
              name="Resources"
              stroke="orange" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorResources)" 
            />
            <Area 
              type="monotone" 
              dataKey="subjects" 
              name="Subjects"
              stroke="blue" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSubjects)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}