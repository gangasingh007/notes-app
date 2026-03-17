"use server"

import prisma  from "../prisma"

export async function getAnalytics() {
  try {
    const [classCount, subjectCount, resourceCount] =
      await prisma.$transaction([
        prisma.class.count(),
        prisma.subject.count(),
        prisma.resource.count(),
      ])

    return {
      success: true,
      data: {
        classCount : classCount,
        subjectCount : subjectCount,
        resourceCount : resourceCount,
      },
    }
  } catch (error) {
    console.error("getAnalytics error:", error)
    return { success: false, message: "Internal server error" }
  }
}