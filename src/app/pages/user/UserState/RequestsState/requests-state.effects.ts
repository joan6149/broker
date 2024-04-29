import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { switchMap, map, tap, catchError, of, Observable } from "rxjs";
import { TimeclockService } from "src/app/services/timeclock.service";
import { RequestService } from "../../pages/services/request.service";
import { RequestStateActions } from "./requests-state.actions";
import { NewMortageActions } from "../NewMortageState/new-mortage-state.actions";

@Injectable()
export class RequestsStateEffects {


  constructor(private actions$: Actions,
              private requestService: RequestService,
              private timeclockService: TimeclockService,
              private router: Router) {}


  loadRequest$ = createEffect(() => this.actions$.pipe(
    ofType(RequestStateActions.loadRequest),
    switchMap((action:any) => this.requestService.loadRequest(action.request).pipe(
      map((request) => RequestStateActions.loadRequestSuccess({request})),
      tap((action: any) => {
        this.timeclockService.showToastMessage('Petición creada correctamente');
        this.router.navigate(['/user/myrequests']);
      }),
      catchError(err => of(RequestStateActions.loadRequestFailure({error: err})))
    ))
  ))

  getAllRequest$ = createEffect(() => this.actions$.pipe(
    ofType(RequestStateActions.getRequests),
    switchMap((action:any) => this.requestService.getAllRequestsByUser(false).pipe(
      map(requests => RequestStateActions.getRequestsSuccess({requests})),
      catchError(err => of(RequestStateActions.getRequestFailure({error: err})))
    ))
  ))

  publichRequest$ = createEffect(() => this.actions$.pipe(
    ofType(RequestStateActions.publishRequest),
    switchMap((action: any) => this.requestService.publishRequest(action.requestId, action.publish).pipe(
      map(requestPublished => RequestStateActions.publishSuccess({requestPublished})),
      tap(() => this.timeclockService.showToastMessage('Petición publicada correctamente!')),
      catchError(err => this.errorHandler(err))
    ))
  ))

  loadRequestSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(RequestStateActions.loadRequestSuccess),
    map(() => NewMortageActions.goToStep({stepNumber: 0})),
    catchError(err => this.errorHandler(err))
  ))

  errorHandler(err: any): Observable<Action> {
    return of(RequestStateActions.userActionError({error: err}));
  }
  
}