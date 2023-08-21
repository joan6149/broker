import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NewMortage, TipoAutonomo, TipoFuncionario, TipoSituacionLaboral } from 'src/app/pages/user/models/NewMortage.model';
import { AbstractMortageFormComponent } from '../abstract-mortage-form/abstract-mortage-form.component';
import { InitDataFormComponent } from '@domo/domo-commons-lib';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';

@Component({
  selector: 'app-current-laboral-situation',
  templateUrl: './current-laboral-situation.component.html',
  styleUrls: ['./current-laboral-situation.component.scss']
})
export class CurrentLaboralSituationComponent extends AbstractMortageFormComponent {

  listOfTypeOfSituation: string[] = [];
  listOfFunctionaryType: string[] = [];
  listofAutonomType: string[] = [];

  constructor() {
    super();
    this.generateLists();
   }

   private generateLists(): void {
    this.listOfFunctionaryType = Object.values(TipoFuncionario);
    this.listOfTypeOfSituation = Object.values(TipoSituacionLaboral);
    this.listofAutonomType = Object.values(TipoAutonomo);
   }

   public checkForm(formState: InitFormState) {

    if(formState.formName === 'SOLICITANTE') {
      this.solicitantIsCorrect = formState.status === 'VALID' ? true : false
    }

    if(formState.formName === 'ACOMPANIANTE') {
      this.acompaniantisCorrect = formState.status === 'VALID' ? true : false;
    }

    if(this.solicitantIsCorrect === true) {
      this.mortageData.solicitante.situacionLaboral = {...this.mortageData.solicitante.situacionLaboral ,...formState.value};
    }

    
    if(this.acompaniantisCorrect === true) {
      this.mortageData.acompaniante.situacionLaboral = {...this.mortageData.acompaniante.situacionLaboral ,...formState.value};
    }


    this.sendCheckFormIsCorrect();
    
  }

}
