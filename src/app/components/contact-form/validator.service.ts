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
}
