import { Component } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export abstract class BaseForm {

  private _isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public templateIsValid(): Observable<boolean> {
    return this._isValid.asObservable();
  }

  protected isValid(isValid: boolean): void {
    this._isValid.next(isValid);
  }

}
