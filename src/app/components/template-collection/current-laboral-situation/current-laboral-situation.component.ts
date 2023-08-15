import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NewMortage, TipoAutonomo, TipoFuncionario, TipoSituacionLaboral } from 'src/app/pages/user/models/NewMortage.model';
import { AbstractMortageFormComponent } from '../abstract-mortage-form/abstract-mortage-form.component';
import { InitDataFormComponent } from '@domo/domo-commons-lib';

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
    console.log("Type => ", this.listOfTypeOfSituation);
    console.log("FuncType => ", this.listOfFunctionaryType);
    console.log("AutType => ", this.listofAutonomType);
   }

   private generateLists(): void {
    this.listOfFunctionaryType = Object.values(TipoFuncionario);
    this.listOfTypeOfSituation = Object.values(TipoSituacionLaboral);
    this.listofAutonomType = Object.values(TipoAutonomo);
   }

   private generateTypeOfSituationList(): void {
    
   }
   private generateFunctionaryList(): void {

   }
   private generateAutonomList(): void {

   }

}
