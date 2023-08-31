import { Component } from '@angular/core';
import { AbstractCombolistComponent } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { PetitionType, Source } from 'src/app/pages/user/models/NewMortage.model';

@Component({
  selector: 'app-is-do-hacienda-last-year',
  templateUrl: '../abstract-combolist/./abstract-combolist.component.html',
  styleUrls: ['./is-do-hacienda-last-year.component.scss']
})
export class IsDoHaciendaLastYearComponent extends AbstractCombolistComponent {

  constructor() {
    super();
    this.setSiNoInitialValue();

  }

  protected override setAllValues(): void {
    this.listSolicitant = this.setSinoValues();
    this.listAcompaniant = this.setSinoValues();
  }

  protected override setValue(estado: SelectListItem, source?: string | undefined): void {

    if(source === Source.SOLICITANTE) {
      this.currentSolicitantSelectedValue = estado;
      this.mortageData.solicitante.ultimaDeclaracionEnEspania = estado.name === 'SI' ? true : false;
    }

    if(source === Source.ACOMPANIANTE) {
      this.currentAcompaniantSelectedValue = estado;
      this.mortageData.acompaniante.ultimaDeclaracionEnEspania = estado.name === 'SI' ? true : false;
    }
  }

}
