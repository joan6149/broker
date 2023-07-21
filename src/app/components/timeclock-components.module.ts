import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestOfertComponent } from './best-ofert/best-ofert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrecuentAsksComponent } from './frecuent-asks/frecuent-asks.component';
import { MainAnnouncementComponent } from './main-announcement/main-announcement.component';
import { MovileAnimationComponent } from './movile-animation/movile-animation.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { TopComponent } from './top/top.component';
import { ComponentsModule } from '@domo/domo-commons-lib';
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
    PropertyHouseValueComponent
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
    // Angular material imports
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class TimeclockComponentsModule { }
