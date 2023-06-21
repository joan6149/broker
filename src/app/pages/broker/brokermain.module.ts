import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrokermainComponent } from './brokermain/brokermain.component';
import { BrokerRoutingModule } from './broker-routing.module';
import { TimeclockComponentsModule } from 'src/app/components/timeclock-components.module';



@NgModule({
  declarations: [
    BrokermainComponent
  ],
  imports: [
    CommonModule,
    BrokerRoutingModule,
    TimeclockComponentsModule
  ]
})
export class BrokermainModule { }
