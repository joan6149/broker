import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
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

  msgErrors: string [] = [];
  formValues: Subscription = new Subscription();

  constructor(private timeclockService:TimeclockService, 
              private fb:FormBuilder,
              protected validatorService:ValidatorService) { }

  ngOnInit(): void {
    this.contactForm.valueChanges.subscribe((val: any) => {
      console.log(val);
      console.log(this.contactForm.invalid);
    })
  }

  cancelar() {
    this.timeclockService.setShowForm(false);
  }

  submit() {
    if(this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      console.log("Formulario invalido")
      return
    }
    console.log("Llamo al servicio para enviar un email")
  }

}
