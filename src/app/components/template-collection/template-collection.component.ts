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
  @ViewChild('kindOfHouse') kindOfHouse!: TemplateRef<any>;
  @ViewChild('currentHiringState') currentHiringState!: TemplateRef<any>;
  @ViewChild('addressNewProperty') addressNewProperty!: TemplateRef<any>;
  @ViewChild('m2House') m2House!: TemplateRef<any>;
  @ViewChild('kindOfConstruction') kindOfConstruction!: TemplateRef<any>;
  @ViewChild('isAval') isAval!: TemplateRef<any>;
  @ViewChild('isHaciendaLastYear') isHaciendaLastYear!: TemplateRef<any>;
  @ViewChild('previousRequest') previousRequest!: TemplateRef<any>;
  
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
      title: 'Tipo de solicitud',
      template: this.typeOfPetition,
      autoNext: true
    } as MortageTemplate)

    this.templateCollectionService.setTemplate({
      name: 'basicInformation',
      title: 'Datos',
      template: this.basicInformation
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'civilState',
      title: 'Estado civil',
      template: this.civilState,
      autoNext: true
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'isUsuallyHouse',
      title: '¿Sera vivienda habitual?',
      template: this.isUsuallyHouse,
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'propertyValue',
      title: '¿Cuál es el valor de la propiedad?',
      template: this.propertyValue
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'kindOfHouse',
      title: '¿Tipo de vivienda?',
      template: this.kindOfHouse
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'currentHiringState',
      title: '¿Como va la busqueda de tu nueva casa?',
      template: this.currentHiringState
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'directionForm',
      title: 'Direccion',
      template: this.directionForm,
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'sons',
      title: 'Numero de hijos a cargo',
      template: this.sons,
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'residencePermit',
      title: 'Permiso de residencia',
      template: this.residencePermit
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'currentSituationHouse',
      title: 'Situación de la residencia actual',
      template: this.currentSituationHouse
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'labSituation',
      title: 'Situación laboral',
      template: this.labSituation,
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'addressNewProperty',
      title: '¿Donde se encuantra la vivienda ha hipotecar?',
      template: this.addressNewProperty,
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'm2House',
      title: '¿Metros cuadrados de la vivienda a adquirir?',
      template: this.m2House,
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'kindOfConstruction',
      title: '¿Cual es el tipo de construcción de tu vivienda?',
      template: this.kindOfConstruction,
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'isAval',
      title: '¿Tienes o puedes conseguir aval?',
      template: this.isAval,
    } as MortageTemplate);

    this.templateCollectionService.setTemplate({
      name: 'isHaciendaLastYear',
      title: '¿Has realizado la declaración de hacienda en españa el ultimo año?',
      template: this.isHaciendaLastYear,
    } as MortageTemplate);
    
    this.templateCollectionService.setTemplate({
      name: 'previousRequest',
      title: '¿Has solicitado ya la hipoteca con otros bancos?',
      template: this.previousRequest,
    } as MortageTemplate);
  }

}
