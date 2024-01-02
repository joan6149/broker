import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { NewMortageActions } from 'src/app/pages/user/UserState/NewMortageState/new-mortage-state.actions';
import { UserState } from 'src/app/pages/user/UserState/user-state.reducer';

export abstract class BaseForm {

  userStore: Store<UserState> = inject(Store<UserState>);

  subscriptions: Subscription[] = [];

  private _isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public templateIsValid(): Observable<boolean> {
    return this._isValid.asObservable();
  }

  protected isValid(isValid: boolean): void {
    this.userStore.dispatch(NewMortageActions.isValidTemplate({valid: isValid}));
  }

}
