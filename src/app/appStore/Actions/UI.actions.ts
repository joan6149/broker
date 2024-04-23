import { createAction, createActionGroup, emptyProps } from "@ngrx/store";
import { environment } from "src/environments/environment";
import * as MainStates from "../States";


export const UIStateActions = createActionGroup({
    source: MainStates.UIStateKey,
    events: {
        'loading': emptyProps(),
        'Stop Loading': emptyProps()
    }
})