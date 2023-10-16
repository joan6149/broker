import { Injectable, TemplateRef } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject, of } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class TemplateCollectionService {

  mortageData: NewMortage = new NewMortage();

  constructor() { }

  // Este metodo al final tendria que pillarlos del back de una tabla especifica
  getNewMortageTemplates(): Observable<MortageTemplate[]> {
    return of(this.getLocalNewMortageTemplates());
  }


  private getLocalNewMortageTemplates(): MortageTemplate[] {
    
    return [
      {
        name: 'typeOfPetition',
        title: 'Tipo de petición',
        component: IndOrColectiveComponent
      } as MortageTemplate,
  
     {
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
      } as MortageTemplate,
    ]
  }


}
