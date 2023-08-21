import { Component, EventEmitter, Output} from '@angular/core';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { InitDataInterface } from '../models/initData.interface';
import { AbstractMortageFormComponent } from '../abstract-mortage-form/abstract-mortage-form.component';

@Component({
  selector: 'app-init-data-form',
  templateUrl: './init-data-form.component.html',
  styleUrls: ['./init-data-form.component.scss']
})
export class InitDataFormAppComponent extends AbstractMortageFormComponent {

  constructor() {
    super();
   }

  public checkForm(formState: InitFormState) {

    if(this.itsSameSolicitant === false) {
      this.solicitantIsCorrect = (formState.formName === 'SOLICITANTE' && formState.status === 'VALID') ? true : false;
    }

    if(this.itsSameAcompaniant === false) {
      this.acompaniantisCorrect = (formState.formName === 'ACOMPANIANTE' && formState.status === 'VALID') ? true : false;
    }


    if(this.solicitantIsCorrect === true) {
      this.mortageData.solicitante = {...this.mortageData.solicitante ,...formState.value};
    }

    
    if(this.acompaniantisCorrect === true) {
      this.mortageData.acompaniante = {...this.mortageData.solicitante ,...formState.value};
    }

    this.sendCheckFormIsCorrect();

    
  }

}
