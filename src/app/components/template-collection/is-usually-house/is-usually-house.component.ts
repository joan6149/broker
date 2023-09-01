import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { Source } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-is-usually-house',
  templateUrl: './is-usually-house.component.html',
  styleUrls: ['./is-usually-house.component.scss']
})
export class IsUsuallyHouseComponent extends AbstractCombolistComponent {

  constructor() {
    super();

    this.setValue({
      name: this.mortageData.hipoteca.vivienda.viviendaHabitual && this.mortageData.hipoteca.vivienda.viviendaHabitual === true ? this.sinoCombobox[0].name : this.sinoCombobox[1].name,
      isSelected: true
    })

   }

  protected override setAllValues(): void {
    this.listSolicitant = this.sinoCombobox.map((val: SelectListItem) => {
      return {
        name: val.name,
        isSelected: val.name === this.currentSolicitantSelectedValue?.name ? true : false
      }
    });
    this.listAcompaniant = [];
  }

  protected override setValue(estado: SelectListItem, source?: string | undefined): void {
    this.currentSolicitantSelectedValue = estado;
    this.mortageData.hipoteca.vivienda.viviendaHabitual = estado.name === 'SI' ? true : false;
  }


}
