import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { PermisoResidencia } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-residence-permit',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./residence-permit.component.scss']
})
export class ResidencePermitComponent extends AbstractCombolistComponent {

  constructor() { 
    super();
  }

  protected override setAllValues(): void {
    this.listSolicitant = Object.values(PermisoResidencia).map((val: string) => {
      return {
        name: val,
        isSelected: val === PermisoResidencia.PERMANENTE ? true : false,
      } as SelectListItem
    })

    this.listAcompaniant = Object.values(PermisoResidencia).map((val: string) => {
      return {
        name: val,
        isSelected: val === PermisoResidencia.PERMANENTE ? true : false,
      } as SelectListItem
    })
  }
  protected override setValue(estado: SelectListItem, source?: string): void {
    console.log("ESTADO ==> ",estado);
    this.lastSelected = estado;
    this.mortageData.solicitante.permisoResidencia = estado.name;
    if(this.mortageData.acompaniante !== null) {
      this.mortageData.acompaniante.permisoResidencia = estado.name;
    }
  }

}
