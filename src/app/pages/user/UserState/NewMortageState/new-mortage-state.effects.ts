import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TemplateCollectionService } from "src/app/components/template-collection/template-collection.service";
import { TimeclockService } from "src/app/services/timeclock.service";
import { NewMortageActions } from "./new-mortage-state.actions";
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Action } from "@ngrx/store";
import { Injectable} from "@angular/core";

@Injectable()
export class NewMortageStateEffects {
    
    constructor(private actions$: Actions,
              private timeclockService: TimeclockService,
              private templateCollectionService: TemplateCollectionService) {} 

    $getTemplatesByFormId = createEffect(() => this.actions$.pipe(
        ofType(NewMortageActions.getAllTemplates),
        switchMap((action: any) => this.templateCollectionService.getNewMortageTemplates(action.formId).pipe(
            map(templates => NewMortageActions.getAllTemplatesSuccess({templates, formId: action.formId})),
            catchError(err => this.errorHandler(err))
        ))
    ))


    errorHandler(err: any): Observable<Action> {
        return of(NewMortageActions.newMortageError({error: err}));
      }
    


}