import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { PermisoResidencia, Source } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-residence-permit',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./residence-permit.component.scss']
})
export class ResidencePermitComponent extends AbstractCombolistComponent {

  constructor() { 
    super();
    this.setValue({
      name: this.mortageData.solicitante?.permisoResidencia ? this.mortageData.solicitante?.permisoResidencia : PermisoResidencia.PERMANENTE,
      isSelected: true
    }, Source.SOLICITANTE) 
    this.setValue({
      name: this.mortageData.acompaniante?.permisoResidencia ? this.mortageData.acompaniante?.permisoResidencia : PermisoResidencia.PERMANENTE,
      isSelected: true
    }, Source.ACOMPANIANTE)
  }

  protected override setAllValues(): void {
    this.listSolicitant = Object.values(PermisoResidencia).map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentSolicitantSelectedValue?.name ? true : false,
      } as SelectListItem
    })

    this.listAcompaniant = Object.values(PermisoResidencia).map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentAcompaniantSelectedValue?.name ? true : false,
      } as SelectListItem
    })
  }
  protected override setValue(estado: SelectListItem, source?: string): void {

    if(source && source === Source.SOLICITANTE) {
      this.currentSolicitantSelectedValue = estado;
      this.mortageData.solicitante.permisoResidencia = estado.name;
    }


    if(source && source === Source.ACOMPANIANTE) {
      this.mortageData.acompaniante.permisoResidencia = estado.name;
      this.currentAcompaniantSelectedValue = estado;
    }
  }

}
