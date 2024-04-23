import { createSelector } from "@ngrx/store";
import { UISelector } from "./AppSelectors";

export const selectIsLoading = createSelector(
    UISelector,
    (state) => state.isLoading
)