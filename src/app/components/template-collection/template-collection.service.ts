import { Injectable, TemplateRef } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { MortageTemplate } from '../abstract-step-page/abstract-step-page.component';

@Injectable({
  providedIn: 'root'
})
export class TemplateCollectionService {

  template: ReplaySubject<MortageTemplate> = new ReplaySubject<MortageTemplate>();
  mortageDataSubject: Subject<NewMortage> = new Subject<NewMortage>();
  templateList: MortageTemplate[] = [];
  mortageData: NewMortage = new NewMortage();

  constructor() { }


  setTemplate(mortageTemplate: MortageTemplate): void {
    console.log("ENVIO EL TEMPLATE ==>", mortageTemplate);
    this.template.next(mortageTemplate);
  }

  getTemplates(): Observable<MortageTemplate> {
    return this.template.asObservable();
  }

  setMortageData(mortageData: NewMortage): void {
    this.mortageData = mortageData;
    this.mortageDataSubject.next(mortageData);
  }

  getMortageData(): Observable<NewMortage> {
    return this.mortageDataSubject.asObservable();
  }
}
