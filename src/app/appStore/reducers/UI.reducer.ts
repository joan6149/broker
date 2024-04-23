import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { UIState, initialUIState } from "../States/UIState";
import * as MainActions from "../Actions/";



export const uiReducer: ActionReducer<UIState, Action> = createReducer(
    initialUIState, 
    on(MainActions.UIStateActions.loading, (state: UIState) => ({...state, isLoading: true})),
    on(MainActions.UIStateActions.stopLoading, (state: UIState) => ({...state, isLoading: false}))
    );
