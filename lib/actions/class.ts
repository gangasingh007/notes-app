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
    const classes = await prisma.class.findMany({
      select: {
        id: true,
        course: true,
        section: true,
        semester: true,
        _count: {
          select: {
            Subjects: true,
          },
        },
      },
      orderBy: [
        { course: 'asc' },
        { semester: 'asc' },
        { section: 'asc' }
      ]
    })

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


export async function getSubjectswithId(id:string){
  try {
    const data = await prisma.subject.findMany({
      where:{
        classId : id
      }
    })
    return {
      sucess : true,
      data : data
    }
  } catch (error) {
    console.error("Error fetching the subjects:", error)
    return { 
      success: false, 
      message: "Internal server error while fetching resources." 
    }
  }
}