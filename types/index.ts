
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

export type jwtSecret = string | undefined;