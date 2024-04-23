import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UIState, UIStateKey } from "../States";
import { AppState, appStateFeatureKey } from "src/app/app.reducer";
import { state } from "@angular/animations";


export const AppSelector = createFeatureSelector<AppState>(
    appStateFeatureKey
    );

export const UISelector = createSelector(
    AppSelector,
    (state) => state.ui
)

export const UserStateSelector = createSelector(
    AppSelector,
    (state) => state.userState
)

export const AuthSelector = createSelector(
    AppSelector,
    (state) => state.auth
)