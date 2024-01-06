import { statusTask } from "@enum/statusTaskType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUpdateBoard } from "@store/types/actions-types";
import { ITaskState, IUserState } from "@store/types/reducers-types";


const initialState: ITaskState = {
    taskClosed: [],
    taskWorks: [],
    taskCreate: [],
    tasks: [
        {
            id: 1,
            title: "название задачи",
            description: "задачи",
            status: statusTask.CREATED,
            createAt: new Date().toUTCString(),
            updateAt: new Date().toUTCString(),
            user: {
                id: 1,
                name: 'Максим',
                login: 'test',
                createAt: new Date().toUTCString()
            },
        },
        {
            id: 62,
            title: "название задачи",
            description: "задачи",
            status: statusTask.WORKS,
            createAt: new Date().toUTCString(),
            updateAt: new Date().toUTCString(),
            user: {
                id: 1,
                name: 'Максим',
                login: 'test',
                createAt: new Date().toUTCString()
            }
        },
    ]
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        initBoard(state){
            state.tasks.forEach(task => {
                switch (task.status) {
                  case statusTask.CREATED:
                    if(!state.taskCreate.find(el => task.id === el.id)){
                        state.taskCreate.push(task)
                    }
                    break
                  case statusTask.WORKS:
                    if(!state.taskWorks.find(el => task.id === el.id)){
                        state.taskWorks.push(task)
                    }
                    break
                  case statusTask.CLOSED:
                    if(!state.taskClosed.find(el => task.id === el.id)){
                        state.taskClosed.push(task)
                    }
                    break
                }
              })
        },
        updateBoards(state, action: PayloadAction<IUpdateBoard>) {
            const task = action.payload.task
            const nextStatus = action.payload.nextStatus
            const tasksCreate = state.taskCreate
            const tasksClosed = state.taskClosed
            const taskWorks = state.taskWorks
            let i = -1
            switch (task.status) {
                case statusTask.CREATED:
                    i = tasksCreate.findIndex(el => el.id === task.id)
                    tasksCreate.splice(i, 1)
                    break
                case statusTask.CLOSED:
                    i = tasksClosed.findIndex(el => el.id === task.id)
                    tasksClosed.splice(i, 1)
                    break
                case statusTask.WORKS:
                    i = taskWorks.findIndex(el => el.id === task.id)
                    taskWorks.splice(i, 1)
                    break
            }
            
            switch (nextStatus) {
                case statusTask.CREATED:
                    if(!tasksCreate.find(el => task.id === el.id)){
                        tasksCreate.push(task)
                    }           
                    break
                case statusTask.CLOSED:
                    if(!tasksClosed.find(el => task.id === el.id)){
                        tasksClosed.push(task)
                    }  
                    break
                case statusTask.WORKS:
                    if(!taskWorks.find(el => task.id === el.id)){
                        taskWorks.push(task)
                    }  
                    break
            }
        }
    },
})
export const { updateBoards, initBoard } = taskSlice.actions
export default taskSlice.reducer