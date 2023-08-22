import { Component, OnInit, Input } from '@angular/core';
import { EstadoCivil, PetitionType, Source } from 'src/app/pages/user/models/NewMortage.model';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';

@Component({
  selector: 'app-civil-state',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./civil-state.component.scss']
})
export class CivilStateComponent extends AbstractCombolistComponent implements OnInit {
  
  constructor() {
    super();
    this.setValue({
      name: this.mortageData.solicitante?.estadoCivil ? this.mortageData.solicitante?.estadoCivil : EstadoCivil.CASADO,
      isSelected: true
    }, Source.SOLICITANTE) 
    this.setValue({
      name: this.mortageData.acompaniante?.estadoCivil ? this.mortageData.acompaniante?.estadoCivil : EstadoCivil.CASADO,
      isSelected: true
    }, Source.ACOMPANIANTE)
  }

  setAllValues(): void {

    this.listSolicitant = Object.values(EstadoCivil).map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentSolicitantSelectedValue?.name ? true : false,
      } as SelectListItem
    })

    this.listAcompaniant = Object.values(EstadoCivil).map((val: string) => {
      return {
        name: val,
        isSelected: val === this.currentAcompaniantSelectedValue?.name ? true : false,
      } as SelectListItem
    })
  }

  protected override setValue(estado: SelectListItem, source?: string | undefined): void {
    
    console.log("RECIBO A SETVALUE => ", estado);
    if(source && source === Source.SOLICITANTE) {
      this.currentSolicitantSelectedValue = estado;
      this.mortageData.solicitante.estadoCivil = estado.name;
    }


    if(source && source === Source.ACOMPANIANTE) {
      this.mortageData.acompaniante.estadoCivil = estado.name;
      this.currentAcompaniantSelectedValue = estado;
    }
  }

}
