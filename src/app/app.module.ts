import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { TimeclockService } from './services/timeclock.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '@domo/domo-commons-lib';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeclockComponentsModule } from './components/timeclock-components.module';
import { StoreModule, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appReducers } from './app.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { AppEffects } from './appStore/effects';
import { UserService } from './services/user.service';
import { TemplateCollectionModule } from './components/template-collection/template-collection.module';


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
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot( AppEffects ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    TimeclockService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
