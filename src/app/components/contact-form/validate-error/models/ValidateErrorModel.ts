import { AbstractControl } from "@angular/forms"
import { Observable } from "rxjs"

export interface ValidateErrorModel {
    hasError: Boolean,
    msg: string
}

export interface FormControlValidateModel {
        valueChange$: Observable<any>,
        control: AbstractControl
        errors?: string[],
}
