import { Component, OnInit, Input, inject } from '@angular/core';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { NewMortage, Source } from 'src/app/pages/user/models/NewMortage.model';
import { TemplateCollectionService } from '../template-collection.service';
import { ComponentsModule, SelectListComponent } from '@domo/domo-commons-lib';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../base-form-component/base-form';

export enum SimpleAnswer {
  SI = 'SI',
  NO = 'NO'
}

@Component({
  selector: 'app-abstract-combolist',
  templateUrl: './abstract-combolist.component.html',
  styleUrls: ['./abstract-combolist.component.scss'],
  standalone: true,
  imports: [ CommonModule, ComponentsModule]
})
export abstract class AbstractCombolistComponent extends BaseForm implements OnInit {

  @Input('petitionType') petitionType?: string;
  mortageData!: NewMortage;

  listSolicitant: SelectListItem[] = [];
  listAcompaniant: SelectListItem[] = [];

  currentSolicitantSelectedValue!: SelectListItem;
  currentAcompaniantSelectedValue?: SelectListItem;
  lastSelected?: SelectListItem;
  firstLoad: boolean = true;

  sinoCombobox = [
    {
      name: SimpleAnswer.SI,
      isSelected: true,
      item: true
    } as SelectListItem, 
    {
      name: SimpleAnswer.NO,
      isSelected: false,
      item: false
    } as SelectListItem
  ]

  templateCollectionService: TemplateCollectionService = inject(TemplateCollectionService);

  constructor() {
    super();
    this.mortageData = this.templateCollectionService.mortageData;
    if(!this.petitionType) {
      this.petitionType = this.mortageData.petitionType
    }
   }

  ngOnInit(): void {
    this.setAllValues();
    this.isValid(true);
  }

  sameOtherCombo(source: string, selectList: SelectListComponent) {
    if(source === 'SOLICITANTE') {
      this.currentAcompaniantSelectedValue = {...this.currentSolicitantSelectedValue} as SelectListItem;
      selectList.typeSelected(this.currentSolicitantSelectedValue!, false)
      this.setValue({...this.currentSolicitantSelectedValue} as SelectListItem, Source.ACOMPANIANTE);
    }

    if(source === 'ACOMPANIANTE') {
      this.currentSolicitantSelectedValue = {...this.currentAcompaniantSelectedValue} as SelectListItem
      selectList.typeSelected(this.currentAcompaniantSelectedValue!, false)
      this.setValue({...this.currentAcompaniantSelectedValue} as SelectListItem, Source.SOLICITANTE);
    }
  }

  // Metodo no implementado para pasar a la siguiente template sin necesidad de clicar al 'NEXT'
  nextTemplate(): void {
    
  }

  setSinoValues(): SelectListItem[] {
    return this.sinoCombobox.map((val: SelectListItem) => {
      return {
        name: val.name,
        isSelected: val.name === this.currentSolicitantSelectedValue?.name ? true : false
      }
    });
  }

  protected setSiNoInitialValue(initialValue?: string): void {
    this.setValue({
      name: initialValue ? initialValue : SimpleAnswer.SI,
      isSelected: true
    } as SelectListItem, Source.SOLICITANTE)

    if(this.listAcompaniant.length > 0) {
      this.setValue({
        name: initialValue ? initialValue : SimpleAnswer.SI,
        isSelected: true
      } as SelectListItem, Source.ACOMPANIANTE)
    }
  }


  protected abstract setAllValues(): void;
  protected abstract setValue(estado: SelectListItem, source?: string): void;
}
