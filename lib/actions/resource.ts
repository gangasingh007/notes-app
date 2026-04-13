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
            success : true,
            message : "Resources fetched successfully",
            result : resources
        }
    } catch (error) {
        console.error("Fetching resource Error:", error)
        return {
          success: false,
          message: "Internal server error",
        }
    }
}
export async function deleteResource(resourceId: string) {
    try {
        const deletedResource = await prisma.resource.delete({
            where : {
                id : resourceId
            }
        })
        return {
            success : true,
            message : "Resource deleted successfully",
            data : deletedResource
        }
    } catch (error) {        
      console.error("Delete Resource Error:", error)
        return {
          success: false, 
          message: "Internal server error",
        }
    }
}

export async function updateResource(resourceId: string, data: ResourceProps) {
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
                NOT: { id: resourceId },
            },
        })
        if (existingResource) {
            return {
                success: false,
                message: "A resource with the same name or link already exists for this subject",
            }
        }
        const updatedResource = await prisma.resource.update({
            where: { id: resourceId },
            data: {
                name,
                link,
                subjectId,
                type: type as ResourceType,
            }, 
        })
        return {
            success: true,
            message: "Resource updated successfully",
            data: updatedResource,
        }
    } catch (error) {
        console.error("Update Resource Error:", error)
        return {
            success: false,
            message: "Internal server error",
        }
    }
}