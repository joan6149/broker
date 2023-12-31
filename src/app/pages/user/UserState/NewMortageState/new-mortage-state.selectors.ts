import { createFeatureSelector, createSelector } from "@ngrx/store"
import * as fromNewMortageState from './new-mortage-state.reducer';


/*export const selectNewMortageState = createFeatureSelector<fromNewMortageState.NewMortageState>(
    fromNewMortageState.NewMortageStateFeatureKey
  );

  
export const selectNewMortageStatePetitionType = createSelector(
    selectNewMortageState,
    (state) => state.petitiontype
)

export const selectNewMortageStateTemplates = createSelector(
    selectNewMortageState,
    (state) => state.templates
) */