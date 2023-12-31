import { createReducer, on } from "@ngrx/store";
import { RequestStateActions } from "./requests-state.actions";
import { Request } from "../../models/NewMortage.model";

export const requestsStateFeatureKey = 'RequestsState';

export interface RequestsState {
    error: string | null,
    loading: boolean,
    requestsLoaded: Request[],
    requestsPublished: Request[]
  }
  
export const initialRequestsState: RequestsState = {
    error: null,
    loading: false,
    requestsLoaded: [],
    requestsPublished: []
}

export const requestStateReducer = createReducer(
    initialRequestsState,
    on(RequestStateActions.loadRequest, (state) => state),
    on(RequestStateActions.loadRequestSuccess, (state, {request}) => ({
      ...state, 
      requestsLoaded: [...state.requestsLoaded, request]})),
    on(RequestStateActions.loadRequestFailure, (state, {error}) => ({
      ...state, 
      error})),
    on(RequestStateActions.getRequests, (state) => state),
    on(RequestStateActions.getRequestsSuccess, (state, {requests}) => ({
      ...state, 
      requestsLoaded: [...requests]})),
    on(RequestStateActions.publishRequest, (state) => state),
    on(RequestStateActions.publishSuccess, (state, {requestPublished}) => ({
      ...state, 
      requestsLoaded: state.requestsLoaded.filter(r => r.id !== requestPublished.id), requestsPublished: [...state.requestsPublished, requestPublished]})),
    on(RequestStateActions.useractionerror, (state, {error}) => ({
      ...state, 
      error}))
  );

