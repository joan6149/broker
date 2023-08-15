import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';

@Component({
  selector: 'app-is-usually-house',
  templateUrl: './is-usually-house.component.html',
  styleUrls: ['./is-usually-house.component.scss']
})
export class IsUsuallyHouseComponent extends AbstractCombolistComponent {

  constructor() {
    super();
   }

  protected override setAllValues(): void {
    this.listSolicitant = this.sinoCombobox;
    this.listAcompaniant = [];
  }
  protected override setValue(estado: SelectListItem): void {
    console.log("estado", estado);
    this.lastSelected = estado;
    this.mortageData.viviendaHabitual = estado.item;
  }

}
