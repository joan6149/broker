import { Component, OnInit, Input, inject, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SelectListItem } from '@domo/domo-commons-lib/lib/models/SelectList.model';
import { EstadoCivil, NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { TemplateCollectionService } from '../template-collection.service';
import { ComponentsModule, SelectListComponent } from '@domo/domo-commons-lib';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abstract-combolist',
  templateUrl: './abstract-combolist.component.html',
  styleUrls: ['./abstract-combolist.component.scss'],
  standalone: true,
  imports: [ CommonModule, ComponentsModule]
})
export abstract class AbstractCombolistComponent implements OnInit {

  @Input('petitionType') petitionType!: string;
  mortageData!: NewMortage;

  listSolicitant: SelectListItem[] = [];
  listAcompaniant: SelectListItem[] = [];

  currentSolicitantSelectedValue!: SelectListItem;
  currentAcompaniantSelectedValue?: SelectListItem;

  lastSelected?: SelectListItem;

  sinoCombobox = [
    {
      name: 'SI',
      isSelected: true,
      item: true
    } as SelectListItem, 
    {
      name: 'NO',
      isSelected: false,
      item: false
    } as SelectListItem
  ]

  templateCollectionService: TemplateCollectionService = inject(TemplateCollectionService);

  constructor() {
    this.mortageData = this.templateCollectionService.mortageData;
   }

  ngOnInit(): void {
    this.setAllValues();
  }

  protected abstract setAllValues(): void;

  sameOtherCombo(source: string, selectList: SelectListComponent) {
    if(source === 'SOLICITANTE') {
      selectList.typeSelected(this.currentSolicitantSelectedValue!, false)
    }

    if(source === 'ACOMPANIANTE') {
      selectList.typeSelected(this.currentAcompaniantSelectedValue!, false)
    }
  }

  protected abstract setValue(estado: SelectListItem, source?: string): void;
}
