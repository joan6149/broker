// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Externas
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ComponentsModule, DomoLoggerService } from '@domo/domo-commons-lib';

//Propias
import { UsermainComponent } from './usermain/usermain.component';
import { UserRoutingModule } from './user-routing.module';
import { TimeclockComponentsModule } from 'src/app/components/timeclock-components.module';
import { NewTaxDataComponent } from './pages/new-tax-data/new-tax-data.component';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MainPanelComponent } from './pages/main-panel/main-panel.component';
import { UserStateEffects } from './UserState/user-state.effects';
import { userStateFeature } from './UserState/user-state.reducer';
import { RequestService } from './pages/services/request.service';




@NgModule({
  declarations: [
    UsermainComponent,
    NewTaxDataComponent,
    MyRequestsComponent,
    MyDocumentsComponent,
    MyProfileComponent,
    MainPanelComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TimeclockComponentsModule,
    ComponentsModule,
    HttpClientModule,
    StoreModule.forFeature(userStateFeature),
    EffectsModule.forFeature([UserStateEffects]),
    TableModule,
    ButtonModule
  ],
  providers: [
    RequestService,
    DomoLoggerService
  ]
})
export class UserModule { }
