import { Observable, BehaviorSubject, Subscription } from 'rxjs';

export abstract class BaseForm {

  subscriptions: Subscription[] = [];

  private _isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public templateIsValid(): Observable<boolean> {
    return this._isValid.asObservable();
  }

  protected isValid(isValid: boolean): void {
    this._isValid.next(isValid);
  }

}
