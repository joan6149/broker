import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermainComponent } from './usermain/usermain.component';
import { UserRoutingModule } from './user-routing.module';
import { TimeclockComponentsModule } from 'src/app/components/timeclock-components.module';
import { ComponentsModule, DomoLoggerService } from '@domo/domo-commons-lib';
import { NewTaxDataComponent } from './pages/new-tax-data/new-tax-data.component';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MainPanelComponent } from './pages/main-panel/main-panel.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/app.reducer';
import { authReducer } from 'src/app/appStore/reducers/Auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserStateEffects } from './UserState/user-state.effects';
import { userStateFeature } from './UserState/user-state.reducer';
import { RequestService } from './pages/services/request.service';
import { HttpClientModule } from '@angular/common/http';



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
  ],
  providers: [
    RequestService,
    DomoLoggerService
  ]
})
export class UserModule { }
