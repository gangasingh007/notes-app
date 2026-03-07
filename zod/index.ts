import {z} from "zod"

export const regestrationSchema = z.object({
    firstName : z.string().min(3),
    lastName : z.string().min(3),
    password : z.string().min(6),
    phoneNumber : z.string().max(10)
}) 