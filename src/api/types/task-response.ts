import { statusTask } from "@enum/statusTaskType";
import { IUser } from "./user-response";

export interface ITask {
    id: number,
    title: string,
    description: string,
    user: IUser,
    status: statusTask
    createAt: string,
    updateAt: string,
    
}

export interface IUpdateStatusTask {
    status: statusTask
}

export interface IUpdateTask {
    title?: string
    description?: string
}

export interface ICreateTask {
    title: string
    description: string
}
export interface ICountByStatus {
    [key: string]: number,
}