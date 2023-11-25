import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserState from './user-state.reducer';

export const selectUserStateState = createFeatureSelector<fromUserState.UserState>(
  fromUserState.userStateFeatureKey
);
