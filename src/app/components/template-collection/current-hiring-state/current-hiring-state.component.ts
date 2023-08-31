import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { EstadosActuales } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-current-hiring-state',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./current-hiring-state.component.scss']
})
export class CurrentHiringStateComponent extends AbstractCombolistComponent {

  constructor() {
    super();
    this.setValue({
      name: this.mortageData.hipoteca?.vivienda?.estadoActual ? this.mortageData.hipoteca.vivienda.estadoActual : EstadosActuales.get(0) || '',
      isSelected: true
    })
   }

  protected override setAllValues(): void {
    this.listSolicitant = [...EstadosActuales.values()].map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentSolicitantSelectedValue?.name ? true : false,
      } as SelectListItem
    })

    this.listAcompaniant = [];
  }

  protected override setValue(estado: SelectListItem, source?: string | undefined): void {
    this.currentSolicitantSelectedValue = estado;
    this.mortageData.hipoteca.vivienda.estadoActual = estado.name
  }

}
