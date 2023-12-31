import { Action, ActionReducer, ActionReducerMap } from "@ngrx/store";
import { AuthState } from "./appStore/States/AuthState";
import { UIState } from "./appStore/States/UIState";
import { uiReducer } from "./appStore/reducers/UI.reducer";
import { authReducer } from "./appStore/reducers/Auth.reducer";
import { UserState, userStateReducer } from "./pages/user/UserState/user-state.reducer";
import { NewMortageState, newMortageStateReducer } from "./pages/user/UserState/NewMortageState/new-mortage-state.reducer";

export interface AppState {
    ui: UIState,
    auth: AuthState,
    userState: UserState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer,
    auth: authReducer,
    userState: userStateReducer
}