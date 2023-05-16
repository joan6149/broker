import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { TopComponent } from './components/top/top.component';
import { MainAnnouncementComponent } from './components/main-announcement/main-announcement.component';
import { FrecuentAsksComponent } from './components/frecuent-asks/frecuent-asks.component';
import { BestOfertComponent } from './components/best-ofert/best-ofert.component';
import { PhoneComponent } from './components/phone/phone.component';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { TimeclockService } from './services/timeclock.service';
import { ContactFormModule } from './components/contact-form/contact-form.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TopComponent,
    MainAnnouncementComponent,
    FrecuentAsksComponent,
    BestOfertComponent,
    PhoneComponent,
    TextBoxComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContactFormModule,
    HttpClientModule
  ],
  providers: [
    TimeclockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
