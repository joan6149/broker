import { UserService } from "src/app/services/user.service";
import { Injectable } from '@angular/core'

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '../Actions/Auth.actions';
import { LoginDto } from "src/app/models/user.dto";




@Injectable({
    providedIn: 'root'
  })
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
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
            map(() => UserActions.LOGIN({login: {email: action.user.email, password: action.user.password}})),
            switchMap(action => this.userService.login(action.login).pipe( // Aqui en lugar de llamar a login habra que llamar al servicio para mandar un  mail
                map( token => UserActions.LOGUED({ token }) ),
                catchError( err => of(UserActions.LOGIN_ERROR({ error: err })) )
                )
            ),
            catchError(err => of(UserActions.REGISTER_ERROR({error: err}))),
        ))
    ))

}