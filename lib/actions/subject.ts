"use server"

import { subjectProps } from "@/types";
import prisma from "../prisma"
import { addSubjectSchema } from "@/zod";

export async function getSubjectswithId(id:string){
    try {
        const data = await prisma.subject.findMany({
            where: {
                classId: id
            }
        });
      return {
        success : true,
        data : data
      }
    } catch (error) {
      console.error("Error fetching the subjects:", error)
      return { 
        success: false, 
        message: "Internal server error while fetching subjects." 
      }
    }
}

export async function addSubject(data : subjectProps){
    try {
        const payload = data
        const parsedPayload = addSubjectSchema.safeParse({payload})

        if(parsedPayload.success){
            return {
                success : false,
                message : "Wrong Inputs" 
            }
        }
        const isExisting = await prisma.subject.findFirst({
            where : {
                classId : payload.classId,
                name  : payload.name
            }
        })
        if (isExisting){
            return {
                success : false,
                message : "The Resource Already Exists" 
            }
        }
        const newSubject = await prisma.subject.create({
            data : {
                classId : payload.classId,
                name : payload.name
            }
        })

        return { 
            success : true,
            message : "The Subject has been added",
            data : newSubject
        }
    } catch (error) {
        return { 
            success: false, 
            message: "Internal server error while fetching resources." 
          }
    }
}

export async function deleteSubject(subjectId: string) {
    try {
        await prisma.resource.deleteMany({ 
            where: {
                subjectId: subjectId
            }
        })
        await prisma.subject.delete({
            where: {
                id: subjectId,
            },
        })
        return {
            success : true,
            message : "The Subject has been deleted"
        }
    } catch (error) {
        return { 
            success: false, 
            message: "Internal server error while deleting the subject." 
          }
    }
}

export async function updateSubject(subjectId: string, data :{ name: string, classId: string }) {
    try {
        const payload = data
        const isExisting = await prisma.subject.findFirst({
            where : {
                classId : payload.classId,
                name  : payload.name
            }
        })
        if (isExisting){
            return {
                success : false,
                message : "The Resource Already Exists"
            }
        }
        await prisma.subject.update({
            where: {
                id: subjectId,
            },
            data: {
                classId : payload.classId,
                name : payload.name
            },
        })
        return {
            success : true,
            message : "The Subject has been updated"
        }
    } catch (error) {
        return {
            success: false,
            message: "Internal server error while updating the subject."
        }
    }
}