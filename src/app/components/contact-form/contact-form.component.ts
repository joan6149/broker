import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { TimeclockService } from 'src/app/services/timeclock.service';
import { Contact, DialogAction, DialogID } from './models/contact.interface';
import { FormControlValidateModel } from './validate-error/models/ValidateErrorModel';
import { ValidatorService } from './validator.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    this.timeclockService.sendMail(this.contactForm.value as Contact).subscribe((val) => {
      console.log("MAil enviado -> ", val);
      this.timeclockService.setShowForm(false);
      this.timeclockService.setShowDialog({
        id: DialogID.operationConfirm,
        show: true,
        state: val.success
      } as DialogAction)
      this.onClose.emit(true);
    })
  }

}
