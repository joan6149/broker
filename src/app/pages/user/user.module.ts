import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermainComponent } from './usermain/usermain.component';
import { UserRoutingModule } from './user-routing.module';
import { TimeclockComponentsModule } from 'src/app/components/timeclock-components.module';
import { ComponentsModule } from '@domo/domo-commons-lib';
import { NewTaxDataComponent } from './pages/new-tax-data/new-tax-data.component';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MainPanelComponent } from './pages/main-panel/main-panel.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/app.reducer';
import { authReducer } from 'src/app/appStore/reducers/Auth.reducer';



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
    StoreModule.forFeature('auth', authReducer),
  ]
})
export class UserModule { }
