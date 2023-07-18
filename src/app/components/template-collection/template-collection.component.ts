import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TemplateCollectionService } from './template-collection.service';
import { Observable } from 'rxjs';
import { NewMortage, PetitionType } from 'src/app/pages/user/models/NewMortage.model';
import { MortageTemplate } from '../abstract-step-page/abstract-step-page.component';
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
      console.log("MORTAGE desde TEMLATE", this.mortageDataManagement);
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

  getInitData(initdata: InitDataInterface) {
    this.mortageDataManagement.solicitante = initdata.solicitantData;
    if(initdata.acompaniantdata) {
      this.mortageDataManagement.acompaniante = initdata.acompaniantdata
    }
    this.sendMortageData();
  }


  private sendMortageData(): void {
    this.templateCollectionService.mortageData = this.mortageDataManagement;
    this.templateCollectionService.setMortageData(this.mortageDataManagement);
  }


  private sentAllTemplates(): void {

    this.templateCollectionService.setTemplate({
      name: 'typeOfPetition',
      solicitanTemplate: this.typeOfPetition
    } as MortageTemplate)

    this.templateCollectionService.setTemplate({
      name: 'basicInformation',
      solicitanTemplate: this.basicInformation,
    } as MortageTemplate);

  }

}
