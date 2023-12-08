import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { UserStateActions } from './user-state.actions';
import { Request } from '../models/NewMortage.model';

export const userStateFeatureKey = 'userState';
export const userStateRequestLoadedKey = 'requestLoaded';

export interface UserState {
  error: string | null,
  loading: boolean;
  requestsLoaded: Request[],
  requestsPublished: Request[]
}

export const initialUserState: UserState = {
  error: null,
  loading: false,
  requestsLoaded: [],
  requestsPublished: []
};

export const reducer = createReducer(
  initialUserState,
  on(UserStateActions.loadRequest, (state) => state),
  on(UserStateActions.loadRequestSuccess, (state, {request}) => ({...state, requestsLoaded: [...state.requestsLoaded, request]})),
  on(UserStateActions.loadRequestFailure, (state, {error}) => ({...state, error})),
  on(UserStateActions.getRequests, (state) => state),
  on(UserStateActions.getRequestsSuccess, (state, {requests}) => ({...state, requestsLoaded: [...requests]})),
  on(UserStateActions.publishRequest, (state) => state),
  on(UserStateActions.publishSuccess, (state, {requestPublished}) => ({...state, requestsLoaded: state.requestsLoaded.filter(r => r.id !== requestPublished.id), requestsPublished: [...state.requestsPublished, requestPublished]})),
  on(UserStateActions.useractionerror, (state, {error}) => ({...state, error}))
);

export const userStateFeature = createFeature({
  name: userStateFeatureKey,
  reducer,
});

