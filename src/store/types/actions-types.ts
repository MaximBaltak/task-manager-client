import { ITask } from "@api/types/task-response"
import { IStatusSelect } from "@components/selectStatus/types/selectStatus"
import { statusTask } from "@enum/statusTaskType"

export interface IFormRegister {
    name: string,
    login: string,
    password: string
}

export interface IFormLogin {
    login: string,
    password: string
}

export interface IUpdateStatusTaskForm {
    id: number
    status: statusTask
}

export interface IUpdateTaskForm {
    id: number
    title?: string
    description?: string
}

export interface ICreateTaskForm {
    title: string
    description: string
}
export interface IUpdateBoard{
    task: ITask,
    nextStatus: statusTask
}