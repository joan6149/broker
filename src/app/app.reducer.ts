import { Action, ActionReducer, ActionReducerMap, createReducer } from "@ngrx/store";
import { AuthState, initialAuthState } from "./appStore/States/AuthState";
import { UIState, initialUIState } from "./appStore/States/UIState";
import { uiReducer } from "./appStore/reducers/UI.reducer";
import { authReducer } from "./appStore/reducers/Auth.reducer";
import { UserState, initialUserState, userReducers, userStateReducer } from "./pages/user/UserState/user-state.reducer";
import { NewMortageState, newMortageStateReducer } from "./pages/user/UserState/NewMortageState/new-mortage-state.reducer";
import { RequestsState, requestStateReducer } from "./pages/user/UserState/RequestsState/requests-state.reducer";

export interface AppState {
    ui: UIState,
    auth: AuthState,
    userState: UserState
}

export const initialAppState: AppState = {
    ui: initialUIState,
    auth: initialAuthState,
    userState: initialUserState
};

export const appStateReducer = createReducer(
    initialAppState
  )

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer,
    auth: authReducer,
    userState: userStateReducer
}

export const appStateFeatureKey = 'appState';