import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { PetitionType, Source } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-ind-or-colective',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./ind-or-colective.component.scss']
})
export class IndOrColectiveComponent extends AbstractCombolistComponent {

  constructor() {
    super();
    this.setValue({
      name: this.mortageData.petitionType ? this.mortageData.petitionType : PetitionType.INDIVIDUAL,
      isSelected: true
    }, Source.SOLICITANTE)
  }


  protected override setAllValues(): void {
    this.listSolicitant = Object.values(PetitionType).map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentSolicitantSelectedValue?.name ? true : false,
      } as SelectListItem
    })

    this.listAcompaniant = [];
  }

  protected override setValue(estado: SelectListItem, source?: string | undefined): void {
    if(source && source === Source.SOLICITANTE) {
      this.currentSolicitantSelectedValue = estado;
      this.mortageData.petitionType = Object.values(PetitionType).find(value => value === estado.name) || PetitionType.INDIVIDUAL;
    }
  }



}
