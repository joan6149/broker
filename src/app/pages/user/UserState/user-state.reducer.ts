import { createFeature, createReducer, on } from '@ngrx/store';
import { UserStateActions } from './user-state.actions';
import { Request } from '../models/NewMortage.model';

export const userStateFeatureKey = 'userState';

export interface UserState {
  error: string | null,
  loading: boolean;
  requestsLoaded: Request[]
}

export const initialUserState: UserState = {
  error: null,
  loading: false,
  requestsLoaded: []
};

export const reducer = createReducer(
  initialUserState,
  on(UserStateActions.loadRequest, (state) => state),
  on(UserStateActions.loadRequestSuccess, (state, {request}) => ({...state, requestsLoaded: [...state.requestsLoaded, request]})),
  on(UserStateActions.loadRequestFailure, (state, {error}) => ({...state, error})),
);

export const userStateFeature = createFeature({
  name: userStateFeatureKey,
  reducer,
});

