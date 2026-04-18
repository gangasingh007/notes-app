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

export async function getClassdata(){
  try {
    const classes = await prisma.class.findMany()

    return {
      success: true,
      data: classes,
    }
  } catch (error) {
    console.error("Error fetching classes with subject counts:", error)
    return { 
      success: false, 
      message: "Internal server error while fetching classes." 
    }
  }
}

export async function deleteClass(classId: string) {
  try {
    await prisma.resource.deleteMany({
      where: {
        subject: {
          classId: classId,
        },
      },
    })

    await prisma.subject.deleteMany({
      where: { classId: classId },
    })

    await prisma.class.delete({
      where: { id: classId },
    })

    return {
      success: true,
      message: "Class and its subjects deleted successfully",
    }
  } catch (error) {
    console.error("DeleteClass Error:", error)
    return {
      success: false,
      message: "Internal server error while deleting class",
    }
  }
}

export async function updateClass(classId: string, data: classProps) {
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
        NOT: { id: classId },
      },
    })

    if (existingClass) {
      return {
        success: false,
        message: "Class already exists",
      }
    }

    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data: {
        course,
        section,
        semester,
      },
    })

    return {
      success: true,
      data: updatedClass,
    }

  } catch (error) {
    console.error("UpdateClass Error:", error)
    return {
      success: false,
      message: "Internal server error while updating class",
    }
  }
}