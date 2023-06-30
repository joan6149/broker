import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PetitionType } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-ind-or-colective',
  templateUrl: './ind-or-colective.component.html',
  styleUrls: ['./ind-or-colective.component.scss']
})
export class IndOrColectiveComponent implements OnInit {

  isIndividualActive: boolean = true;
  isConjuntaActive: boolean = false;
  
  @Input() selectedPetition: PetitionType = PetitionType.INDIVIDUAL; 
  @Output() OnSelectPetitionType: EventEmitter<PetitionType> = new EventEmitter<PetitionType>();

  constructor() { }

  ngOnInit(): void {
    this.typeSelected(this.selectedPetition.toLowerCase());
  }

  typeSelected(type: string) {
    this.isConjuntaActive = false;
    this.isIndividualActive = false;
    if(type === 'individual') {
      this.isIndividualActive = true
      this.OnSelectPetitionType.emit(PetitionType.INDIVIDUAL);
    }

    if(type === 'conjunta') {
      this.isConjuntaActive = true;
      this.OnSelectPetitionType.emit(PetitionType.CONJUNTA);
    }
  }

}
