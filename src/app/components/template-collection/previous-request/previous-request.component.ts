import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractCombolistComponent, SimpleAnswer } from '../abstract-combolist/abstract-combolist.component';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { TemplateCollectionService } from '../template-collection.service';

@Component({
  selector: 'app-previous-request',
  templateUrl: './previous-request.component.html',
  styleUrls: ['./previous-request.component.scss']
})
export class PreviousRequestComponent extends AbstractCombolistComponent implements AfterViewInit {

  previousRequestAnswer: string = SimpleAnswer.SI;
  bancosCheck: boolean = false;
  brokersCheck: boolean = false;

  constructor() {
    super();
    this.setSiNoInitialValue();
   }

   ngAfterViewInit(): void {
     this.validateTemplate();
   }

  protected override setAllValues(): void {
    this.listSolicitant = this.setSinoValues();
  }
  protected override setValue(estado: SelectListItem, source?: string | undefined): void {
    if(estado) {
      this.currentSolicitantSelectedValue = estado;
      this.previousRequestAnswer = estado.name;
    }
    this.validateTemplate();
  }

  doShowBancosCombobox(): boolean {
    return this.previousRequestAnswer === SimpleAnswer.SI && this.bancosCheck === true;
  }

  doShowBrokersCombobox(): boolean {
    return this.previousRequestAnswer === SimpleAnswer.SI && this.brokersCheck === true;
  }

  validateTemplate() {
    if(!this.bancosCheck && !this.brokersCheck && this.previousRequestAnswer === SimpleAnswer.SI) {
      this.isValid(false);
    } else {
      this.isValid(true);
    }
  }

}
