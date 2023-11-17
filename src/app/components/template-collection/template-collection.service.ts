import { Injectable, TemplateRef } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject, of, map, switchMap, EMPTY, tap } from 'rxjs';
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


  private getLocalNewMortageTemplates(): MortageTemplate[] {
    
    return [
      {
        name: 'typeOfPetition',
        title: 'Tipo de petición',
        component: IndOrColectiveComponent
      } as MortageTemplate,
  
     /*{
        name: 'basicInformation',
        title: 'Información paersonal',
        component: InitDataFormAppComponent
      } as MortageTemplate,
  
      {
        name: 'civilState',
        title: 'Estado civil',
        component: CivilStateComponent
      } as MortageTemplate,

      
      {
        name: 'directionForm',
        title: 'Dirección',
        component: CountryOfResidenceComponent
      } as MortageTemplate,
  
      {
        name: 'sons',
        title: 'Hijos a cargo',
        component: SonsComponent
      } as MortageTemplate,
  
      {
        name: 'residentPermit',
        title: 'Permiso de residencia',
        component: ResidencePermitComponent
      } as MortageTemplate,

      {
        name: 'currentSituationHouse',
        title: 'Situación de la vivienda actual',
        component: CurrentHousingSituationComponent
      } as MortageTemplate, 
      {
        name: 'labSituation',
        title: 'Situación laboral',
        component: CurrentLaboralSituationComponent
      } as MortageTemplate,

      {
        name: 'isUsuallyHouse',
        title: '¿Sera vivienda habitual?',
        component: IsUsuallyHouseComponent
      } as MortageTemplate,

      {
        name: 'propertyValue',
        title: '¿Cuál es el valor de la propiedad?',
        component: PropertyHouseValueComponent
      } as MortageTemplate,

      {
        name: 'kindOfHouse',
        title: '¿Tipo de vivienda?',
        component: KindOfHouseComponent
      } as MortageTemplate,

      {
        name: 'currentHiringState',
        title: '¿Como va la busqueda de tu nueva casa?',
        component: CurrentHiringStateComponent
      } as MortageTemplate,
    
      {
        name: 'addressNewProperty',
        title: '¿Donde se encuentra la vivienda ha hipotecar?',
        component: CountryOfResidenceComponent
      } as MortageTemplate,
    
      {
        name: 'm2House',
        title: '¿Metros cuadrados de la vivienda a adquirir?',
        component: M2HouseComponent
      } as MortageTemplate,
    
      {
        name: 'kindOfConstruction',
        title: '¿Cual es el tipo de construcción de tu vivienda?',
        component: KindOfConstructionComponent
      } as MortageTemplate,
    
      {
        name: 'isAval',
        title: '¿Tienes o puedes conseguir aval?',
        component: IsAvalComponent
      } as MortageTemplate,
    
      {
        name: 'isHaciendaLastYear',
        title: '¿Has realizado la declaración de hacienda en españa el ultimo año?',
        component: IsDoHaciendaLastYearComponent
      } as MortageTemplate,
      
      {
        name: 'previousRequest',
        title: '¿Has solicitado ya la hipoteca con otros bancos?',
        component: PreviousRequestComponent
      } as MortageTemplate,

      {
        name: 'incomeAndExpenses',
        title: '¿Cuales son tus ingresos y gastos mensuales?',
        component: IncomeAndExpensesComponent
      } as MortageTemplate, */

      {
        name: 'verificationCode',
        title: 'Introduce el codigo de verificación que te hemos mandado al mail',
        component: VerificationCodeComponent
      } as MortageTemplate,
    ]
  }

  public getAllCitiesData(): Observable<Ca[]> {
    return this.httpClient.get<Ca[]>(`${environment.backend}/${this.urlSlice}/templateData/ca`).pipe(
      tap(res => this.comunidadesAutonomas = res)
    );
  }


}
