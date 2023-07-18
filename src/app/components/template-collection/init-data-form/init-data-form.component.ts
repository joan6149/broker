import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { AbstractDataFormComponent } from '@domo/domo-commons-lib/lib/components/forms/abstract-data-form/abstract-data-form.component';
import { InitFormState } from '@domo/domo-commons-lib/lib/components/forms/models/InitForm.interface';
import { NewMortage, PetitionType, Solicitante } from 'src/app/pages/user/models/NewMortage.model';
import { InitDataInterface } from '../models/initData.interface';
import { InitDataFormComponent } from '@domo/domo-commons-lib';
import { TemplateCollectionService } from '../template-collection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-init-data-form',
  templateUrl: './init-data-form.component.html',
  styleUrls: ['./init-data-form.component.scss']
})
export class InitDataFormAppComponent implements OnInit, OnDestroy {

  @Input('petitionType') petitionType!: string;
  @ViewChild('solicitanteDataForm', {static: true}) solicitanteDataForm!: InitDataFormComponent;
  @ViewChild('acompanianteDataForm', {static: true}) acompanianteDataForm!: InitDataFormComponent;
  @Output() onSubmitData: EventEmitter<InitDataInterface> = new EventEmitter<InitDataInterface>(); 

  allowNextStepBySolicitant: boolean = false;
  allowNextStepByAcompaniant: boolean = false;

  initDataToSend: InitDataInterface = {} as InitDataInterface;

  subscriptions: Subscription[] = [];

  constructor(private templateCollectionService: TemplateCollectionService) { }

  ngOnInit(): void {
    this.templateCollectionService.getMortageData().subscribe((mort: NewMortage) => {
      this.setFormValues({
        solicitantData: mort.solicitante,
        acompaniantdata: mort.acompaniante
      } as InitDataInterface)
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.sendValues();
  }


  setFormValues(initData: InitDataInterface): void {
    this.solicitanteDataForm.setFormValues(initData.solicitantData);
    if(initData.acompaniantdata && this.acompanianteDataForm) {
      this.acompanianteDataForm.setFormValues(initData.acompaniantdata);
    }
  }

  sameOtherFormInit(source: string, dataForm: InitDataFormComponent) {
    if(source === 'SOLICITANTE') {
      dataForm.setFormValues(this.solicitanteDataForm.getFormvalues()); // values of form
    }

    if(source === 'ACOMPANIANTE') {
      dataForm.setFormValues(this.acompanianteDataForm.getFormvalues()); // values of form
    }
  }

  public checkForm(formState: InitFormState) {


    if(formState.formName === 'SOLICITANTE') {
      this.initDataToSend.solicitantData = {...this.initDataToSend.solicitantData ,...formState.value};
      this.setAllowByProfiles(formState.status, formState.formName);
    }

    
    if(formState.formName === 'ACOMPANIANTE') {
      this.initDataToSend.acompaniantdata = {...this.initDataToSend.acompaniantdata ,...formState.value};
      this.setAllowByProfiles(formState.status, formState.formName);
    }

    
  }

  private sendValues(): void {
    if(this.petitionType === PetitionType.CONJUNTA) {
      if(this.allowNextStepByAcompaniant === true && this.allowNextStepBySolicitant === true) {
        this.onSubmitData.emit(this.initDataToSend);
      }
    } else {
      if(this.allowNextStepBySolicitant === true) {
        this.onSubmitData.emit(this.initDataToSend);
      }
    }
  }


  private setAllowByProfiles(status: string, profile: string) {
    if(profile === 'SOLICITANTE') {
      if(status === 'VALID') {
        this.allowNextStepBySolicitant = true;
      } else {
        this.allowNextStepBySolicitant = false;
      }
    }

    if(profile === 'ACOMPANIANTE') {
      if(status === 'VALID') {
        this.allowNextStepByAcompaniant = true;
      } else {
        this.allowNextStepByAcompaniant = false;
      }
    }
  }



}
