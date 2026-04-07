"use server"

import { ResourceType } from "@/app/generated/prisma/client"
import { ResourceProps } from "@/types"
import { addResourceSchema } from "@/zod"
import prisma from "../prisma"

export async function addResource(data: ResourceProps) {
  try {
    const parsed = addResourceSchema.safeParse(data)

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid input data",
      }
    }

    const { name, link, subjectId, type } = parsed.data

    const existingResource = await prisma.resource.findFirst({
      where: {
        subjectId,
        OR: [{ name }, { link }],
      },
    })

    if (existingResource) {
      return {
        success: false,
        message: "A resource with the same name or link already exists for this subject",
      }
    }

    const newResource = await prisma.resource.create({
      data: {
        name,
        link,
        subjectId,
        type: type as ResourceType,
      },
    })

    return {
      success: true,
      message: "Resource created successfully",
      data: newResource,
    }
  } catch (error) {
    console.error("AddResource Error:", error)
    return {
      success: false,
      message: "Internal server error",
    }
  }
}

export async function getResourceById(subjectId:string){
    try {
        const resources = await prisma.resource.findMany({
            where : {
                subjectId : subjectId
            }
        })
        return { 
            sucess : true,
            message : "Resources fetched successfully",
            data : resources
        }
    } catch (error) {
        console.error("Fetching resource Error:", error)
        return {
          success: false,
          message: "Internal server error",
        }
    }
}