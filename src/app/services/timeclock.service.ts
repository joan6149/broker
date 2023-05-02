import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeclockService {

  showForm$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  
  constructor() { }

  setShowForm(isShow: Boolean) {
    this.showForm$.next(isShow);
  }

  getShowForm(): Observable<Boolean> {
    return this.showForm$.asObservable();
  }
}
