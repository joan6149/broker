import { Component, OnInit } from '@angular/core';
import { AbstractCombolistComponent, SimpleAnswer } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';

@Component({
  selector: 'app-previous-request',
  templateUrl: './previous-request.component.html',
  styleUrls: ['./previous-request.component.scss']
})
export class PreviousRequestComponent extends AbstractCombolistComponent {

  previousRequestAnswer: string = SimpleAnswer.SI;

  constructor() {
    super();
    this.setSiNoInitialValue();
   }

  protected override setAllValues(): void {
    this.listSolicitant = this.setSinoValues();
  }
  protected override setValue(estado: SelectListItem, source?: string | undefined): void {
    console.log(estado);
    if(estado) {
      this.currentSolicitantSelectedValue = estado;
      this.previousRequestAnswer = estado.name;
    }
  }

}
