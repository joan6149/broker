import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { UserStateActions } from './user-state.actions';
import { RequestService } from '../pages/services/request.service';
import { Request } from '../models/NewMortage.model';
import { TimeclockService } from 'src/app/services/timeclock.service';
import { Router } from '@angular/router';
import { tag } from 'rxjs-spy/cjs/operators';


@Injectable()
export class UserStateEffects {


  constructor(private actions$: Actions,
              private requestService: RequestService,
              private timeclockService: TimeclockService,
              private router: Router) {}


  $loadRequest = createEffect(() => this.actions$.pipe(
    ofType(UserStateActions.loadRequest),
    switchMap((action:any) => this.requestService.loadRequest(action.request).pipe(
      map(request => UserStateActions.loadRequestSuccess({request})),
      tap((action: any) => {
        this.timeclockService.showToastMessage('Petición creada correctamente');
        this.router.navigate(['/user/myrequests']);
      }),
      catchError(err => of(UserStateActions.loadRequestFailure({error: err})))
    ))
  ))
  
}
