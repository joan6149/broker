import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetitionType } from 'src/app/pages/user/models/NewMortage.model';
import { TemplateCollectionService } from '../template-collection.service';

@Component({
  selector: 'app-type-of-petition',
  templateUrl: './type-of-petition.component.html',
  styleUrls: ['./type-of-petition.component.scss']
})
export class TypeOfPetitionComponent implements OnInit {

  @Input() data!: PetitionType;
  @Output() OnSelectPetitionType: EventEmitter<PetitionType> = new EventEmitter<PetitionType>();

  constructor(private templateCollection: TemplateCollectionService) { }

  ngOnInit(): void {
  }

  setPetitionType(petitionType: PetitionType) {
    this.OnSelectPetitionType.emit(petitionType);
  }

}
