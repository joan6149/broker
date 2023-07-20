import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { UIState, initialState } from "../States/UIState";
import { Stoploading, loading } from "../Actions/UI.actions";



const _uiReducer: ActionReducer<UIState, Action> = createReducer(initialState, 
    on(loading, (state: UIState) => ({...state, isLoading: true})),
    on(Stoploading, (state: UIState) => ({...state, isLoading: false}))
    );

export function uiReducer(state: UIState | undefined, action: Action) {
    return _uiReducer(state, action);
}