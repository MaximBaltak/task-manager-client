import { statusTask } from "@enum/statusTaskType";

export interface IStatusSelect {
    id: number,
    name: string,
    color: string,
    value: statusTask,
    [index: string]: number | string | statusTask
}