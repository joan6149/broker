import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogData } from '@domo/domo-commons-lib';
import { MessageService } from 'primeng/api';
import { ApplicationMessage, MessageTypes, Severity, Summary } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class TimeclockService {

  showForm$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  showDialog$: BehaviorSubject<DialogData> = new BehaviorSubject<DialogData>({msg: '', show: false} as DialogData);
  
  constructor(private messageService: MessageService) {}

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

  showToastMessage(message: string): void {
    this.messageService.add(
      {
        key: MessageTypes.MESSAGE,
        severity: Severity.SUCCESS,
        summary: Summary.SUCCESS,
        detail: message
      } as ApplicationMessage
    )
  }

  showToastError(message: string): void {
    this.messageService.add(
      {
        key: MessageTypes.HTTPERROR,
        severity: Severity.ERROR,
        summary: Summary.ERROR,
        detail: message
      } as ApplicationMessage
    )
  }
    
}
