import { ErrorHandler } from "@angular/core";
import { createAction, props } from "@ngrx/store";
import { LoginDto, UserDto, UserToken } from "src/app/models/user.dto";
import { environment } from "src/environments/environment";


export const LOGIN = createAction(`[${environment.appName}] Login`, props<{ login: LoginDto }>());
export const LOGUED = createAction(`[${environment.appName}] Login Satisfactory`, props<{ token: UserToken }>());
export const LOGIN_ERROR = createAction(`[${environment.appName}] Login Error`, props<{ error: string }>());
export const LOGOUT = createAction(`[${environment.appName}] Logout`);

export const REGISTER = createAction(`[${environment.appName}] Register`, props<{ user: UserDto }>());
export const REGISTERED = createAction(`[${environment.appName}] Register Satisfactory`, props<{ userCreated: UserDto }>());
export const REGISTER_ERROR = createAction(`[${environment.appName}] Register Error`, props<{ error: string }>());

export const LOGOUT_ERROR = createAction(`[${environment.appName}] Logout Error`, props<{ error: string }>());
