import { ActionReducerMap, FeatureConfig, createFeature, createReducer } from '@ngrx/store';
import { NewMortageState, initialNewMortageState, newMortageStateReducer } from './NewMortageState/new-mortage-state.reducer';
import { RequestsState, initialRequestsState, requestStateReducer } from './RequestsState/requests-state.reducer';

export const userStateFeatureKey = 'userState';
export const userStateRequestLoadedKey = 'requestLoaded';

export interface UserState {
  requests: RequestsState,
  newMortageRequestState: NewMortageState
}

export const initialUserState: UserState = {
  requests: initialRequestsState,
  newMortageRequestState: initialNewMortageState
};

export const userStateReducer = createReducer(
  initialUserState
)

export const userReducers: ActionReducerMap<UserState> = {
  requests: requestStateReducer,
  newMortageRequestState: newMortageStateReducer
}



