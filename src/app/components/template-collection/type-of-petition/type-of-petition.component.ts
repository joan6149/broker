import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetitionType } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-type-of-petition',
  templateUrl: './type-of-petition.component.html',
  styleUrls: ['./type-of-petition.component.scss']
})
export class TypeOfPetitionComponent implements OnInit {

  @Input() data!: PetitionType;
  @Output() OnSelectPetitionType: EventEmitter<PetitionType> = new EventEmitter<PetitionType>();

  constructor() { }

  ngOnInit(): void {
  }

  setPetitionType(petitionType: PetitionType) {
    this.OnSelectPetitionType.emit(petitionType);
  }

}
