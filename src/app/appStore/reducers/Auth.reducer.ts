import { Action, createReducer, on } from "@ngrx/store";
import { LOGIN, LOGIN_ERROR, LOGUED, REGISTER, REGISTERED, REGISTER_ERROR } from "../Actions/Auth.actions";
import { AuthState, initialAuthState } from "../States";



const _authReducer = createReducer(initialAuthState, 
    on(LOGIN, (state: AuthState, { login }) => ({...state, islogin: true, login})),
    on(LOGUED, (state: AuthState, { token }) => ({...state, islogin: false, isLogged: true, token})),
    on(LOGIN_ERROR, (state: AuthState, { error }) => ({...state, islogin: false, isLogged: true, error})),
    on(REGISTER, (state: AuthState, { user }) => ({...state, islogin: true})),
    on(REGISTERED, (state: AuthState, { userCreated }) => ({...state, islogin: false, isLogged: true, user: userCreated})),
    on(REGISTER_ERROR, (state: AuthState, { error }) => ({...state, islogin: false, isLogged: true, error}))
    );

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
}