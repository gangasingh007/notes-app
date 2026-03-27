import {z} from "zod"

export const regestrationSchema = z.object({
    firstName : z.string().min(3),
    lastName : z.string().min(3),
    email : z.string().email(),
    password : z.string().min(6),
    phoneNumber : z.string().max(10),
}) 

export const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})

export const addClassSchema = z.object({
    course : z.string(),
    semester : z.string(),
    section : z.string()
})