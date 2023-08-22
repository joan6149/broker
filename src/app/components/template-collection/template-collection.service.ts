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
  currentTemplateIsCorrect: Subject<boolean> = new Subject<boolean>();
  nextTemplate: Subject<number> = new Subject<number>();
  templateList: MortageTemplate[] = [];
  mortageData: NewMortage = new NewMortage();

  constructor() { }


  setTemplate(mortageTemplate: MortageTemplate): void {
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

  setCurrentTemplateIsCorrect(isCorrect: boolean): void {
    this.currentTemplateIsCorrect.next(isCorrect);
  }

  getCurrentTemplateisCorrect(): Observable<boolean> {
    return this.currentTemplateIsCorrect.asObservable();
  }

  setNextTemplate(nextTemplate: number): void {
    this.nextTemplate.next(nextTemplate);
  }

  getNextTemplate(): Observable<number> {
    return this.nextTemplate.asObservable();
  }


}
