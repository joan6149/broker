import { AuthService } from "src/app/services/auth.service";
import { Injectable } from '@angular/core'

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as UserActions from '../Actions/Auth.actions';
import { LoginDto } from "src/app/models/user.dto";
import { Router } from "@angular/router";
import { HttpBlackBirdErrorHandler } from "src/app/errorHandler/HttpBlackBirdErrorHandler";




@Injectable({
    providedIn: 'root'
  })
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: AuthService,
        private router: Router,
        private readonly handler: HttpBlackBirdErrorHandler
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

    logout$ = createEffect(() => this.actions$.pipe(
        ofType( UserActions.LOGOUT ),
        switchMap((action) => {
            this.userService.logout()
            return EMPTY;
        }),
        catchError((err) => {
            this.handler.handleError(err);
            return of(UserActions.LOGOUT_ERROR({error: err}));
        })
    ))

    register$ = createEffect(() => this.actions$.pipe(
        ofType( UserActions.REGISTER ),
        switchMap(action => this.userService.registerUser(action.user).pipe(
            map(user => UserActions.REGISTERED({userCreated: user})),
            catchError((err) => {
                return of(UserActions.REGISTER_ERROR({error: err}));
            })
        ))
    ))

    registered$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.REGISTERED),
        switchMap(() => {
            this.router.navigate(['/'])
            return EMPTY;
        }),
        catchError((err) => {
            this.handler.handleError(err);
            return of(UserActions.REGISTER_ERROR({error: err}));
        })
    ))

}