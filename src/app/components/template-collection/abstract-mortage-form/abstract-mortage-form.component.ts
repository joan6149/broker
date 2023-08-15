import { Component, OnInit, Input, ViewChild, inject } from '@angular/core';
import { AbstractDataFormComponent } from '@domo/domo-commons-lib/lib/components/forms/abstract-data-form/abstract-data-form.component';
import { NewMortage } from 'src/app/pages/user/models/NewMortage.model';
import { DataFormData } from '../models/initData.interface';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { TemplateCollectionService } from '../template-collection.service';

@Component({
  selector: 'app-abstract-mortage-form',
  templateUrl: './abstract-mortage-form.component.html',
  styleUrls: ['./abstract-mortage-form.component.scss']
})
export class AbstractMortageFormComponent implements OnInit {

  @Input('petitionType') petitionType!: string;
  mortageData!: NewMortage;
  currentDataFormdata?: DataFormData;
  solicitantIsCorrect: boolean = false;
  acompaniantisCorrect: boolean = false;

  templateCollectionService: TemplateCollectionService = inject(TemplateCollectionService);


  @ViewChild('solicitanteDataForm', {static: true}) solicitanteDataForm!: AbstractDataFormComponent;
  @ViewChild('acompanianteDataForm', {static: true}) acompanianteDataForm!: AbstractDataFormComponent;

  constructor() {}

  ngOnInit(): void {
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
      dataForm.setFormValues(this.solicitanteDataForm.getFormvalues());
    }

    if(source === 'ACOMPANIANTE') {
      dataForm.setFormValues(this.acompanianteDataForm.getFormvalues());
    }
  }

  public checkForm(formState: InitFormState) {


    if(formState.formName === 'SOLICITANTE') {
      //this.currentDataFormdata.solicitantData = {...this.currentDataFormdata.solicitantData ,...formState.value};
    }

    
    if(formState.formName === 'ACOMPANIANTE') {
      //this.initDataToSend.acompaniantdata = {...this.initDataToSend.acompaniantdata ,...formState.value};
    }
    
    this.setAllowByProfiles(formState.status, formState.formName);

    if(this.petitionType === 'CONJUNTA') {
      if(this.solicitantIsCorrect === true && this.acompaniantisCorrect === true) {
        this.currentDataFormdata = {...this.currentDataFormdata ,...formState.value};
      }
    } else {
      if(this.solicitantIsCorrect === true) {
        this.currentDataFormdata = {...this.currentDataFormdata ,...formState.value};
      }
    }
  }

  private setAllowByProfiles(status: string, profile: string) {
    if(profile === 'SOLICITANTE') {
      if(status === 'VALID') {
        this.solicitantIsCorrect = true;
      } else {
        this.solicitantIsCorrect = false;
      }
    }

    if(profile === 'ACOMPANIANTE') {
      if(status === 'VALID') {
        this.acompaniantisCorrect = true;
      } else {
        this.acompaniantisCorrect = false;
      }
    }
  }

}
