import { IDetailTaskState, ITaskState, IUserState } from "./reducers-types";

export interface IStoreSate {
    user: IUserState,
    task: ITaskState,
    detailTask: IDetailTaskState
}