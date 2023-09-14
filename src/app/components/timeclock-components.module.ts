import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestOfertComponent } from './best-ofert/best-ofert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrecuentAsksComponent } from './frecuent-asks/frecuent-asks.component';
import { MainAnnouncementComponent } from './main-announcement/main-announcement.component';
import { MovileAnimationComponent } from './movile-animation/movile-animation.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { TopComponent } from './top/top.component';
import {FormsModule} from '@angular/forms';
import { ComponentsModule } from '@domo/domo-commons-lib';
import { DomoCommonPipesModule } from '@domo/domo-commons-lib';
import { DomoCommonDirectiveModule } from '@domo/domo-commons-lib';
import { TemplateCollectionModule } from './template-collection/template-collection.module';


@NgModule({
  declarations: [
    BestOfertComponent,
    DashboardComponent,
    FrecuentAsksComponent,
    MainAnnouncementComponent,
    MovileAnimationComponent,
    TextBoxComponent,
    TopComponent,
  ],
  exports: [
    BestOfertComponent,
    DashboardComponent,
    FrecuentAsksComponent,
    MainAnnouncementComponent,
    MovileAnimationComponent,
    TextBoxComponent,
    TopComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    DomoCommonPipesModule,
    DomoCommonDirectiveModule
  ]
})
export class TimeclockComponentsModule { }
