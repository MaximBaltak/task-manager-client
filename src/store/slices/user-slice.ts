import { AuthApi } from "@api/AuthApi";
import { UserApi } from "@api/UserApi";
import { ErrorResponse } from "@api/types/error-response";
import { IUpdatePasswordForm, IUpdateUser, IUser } from "@api/types/user-response";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IFormLogin, IFormRegister } from "@store/types/actions-types";
import { IUserState } from "@store/types/reducers-types";
import { error, success } from "@utils/tostar";

const initialState: IUserState = {
    isAuth: false,
    user: null
}
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (form: IFormRegister,{ rejectWithValue }) => {
        try{
            const {data}  = await AuthApi.register(form)
            return data as IUser
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (form: IFormLogin,{ rejectWithValue }) => {
        try{
            const {data}  = await AuthApi.login(form)
            return data as IUser
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const getUser = createAsyncThunk(
    'user/getUser',
    async (_,{ rejectWithValue }) => {
        try{
            const {data}  = await UserApi.getUser()
            return data as IUser
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (form: IUpdateUser,{ rejectWithValue }) => {
        try{
            const {data}  = await UserApi.updateUser(form)
            return data as IUser
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const exitUser = createAsyncThunk(
    'user/exitUser',
    async (_,{ rejectWithValue }) => {
        try{
            await AuthApi.exit()
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (_,{ rejectWithValue }) => {
        try{
            await UserApi.deleteUser()
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async (data: IUpdatePasswordForm,{ rejectWithValue }) => {
        try{
            await UserApi.updatePassword(data)
        } catch (e: any) {
           return rejectWithValue(e?.response?.data)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateAuth (state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.isAuth = true
            state.user = action.payload
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isAuth = false
            state.user = null
            error((action.payload as ErrorResponse).message)
        })
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.isAuth = true
            state.user = action.payload
        })
        
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isAuth = false
            state.user = null
            error((action.payload as ErrorResponse).message)
        })
        builder.addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        })
        
        builder.addCase(getUser.rejected, (state, action) => {
            state.user = null
            error((action.payload as ErrorResponse).message)
        })
        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            success("Данные пользователя изменены")
        })
        
        builder.addCase(updateUser.rejected, (state, action) => {
            error((action.payload as ErrorResponse).message)
        })
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.user = null
            state.isAuth = false
        })
        
        builder.addCase(deleteUser.rejected, (state, action) => {
            error((action.payload as ErrorResponse).message)
        })
        builder.addCase(exitUser.fulfilled, (state) => {
            state.user  = null
            state.isAuth = false
        })
        
        builder.addCase(exitUser.rejected, () => {
            error('Не удалось выйти')
        })
        builder.addCase(updatePassword.fulfilled, (state) => {
            success("Пароль изменён")
        })
        builder.addCase(updatePassword.rejected, (state, action) => {
            error((action.payload as ErrorResponse).message)
        })
    },
})
export const { updateAuth } = userSlice.actions
export default userSlice.reducer