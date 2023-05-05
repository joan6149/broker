import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TimeclockService } from 'src/app/services/timeclock.service';
import { FormControlValidateModel } from './validate-error/models/ValidateErrorModel';
import { ValidatorService } from './validator.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required , Validators.minLength(3)]],
    'apellidos': ['', [Validators.required]],
    'email': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'tipo': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]],
    'acepto': ['']
  })

  constructor(private timeclockService:TimeclockService, 
              private fb:FormBuilder,
              private validatorService:ValidatorService) { }

  ngOnInit(): void {
    
  }

  isValidField(field: string) {
    return this.validatorService.isValidField(this.contactForm, field);
  }

  getControl(field: string):FormControlValidateModel {
    return {
      valueChange$: this.contactForm.controls[field].valueChanges,
      control: this.contactForm.controls[field]
    } as FormControlValidateModel 
  }

  cancelar() {
    this.timeclockService.setShowForm(false);
  }

  submit() {

  }

}
