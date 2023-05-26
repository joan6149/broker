import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogData } from '@domo/domo-commons-lib';

@Injectable({
  providedIn: 'root'
})
export class TimeclockService {

  showForm$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  showDialog$: BehaviorSubject<DialogData> = new BehaviorSubject<DialogData>({msg: '', show: false} as DialogData);
  
  constructor() {}

  setShowForm(isShow: Boolean) {
    this.showForm$.next(isShow);
  }

  getShowForm(): Observable<Boolean> {
    return this.showForm$.asObservable();
  }

  setShowDialog(dialogdata: DialogData) {
    this.showDialog$.next(dialogdata);
  }

  getShowDialog(): Observable<DialogData> {
    return this.showDialog$.asObservable();
  }
    
}
