import { Component, ElementRef, ViewChild} from '@angular/core';
import { AbstractMortageFormComponent } from '../abstract-mortage-form/abstract-mortage-form.component';

@Component({
  selector: 'app-sons',
  templateUrl: './sons.component.html',
  styleUrls: ['./sons.component.scss']
})
export class SonsComponent extends AbstractMortageFormComponent {

  solicitantComboValue: any = '0_SOLICITANTE';
  acompaniantComboValue: any = '0_ACOMPANIANTE';

  constructor() {
    super();
   }

  override checkForm(formState: any): void {

    console.log(formState);

    const value: string = formState.target.value.split('_')[0];
    const formName: string = formState.target.value.split('_')[1];

    if(this.itsSameSolicitant === false) {
      if(formName === 'SOLICITANTE') {
        this.solicitantIsCorrect = value !== '-1' ? true : false;
      }
    }

    if(this.itsSameAcompaniant === false) {
      if(formName === 'ACOMPANIANTE') {
        this.acompaniantisCorrect = value !== '-1' ? true : false;
      }
    }


    if(this.solicitantIsCorrect === true) {
      this.mortageData.solicitante.hijosAcargo = value;
    }

    
    if(this.acompaniantisCorrect === true) {
      this.mortageData.acompaniante.hijosAcargo = value;
    }

    this.sendCheckFormIsCorrect();

  }

  override fillFormFields(): void {
    const solicitanteExists: boolean = this.mortageData.solicitante && this.mortageData.solicitante.hijosAcargo !== undefined;
    const acompanianteExists: boolean = this.mortageData.acompaniante && this.mortageData.acompaniante.hijosAcargo !== undefined;

    if(solicitanteExists) {
      this.solicitantIsCorrect = true;
      this.solicitantComboValue = `${this.mortageData.solicitante.hijosAcargo}_SOLICITANTE`
    }

    if(acompanianteExists) {
      this.acompaniantisCorrect = true;
      this.acompaniantComboValue = `${this.mortageData.acompaniante.hijosAcargo}_ACOMPANIANTE`
    }
    
    //this.checkForm(`${this.mortageData.solicitante.hijosAcargo}_SOLICITANTE`)
    this.sendCheckFormIsCorrect();

  }

  sameOtherHijos(source: string) {
    
    if(source === 'SOLICITANTE') {
      this.acompaniantComboValue = `${this.mortageData.solicitante.hijosAcargo}_ACOMPANIANTE`
      this.mortageData.acompaniante.hijosAcargo = this.mortageData.solicitante.hijosAcargo;
      this.checkForm(`${this.mortageData.acompaniante.hijosAcargo}_ACOMPANIANTE`)
    }

    if(source === 'ACOMPANIANTE') {
      this.solicitantComboValue = `${this.mortageData.acompaniante.hijosAcargo}_SOLICITANTE`
      this.mortageData.solicitante.hijosAcargo = this.mortageData.acompaniante.hijosAcargo;
      this.checkForm(`${this.mortageData.solicitante.hijosAcargo}_SOLICITANTE`)
    }

    //this.sendCheckFormIsCorrect();
    
    
  }

}
