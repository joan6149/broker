import { LoginDto, UserDto, UserToken } from "src/app/models/user.dto"
import { LOGIN } from "../Actions/Auth.actions"


export interface AuthState {
    isLogged: boolean,
    islogin: boolean,
    login: LoginDto | null,
    token: UserToken | null,
    user: UserDto | null,
    error: string | null
}

export const initialAuthState: AuthState = {
    isLogged: false,
    islogin: false,
    login: null,
    token: null,
    user: null,
    error: null
}