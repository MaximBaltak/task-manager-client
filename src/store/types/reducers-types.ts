import { ICountByStatus, ITask } from "@api/types/task-response";
import { IUser } from "@api/types/user-response";

export interface IUserState {
    isAuth: boolean,
    user: null | IUser,
}
export interface ITaskState {
    tasks: ITask[]
    countByStatus: ICountByStatus
    taskCreate: ITask[]
    taskWorks: ITask[]
    taskClosed: ITask[]
    isDetailModal: boolean
}

export interface IDetailTaskState {
    task: null | ITask
}