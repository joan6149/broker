import { Component, OnInit, Input } from '@angular/core';
import { TemplateCollectionService } from '../template-collection.service';
import { EstadoCivil, NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { SelectListComponent } from '@domo/domo-commons-lib';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';

@Component({
  selector: 'app-civil-state',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./civil-state.component.scss']
})
export class CivilStateComponent extends AbstractCombolistComponent implements OnInit {
  

  constructor() {super();}

  setAllValues(): void {

    this.listSolicitant = Object.values(EstadoCivil).map((val: string) => {
      return {
        name: val,
        isSelected: val === EstadoCivil.CASADO ? true : false,
      } as SelectListItem
    })

    this.listAcompaniant = Object.values(EstadoCivil).map((val: string) => {
      return {
        name: val,
        isSelected: val === EstadoCivil.CASADO ? true : false,
      } as SelectListItem
    })
  }

  setValue(estado: any) {
    console.log("RECIBO A SETVALUE => ", estado);
    this.lastSelected = estado;
    this.mortageData.solicitante.estadoCivil = estado.name;
    if(this.mortageData.acompaniante !== null) {
      this.mortageData.acompaniante.estadoCivil = estado.name;
    }
  }

}
