
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


export type ChartPoint = {
  month: string
  resources: number
  subjects: number
}


export interface subjectProps {
    name : string
    classId  :string
}

export type ClassItem = {
    id: string
    course: string
    section: string
    semester: string
    _count: {
      Subjects: number
    }
  }
  
export type ResourceType = "video" | "document"

export interface Resource {
  id: string
  name: string
  link: string
  type: ResourceType
  subjectId: string
  createdAt: string
  updatedAt: string
}

export interface ResourceListProps {
  subjectId: string
}
export interface Resource {
  id: string
  name: string
  link: string
  type: ResourceType
  subjectId: string
  createdAt: string
  updatedAt: string
}
