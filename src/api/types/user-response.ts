export interface IUser {
    id: number
    name: string
    login: string
    createAt: Date
}

export interface IUpdatePasswordForm {
    oldPassword: string,
    newPassword: string
}

export interface IUpdateUser {
    name?: string,
    login?: string
}