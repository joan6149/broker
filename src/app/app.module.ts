import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { TimeclockService } from './services/timeclock.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule, DomoLoggerService } from '@domo/domo-commons-lib';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TimeclockComponentsModule } from './components/timeclock-components.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appReducers } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './appStore/effects';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpBlackBirdErrorHandler } from './errorHandler/HttpBlackBirdErrorHandler';
import { ErrorInterceptorInterceptor } from './errorHandler/interceptor/error-interceptor.interceptor';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TimeclockComponentsModule,
    ToastModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot( AppEffects ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    TimeclockService,
    AuthService,
    CookieService,
    HttpBlackBirdErrorHandler,
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
