import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IDetailTaskState, ITaskState, IUserState } from "@store/types/reducers-types";
import { ICreateTaskForm, IUpdateStatusTaskForm, IUpdateTaskForm } from './../types/actions-types';
import { statusTask } from "@enum/statusTaskType";


const initialState: IDetailTaskState = {
    task: {
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
        }
    }
}

export const detailTaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        create(state, action: PayloadAction<ICreateTaskForm>){
            console.log(new Date().toUTCString())
            console.log(action.payload)
        },
        update(state, action: PayloadAction<IUpdateTaskForm>){
            console.log(action.payload)
        },
        updateStatus(state, action: PayloadAction<IUpdateStatusTaskForm>){
            console.log(action.payload)
        }
    },
})
export const {create,update, updateStatus}  = detailTaskSlice.actions
export default detailTaskSlice.reducer