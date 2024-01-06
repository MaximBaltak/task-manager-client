import { TaskApi } from "@api/TaskApi";
import { ErrorResponse } from "@api/types/error-response";
import { ICountByStatus, ITask } from "@api/types/task-response";
import { statusTask } from "@enum/statusTaskType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUpdateBoard } from "@store/types/actions-types";
import { ITaskState, IUserState } from "@store/types/reducers-types";
import { error } from "@utils/tostar";

const initialState: ITaskState = {
    taskClosed: [],
    taskWorks: [],
    taskCreate: [],
    tasks: [],
    countByStatus: {},
    isDetailModal: false
}
export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (_,{ rejectWithValue }) => {
        try{
           const {data} = await TaskApi.getTasks()
           return data
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const getCountByStatus = createAsyncThunk(
    'tasks/getCountByStatus',
    async (_,{ rejectWithValue }) => {
        try{
           const {data} = await TaskApi.getCountByStatus()
           return data
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        initBoard(state){
            state.taskClosed = []
            state.taskCreate = []
            state.taskWorks = []
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
        },
        toggleDetailTaskModal(state, action: PayloadAction<boolean>){
            state.isDetailModal = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload
        })
        builder.addCase(getTasks.rejected, (state, action) => {
            state.tasks = []
            error((action.payload as ErrorResponse).message)
        })
        builder.addCase(getCountByStatus.fulfilled, (state, action: PayloadAction<ICountByStatus>) => {
            state.countByStatus = action.payload
        })
        builder.addCase(getCountByStatus.rejected, (state, action) => {
            state.countByStatus = {}
            error((action.payload as ErrorResponse).message)
        })
    }
})
export const { updateBoards, initBoard,toggleDetailTaskModal } = taskSlice.actions
export default taskSlice.reducer