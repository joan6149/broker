// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Template components
import { IndOrColectiveComponent } from './ind-or-colective/ind-or-colective.component';
import { InitDataFormAppComponent } from './init-data-form/init-data-form.component';
import { CivilStateComponent } from './civil-state/civil-state.component';
import { CountryOfResidenceComponent } from './country-of-residence/country-of-residence.component';
import { SonsComponent } from './sons/sons.component';
import { ResidencePermitComponent } from './residence-permit/residence-permit.component';
import { CurrentHousingSituationComponent } from './current-housing-situation/current-housing-situation.component';
import { CurrentLaboralSituationComponent } from './current-laboral-situation/current-laboral-situation.component';
import { PropertyHouseValueComponent } from './property-house-value/property-house-value.component';
import { IsUsuallyHouseComponent } from './is-usually-house/is-usually-house.component';
import { KindOfHouseComponent } from './kind-of-house/kind-of-house.component';
import { CurrentHiringStateComponent } from './current-hiring-state/current-hiring-state.component';
import { M2HouseComponent } from './m2-house/m2-house.component';
import { KindOfConstructionComponent } from './kind-of-construction/kind-of-construction.component';
import { IsAvalComponent } from './is-aval/is-aval.component';
import { IsRequestedAnotherBancsComponent } from './is-requested-another-bancs/is-requested-another-bancs.component';
import { IsDoHaciendaLastYearComponent } from './is-do-hacienda-last-year/is-do-hacienda-last-year.component';
import { IngressEgressMothlyComponent } from './ingress-egress-mothly/ingress-egress-mothly.component';
import { VerifyYourMailComponent } from './verify-your-mail/verify-your-mail.component';
import { ReadyToGoMainViewComponent } from './ready-to-go-main-view/ready-to-go-main-view.component';
import { PreviousRequestComponent } from './previous-request/previous-request.component';

// PrimeNG
import {KnobModule} from 'primeng/knob';
import {SliderModule} from 'primeng/slider';
import { ComponentsModule, DomoCommonDirectiveModule, DomoCommonPipesModule } from '@domo/domo-commons-lib';
import { TemplateCollectionService } from './template-collection.service';



@NgModule({
  declarations: [
    IndOrColectiveComponent,
    InitDataFormAppComponent,
    CivilStateComponent,
    CountryOfResidenceComponent,
    SonsComponent,
    ResidencePermitComponent,
    CurrentHousingSituationComponent,
    CurrentLaboralSituationComponent,
    PropertyHouseValueComponent,
    IsUsuallyHouseComponent,
    KindOfHouseComponent,
    CurrentHiringStateComponent,
    M2HouseComponent,
    KindOfConstructionComponent,
    IsAvalComponent,
    IsRequestedAnotherBancsComponent,
    IsDoHaciendaLastYearComponent,
    IngressEgressMothlyComponent,
    VerifyYourMailComponent,
    ReadyToGoMainViewComponent,
    PreviousRequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    KnobModule,
    SliderModule,
    ComponentsModule,
    DomoCommonPipesModule,
    DomoCommonDirectiveModule
  ],
  exports: [
    IndOrColectiveComponent,
    InitDataFormAppComponent,
    CivilStateComponent,
    CountryOfResidenceComponent,
    SonsComponent,
    ResidencePermitComponent,
    CurrentHousingSituationComponent,
    CurrentLaboralSituationComponent,
    PropertyHouseValueComponent,
    IsUsuallyHouseComponent,
    KindOfHouseComponent,
    CurrentHiringStateComponent,
    M2HouseComponent,
    KindOfConstructionComponent,
    IsAvalComponent,
    IsRequestedAnotherBancsComponent,
    IsDoHaciendaLastYearComponent,
    IngressEgressMothlyComponent,
    VerifyYourMailComponent,
    ReadyToGoMainViewComponent,
    PreviousRequestComponent
  ],
  providers: [
    TemplateCollectionService
  ]
})
export class TemplateCollectionModule { }
