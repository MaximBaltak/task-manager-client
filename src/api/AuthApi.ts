import { IFormLogin, IFormRegister } from "@store/types/actions-types";
import { api } from ".";
import { IUser } from "./types/user-response";

export class AuthApi {
   static async register(data: IFormRegister) {
        return api.post<IUser>('auth/register',data)
    }
    static async login(data: IFormLogin) {
        return api.post<IUser>('auth/login',data)
    }
    static async exit() {
        return api.get('auth/exit')
    }
    
}