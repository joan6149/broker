import { Component, OnInit, Input } from '@angular/core';
import { NewMortage, PetitionType } from 'src/app/pages/user/models/NewMortage.model';
import { TemplateCollectionService } from '../template-collection.service';

@Component({
  selector: 'app-sons',
  templateUrl: './sons.component.html',
  styleUrls: ['./sons.component.scss']
})
export class SonsComponent implements OnInit {

  @Input('petitionType') petitionType!: string;
  mortageData!: NewMortage;

  constructor(private templateCollectionService: TemplateCollectionService) { }

  ngOnInit(): void {
    this.mortageData = this.templateCollectionService.mortageData;
    console.log("SONS FIRST ==> ", this.mortageData);
    this.sendIsCorrect();
  }

  sameOtherHijos(source: string) {
    
    if(source === 'SOLICITANTE') {
      this.mortageData.acompaniante.hijosAcargo = this.mortageData.solicitante.hijosAcargo;
    }

    if(source === 'ACOMPANIANTE') {
      this.mortageData.solicitante.hijosAcargo = this.mortageData.acompaniante.hijosAcargo;
    }
  }

  sendIsCorrect() {
    
    if(this.mortageData.petitionType === PetitionType.INDIVIDUAL) {
      if(this.mortageData.solicitante.hijosAcargo) {
        console.log("CORRETO")
        this.templateCollectionService.setCurrentTemplateIsCorrect(true);
      } else {
        console.log("INCORRETO")
        this.templateCollectionService.setCurrentTemplateIsCorrect(false);
      }
    }

    if(this.mortageData.petitionType === PetitionType.CONJUNTA) {
      let isCorrectSol: boolean = false;
      let isCorrectAco: boolean = false;
      if(this.mortageData.solicitante.hijosAcargo) {
        isCorrectSol = true;
      }

      if(this.mortageData.acompaniante.hijosAcargo) {
        isCorrectAco = true
      }

      this.templateCollectionService.setCurrentTemplateIsCorrect(isCorrectSol && isCorrectAco);
    }
  }

}
