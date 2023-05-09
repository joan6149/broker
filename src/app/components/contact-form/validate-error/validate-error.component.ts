import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControlValidateModel } from './models/ValidateErrorModel';

@Component({
  selector: 'app-validate-error',
  templateUrl: './validate-error.component.html',
  styleUrls: ['./validate-error.component.scss']
})
export class ValidateErrorComponent implements OnInit {

  @Input() msgErrors: string[] = [];

  constructor() { }

  ngOnInit(): void {
    /*this.formControlValidateModel.valueChange$.subscribe((val) => {
      if(this.formControlValidateModel.control.errors !== null &&
        this.formControlValidateModel.control.touched) {
          this.msgErrors = [];
          this.formControlValidateModel.errors = {...this.formControlValidateModel.control.errors}
          for(const err in this.formControlValidateModel.errors) {
            
          }
          
          this.formControlValidateModel.errors = this.msgErrors;
          this.hasError = true
        } else {
          this.hasError = false;
        }
    }) */
  }

}
