import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { UserStateActions } from './user-state.actions';
import { UserService } from '../user.service';


@Injectable()
export class UserStateEffects {


  constructor(private actions$: Actions,
              private requestService: UserService) {}

  $loadRequest = createEffect(() => this.actions$.pipe(
    ofType(UserStateActions.loadRequest),
    switchMap(action => this.requestService.loadRequest(action.request).pipe(
      map(request => UserStateActions.loadRequestSuccess({request})),
      catchError(err => of(UserStateActions.loadRequestFailure({error: err})))
    ))
  ))
}
