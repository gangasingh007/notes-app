"use server"

import type { jwtSecret } from "@/types"
import {  loginAdminprops, registerAdminprops } from "@/types"
import { loginSchema, regestrationSchema } from "@/zod"
import bcrypt from "bcryptjs"
import { adminDetails } from "@/admins"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { cookies } from "next/headers"

const jwtSecret = process.env.JWT_SECRET as string;

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = cookies()
    const token = (await cookieStore).get("admin_token")?.value

    const isAdmin = await prisma.user.findFirst({})
    if (!token || !isAdmin) return false

    jwt.verify(token as string, jwtSecret)
    return true
  } catch (error) {
    console.log("Auth verification failed:", error)
    return false
  }
}

export async function registerAdmin(data: registerAdminprops) {
  try {
    const parsed = regestrationSchema.safeParse(data)

    if (!parsed.success) {
      console.log("Invalid input from Zod")
      return { success: false, message: "Invalid input" }
    }

    const payload = data as registerAdminprops


    const existingUser = await prisma.user.findFirst({
      where: { email: payload.email },
    })

    if (existingUser) {
      return { success: false, message: "Admin already exists" }
    }

    const isAdmin = adminDetails.some(
      (admin) =>
        admin.email === payload.email &&
        admin.phoneNumber === payload.phoneNumber
    )

    if (!isAdmin) {
      return {
        success: false,
        message: "Admin verification failed",
      }
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10)

    const newAdmin = await prisma.user.create({
      data: {
        firstaName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        passwordHash: hashedPassword,
        phoneNumber: payload.phoneNumber,
      },
    })

    const token = jwt.sign(
      { id: newAdmin.id },
      jwtSecret,
      { expiresIn: "7d" }
    )

    
    ;(await cookies()).set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return {
      success: true,
      message: "Admin registered successfully",
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "Internal server error",
    }
  }
}

export async function login(data : loginAdminprops ){
  try { 
    const payload = data as loginAdminprops;
    const parsedPayload = loginSchema.safeParse(data);

    // if (!parsedPayload.success) {
    //   console.log("Invalid input from Zod")
    //   return { success: false, message: "Invalid input" }
    // }

    const isExsiting = await prisma.user.findFirst({
      where : {
        email : payload.email
      }
    })

    if(!isExsiting){
      console.log("The Admin details not found")
      return 
    }

    const isSamePassword  = await bcrypt.compare(data.password,isExsiting.passwordHash)

    if(!isSamePassword){
      console.log("The password verification falied");
      return
    }
 
    const token = jwt.sign(
      { id: isExsiting.id },
      jwtSecret,
      { expiresIn: "7d" }
    )

    
    ;(await cookies()).set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return {
      success: true,
      message: "Admin registered successfully",
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "Internal server error",
    }
  }
}
