import { configureStore } from "@reduxjs/toolkit";
import { IStoreSate } from "./types";
import userSlice from "./slices/user-slice";
import taskSlice from "./slices/task-slice";
import detailTaskSlice from "./slices/detail-task-slice";

const store = configureStore<IStoreSate>({
    reducer: {
        user: userSlice,
        task: taskSlice,
        detailTask: detailTaskSlice
    },
    devTools: true
})
export type AppSate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store