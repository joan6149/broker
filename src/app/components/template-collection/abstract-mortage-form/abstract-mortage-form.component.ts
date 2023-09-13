import { Component, OnInit, Input, ViewChild, inject, QueryList, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AbstractDataFormComponent } from '@domo/domo-commons-lib/lib/components/forms/abstract-data-form/abstract-data-form.component';
import { NewMortage, PetitionType } from 'src/app/pages/user/models/NewMortage.model';
import { DataFormData } from '../models/initData.interface';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { TemplateCollectionService } from '../template-collection.service';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@domo/domo-commons-lib';

@Component({
  selector: 'app-abstract-mortage-form',
  templateUrl: './abstract-mortage-form.component.html',
  styleUrls: ['./abstract-mortage-form.component.scss'],
  standalone: true,
  imports: [ CommonModule, ComponentsModule]
})
export abstract class AbstractMortageFormComponent implements OnInit, AfterViewInit {

  @Input('petitionType') petitionType!: string;
  mortageData!: NewMortage;
  currentDataFormdata?: DataFormData;
  currentFormState?: InitFormState;

  solicitantIsCorrect: boolean = false;
  acompaniantisCorrect: boolean = false;
  itsSameSolicitant: boolean = false;
  itsSameAcompaniant: boolean = false;

  templateCollectionService: TemplateCollectionService = inject(TemplateCollectionService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);


  @ViewChild('solicitanteDataForm') solicitanteDataForm!: AbstractDataFormComponent;
  @ViewChild('acompanianteDataForm') acompanianteDataForm!: AbstractDataFormComponent;


  constructor() {}

  ngOnInit(): void {
    this.mortageData = this.templateCollectionService.mortageData;
    this.petitionType = this.mortageData.petitionType;
  }

  ngAfterViewInit(): void {
    this.fillFormFields();
  }

  setFormValues(data: DataFormData): void {
    this.solicitanteDataForm.setFormValues(data.solicitantData);
    if(data.acompaniantData && this.acompanianteDataForm) {
      this.acompanianteDataForm.setFormValues(data.acompaniantData);
    }
    this.currentDataFormdata = data;
  }

  sameOtherForm(source: string, dataForm: AbstractDataFormComponent) {
    if(source === 'SOLICITANTE') {
      this.itsSameSolicitant = true;
      dataForm.setFormValues(this.solicitanteDataForm.getFormvalues());
    }

    if(source === 'ACOMPANIANTE') {
      this.itsSameAcompaniant = true;
      dataForm.setFormValues(this.acompanianteDataForm.getFormvalues());
    }

    if(this.currentFormState) {
      this.checkForm(this.currentFormState);
    }

    this.itsSameAcompaniant = false;
    this.itsSameSolicitant = false;
  }

  protected sendCheckFormIsCorrect(): void {

    if(this.mortageData.petitionType === PetitionType.INDIVIDUAL) {
      this.templateCollectionService.setCurrentTemplateIsCorrect(this.solicitantIsCorrect);
    }

    if(this.mortageData.petitionType === PetitionType.CONJUNTA) {
      this.templateCollectionService.setCurrentTemplateIsCorrect(this.solicitantIsCorrect && this.acompaniantisCorrect);
    }
  }

  abstract checkForm(formState: InitFormState | string): void;
  abstract fillFormFields(): void;

}
