import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidateErrorModel } from './validate-error/models/ValidateErrorModel';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {


  constructor() { }

  isNotBlank(formControl: FormControl): ValidateErrorModel | null {
    
    if(formControl.value === "") {
        return {
            hasError: true,
            msg: `El campo no puede estar vacio.`
        } as ValidateErrorModel
    }

    return null;
  }

  isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  getErrorMsg(form: FormGroup, field: string): string[] {
    let msgErrors : string [] = [];
    if(form.pristine) return [];
    if ( !form.controls[field] ) return [];
    if ( form.controls[field].pristine && !form.controls[field].touched) return [];

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          field !== undefined ? msgErrors.push(`El campo ${field} es requerido.`) : msgErrors.push(`El campo es requerido.`);
          break;
        case 'minlength':
            field !== undefined ? msgErrors.push(`El campo ${field} tiene que tener mas de ${errors['minlength'].requiredLength} caracteres.`) : msgErrors.push(`El campo debe tener mas de ${errors['minlength'].requiredLength} caracteres.`);
            break;
        default:
          msgErrors.push(`El campo ${field} tiene un error de validacion no controlado.`);
          break;
      }
    }
    return msgErrors;
  }
}
