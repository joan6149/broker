import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { TipoVivienda } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-kind-of-house',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./kind-of-house.component.scss']
})
export class KindOfHouseComponent extends AbstractCombolistComponent {

  constructor() {
    super();
    this.setValue({
      name: this.mortageData.hipoteca?.vivienda?.tipoVivienda ? this.mortageData.hipoteca.vivienda.tipoVivienda : TipoVivienda.OBRA_NUEVA,
      isSelected: true
    })
   }

  
  protected override setAllValues(): void {
    this.listSolicitant = Object.values(TipoVivienda).map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentSolicitantSelectedValue?.name ? true : false,
      } as SelectListItem
    })

    this.listAcompaniant = [];

  }

  protected override setValue(estado: SelectListItem, source?: string | undefined): void {
    
    this.currentSolicitantSelectedValue = estado;
    this.mortageData.hipoteca.vivienda.tipoVivienda = estado.name
  }


}
