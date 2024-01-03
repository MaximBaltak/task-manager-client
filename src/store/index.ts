import { configureStore } from "@reduxjs/toolkit";
import { IStoreSate } from "./types";
import userSlice from "./slices/user-slice";

const store = configureStore<IStoreSate>({
    reducer: {
        user: userSlice
    },
    devTools: true
})
export type AppSate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store