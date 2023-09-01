import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestOfertComponent } from './best-ofert/best-ofert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrecuentAsksComponent } from './frecuent-asks/frecuent-asks.component';
import { MainAnnouncementComponent } from './main-announcement/main-announcement.component';
import { MovileAnimationComponent } from './movile-animation/movile-animation.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { TopComponent } from './top/top.component';
import { IndOrColectiveComponent } from './step-components/ind-or-colective/ind-or-colective.component';
import { DataFormComponent } from './step-components/data-form/data-form.component';
import { TemplateCollectionComponent } from './template-collection/template-collection.component';
import { TypeOfPetitionComponent } from './template-collection/type-of-petition/type-of-petition.component';
import { InitDataFormAppComponent } from './template-collection/init-data-form/init-data-form.component';
import { CivilStateComponent } from './template-collection/civil-state/civil-state.component';
import { CountryOfResidenceComponent } from './template-collection/country-of-residence/country-of-residence.component';
import { SonsComponent } from './template-collection/sons/sons.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ResidencePermitComponent } from './template-collection/residence-permit/residence-permit.component';
import { CurrentHousingSituationComponent } from './template-collection/current-housing-situation/current-housing-situation.component';
import { CurrentLaboralSituationComponent } from './template-collection/current-laboral-situation/current-laboral-situation.component';
import { PropertyHouseValueComponent } from './template-collection/property-house-value/property-house-value.component';
import { IsUsuallyHouseComponent } from './template-collection/is-usually-house/is-usually-house.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

import { ComponentsModule } from '@domo/domo-commons-lib';
import { DomoCommonPipesModule } from '@domo/domo-commons-lib';
import { DomoCommonDirectiveModule } from '@domo/domo-commons-lib';
import { KindOfHouseComponent } from './template-collection/kind-of-house/kind-of-house.component';
import { CurrentHiringStateComponent } from './template-collection/current-hiring-state/current-hiring-state.component';
import { M2HouseComponent } from './template-collection/m2-house/m2-house.component';
import { KindOfConstructionComponent } from './template-collection/kind-of-construction/kind-of-construction.component';
import { IsAvalComponent } from './template-collection/is-aval/is-aval.component';
import { IsRequestedAnotherBancsComponent } from './template-collection/is-requested-another-bancs/is-requested-another-bancs.component';
import { IsDoHaciendaLastYearComponent } from './template-collection/is-do-hacienda-last-year/is-do-hacienda-last-year.component';
import { IngressEgressMothlyComponent } from './template-collection/ingress-egress-mothly/ingress-egress-mothly.component';
import { VerifyYourMailComponent } from './template-collection/verify-your-mail/verify-your-mail.component';
import { ReadyToGoMainViewComponent } from './template-collection/ready-to-go-main-view/ready-to-go-main-view.component';
import { PreviousRequestComponent } from './template-collection/previous-request/previous-request.component';


@NgModule({
  declarations: [
    BestOfertComponent,
    DashboardComponent,
    FrecuentAsksComponent,
    MainAnnouncementComponent,
    MovileAnimationComponent,
    TextBoxComponent,
    TopComponent,
    IndOrColectiveComponent,
    DataFormComponent,
    TypeOfPetitionComponent,
    TemplateCollectionComponent,
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
  exports: [
    BestOfertComponent,
    DashboardComponent,
    FrecuentAsksComponent,
    MainAnnouncementComponent,
    MovileAnimationComponent,
    TextBoxComponent,
    TopComponent,
    IndOrColectiveComponent,
    DataFormComponent,
    TemplateCollectionComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DomoCommonPipesModule,
    DomoCommonDirectiveModule,
    // Angular material imports
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    FormsModule
  ]
})
export class TimeclockComponentsModule { }
