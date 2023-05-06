import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
      if(this.formControlValidateModel.control.errors !== null &&
        this.formControlValidateModel.control.touched) {
          this.msgErrors = [];
          this.formControlValidateModel.errors = {...this.formControlValidateModel.control.errors}
          for(const err in this.formControlValidateModel.errors) {
            this.getErrorMsg(err , this.formControlValidateModel.errors[err]);
          }
          
          this.formControlValidateModel.errors = this.msgErrors;
          this.hasError = true
        } else {
          this.hasError = false;
        }
    })
  }

  getErrorMsg(error: string, errorObj: any) {
    switch(error) {
      case 'required':
        this.field !== undefined ? this.msgErrors.push(`El campo ${this.field} es requerido.`) : this.msgErrors.push(`El campo es requerido.`);
        break;
      case 'minlength':
          this.field !== undefined ? this.msgErrors.push(`El campo ${this.field} tiene que tener mas de ${errorObj.requiredLength} caracteres.`) : this.msgErrors.push(`El campo debe tener mas de ${errorObj.requiredLength} caracteres.`);
          break;
      default:
        this.msgErrors.push(`El campo ${this.field} tiene un error de validacion no controlado.`);
        break;
    }
  }

}
