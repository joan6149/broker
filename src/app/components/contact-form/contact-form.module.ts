import { NgModule } from '@angular/core';
import { ValidateErrorComponent } from './validate-error/validate-error.component';
import { ContactFormComponent } from './contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidatorService } from './validator.service';



@NgModule({
  declarations: [
    ValidateErrorComponent,
    ContactFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ValidateErrorComponent,
    ContactFormComponent
  ],
  providers: [
    ValidatorService
  ]
})
export class ContactFormModule { }
