// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Externas
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// PrimeNG
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';

// Librerias propias
import { ComponentsModule, DomoLoggerService } from '@domo/domo-commons-lib';

//Componentes propios
import { UsermainComponent } from './usermain/usermain.component';
import { UserRoutingModule } from './user-routing.module';
import { TimeclockComponentsModule } from 'src/app/components/timeclock-components.module';
import { NewTaxDataComponent } from './pages/new-tax-data/new-tax-data.component';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MainPanelComponent } from './pages/main-panel/main-panel.component';
import { userReducers, userStateFeatureKey } from './UserState/user-state.reducer';
import { RequestService } from './pages/services/request.service';
import { TemplateCollectionService } from 'src/app/components/template-collection/template-collection.service';
import { NewMortageStateEffects } from './UserState/NewMortageState/new-mortage-state.effects';
import { RequestsStateEffects } from './UserState/RequestsState/requests-state.effects';




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
    StoreModule.forFeature(userStateFeatureKey ,userReducers),
    EffectsModule.forFeature( [RequestsStateEffects, NewMortageStateEffects] ),
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    TooltipModule,
    DialogModule,
    RadioButtonModule
  ],
  providers: [
    RequestService,
    DomoLoggerService,
    ConfirmationService,
    TemplateCollectionService
  ]
})
export class UserModule { }
