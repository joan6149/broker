import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMortgageComponent } from './new-mortgage.component';
import { NewMortgageRoutingModule } from './new-mortgage-routing.module';
import { TimeclockComponentsModule } from 'src/app/components/timeclock-components.module';
import { ComponentsModule } from '@domo/domo-commons-lib';

// Angular material components
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    NewMortgageComponent
  ],
  imports: [
    CommonModule,
    TimeclockComponentsModule,
    NewMortgageRoutingModule,
    ComponentsModule,
    // Imports de angular material
    MatFormFieldModule,
    MatSelectModule

  ]
})
export class NewMortgageModule { }
