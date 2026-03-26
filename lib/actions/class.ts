"use server"

import prisma from "@/lib/prisma"
import { classProps } from "@/types"
import { addClassSchema } from "@/zod"

export async function addClass(data: classProps) {
  try {
    const parsed = addClassSchema.safeParse(data)

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid input data",
      }
    }

    const { semester, course, section } = parsed.data

    const existingClass = await prisma.class.findFirst({
      where: {
        course,
        section,
        semester,
      },
    })

    if (existingClass) {
      return {
        success: false,
        message: "Class already exists",
      }
    }

    const newClass = await prisma.class.create({
      data: {
        course,
        section,
        semester,
      },
    })

    return {
      success: true,
      data: newClass,
    }

  } catch (error) {
    console.error("AddClass Error:", error)

    return {
      success: false,
      message: "Internal server error",
    }
  }
}