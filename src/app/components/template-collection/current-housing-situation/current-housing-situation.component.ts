import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { Source, TipoSituacionViviendaActual } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-current-housing-situation',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['../abstract-combolist/./abstract-combolist.component.scss']
})
export class CurrentHousingSituationComponent extends AbstractCombolistComponent {

  constructor() {
    super()
    this.setValue({
      name: this.mortageData.solicitante?.situacionViviendaActual ? this.mortageData.solicitante?.situacionViviendaActual : TipoSituacionViviendaActual.ALQUILER,
      isSelected: true
    }, Source.SOLICITANTE) 
    this.setValue({
      name: this.mortageData.acompaniante?.situacionViviendaActual ? this.mortageData.acompaniante?.situacionViviendaActual : TipoSituacionViviendaActual.ALQUILER,
      isSelected: true
    }, Source.ACOMPANIANTE)
   }

   protected override setAllValues(): void {
    this.listSolicitant = Object.values(TipoSituacionViviendaActual).map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentSolicitantSelectedValue?.name ? true : false,
      } as SelectListItem
    })

    this.listAcompaniant = Object.values(TipoSituacionViviendaActual).map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentAcompaniantSelectedValue?.name ? true : false,
      } as SelectListItem
    })
  }
  protected override setValue(estado: SelectListItem, source?:string): void {

    if(source && source === Source.SOLICITANTE) {
      this.currentSolicitantSelectedValue = estado;
      this.mortageData.solicitante.situacionViviendaActual = estado.name;
    }


    if(source && source === Source.ACOMPANIANTE) {
      this.mortageData.acompaniante.situacionViviendaActual = estado.name;
      this.currentAcompaniantSelectedValue = estado;
    }
  }

}
