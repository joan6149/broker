import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { TipoSituacionViviendaActual } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-current-housing-situation',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./current-housing-situation.component.scss']
})
export class CurrentHousingSituationComponent extends AbstractCombolistComponent {

  constructor() {
    super()
   }

   protected override setAllValues(): void {
    this.listSolicitant = Object.values(TipoSituacionViviendaActual).map((val: string) => {
      return {
        name: val,
        isSelected: val === TipoSituacionViviendaActual.ALQUILER ? true : false,
      } as SelectListItem
    })

    this.listAcompaniant = Object.values(TipoSituacionViviendaActual).map((val: string) => {
      return {
        name: val,
        isSelected: val === TipoSituacionViviendaActual.ALQUILER ? true : false,
      } as SelectListItem
    })
  }
  protected override setValue(estado: SelectListItem, source?:string): void {
    this.lastSelected = estado;
    this.mortageData.solicitante.situacionViviendaActual = estado.name;
    if(this.mortageData.acompaniante !== null) {
      this.mortageData.acompaniante.situacionViviendaActual = estado.name;
    }
  }

}
