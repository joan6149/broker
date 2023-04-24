import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { TopComponent } from './components/top/top.component';
import { MainAnnouncementComponent } from './components/main-announcement/main-announcement.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FrecuentAsksComponent } from './components/frecuent-asks/frecuent-asks.component';
import { BestOfertComponent } from './components/best-ofert/best-ofert.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopComponent,
    MainAnnouncementComponent,
    ContactFormComponent,
    FrecuentAsksComponent,
    BestOfertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
