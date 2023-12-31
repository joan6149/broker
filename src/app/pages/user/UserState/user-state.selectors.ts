import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserState from './user-state.reducer';
import * as fromNewMortageState from './NewMortageState/new-mortage-state.reducer';
import * as fromRequestsState from './RequestsState/requests-state.reducer'; 

export const selectUserStateState = createFeatureSelector<fromUserState.UserState>(
  fromUserState.userStateFeatureKey
);

export const selectNewMortageState = createFeatureSelector<fromNewMortageState.NewMortageState>(
  fromNewMortageState.NewMortageStateFeatureKey
);

export const selectRequestsState = createFeatureSelector<fromRequestsState.RequestsState>(
  fromNewMortageState.NewMortageStateFeatureKey
);

export const selectRequests = createSelector(
  selectUserStateState,
  (state) => state.requests
)


// stage selectors

export const selectNewMortage = createSelector(
  selectUserStateState,
  (state) => state.newMortageRequestState
)

export const selectNewMortageTemplates = createSelector(
  selectNewMortage,
  (state) => state.templates
)

export const selectNewMortageCurrenttemplate = createSelector(
  selectNewMortage,
  (state) => state.currentTemplate
)

export const selectNumberOfSteps = createSelector(
  selectNewMortage,
  (state) => state.numberOfSteps
)

export const selectTypeOfPetition = createSelector(
  selectNewMortage,
  (state) => state.petitiontype
)

export const selectCurrentStep = createSelector(
  selectNewMortage,
  (state) => state.currentStep
)

export const selectCurrentStepisCorrect = createSelector(
  selectNewMortage,
  (state) => state.isCorrect
)

export const selectIsFinished = createSelector(
  selectNewMortage,
  (state) => state.isFinished
)


export const selectRequestLoaded = createSelector(
  selectRequests,
  (state) => state.requestsLoaded
)
