import { UserService } from "src/app/services/user.service";
import { Injectable } from '@angular/core'

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as UserActions from '../Actions/Auth.actions';
import { LoginDto } from "src/app/models/user.dto";
import { Router } from "@angular/router";




@Injectable({
    providedIn: 'root'
  })
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router
    ){}

    login$ = createEffect( () => this.actions$.pipe(
            ofType( UserActions.LOGIN ),
            switchMap(action => this.userService.login(action.login).pipe(
                map( token => UserActions.LOGUED({ token }) ),
                catchError( err => of(UserActions.LOGIN_ERROR({ error: err })) )
                )
            )
        )
    );

    register$ = createEffect(() => this.actions$.pipe(
        ofType( UserActions.REGISTER ),
        switchMap(action => this.userService.registerUser(action.user).pipe(
            map(user => UserActions.REGISTERED({userCreated: user})),
            catchError(err => of(UserActions.REGISTER_ERROR({error: err}))),
        ))
    ))

    registered$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.REGISTERED),
        switchMap(() => {
            this.router.navigate(['/'])
            return EMPTY;
        }),
        catchError(err => of(UserActions.REGISTER_ERROR({error: err})))
    ))

}