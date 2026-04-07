
import { ResourceType } from "@/app/generated/prisma/client"

export interface registerAdminprops {
    firstName : string,
    lastName : string,
    email : string,
    phoneNumber : string,
    password : string
}

export interface loginAdminprops {
    email : string,
    password : string
}

export interface admiDetails {
    email  : string
    phoneNumber : string
}

export type classProps = {
    course: string,
    semester : string,
    section : string
}

export type NavItem = { label: string; href: string }

export type jwtSecret = string | undefined;

export interface ResourceProps {
    subjectId : string,
    name  : string,
    link  : string,
    type : ResourceType
}

export type Subject = {
    id: string
    name: string
    classId: string
}

export interface subjectProps {
    name : string
    classId  :string
}