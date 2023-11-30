import { Injectable, TemplateRef } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject, of, map, switchMap, EMPTY, tap, catchError } from 'rxjs';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { MortageTemplate } from './abstract-step-page/abstract-step-page.component';
import { CivilStateComponent } from './civil-state/civil-state.component';
import { CountryOfResidenceComponent } from './country-of-residence/country-of-residence.component';
import { CurrentHousingSituationComponent } from './current-housing-situation/current-housing-situation.component';
import { IndOrColectiveComponent } from './ind-or-colective/ind-or-colective.component';
import { InitDataFormAppComponent } from './init-data-form/init-data-form.component';
import { ResidencePermitComponent } from './residence-permit/residence-permit.component';
import { SonsComponent } from './sons/sons.component';
import { CurrentLaboralSituationComponent } from './current-laboral-situation/current-laboral-situation.component';
import { M2HouseComponent } from './m2-house/m2-house.component';
import { KindOfConstructionComponent } from './kind-of-construction/kind-of-construction.component';
import { IsAvalComponent } from './is-aval/is-aval.component';
import { IsDoHaciendaLastYearComponent } from './is-do-hacienda-last-year/is-do-hacienda-last-year.component';
import { PreviousRequestComponent } from './previous-request/previous-request.component';
import { IsUsuallyHouseComponent } from './is-usually-house/is-usually-house.component';
import { PropertyHouseValueComponent } from './property-house-value/property-house-value.component';
import { KindOfHouseComponent } from './kind-of-house/kind-of-house.component';
import { CurrentHiringStateComponent } from './current-hiring-state/current-hiring-state.component';
import { IncomeAndExpensesComponent } from './income-and-expenses/income-and-expenses.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmptyExpr } from '@angular/compiler';
import { Ca } from '@domo/domo-commons-lib/lib/components/forms/models/direction.interface';
import { BrokerDto } from './dtos/Broker.dto';
import { BankDto } from './dtos/Bank.dto';
import { ValidationCode } from './models/initData.interface';

@Injectable({
  providedIn: 'root'
})
export class TemplateCollectionService {

  mortageData: NewMortage = new NewMortage();
  verificationCode: string = '';
  urlSlice: string = 'template';
  comunidadesAutonomas: Ca[] = [];

  constructor(private httpClient: HttpClient) { }

  getNewMortageTemplates(formId: string): Observable<MortageTemplate[]> {
    //return of(this.getLocalNewMortageTemplates());
    return this.httpClient.get<any>(`${environment.backend}/${this.urlSlice}/templateAssignations/${formId}`).pipe(
      tap(res => console.log),
      map(res => res.map((value:any) => {
        let receivedTemplate: any = value.template;
        return {
          name: receivedTemplate.name,
          title: receivedTemplate.title,
          component: this.getComponentByTemplateId(receivedTemplate.id) as any
        } as MortageTemplate
      }))
    );

    
    //return of(this.getLocalNewMortageTemplates());

  }

  private getComponentByTemplateId(templateId: number) {
    const templateComponents: any[] = [];
    templateComponents[0] = IndOrColectiveComponent;
    templateComponents[1] = InitDataFormAppComponent;
    templateComponents[2] = CivilStateComponent;
    templateComponents[3] = CountryOfResidenceComponent;
    templateComponents[4] = SonsComponent;
    templateComponents[5] = ResidencePermitComponent;
    templateComponents[6] = CurrentHousingSituationComponent;
    templateComponents[7] = CurrentLaboralSituationComponent;
    templateComponents[8] = IsUsuallyHouseComponent;
    templateComponents[9] = PropertyHouseValueComponent;
    templateComponents[10] = KindOfHouseComponent;
    templateComponents[11] = CurrentHiringStateComponent;
    templateComponents[12] = CountryOfResidenceComponent;
    templateComponents[13] = M2HouseComponent;
    templateComponents[14] = KindOfConstructionComponent;
    templateComponents[15] = IsAvalComponent;
    templateComponents[16] = IsDoHaciendaLastYearComponent;
    templateComponents[17] = PreviousRequestComponent;
    templateComponents[18] = IncomeAndExpensesComponent;
    templateComponents[19] = VerificationCodeComponent;

    return templateComponents[templateId-1];
  }

  // http://localhost:3000/broker/template/templateData/professions
  // http://localhost:3000/broker/template/templateData/professions

  public getAllProfessions(): Observable<string[]> {
    return this.httpClient.get<any>(`${environment.backend}/${this.urlSlice}/templateData/professions`).pipe(
      map(data => data.map((item: any) => item.professionName))
    )
  }

  public getAllBanks(): Observable<BankDto[]> {
    return this.httpClient.get<any>(`${environment.backend}/${this.urlSlice}/templateData/banks`);
  }

  public getAllBrokers(): Observable<BrokerDto[]> {
    return this.httpClient.get<any>(`${environment.backend}/${this.urlSlice}/templateData/brokers`);
  }

  public getAllCitiesData(): Observable<Ca[]> {
    return this.httpClient.get<Ca[]>(`${environment.backend}/${this.urlSlice}/templateData/ca`).pipe(
      tap(res => this.comunidadesAutonomas = res)
    );
  }

  public sendValidationCode(userId: string): Observable<ValidationCode> {
    return this.httpClient.get<any>(`${environment.backend}/email/sendValidationCode/${userId}`);
  }

  public checkValidationCode(validationCode: ValidationCode): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.backend}/email/checkVerificationCode`, validationCode);
  }


}
