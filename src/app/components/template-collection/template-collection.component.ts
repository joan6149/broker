import { AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TemplateCollectionService } from './template-collection.service';
import { Observable } from 'rxjs';
import { NewMortage, PetitionType } from 'src/app/pages/user/models/NewMortage.model';
import { MortageTemplate, MortageTemplateOptions } from '../abstract-step-page/abstract-step-page.component';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { AbstractDataFormComponent } from '@domo/domo-commons-lib/lib/components/forms/abstract-data-form/abstract-data-form.component';
import { InitDataFormComponent } from '@domo/domo-commons-lib';
import { InitDataInterface } from './models/initData.interface';
import { InitDataFormAppComponent } from './init-data-form/init-data-form.component';

@Component({
  selector: 'app-template-collection',
  templateUrl: './template-collection.component.html',
  styleUrls: ['./template-collection.component.scss']
})
export class TemplateCollectionComponent implements OnInit, AfterViewInit {

  /** Templates */
  @ViewChild('typeOfPetition') typeOfPetition!: TemplateRef<any>;
  @ViewChild('basicInformation') basicInformation!: TemplateRef<any>;
  @ViewChild('civilState') civilState!:TemplateRef<any>;
  @ViewChild('directionForm') directionForm!:TemplateRef<any>;
  @ViewChild('sons') sons!:TemplateRef<any>;
  @ViewChild('residencePermit') residencePermit!: TemplateRef<any>;
  @ViewChild('currentSituationHouse') currentSituationHouse!: TemplateRef<any>;
  @ViewChild('labSituation') labSituation!: TemplateRef<any>;
  @ViewChild('isUsuallyHouse') isUsuallyHouse!: TemplateRef<any>;
  @ViewChild('propertyValue') propertyValue!: TemplateRef<any>;
  
  /*@ViewChild('initDataFormS') initDataFormS!: TemplateRef<any>;
  @ViewChild('initDataFormA') initDataFormA!: TemplateRef<any>; */

  /** Formularios */
  @ViewChild('solicitanteDataForm') solicitanteDataForm!: InitDataFormComponent;
  @ViewChild('acompanianteDataForm') acompanianteDataForm!: InitDataFormComponent;
  

  /** Data Observables*/
  mortageData: Observable<NewMortage> = new Observable<NewMortage>();

  /** Data management */
  mortageDataManagement: NewMortage = new NewMortage();

  constructor(private templateCollectionService: TemplateCollectionService) { }

  ngOnInit(): void {
    this.templateCollectionService.getMortageData().subscribe((mor: NewMortage) => {
      this.mortageDataManagement = mor;
      //this.setFormValues();
    });
  }

  ngAfterViewInit(): void {
    this.sentAllTemplates()
    //this.setFormValues()
  }

  setPetitionType(petition: PetitionType): void {
    this.mortageDataManagement.petitionType = petition;
    this.sendMortageData();
  }


  private sendMortageData(): void {
    this.templateCollectionService.mortageData = this.mortageDataManagement;
    this.templateCollectionService.setMortageData(this.mortageDataManagement);
  }


  private sentAllTemplates(): void {

    this.templateCollectionService.setTemplate({
      name: 'typeOfPetition',
      template: this.typeOfPetition,
      autoNext: true
    } as MortageTemplate)

    this.templateCollectionService.setTemplate({
      name: 'basicInformation',
      template: this.basicInformation
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'civilState',
      template: this.civilState,
      autoNext: true
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'isUsuallyHouse',
      template: this.isUsuallyHouse,
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'propertyValue',
      template: this.propertyValue
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'directionForm',
      template: this.directionForm,
      templateOptions: {
        mandatory: true,
        isCorrect: false
      } as MortageTemplateOptions
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'sons',
      template: this.sons,
      templateOptions: {
        mandatory: true,
        isCorrect: false
      } as MortageTemplateOptions
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'residencePermit',
      template: this.residencePermit
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'currentSituationHouse',
      template: this.currentSituationHouse
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'labSituation',
      template: this.labSituation,
      templateOptions: {
        mandatory: true,
        isCorrect: false
      } as MortageTemplateOptions
    } as MortageTemplate);

  }

}
