import { Action, ActionReducer, ActionReducerMap } from "@ngrx/store";
import { AuthState } from "./appStore/States/AuthState";
import { UIState } from "./appStore/States/UIState";
import { uiReducer } from "./appStore/reducers/UI.reducer";
import { authReducer } from "./appStore/reducers/Auth.reducer";

export interface AppState {
    ui: UIState,
    auth: AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer,
    auth: authReducer
}