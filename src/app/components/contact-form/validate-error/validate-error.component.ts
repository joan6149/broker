import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormControlValidateModel } from './models/ValidateErrorModel';

@Component({
  selector: 'app-validate-error',
  templateUrl: './validate-error.component.html',
  styleUrls: ['./validate-error.component.scss']
})
export class ValidateErrorComponent implements OnInit {

  @Input('control') formControlValidateModel!:FormControlValidateModel;
  @Input() field: string | undefined;
  msgErrors: string[] = [];
  hasError: Boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.formControlValidateModel.valueChange$.subscribe((val) => {
      console.log("FROM VALIDATOR, ", val);
      console.log("CONTOL => ", this.formControlValidateModel.control)
      if(this.formControlValidateModel.control.errors !== null &&
        this.formControlValidateModel.control.touched) {
          this.msgErrors = [];
          for(const err in this.formControlValidateModel.control.errors) {
            this.getErrorMsg(err);
          }
          
          this.formControlValidateModel.errors = this.msgErrors;
          console.log("CONTOL Errors => ", this.msgErrors);
          this.hasError = true
        } else {
          this.hasError = false;
        }
    })
  }

  getErrorMsg(error: any) {
    console.log(Object.keys(error));
    switch(Object.keys(error)[0]) {
      case 'required':
        this.field !== undefined ? this.msgErrors.push(`El campo ${this.field} es requerido.`) : this.msgErrors.push(`El campo es requerido.`);
        break;
      default:
        this.msgErrors.push(`El campo ${this.field} tiene un error de validacion no controlado.`);
        break;
    }
  }

}
