import { ITask } from "@api/types/task-response";
import { IUser } from "@api/types/user-response";

export interface IUserState {
    isAuth: boolean,
    user: null | IUser,
}
export interface ITaskState {
    tasks: ITask[]
    taskCreate: ITask[]
    taskWorks: ITask[]
    taskClosed: ITask[]   
}

export interface IDetailTaskState {
    task: null | ITask
}