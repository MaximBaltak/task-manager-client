import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IDetailTaskState, ITaskState, IUserState } from "@store/types/reducers-types";
import { ICreateTaskForm, IUpdateTaskForm } from './../types/actions-types';
import { TaskApi } from "@api/TaskApi";
import { ITask, ICountByStatus} from "@api/types/task-response";
import { error, success } from "@utils/tostar";
import { ErrorResponse } from "@api/types/error-response";

export const getTask = createAsyncThunk(
    'task/getTask',
    async (taskId: number,{ rejectWithValue }) => {
        try{
           const {data} = await TaskApi.getTask(taskId)
           return data
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const createTask = createAsyncThunk(
    'task/createTask',
    async (form: ICreateTaskForm,{ rejectWithValue }) => {
        try{
           await TaskApi.createTask(form)
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const updateTask = createAsyncThunk(
    'task/updateTask',
    async (form: IUpdateTaskForm,{ rejectWithValue }) => {
        try{
           const {data} = await TaskApi.updateTask(form)
           return data
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (taskId: number,{ rejectWithValue }) => {
        try{
            await TaskApi.deleteTask(taskId)
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

const initialState: IDetailTaskState = {
    task: null

}
export const detailTaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTask.fulfilled, (state, action: PayloadAction<ITask>) => {
            state.task = action.payload
        })
        builder.addCase(getTask.rejected, (state, action) => {
            state.task = null
            error((action.payload as ErrorResponse).message)
        })
        builder.addCase(createTask.fulfilled, () => {
            success('Задача создана')
        })
        builder.addCase(createTask.rejected, (state, action) => {
            error((action.payload as ErrorResponse).message)
        })
        builder.addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
            state.task = action.payload
        })
        builder.addCase(updateTask.rejected, (state, action) => {
            state.task = null
            error((action.payload as ErrorResponse).message)
        })
        builder.addCase(deleteTask.fulfilled, (state) => {
            state.task = null
            success('Задача удалена')
        })
        builder.addCase(deleteTask.rejected, (state, action) => {
            error((action.payload as ErrorResponse).message)
        })
    }
})
export default detailTaskSlice.reducer