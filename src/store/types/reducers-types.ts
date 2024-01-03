import { IUser } from "@api/types/user-response";

export interface IUserState {
    isAuth: boolean,
    user: null | IUser,
}