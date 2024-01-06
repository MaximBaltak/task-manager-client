import { ICreateTaskForm, IUpdateTaskForm } from "@store/types/actions-types";
import { api } from ".";
import { ICountByStatus, ITask } from "./types/task-response";

export class TaskApi {
    static async getTasks(){
        return api.get<ITask[]>('task/all')
    }
    static async getTask(taskId: number){
        return api.get<ITask>(`task/${taskId}`)
    }
    
    static async createTask(data: ICreateTaskForm) {
        return api.post<ITask>('task',data)
    }
    
    static async updateTask(data: IUpdateTaskForm) {
        return api.put<ITask>(`task/${data.id}`,data)
    }
    static async deleteTask(taskId: number) {
        return api.delete(`task/${taskId}`)
    }
    static async getCountByStatus() {
        return api.get<ICountByStatus>(`task/count/task`)
    }
}