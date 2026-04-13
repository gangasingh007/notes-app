"use server"

import { ChartPoint } from "@/types";
import prisma from "../prisma"

function buildLast6MonthsChartData(
  resources: { createdAt: Date }[],
  subjects: { createdAt: Date }[]
): ChartPoint[] {
  const months: { key: string; label: string }[] = []
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleString("default", { month: "short" }),
    })
  }

  const countByMonth = (items: { createdAt: Date }[]) => {
    const map = new Map<string, number>()
    for (const m of months) map.set(m.key, 0)
    for (const item of items) {
      const d = item.createdAt
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1)
    }
    return map
  }

  const resMap = countByMonth(resources)
  const subMap = countByMonth(subjects)

  return months.map((m) => ({
    month: m.label,
    resources: resMap.get(m.key) ?? 0,
    subjects: subMap.get(m.key) ?? 0,
  }))
}

export async function getAnalytics() {
  try {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const [classCount, subjectCount, resourceCount, recentResources, recentSubjects] =
      await prisma.$transaction([
        prisma.class.count(),
        prisma.subject.count(),
        prisma.resource.count(),
        prisma.resource.findMany({
          where: { createdAt: { gte: sixMonthsAgo } },
          select: { createdAt: true },
        }),
        prisma.subject.findMany({
          where: { createdAt: { gte: sixMonthsAgo } },
          select: { createdAt: true },
        }),
      ])

    const chartData = buildLast6MonthsChartData(recentResources, recentSubjects)

    return {
      success: true,
      data: {
        classCount,
        subjectCount,
        resourceCount,
        chartData,
      },
    }
  } catch (error) {
    console.error("getAnalytics error:", error)
    return { success: false, message: "Internal server error" }
  }
}