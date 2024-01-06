import { api } from ".";
import { IUpdatePasswordForm, IUpdateUser, IUser } from "./types/user-response";

export class UserApi {
    static async getUser(){
        return api.get<IUser>('user')
    }
    static async updatePassword(form: IUpdatePasswordForm){
        return api.put('user/password',form)
    }
    
    static async updateUser(data: IUpdateUser) {
        return api.put<IUser>('user',data)
    }
    
    static async deleteUser() {
        return api.delete('user')
    }
}